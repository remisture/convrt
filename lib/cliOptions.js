export const cliOptions = [
	{ name: 'kg', alias: 'k', type: Number, description: 'Convert value from kgs to lbs', multiple: true },
	{ name: 'lbs', alias: 'l', type: Number, description: 'Convert value from lbs to kgs', multiple: true },
	{ name: 'decimals', alias: 'd', type: Number, description: 'Number of decimals to show', defaultValue: 0 },
	{ name: 'clear', alias: 'c', type: Boolean, description: 'Clear local data' },
	{ name: 'help', alias: 'h', type: Boolean, description: 'Show help section' },
];
