import test from 'ava';
import { convert } from '../lib/lib.js';

test('convert returns the converted value in kg when unit is "lbs"', (t) => {
	t.is(convert('lbs', 10), '5 kg');
	t.is(convert('lbs', 10, 1), '4.5 kg');
	t.is(convert('lbs', 10, 2), '4.54 kg');
	t.is(convert('lbs', 10, 3), '4.536 kg');
});

test('convert returns the converted value in lbs when unit is "kg"', (t) => {
	t.is(convert('kg', 100), '220 lbs');
	t.is(convert('kg', 100, 1), '220.5 lbs');
	t.is(convert('kg', 100, 2), '220.46 lbs');
	t.is(convert('kg', 100, 3), '220.462 lbs');
});

test('convert returns the same value when unit is neither "lbs" nor "kg"', (t) => {
	t.is(convert('g', 100), 100);
	t.is(convert('oz', 16), 16);
	t.is(convert('cm', 50), 50);
});

test('convert returns the input value when it is null, NaN, a string, or an array', (t) => {
	t.is(convert('lbs', null), null);
	t.is(convert('kg', Number.NaN), Number.NaN);
	t.is(convert('lbs', '20'), '20');
	t.deepEqual(convert('kg', [10, 20, 30]), [10, 20, 30]);
});
