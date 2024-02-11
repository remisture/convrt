const commonCliOptionDefinitions = [
	{ name: 'help', alias: 'h', type: Boolean, description: 'Displays this usage guide.' },
	{ name: 'version', alias: 'v', type: Boolean, description: 'Displays the version of the cli' },
];

export const cliOptions = [
	{ name: 'kg', alias: 'k', type: Number, description: 'Convert value from kgs to lbs', multiple: true },
	{ name: 'lbs', alias: 'l', type: Number, description: 'Convert value from lbs to kgs', multiple: true },
	{ name: 'decimals', alias: 'd', type: Number, description: 'Number of decimals to show', defaultValue: 0 },
	{ name: 'clear', alias: 'c', type: Boolean, description: 'Clear local data' },
	...commonCliOptionDefinitions,
];

export const commonCliSectionUsage = (command) => [`$ ${command} {bold -h}`, `$ ${command} {bold -v}`];
