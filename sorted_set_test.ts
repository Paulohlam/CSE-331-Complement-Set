import * as assert from 'assert';
import { removeAll, addAll, uniquify, makeSortedNumberSet } from './sorted_set';
import { explode_array } from './list';

describe('sorted_set', function() {

  it('removeAll', function() {
    const set = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    removeAll(set, []);
    assert.deepEqual(set, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

    removeAll(set, [10]);
    assert.deepEqual(set, [1, 2, 3, 4, 5, 6, 7, 8, 9]);

    removeAll(set, [1, 2, 3]);
    assert.deepEqual(set, [4, 5, 6, 7, 8, 9]);

    removeAll(set, [5, 7]);
    assert.deepEqual(set, [4, 6, 8, 9]);
  });

  it('addAll', function() {
    const set = [1, 3, 5, 8];
    addAll(set, []);
    assert.deepEqual(set, [1, 3, 5, 8]);

    addAll(set, [10]);
    assert.deepEqual(set, [1, 3, 5, 8, 10]);

    addAll(set, [1, 2, 3]);
    assert.deepEqual(set, [1, 2, 3, 5, 8, 10]);

    addAll(set, [5, 7]);
    assert.deepEqual(set, [1, 2, 3, 5, 7, 8, 10]);
  });

  it('uniquify', function() {
    const set1: number[] = [];
    uniquify(set1);
    assert.deepEqual(set1, []);

    const set2: number[] = [1];
    uniquify(set2);
    assert.deepEqual(set2, [1]);

    const set3: number[] = [1, 2];
    uniquify(set3);
    assert.deepEqual(set3, [1, 2]);

    const set4: number[] = [1, 1];
    uniquify(set4);
    assert.deepEqual(set4, [1]);

    const set5: number[] = [1, 1, 1];
    uniquify(set5);
    assert.deepEqual(set5, [1]);

    const set6: number[] = [1, 2, 2];
    uniquify(set6);
    assert.deepEqual(set6, [1, 2]);

    const set7: number[] = [1, 2, 3];
    uniquify(set7);
    assert.deepEqual(set7, [1, 2, 3]);

    const set8: number[] = [1, 1, 2, 4, 4, 4, 5, 5, 7, 7, 8, 9, 10, 10, 10];
    uniquify(set8);
    assert.deepEqual(set8, [1, 2, 4, 5, 7, 8, 9, 10]);
  });

  // ----- NOTE: you may have to add imports to get these test to pass

  // ----- TODO (3d): - uncomment the tests for makeSortedNumberSet
   it('makeSortedNumberSet', function() {
     // TODO (4e): pass (1, 10) as the arguments to all calls to getNumbers
     assert.deepEqual(makeSortedNumberSet(explode_array([])).getNumbers(),
         explode_array([]));
     assert.deepEqual(makeSortedNumberSet(explode_array([1])).getNumbers(),
         explode_array([1]));
     assert.deepEqual(makeSortedNumberSet(explode_array([1, 2, 3])).getNumbers(),
         explode_array([1, 2, 3]));
     assert.deepEqual(makeSortedNumberSet(explode_array([3, 2, 1])).getNumbers(),
         explode_array([1, 2, 3]));
     assert.deepEqual(makeSortedNumberSet(explode_array([1, 1, 2, 2, 3, 3])).getNumbers(),
         explode_array([1, 2, 3]));
     assert.deepEqual(
         makeSortedNumberSet(explode_array([1, 2, 2, 49, 50, 50, 99, 100])).getNumbers(),
         explode_array([1, 2, 49, 50, 99, 100]));
   });

  // ----- TODO (4f): - uncomment the tests for complement
   it('complement', function() {
     const set0 = makeSortedNumberSet(explode_array([]));
     set0.complement();
     assert.deepEqual(set0.getNumbers(1, 10), explode_array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));

     const set1 = makeSortedNumberSet(explode_array([1]));
     set1.complement();
     assert.deepEqual(set1.getNumbers(1, 10), explode_array([2, 3, 4, 5, 6, 7, 8, 9, 10]));

     const set4 = makeSortedNumberSet(explode_array([2, 4, 6, 8]));
     set4.complement();
     assert.deepEqual(set4.getNumbers(1, 10), explode_array([1, 3, 5, 7, 9, 10]));
   });

  // ----- TODO (5b): - uncomment the tests for removeAll - infinite sets
   it('removeAll - infinite', function() {
     const set = makeSortedNumberSet(explode_array([3, 4, 5, 6]));

     const set1 = makeSortedNumberSet(explode_array([1, 2, 3, 4]));
     set1.removeAll(set);
     assert.deepEqual(set1.getNumbers(1, 10), explode_array([1, 2]));

     const set2 = makeSortedNumberSet(explode_array([1, 2, 3, 4]));
     set2.complement();
     set2.removeAll(set);
     assert.deepEqual(set2.getNumbers(1, 10), explode_array([7, 8, 9, 10]));

     set.complement();

     const set3 = makeSortedNumberSet(explode_array([1, 2, 3, 4]));
     set3.removeAll(set);
     assert.deepEqual(set3.getNumbers(1, 10), explode_array([3, 4]));

     const set4 = makeSortedNumberSet(explode_array([1, 2, 3, 4]));
     set4.complement();
     set4.removeAll(set);
     assert.deepEqual(set4.getNumbers(1, 10), explode_array([5, 6]));
   });

  // ----- TODO (5d): - uncomment the tests for removeAll - infinite sets
   it('addAll - infinite', function() {
     const set = makeSortedNumberSet(explode_array([3, 4, 5, 6]));

     const set1 = makeSortedNumberSet(explode_array([1, 2, 3, 4]));
     set1.addAll(set);
     assert.deepEqual(set1.getNumbers(1, 10), explode_array([1, 2, 3, 4, 5, 6]));

     const set2 = makeSortedNumberSet(explode_array([1, 2, 3, 4]));
     set2.complement();
     set2.addAll(set);
     assert.deepEqual(set2.getNumbers(1, 10), explode_array([3, 4, 5, 6, 7, 8, 9, 10]));

     set.complement();

     const set3 = makeSortedNumberSet(explode_array([1, 2, 3, 4]));
     set3.addAll(set);
     assert.deepEqual(set3.getNumbers(1, 10), explode_array([1, 2, 3, 4, 7, 8, 9, 10]));

     const set4 = makeSortedNumberSet(explode_array([1, 2, 3, 4]));
     set4.complement();
     set4.addAll(set);
     assert.deepEqual(set4.getNumbers(1, 10), explode_array([1, 2, 5, 6, 7, 8, 9, 10]));
   });

});
