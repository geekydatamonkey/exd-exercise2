'use strict';

class Circle {

  constructor(x = 0, y = 0) {
    this.radius = 10;
    this.x = x;
    this.y = y;
    this.color = [100,255,200,255];
  }

  move(x,y) {
    this.x += x;
    this.y += y;
    return this;
  }

  setColor(array) {
    this.color = array;
    return this;
  }

  setRadius(r = 1) {
    this.radius = r;
    return this;  
  }

}

module.exports = Circle;