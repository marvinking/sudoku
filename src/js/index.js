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
