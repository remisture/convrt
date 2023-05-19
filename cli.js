#!/usr/bin/env node

import process from 'node:process';
import { determineUnit, determineValues, parseCliOptions, printResults } from './lib/lib.js';
import { logError } from './lib/utils.js';

const run = async () => {
	try {
		const cliOptions = parseCliOptions();
		const unit = await determineUnit(cliOptions);
		const values = await determineValues({ ...cliOptions, unit });
		printResults(unit, values, cliOptions);
		process.exit(0);
	} catch (error) {
		logError('An error occurred', error?.message);
		process.exit(1);
	}
};

await run();
