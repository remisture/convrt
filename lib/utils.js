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

export const onlyNumbers = (values = []) => {
	return Array.isArray(values) ? values.every((value) => !Number.isNaN(value)) : false;
};
