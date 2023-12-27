import * as assert from 'assert';
import { explode_array } from './list';
import { makeBooleanNumberSet} from './number_set';


describe('number_set', function() {

  // TODO (1d): change these tests to use makeBooleanNumberSet and call the
  //            corresponding functions of the object (i.e. .getNumbers())
  // TODO (4b): change getNumbers to take additional params 0, 100

  it('makeBooleanNumberSet', function() {
    assert.deepEqual(makeBooleanNumberSet(explode_array([])).getNumbers(),
        explode_array([]));
    assert.deepEqual(makeBooleanNumberSet(explode_array([1])).getNumbers(),
        explode_array([1]));
    assert.deepEqual(makeBooleanNumberSet(explode_array([50])).getNumbers(),
        explode_array([50]));
    assert.deepEqual(makeBooleanNumberSet(explode_array([100])).getNumbers(),
        explode_array([100]));
    assert.deepEqual(makeBooleanNumberSet(explode_array([1, 2, 3])).getNumbers(),
        explode_array([1, 2, 3]));
    assert.deepEqual(makeBooleanNumberSet(explode_array([1, 2, 49, 50, 99, 100])).getNumbers(),
        explode_array([1, 2, 49, 50, 99, 100]));
  });

  it('addAll', function() {
    const set = makeBooleanNumberSet(explode_array([2, 4, 6, 8]));
    set.addAll(makeBooleanNumberSet(explode_array([])));
    assert.deepEqual(set.getNumbers(), explode_array([2, 4, 6, 8]));

    set.addAll(makeBooleanNumberSet(explode_array([3])));
    assert.deepEqual(set.getNumbers(), explode_array([2, 3, 4, 6, 8]));

    set.addAll(makeBooleanNumberSet(explode_array([5, 9])));
    assert.deepEqual(set.getNumbers(), explode_array([2, 3, 4, 5, 6, 8, 9]));

    set.addAll(makeBooleanNumberSet(explode_array([1, 100])));
    assert.deepEqual(set.getNumbers(), explode_array([1, 2, 3, 4, 5, 6, 8, 9, 100]));
  });

  it('removeAll', function() {
    const set = makeBooleanNumberSet(explode_array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));
    set.removeAll(makeBooleanNumberSet(explode_array([])));
    assert.deepEqual(set.getNumbers(), explode_array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));

    set.removeAll(makeBooleanNumberSet(explode_array([10])));
    assert.deepEqual(set.getNumbers(), explode_array([1, 2, 3, 4, 5, 6, 7, 8, 9]));

    set.removeAll(makeBooleanNumberSet(explode_array([1, 2, 3])));
    assert.deepEqual(set.getNumbers(), explode_array([4, 5, 6, 7, 8, 9]));

    set.removeAll(makeBooleanNumberSet(explode_array([5, 7])));
    assert.deepEqual(set.getNumbers(), explode_array([4, 6, 8, 9]));
  });

  // TODO: Ignore for now, uncomment in part 4b.
  //       - You may have to add some imports upon uncommenting
  // it('complement', function() {
  //   setMaxForTesting(10);

  //   const set0 = makeBooleanNumberSet(explode_array([]));
  //   set0.complement();
  //   assert.deepEqual(set0.getNumbers(1, 100), explode_array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));

  //   const set1 = makeBooleanNumberSet(explode_array([1]));
  //   set1.complement();
  //   assert.deepEqual(set1.getNumbers(1, 100), explode_array([2, 3, 4, 5, 6, 7, 8, 9, 10]));

  //   const set4 = makeBooleanNumberSet(explode_array([2, 4, 6, 8]));
  //   set4.complement();
  //   assert.deepEqual(set4.getNumbers(1, 100), explode_array([1, 3, 5, 7, 9, 10]));

  //   setMaxForTesting(100);
  // });

});
