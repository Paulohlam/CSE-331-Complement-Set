import { List, nil, compact_list } from './list';

export type Query =
    | "even"
    | "prime"
    | "fibonacci"
    | {readonly kind: "not", readonly arg: Query}
    | {readonly kind: "or", readonly left: Query, readonly right: Query}
    | {readonly kind: "and", readonly left: Query, readonly right: Query};

export const even: Query = "even";
export const prime: Query = "prime";
export const fibonacci: Query = "fibonacci";

export function not(arg: Query): Query {
  return {kind: "not", arg};
}

export function and(left: Query, right: Query): Query {
  return {kind: "and", left, right};
}

export function or(left: Query, right: Query): Query {
  return {kind: "or", left, right};
}


/**
 * Returns the non-space tokens in the given string, where tokens can be a
 * subsequence of spaces or of letters or the single characters "(" and ")".
 * @param str string to split into tokens
 * @returns the result of splitting words (only) between characters of different
 *     types (space, letter, "(", and ")") and then dropping the space words
 */
export function tokenize(str: string): string[] {
  if (str.length === 0)
    return [];

  let tokens: string[] = [];
  let i = 0;
  let j = 1;

  // Inv: tokens ++ drop-space([str[i .. j-1]]) = tokenize(str[0 .. j-1]),
  //      where drop-space([" "]) := [] and drop-space([w]) := [w] (w != " ").
  while (j !== str.length) {
    if (tokenType(str[j]) === tokenType(str[i])) {
      j = j + 1;  // continue the current token
    } else {
      if (tokenType(str[i]) !== 1)
        tokens.push(str.substring(i, j));  // add token
      i = j;  // start a new token
      j = j + 1;
    }
  }

  if (tokenType(str[i]) !== 1)
    tokens.push(str.substring(i, j));  // add last token

  return tokens;
}

// Determines if the given character is a space, "(", ")", or a letter.
function tokenType(ch: string): number {
  if (ch.trim() === '') {
    return 1;  // space
  } else if (ch === "(") {
    return 2;  // "("
  } else if (ch === ")") {
    return 3;  // ")"
  } else {
    return 4;  // letter
  }
}


/**
 * Turns a string into the query it describes
 * @param text Textual description of the query
 * @returns the tree that matches that text according to the grammar:
 *   query -> disjunction
 *   disjunction -> conjunction | conjunction "or" disjunction
 *   conjunction -> primary | primary "and" conjunction
 *   primary -> "even" | "prime" | "fibonacci" | "not" primary | "(" query ")"
 */
export function parse(words: List<string>): Query {
  const [query, rest] = parseDisjunction(words);
  if (rest === nil) {
    return query;
  } else {
    const extra = compact_list(rest).join(" ");
    throw new Error(`unexpected extra text after query: "${extra}"`)
  }
}

// Parses a disjunction per the grammar rule above. Returns the query and the
// remaining text that was not parsed.
export function parseDisjunction(words: List<string>): [Query, List<string>] {
  if (words === nil) {
    throw new Error(`unexpectedly reached the end of the text (expecting a disjunction)`);
  } else {
    const [left, rest] = parseConjunction(words);
    if (rest !== nil && rest.hd === "or") {
      const [right, after] = parseDisjunction(rest.tl);
      return [or(left, right), after];
    } else {
      return [left, rest];
    }
  }
}

// Parses a conjunction per the grammar rule above. Returns the query and the
// remaining text that was not parsed.
export function parseConjunction(words: List<string>): [Query, List<string>] {
  if (words === nil) {
    throw new Error(`unexpectedly reached the end of the text (expecting a conjunction)`);
  } else {
    const [left, rest] = parsePrimary(words);
    if (rest !== nil && rest.hd === "and") {
      const [right, after] = parseConjunction(rest.tl);
      return [and(left, right), after];
    } else {
      return [left, rest];
    }
  }
}

// Parses a primary per the grammar rule above. Returns the query and the
// remaining text that was not parsed.
export function parsePrimary(words: List<string>): [Query, List<string>] {
  if (words === nil) {
    throw new Error(`unexpectedly reached the end of the text (expecting a conjunction)`);
  } else if (words.hd === "even") {
    return [even, words.tl];
  } else if (words.hd === "prime") {
    return [prime, words.tl];
  } else if (words.hd === "fibonacci") {
    return [fibonacci, words.tl];
  } else if (words.hd === "not") {
    const [arg, rest] = parsePrimary(words.tl);
    return [not(arg), rest];
  } else if (words.hd === "(") {
    const [query, rest] = parseDisjunction(words.tl);
    if (rest === nil) {
      throw new Error(`unexpectedly reached the end of the text (expecting ")")`);
    } else if (rest.hd !== ")") {
      throw new Error(`expecting ")" not "${rest.hd}"`);
    } else {
      return [query, rest.tl];
    }
  } else {
    throw new Error(`unexpectedl word "${words.hd}" (expecting a primary)`);
  }
}