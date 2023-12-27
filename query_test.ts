import * as assert from 'assert';
import { nil, explode_array } from './list';
import { even, prime, fibonacci, not, and, or, parsePrimary,
         parseConjunction, parseDisjunction, parse, tokenize } from './query';


describe('query', function() {

  it('tokenize', function() {
    assert.deepEqual(tokenize(""), []);
    assert.deepEqual(tokenize("abc"), ["abc"]);
    assert.deepEqual(tokenize("   "), []);
    assert.deepEqual(tokenize("("), ["("]);
    assert.deepEqual(tokenize(")"), [")"]);

    assert.deepEqual(tokenize("()"), ["(", ")"]);
    assert.deepEqual(tokenize("abc def"), ["abc", "def"]);
    assert.deepEqual(tokenize("a(bc d)ef"), ["a", "(", "bc", "d", ")", "ef"]);
  });

  it('parsePrimary', function() {
    assert.throws(() => parsePrimary(nil));
    assert.throws(() => parsePrimary(explode_array(["blah"])));
    assert.throws(() => parsePrimary(explode_array(["(", "even"])));

    assert.deepEqual(parsePrimary(explode_array(["even"])), [even, nil]);
    assert.deepEqual(parsePrimary(explode_array(["prime"])), [prime, nil]);
    assert.deepEqual(parsePrimary(explode_array(["fibonacci"])), [fibonacci, nil]);

    assert.deepEqual(parsePrimary(explode_array(["not", "even"])), [not(even), nil]);
    assert.deepEqual(parsePrimary(explode_array(["not", "not", "prime"])),
        [not(not(prime)), nil]);
    assert.deepEqual(parsePrimary(explode_array(["not", "not", "not", "fibonacci"])),
        [not(not(not(fibonacci))), nil]);

    assert.deepEqual(parsePrimary(explode_array(["(", "even", ")"])), [even, nil]);
    assert.deepEqual(parsePrimary(explode_array(["(", "even", "or", "prime", ")"])),
        [or(even, prime), nil]);
  });

  it('parseConjunction', function() {
    assert.throws(() => parseConjunction(nil));
    assert.throws(() => parseConjunction(explode_array(["even", "and", ])));
    assert.throws(() => parseConjunction(explode_array(["even", "and", "even", "and"])));

    assert.deepEqual(parseConjunction(explode_array(["even"])), [even, nil]);
    assert.deepEqual(parseConjunction(explode_array(["even", "and", "prime"])),
        [and(even, prime), nil]);
    assert.deepEqual(parseConjunction(explode_array(
            ["even", "and", "prime", "and", "not", "fibonacci"])),
        [and(even, and(prime, not(fibonacci))), nil]);
  });


  it('parseDisjunction', function() {
    assert.throws(() => parseDisjunction(nil));
    assert.throws(() => parseDisjunction(explode_array(["even", "or", ])));
    assert.throws(() => parseDisjunction(explode_array(["even", "or", "even", "or"])));

    assert.deepEqual(parseDisjunction(explode_array(["even"])), [even, nil]);
    assert.deepEqual(parseDisjunction(explode_array(["even", "or", "prime"])),
        [or(even, prime), nil]);
    assert.deepEqual(parseDisjunction(explode_array(
            ["even", "or", "prime", "or", "not", "fibonacci"])),
        [or(even, or(prime, not(fibonacci))), nil]);
    assert.deepEqual(parseDisjunction(explode_array(
            ["even", "and", "prime", "or", "not", "even", "and", "fibonacci"])),
        [or(and(even, prime), and(not(even), fibonacci)), nil]);
  });

  it('parse', function() {
    assert.throws(() => parse(explode_array(["(", "even", ")", "blah"])));

    assert.deepEqual(parse(explode_array(
            ["even", "and", "prime", "or", "not", "even", "and", "fibonacci"])),
        or(and(even, prime), and(not(even), fibonacci)));
    assert.deepEqual(parse(explode_array(
            ["even", "and", "(", "prime", "or", "not", "even", ")", "and", "fibonacci"])),
        and(even, and(or(prime, not(even)), fibonacci)));
  });
});