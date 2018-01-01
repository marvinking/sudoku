/**
 * Created by marvin on 17/12/27.
 */
const Grid = require('./ui/grid');
const generator = require('./core/generator');
const PopupNumbers = require('./ui/popupnumbers');

const grid = new Grid($('#container'));
const popupNumbers = new PopupNumbers($('#popupNumbers'));

grid.build();
grid.layout();

grid.bindPopup(popupNumbers);

$('#check').on('click', e => {
  if (grid.check()) alert('成功');
});

$('#reset').on('click', e => {
  grid.reset();
});

$('#clear').on('click', e => {
  grid.clear();
});

$('#rebuild').on('click', e => {
  let level = $("select").find("option:selected").val();
  grid.rebuild(level);
});

$('select').on('change', () => {
  let level = $("select").find("option:selected").val();
  grid.rebuild(level);
});
