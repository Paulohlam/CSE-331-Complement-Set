import { List, nil, cons } from './list';

/** Maximum number that can be represented in a set. */
export let MAX: number = 100;

// Change the value of max in some tests (to keep the size reasonable)
export function setMaxForTesting(max: number) {
  if (max < 1 || Math.round(max) !== max)
    throw new Error(`invalid positive integer ${max}`);
  MAX = max;
}

/**
 * Set of numbers represented by boolean.
 */
export interface NumberSet {
  /**
   * Updates obj so it does not include numbers from set 2.
   *
   * @param set2 is a set of elements that need to be removed
   * @modifies obj
   * @effect obj[x] = true iff obj_0[x] = true AND set2[x] = false
   */
  removeAll(set2: NumberSet): void;

  /**
   * Updates obj to include all the numbers listed in set2.
   *
   * @param set2 is a set of elements to add to set1
   * @modifies set1
   * @result obj[x] = true iff obj_0[x] = true OR set2[x] = true
   */
  addAll(set2: NumberSet): void;

  /**
   * Returns a list of all the numbers present in this set.
   *
   * @param a is lower bound
   * @param b is upper bound
   * @returns A List of numbers present in this set.
   */
  getNumbers(a: number, b: number): List<number>;
  /**
   * Updates the set to include the numbers that weren't passed in (not in og set)
   *
   * @modifies obj
   * @effects obj[x] = not obj_0[x]
   */
  complement(): void;
}

class BooleanNumberSet implements NumberSet {
  // AF:Obj = this.set
  private set: boolean[];
  // Consturcutor: Makes a boolean[] using the given set
  constructor(set: boolean[]) {
    this.set =set;
  }
    removeAll(set2: NumberSet): void {
      for (let i = 1; i <= MAX; i++) {
        if ((set2 as BooleanNumberSet).set[i] === true)
          this.set[i] = false;
      }
    }

    addAll(set2: NumberSet): void {
      for (let i = 1; i <= MAX; i++) {
        if ((set2 as BooleanNumberSet).set[i] === true)
          this.set[i] = true;
      }
    }

    /**
     * Returns a list of the numbers present in the given set
     *
     * @param set the set in question
     * @return a list L such that x is in L iff set[x] = tue
     */
    getNumbers(_: number, __: number): List<number> {
      let vals: List<number> = nil;
      for (let i = MAX; i >= 1; i--) {  // make it sorted, just for fun
        if (this.set[i] === true)
          vals = cons(i, vals);
      }
      return vals;
    }
    complement(): void {
      complement(this.set);
    }
  }

/**
 * Returns the given list of numbers in a number set
 *
 * @param vals is a list of numbers to be in the set
 * @requires every x in vals to be 1 <= x <= 100
 * @returns a set S that S[x-1] === true if x is in vals
 */
export function makeBooleanNumberSet(vals: List<number>): NumberSet {
  const set = new Array(MAX+1);
  for (let i = 0; i <= MAX; i++) {
    set[i] = false;
  }

  // INV: Set must equal the numbers skipped over
  while (vals !== nil) {
    if (vals.hd < 1 || MAX < vals.hd) {
      throw new Error(`unsupported number ${vals.hd} (must be 1-${MAX})`);
    }
    set[vals.hd] = true;
    vals = vals.tl;
  }

  return new BooleanNumberSet(set);
}
/**
 * Updates set to have the opposite set of numbers: all the numbers (between 1
 * and 100) that were not in the set passed in.
 *
 * @param set Set to complement
 * @modifies set
 * @effects set[x] = not set_0[x]
 */
export function complement(set: boolean[]): void {
  for (let i = 1; i <= MAX; i++) {
    set[i] = !set[i];
  }
}
