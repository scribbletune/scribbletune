'use strict';

var _mode = require('./mode');

var _mode2 = _interopRequireDefault(_mode);

var _chord = require('./chord');

var _chord2 = _interopRequireDefault(_chord);

var _clip = require('./clip');

var _clip2 = _interopRequireDefault(_clip);

var _render = require('./render');

var _render2 = _interopRequireDefault(_render);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports = module.exports = function () {
  return {
    mode: _mode2.default,
    chord: _chord2.default,
    clip: _clip2.default,
    render: _render2.default
  };
}();