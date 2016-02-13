'use strict';

var _mode = require('./mode');

var _chord = require('./chord');

var _clip = require('./clip');

var _render = require('./render');

exports = module.exports = function () {
  return {
    mode: _mode.mode,
    chord: _chord.chord,
    clip: _clip.clip,
    render: _render.render
  };
}();