import * as assert from 'assert';
import { nil, cons, len, concat, rev, compact_list, explode_array } from './list';


describe('list', function() {

  it('len', function() {
    assert.deepEqual(len(nil), 0);
    assert.deepEqual(len(cons(1, nil)), 1);
    assert.deepEqual(len(cons(2, nil)), 1);
    assert.deepEqual(len(cons(1, cons(2, nil))), 2);
    assert.deepEqual(len(cons(1, cons(2, cons(3, nil)))), 3);
  });

  it('concat', function() {
    assert.deepEqual(concat(nil, nil), nil);
    assert.deepEqual(concat(nil, cons(1, nil)), cons(1, nil));
    assert.deepEqual(concat(nil, cons(1, cons(2, nil))), cons(1, cons(2, nil)));

    assert.deepEqual(concat(cons(1, nil), nil), cons(1, nil));
    assert.deepEqual(concat(cons(1, nil), cons(2, nil)), cons(1, cons(2, nil)));
    assert.deepEqual(concat(cons(1, nil), cons(2, cons(3, nil))),
        cons(1, cons(2, cons(3, nil))));

    assert.deepEqual(concat(cons(1, cons(2, nil)), nil), cons(1, cons(2, nil)));
    assert.deepEqual(concat(cons(1, cons(2, nil)), cons(3, nil)),
        cons(1, cons(2, cons(3, nil))));
    assert.deepEqual(concat(cons(1, cons(2, nil)), cons(3, cons(4, nil))),
        cons(1, cons(2, cons(3, cons(4, nil)))));
  });

  it('rev', function() {
    assert.deepEqual(rev(nil), nil);
    assert.deepEqual(rev(cons(1, nil)), cons(1, nil));
    assert.deepEqual(rev(cons(2, nil)), cons(2, nil));
    assert.deepEqual(rev(cons(1, cons(2, nil))), cons(2, cons(1, nil)));
    assert.deepEqual(rev(cons(1, cons(2, cons(3, nil)))),
        cons(3, cons(2, cons(1, nil))));
  });

  it('compact_list', function() {
    assert.deepEqual(compact_list(nil), []);
    assert.deepEqual(compact_list(cons(1, nil)), [1]);
    assert.deepEqual(compact_list(cons(1, cons(2, nil))), [1, 2]);
    assert.deepEqual(compact_list(cons(3, cons(2, cons(1, nil)))), [3, 2, 1]);
  });

  it('explode_array', function() {
    assert.deepEqual(explode_array([]), nil);
    assert.deepEqual(explode_array([1]), cons(1, nil));
    assert.deepEqual(explode_array([1, 2]), cons(1, cons(2, nil)));
    assert.deepEqual(explode_array([1, 2, 3]), cons(1, cons(2, cons(3, nil))));
  });

});