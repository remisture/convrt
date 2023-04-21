import chalk from 'chalk';
import clear from 'clear';
import commandLineArgs from 'command-line-args';
import commandLineUsage from 'command-line-usage';
import figlet from 'figlet';
import inquirer from 'inquirer';
import { LocalStorage } from 'node-localstorage';
import boxenMessage from './boxenMessage.js';
import { cliOptions } from './cliOptions.js';

const STORAGE_PATH = './storage-data';
const STORAGE_NAME = 'data';
const STORAGE_KEYS = {
	UNIT: 'unit',
	KG: 'kg',
	LBS: 'lbs',
	VALUES: 'values',
};

const localStorage = new LocalStorage(STORAGE_PATH);

const getLocalObject = () => JSON.parse(localStorage.getItem(STORAGE_NAME)) || {};
const getLocalKey = (key, defaultValue) => {
	const value = getLocalObject()[key];
	return value !== undefined ? value : defaultValue;
};

const saveLocalKey = (key, value) => {
	const existingData = getLocalObject();
	localStorage.setItem(STORAGE_NAME, JSON.stringify({ ...existingData, [key]: value }, null, 2));
};

const clearStorage = () => {
	console.log(' ');
	localStorage.clear();
	console.log(chalk.green('Local data removed!'));
	console.log(' ');
};

export const parseCliOptions = () => {
	const cmdOptions = commandLineArgs(cliOptions, { partial: true });
	const help = !!cmdOptions['help'];
	const clear = !!cmdOptions['clear'];
	const kg = cmdOptions['kg'];
	const lbs = cmdOptions['lbs'];
	const decimals = cmdOptions['decimals'];
	const unknowns = cmdOptions['_unknown'];
	const values = kg || lbs || unknowns || [];

	if (help) {
		helpSection();
		process.exit(0);
		return;
	}

	if (clear) {
		clearStorage();
	}

	return { kg: kg !== undefined, lbs: lbs !== undefined, values, decimals };
};

export const determineUnit = async (options) => {
	const { kg, lbs, values } = options || {};

	if (kg) {
		saveLocalKey(STORAGE_KEYS.UNIT, STORAGE_KEYS.KG);
		return STORAGE_KEYS.KG;
	} else if (lbs) {
		saveLocalKey(STORAGE_KEYS.UNIT, STORAGE_KEYS.LBS);
		return STORAGE_KEYS.LBS;
	} else {
		const { unit } = await askForUnit(values);

		if (unit === 'exit') {
			exit();
			return;
		}

		saveLocalKey(STORAGE_KEYS.UNIT, unit);
		return unit;
	}
};

export const determineValues = async (options) => {
	const { values } = options || {};

	if (Array.isArray(values) && values.length > 0) {
		saveLocalKey(STORAGE_KEYS.VALUES, values);
		return values;
	} else {
		const { values } = await askForValues(options);

		if (values === 'exit') {
			exit();
			return;
		}

		saveLocalKey(STORAGE_KEYS.VALUES, values);
		return values;
	}
};

const askForValues = async (options) => {
	const { unit } = options || {};
	const { values } = await inquirer.prompt({
		type: 'input',
		name: 'values',
		message: `What weight would you like to convert from ${unit}?`,
		filter: (values) => values && values.split(' '),
		transformer: (values) => (Array.isArray(values) ? values.join(' ') : values),
		validate: (values = []) => (!onlyNumbers(values) ? 'Please provide valid numbers' : true),
		default: () => {
			const values = getLocalKey(STORAGE_KEYS.VALUES, []);
			return Array.isArray(values) ? values.join(' ') : values;
		},
	});

	return { values };
};

const askForUnit = async (values = []) => {
	const { unit } = await inquirer.prompt({
		type: 'list',
		name: 'unit',
		message: `What unit would you like to convert${
			Array.isArray(values) ? `${values.length > 1 ? ' the values ' : ''}${values.join(', ')}` : ''
		} from?`,
		choices: [
			{ name: 'Kilos', value: STORAGE_KEYS.KG },
			{ name: 'Pounds', value: STORAGE_KEYS.LBS },
			{ value: 'exit', name: chalk.red('Cancel') },
		],
		default: getLocalKey(STORAGE_KEYS.UNIT, STORAGE_KEYS.KG),
	});

	return { unit };
};

export const convert = (unit, value, decimals = 0) => {
	const FACTOR = 0.45359237;
	if (value == null || isNaN(value) || typeof value === 'string' || Array.isArray(value)) {
		return value;
	}
	if (unit === 'lbs') {
		return decimals > 0 ? (value * FACTOR).toFixed(decimals) + ' kg' : Math.round(value * FACTOR) + ' kg';
	} else if (unit === 'kg') {
		return decimals > 0 ? (value / FACTOR).toFixed(decimals) + ' lbs' : Math.round(value / FACTOR) + ' lbs';
	} else {
		return value;
	}
};

export const printResults = (unit, values, options) => {
	const results = [];

	(values || []).map((value) => {
		const result = convert(unit, Number(value), options.decimals);
		results.push(chalk.bold(`${value} ${unit} = ${result}`));
	});

	if (results.length === 0) {
		results.push(chalk.red('No values provided'));
	} else {
		console.log(boxenMessage.info({ content: results }));
	}
};

const helpSection = () => {
	printHeading();
	console.log(
		commandLineUsage([
			{
				header: 'Usage',
				content: [
					'$ convrt [<options>]',
					'$ convrt',
					'$ convrt --kg 100',
					'$ convrt --kg 100 150',
					'$ convrt --lbs 225',
					'$ convrt --lbs 300 -d 2',
				],
			},
			{ header: 'Commands', optionList: cliOptions },
			{ content: 'A cli tool by Remi Sture' },
		])
	);
};

const exit = () => {
	console.log('👋');
	process.exit();
};

export const printHeading = () => {
	clear();
	console.log(' ');
	console.log(chalk.yellow(figlet.textSync('convrt', { horizontalLayout: 'full' })));
	console.log(' ');
};
