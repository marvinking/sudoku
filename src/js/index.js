/**
 * Created by marvin on 17/12/27.
 */
// import toolkit from './toolkit';
const toolkit = require('./toolkit');

const a = Array.from({ length: 9 }, (v, i) => i);
console.log(11, a);

console.log(22, toolkit.shuffle(a));
