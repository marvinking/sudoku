/**
 * Created by marvin on 17/12/27.
 */

// 生成数独游戏
// 1.生成完成的解决方案：Generator
// 2.随机去除部分数据：按比例

const Generator = require('./generator');

module.exports = class Suduku {
  constructor () {
    //生成完整的解决方案
    const generator = new Generator();
    generator.generator();
    this.solutionMatrix = generator.matrix;
  }

  make (level) {
    level = !level ? 5 : level;
    // const shouldRid = Math.random() * 9 < level;
    // 生成迷盘
    // 随机去掉部分数据
    this.puzzleMatrix = this.solutionMatrix.map(row => {
      return row.map(cell => Math.random() * 9 < level ? 0 : cell);
    });
  }
};
