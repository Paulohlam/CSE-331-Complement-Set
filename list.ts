export type List<A> =
    | "nil"
    | {readonly kind: "cons", readonly hd: A, readonly tl: List<A>};

export const nil = "nil";

export function cons<A>(hd: A, tl: List<A>): List<A> {
  return {kind: "cons", hd: hd, tl: tl};
}


/**
 * Returns the length of the given list
 * @param L list whose length should be returned
 * @returns 0 if L === nil else 1 + len(L.tl)
 */
export function len<A>(L: List<A>): number {
  if (L === nil) {
    return 0;
  } else {
    return 1 + len(L.tl);
  }
}

/**
 * Returns the a list consisting of L followed by R.
 * @param L list to go at the front of the result
 * @param R list to go at the end of the result
 * @returns A single list consisting of L's elements followed by R's
 */
export function concat<A>(L: List<A>, R: List<A>): List<A> {
  if (L === nil) {
    return R;
  } else {
    return cons(L.hd, concat(L.tl, R));
  }
}

/**
 * Returns the reverse of the given list.
 * @param L list to revese
 * @returns list containing the same elements but in reverse order
 */
export function rev<A>(L: List<A>): List<A> {
  if (L === nil) {
    return nil;
  } else {
    return concat(rev(L.tl), cons(L.hd, nil));
  }
}

/**
 * Returns the elements of a list, packed into an array.
 * @param L the list to turn into an array
 * @returns array containing the same elements as in L in the same order
 */
export function compact_list<A>(L: List<A>): Array<A> {
  const arr: A[] = [];
  while (L !== nil) {
      arr.push(L.hd);
      L = L.tl;
  }
  return arr;
}

/**
 * Returns the elements in the given array as a list.
 * @param arr the array to turn into a list
 * @returns list containing the same elements as in arr in the same order
 */
export function explode_array<A>(arr: ReadonlyArray<A>): List<A> {
  let L: List<A> = nil;
  for (let i = arr.length - 1; i >= 0; i--) {
      L = cons(arr[i], L);
  }
  return L;
}