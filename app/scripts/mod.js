//mod.js
// a better modulo

'use strict';

module.exports = function mod(n,m) {
  return ((n%m)+m)%m;
};