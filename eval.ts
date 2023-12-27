import { List, nil, cons, explode_array } from './list';
import { Query } from './query';
import {NumberSet, makeBooleanNumberSet} from './number_set';


/**
 * Returns the result of evaluating the given expression.
 * @param query the query in question
 * @min smallest number to consider in the answer
 * @max largest number to consider in the answer
 * @returns eval(query), where eval is defined as follows
 *   - eval(even) = even numbers between min and max
 *   - eval(prime) = prime numbers between min and max
 *   - eval(fibonacci) = fibonacci numbers between min and max
 *   - eval(not Q) = (all numbers between min and max) minus eval(Q)
 *   - eval(Q1 and Q2) = eval(Q1) intersect eval(Q2)
 *   - eval(Q1 or Q2) = eval(Q1) union eval(Q2)
 */
export function evaluate(query: Query, min: number, max: number): NumberSet {
  // TODO (1f, 3g): update to only use NumberSet interface and factory functions
  if (query === "even") {
    return makeBooleanNumberSet(getEvens(min, max));
  } else if (query === "prime") {
    return makeBooleanNumberSet(getPrimes(min, max));
  } else if (query === "fibonacci") {
    return makeBooleanNumberSet(getFibonacci(min, max));
  } else if (query.kind === "not") {
    // TODO (5e): change to use .complement() from NumberSet instead
    return complement(evaluate(query.arg, min, max), min, max);
  } else if (query.kind === "and") {
    // TODO (5e): change to use .complement() from NumberSet instead
    const set = complement(evaluate(query.left, min, max), min, max);
    const notRight = complement(evaluate(query.right, min, max), min, max);
    set.addAll(notRight);             // set = not left or right
    return complement(set, min, max);  // not (not left or right) = left and right
  } else if (query.kind === "or") {
    const set1 = evaluate(query.left, min, max);
    const set2 = evaluate(query.right, min, max);
    set1.addAll(set2);
    return set1;
  } else {
    throw new Error('impossible');
  }
}

// TODO (5e): remove
// Returns all the numbers between min & max and not in set.
function complement(set: NumberSet, min: number, max: number): NumberSet {
  // TODO (1f, 3g): update to only use NumberSet interface and factory functions
  const result = makeBooleanNumberSet(getAll(min, max));
  result.removeAll(set);
  return result;
}

// Returns the list of all numbers between min and max
export function getAll(min: number, max: number): List<number> {
  if (min > max) {
    return nil;
  } else {
    return cons(min, getAll(min + 1, max));
  }
}

// Returns the list of even numbers between min and max
export function getEvens(min: number, max: number): List<number> {
  if (min > max) {
    return nil;
  } else if (min % 2 === 1) {
    return getEvens(min + 1, max);
  } else {
    return cons(min, getEvens(min + 2, max));
  }
}

// Returns the list of fibonacci numbers between min and max
export function getFibonacci(min: number, max: number): List<number> {
  const fibs: number[] = [1, 1];
  // Inv: fibs contains all fibonacci numbers from 1 to fibs[fibs.length-1]
  while (fibs[fibs.length-1] < max) {
    fibs.push(fibs[fibs.length-2] + fibs[fibs.length-1]);
  }

  // Throw away the ones that aren't between min and max. (If min > 1, then
  // we will have many that should not be returned.)
  return explode_array(fibs.slice(1).filter((x) => min <= x && x <= max));
}

// Returns the list of prime numbers between min and max
export function getPrimes(min: number, max: number): List<number> {
  const primes: number[] = [2];
  let n = 2;

  // Inv: primes contains all the primes <= n
  while (n !== max+1) {
    let prime = true;
    // Inv: n is not divisible by any of primes[0 .. j-1].
    for (let j = 0; j < primes.length; j++) {
      if (n % primes[j] === 0)
        prime = false;
    }
    if (prime)
      primes.push(n);
    n = n + 1;
  }

  // Throw away the ones that aren't between min and max. (If min > 2, then
  // we will have many that should not be returned.)
  return explode_array(primes.filter((x) => min <= x && x <= max));
}