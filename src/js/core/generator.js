/**
 * Created by marvin on 17/12/27.
 */
const Toolkit = require('./toolkit');

// 生成数独解决方案
module.exports = class Generator {

  generator () {
    let i = 0;
    while (!this.internalGenerator()) {
      i++;
    }
    console.warn('try again: ', i);
  }

  internalGenerator () {
    this.matrix = Toolkit.matrix.makeMatrix();
    this.orders = Toolkit.matrix.makeMatrix()
      .map(row => row.map((v, i) => i))
      .map(row => Toolkit.matrix.shuffle(row));
    // todo 入口方法
    for (let n = 1; n <= 9; n++) {
      if (!this.fillNumber(n)) return false;
    }

    return true;
  }

  fillNumber (n) {
    return this.fillRow(n, 0);
  }

  fillRow (n, rowIndex) {
    if (rowIndex > 8) return true;

    const row = this.matrix[rowIndex];

    // 随机选择列
    const orders = this.orders[rowIndex];
    for (let i = 0; i < 9; i++) {
      const colIndex = orders[i];

      // 如果这个位置有值，跳过
      if (row[colIndex]) continue;

      // 检查这个位置是否可以填入
      if (!Toolkit.matrix.checkFillable(this.matrix, n, rowIndex, colIndex)) continue;

      row[colIndex] = n;

      // 去下一行填写n，如果填写不成功，就继续寻找当前行下一个位置
      if (!this.fillRow(n, rowIndex + 1)) {
        // 当前位置填写n不成功，当前位置重新设为0
        row[rowIndex] = 0;
        continue;
      }

      return true;
    }

    return false;

    // 当前行填写n成功，递归调用fillRow()来在一行中填写n
    // this.fillRow(n, rowIndex + 1);
  }
};
