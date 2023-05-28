import test from 'ava';
import { onlyNumbers } from '../lib/utils.js';

test('onlyNumbers returns true when all values are numbers', (t) => {
	t.true(onlyNumbers([1, 2, 3]));
	t.true(onlyNumbers([3.14, 42]));
});

test('onlyNumbers returns false when any value is not a number', (t) => {
	t.false(onlyNumbers(['']));
	t.false(onlyNumbers(['abc']));
	t.false(onlyNumbers([1, 'abc', 3]));
	t.false(onlyNumbers([1, 2, 3, '']));
});

test('onlyNumbers returns false when input is not an array', (t) => {
	t.false(onlyNumbers());
	t.false(onlyNumbers(null));
	t.false(onlyNumbers(undefined));
	t.false(onlyNumbers(true));
	t.false(onlyNumbers(false));
	t.false(onlyNumbers(''));
	t.false(onlyNumbers(123));
	t.false(onlyNumbers({}));
});
