import { determineUnit, determineValues, parseCliOptions, printResults } from './lib/lib.js';
import { logError } from './lib/utils.js';

(async () => {
	try {
		const cliOptions = parseCliOptions();
		const unit = await determineUnit(cliOptions);
		const values = await determineValues({ ...cliOptions, unit });
		printResults(unit, values, cliOptions);
		process.exit(0);
	} catch (e) {
		logError('An error occurred', e?.message);
		process.exit(1);
	}
})();
