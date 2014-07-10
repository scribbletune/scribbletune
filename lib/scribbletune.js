var Scribbletune = function() {};

Scribbletune.use = function(fn) {
  fn(this);
  return this;  
};

Scribbletune.use(require('./ext/mode'));
Scribbletune.use(require('./ext/chord'));
Scribbletune.use(require('./ext/pattern'));
Scribbletune.use(require('./ext/generate'));
Scribbletune.use(require('./ext/midi'));


console.log(Scribbletune);

exports = module.exports = Scribbletune;
