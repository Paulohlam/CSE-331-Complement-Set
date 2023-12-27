import * as assert from 'assert';
import { explode_array } from './list';
import { even, prime, fibonacci, and, or, not } from './query';
import { getAll, getEvens, getPrimes, getFibonacci, evaluate } from './eval';

describe('eval', function() {

  it('evaluate', function() {
    // TODO (1e): change to use .getNumbers()
    // TODO (5e): pass range arguments to getNumbers calls.
    //            For each case, use the min and max passed to evaluate
    assert.deepEqual((evaluate(even, 1, 10)).getNumbers(),
        explode_array([2, 4, 6, 8, 10]));
    assert.deepEqual((evaluate(not(even), 1, 10)).getNumbers(),
        explode_array([1, 3, 5, 7, 9]));
    assert.deepEqual((evaluate(and(not(even), fibonacci), 1, 15)).getNumbers(),
        explode_array([1, 3, 5, 13]));
    assert.deepEqual((evaluate(or(even, not(prime)), 2, 15)).getNumbers(),
        explode_array([2, 4, 6, 8, 9, 10, 12, 14, 15]));
  });

  it('getAll', function() {
    assert.deepEqual(getAll(6, 5), explode_array([]));
    assert.deepEqual(getAll(5, 5), explode_array([5]));
    assert.deepEqual(getAll(1, 5), explode_array([1, 2, 3, 4, 5]));
    assert.deepEqual(getAll(3, 8), explode_array([3, 4, 5, 6, 7, 8]));
  });

  it('getEvens', function() {
    assert.deepEqual(getEvens(6, 5), explode_array([]));
    assert.deepEqual(getEvens(5, 5), explode_array([]));
    assert.deepEqual(getEvens(6, 6), explode_array([6]));
    assert.deepEqual(getEvens(1, 5), explode_array([2, 4]));
    assert.deepEqual(getEvens(1, 6), explode_array([2, 4, 6]));
    assert.deepEqual(getEvens(2, 10), explode_array([2, 4, 6, 8, 10]));
  });

  it('getPrimes', function() {
    assert.deepEqual(getPrimes(6, 5), explode_array([]));
    assert.deepEqual(getPrimes(5, 5), explode_array([5]));
    assert.deepEqual(getPrimes(6, 6), explode_array([]));
    assert.deepEqual(getPrimes(1, 5), explode_array([2, 3, 5]));
    assert.deepEqual(getPrimes(1, 7), explode_array([2, 3, 5, 7]));
    assert.deepEqual(getPrimes(3, 15), explode_array([3, 5, 7, 11, 13]));
  });

  it('getFibonacci', function() {
    assert.deepEqual(getFibonacci(6, 5), explode_array([]));
    assert.deepEqual(getFibonacci(5, 5), explode_array([5]));
    assert.deepEqual(getFibonacci(6, 6), explode_array([]));
    assert.deepEqual(getFibonacci(1, 5), explode_array([1, 2, 3, 5]));
    assert.deepEqual(getFibonacci(2, 7), explode_array([2, 3, 5]));
    assert.deepEqual(getFibonacci(3, 15), explode_array([3, 5, 8, 13]));
  });

});