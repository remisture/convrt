import chalk from 'chalk';
import boxenMessage from './message.js';

export const logError = (title, content, ...rest) => {
	console.log(
		boxenMessage.error({
			title: chalk.underline(title),
			content: [content, ...rest],
		})
	);
};

export const onlyNumbers = (values) => {
	if (!Array.isArray(values)) {
		return false;
	}

	return values.every((value) => {
		const parsedValue = typeof value === 'string' && value.trim() !== '' ? Number(value) : value;
		return !Number.isNaN(parsedValue) && typeof parsedValue === 'number';
	});
};
