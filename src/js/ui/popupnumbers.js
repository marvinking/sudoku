/**
 * Created by marvin on 17/12/27.
 */

// 处理弹出的操作面板
/**
 * cell -- (click) --> show popup
 * popup -- (click) --> n --> close popup && fill cell
 */

module.exports = class PopupNumbers {
  constructor ($panel) {
    this._$panel = $panel.hide().removeClass('hidden');

    this._$panel.on('click', 'span', e => {
      const $cell = this._$targetCell;
      const $span = $(e.target);

      if ($span.hasClass('mark1')) {
        // 点击mark1，mark2 回填样式
        if ($cell.hasClass('mark1')) {
          $cell.removeClass('mark1');
        } else {
          $cell.removeClass('mark2')
            .addClass('mark1');
        }
      } else if ($span.hasClass('mark2')) {
        // 点击mark1，mark2 回填样式
        if ($cell.hasClass('mark2')) {
          $cell.removeClass('mark2');
        } else {
          $cell.removeClass('mark1')
            .addClass('mark2');
        }
      } else if ($span.hasClass('empty')) {
        // 点击空白，取消数字填写，取消样式
        $cell.text(0)
          .addClass('empty');
      } else {
        // 点击1-9 回填数字
        $cell.removeClass('empty').text($span.text());
      }

      this.hide();
    });
  }

  popup ($cell) {
    this._$targetCell = $cell;
    const { left, top } = $cell.position();

    this._$panel.css({
      left: `${left}px`,
      top: `${top}px`
    }).show();
  }

  hide () {
    this._$panel.hide();
  }
};
