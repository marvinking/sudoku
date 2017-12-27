/**
 * Created by marvin on 17/12/27.
 */
const Grid = require('./ui/grid');

const grid = new Grid($('#container'));
grid.build();
grid.layout();
