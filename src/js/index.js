/**
 * Created by marvin on 17/12/27.
 */

function makeRow (v = 0) {
  const array = new Array(9);
  array.fill(v);
  return array;
}

function makeMatrix (v = 0) {
  // const array = new Array(9);
  // array.fill(makeRow(v));
  // return array;
  return Array.from({ length: 9 }, () => makeRow(v));
}

const a = makeMatrix();
a[0][1] = 2;
console.log(11, a);
