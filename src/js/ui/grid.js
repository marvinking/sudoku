/**
 * Created by marvin on 17/12/27.
 */
const Toolkit = require('../core/toolkit');
const Generator = require('../core/generator');
const Sudoku = require('../core/sudoku');
const Checker = require('../core/checker');

// 生成九宫格
class Grid {
  constructor(container) {
    this._$container = container;
  }

  build () {
    // const gen = new Generator();
    // gen.generator();
    // const matrix = gen.matrix;
    const sudoku = new Sudoku();
    sudoku.make();
    const matrix = sudoku.puzzleMatrix;

    const rowGroupClasses = ['row_g_top', 'row_g_middle', 'row_g_bottom'];
    const colGroupClasses = ['col_g_left', 'col_g_center', 'col_g_right'];

    const $cells = matrix.map(rowValues => rowValues.map((cellValue, colIndex) => {
      return $('<span>')
        .addClass(colGroupClasses[colIndex % 3])
        .addClass(cellValue ? 'filled' : 'empty')
        .text(cellValue);
    }));

    const $divArray = $cells.map(($spanArray, rowIndex) => {
      return $('<div>')
        .addClass('row')
        .addClass(rowGroupClasses[rowIndex % 3])
        .append($spanArray);
    });

    this._$container.append($divArray);
  }

  layout () {
    const width = $('span:first', this._$container).width();
    $('span', this._$container).height(width)
      .css({
        'line-height': `${width}px`,
        'font-size': width < 32 ? `${width / 2}px` : ''
      });
  }

  bindPopup (popupNumbers) {
    this._$container.on('click', 'span', e => {
      const $cell = $(e.target);

      if ($cell.hasClass('filled')) {
        popupNumbers.hide();
        return;
      }

      popupNumbers.popup($cell);
    });
  }

  /**
   * 检查用户解谜的结果，成功则进行提示，失败显示错误位置的标记
   */
  check () {
    const $rows = this._$container.children();
    const data = $rows.map((rowIndex, div) => {
      return $(div).children()
        .map((colIndex, span) => parseInt($(span).text()) || 0);
    })
      .toArray()
      .map($data => $data.toArray());
    const checker = new Checker(data);
    if (checker.check()) {
      return true;
    }

    // 检查不成功，进行错误位置标记
    const marks = checker.matrixMarks;
    this._$container.children()
      .each((rowIndex, div) => {
        $(div).children().each((colIndex, span) => {
          const $span = $(span);

          if ($span.is('.filled') || marks[rowIndex][colIndex]) {
            $span.removeClass('error');
          } else {
            $span.addClass('error');
          }
        })
      })
  }

  /**
   * 重置当前谜盘到初始状态
   */
  reset () {
    this._$container.find('span:not(.filled)')
      .removeClass('error mark1 mark2')
      .addClass('empty')
      .text(0);
  }

  /**
   * 清理错误标记
   */
  clear () {
    this._$container.find('span.error')
      .removeClass('error');
  }

  /**
   * 重新创建新的谜盘
   */
  rebuild () {
    this._$container.empty();
    this.build();
    this.layout();
  }
}

module.exports = Grid;
