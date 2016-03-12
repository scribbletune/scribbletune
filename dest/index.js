'use strict';

var _mode = require('./mode');

var _mode2 = _interopRequireDefault(_mode);

var _chord = require('./chord');

var _chord2 = _interopRequireDefault(_chord);

var _clip = require('./clip');

var _clip2 = _interopRequireDefault(_clip);

var _pattern = require('./pattern');

var _pattern2 = _interopRequireDefault(_pattern);

var _render = require('./render');

var _render2 = _interopRequireDefault(_render);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Scribbletune = function Scribbletune() {
  this.mode = _mode2.default;
  this.scale = _mode2.default;
  this.chord = _chord2.default;
  this.clip = _clip2.default;
  this.pattern = _pattern2.default;
  this.render = _render2.default;
  this.midi = _render2.default;
};

exports = module.exports = function () {
  return new Scribbletune();
}();