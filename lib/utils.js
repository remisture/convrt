import chalk from 'chalk';
import boxenMessage from './boxenMessage.js';

export const logError = (title, content, ...rest) => {
	console.log(
		boxenMessage.error({
			title: chalk.underline(title),
			content: [content, ...rest],
		})
	);
};

export const onlyNumbers = (values = []) => {
	return Array.isArray(values) ? values.every((value) => !isNaN(value)) : false;
};
