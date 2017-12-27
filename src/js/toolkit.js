/**
 * Created by marvin on 17/12/27.
 */

const matrixToolkit = {
  makeRow (v = 0) {
    const array = new Array(9);
    array.fill(v);
    return array;
  },

  makeMatrix (v = 0) {
    // const array = new Array(9);
    // array.fill(makeRow(v));
    // return array;
    return Array.from({ length: 9 }, () => this.makeRow(v));
  },

  /**
   * Fisher-Yates 洗牌算法
   * @param array
   */
   shuffle (array) {
    const endIndex = array.length - 2;

    for (let i=0; i<=endIndex; i++) {
      const j = i + Math.floor(Math.random() * (array.length - i));
      [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
  }
};

module.exports = matrixToolkit;
