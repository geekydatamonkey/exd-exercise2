'use strict';

module.exports = function randomInt(min,max) {
  // if only one argument, assume min = 0
  if (arguments.length === 1) {
    max = min; // max is really first arg
    min = 0; // min is 0
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;

};