'use strict';
const _ = require('lodash');
const randomInt = require('./randomInt');
const mod = require('./mod');

class Shape {

  constructor(x = 0, y = 0) {
    this.radius = 1;
    this.x = x;
    this.y = y;
    this.color = [100,255,200,50];
    this.minRadius = 0;

    // randomly assign drawing function
    this.drawFunction = _.sample([
        'ellipse',
        'rect',
        'triangle'
    ]);
    this.sketch = null;
    this.handlers = {};
  }

  setSketch(sketch) {
    this.sketch = sketch;
    return this;
  }

  getDistanceFromMouse() {
    let dx = this.sketch.mouseX - this.x;
    let dy = this.sketch.mouseY - this.y;
    return Math.sqrt(dx*dx + dy*dy);
  }

  move(x,y) {
    if (this.y + y >= this.sketch.height) {
      this.onBottomEdge();
    }
    this.x = mod(this.x + x, this.sketch.width);
    this.y = mod(this.y + y, this.sketch.height);
    return this;
  }

  moveAwayFromMouse(numOfSteps) {
    // which direction is away?
    let away = {
      x: Math.sign(this.x - this.sketch.mouseX),
      y: Math.sign(this.y - this.sketch.mouseY)
    };

    this.move(away.x*numOfSteps, away.y*numOfSteps);

  }

  onBottomEdge(fn) {
    if (arguments.length === 1) {
      // register function
      this.handlers.bottom = fn;
      return;
    }

    return this.handlers.bottom(this);
  }

  /**
  * adds a random amount (between min and max inclusive)
  * to a random color attribute
  **/
  moveColorRandom(min,max) {
    let i = randomInt(0,this.color.length - 1);
    this.color[i] = mod(this.color[i] + randomInt(min,max), 255);
  }

  setDrawFunction(fnName) {
    this.shapeFunction = fnName;
  }

  getDrawFunction() {
    return this.shapeFunction;
  }

  setColor(array) {
    this.color = array;
    return this;
  }

  getColor() {
    return this.color;
  }

  setRadius(r = 1) {
    if (r <= this.minRadius) {
      this.radius = this.minRadius;
      return this;
    }

    this.radius = r;
    return this;  
  }

  getRadius() {
    return this.radius;
  }

  changeRadius(amount) {
    this.setRadius(this.getRadius() + amount);
  }

  render() {
    let fn = this.drawFunction;
    if (fn === 'ellipse') {
      this._renderEllipse();
      return;
    }
    if (fn === 'rect') {
      this._renderRect();
      return;
    }
    if (fn === 'triangle') {
      this._renderTriangle();
      return;
    }

  }

  _renderEllipse() {
    this.sketch[this.drawFunction](
      this.x, 
      this.y, 
      this.radius,
      this.radius
    );
  }

  _renderRect() {
    this._renderEllipse();
  }

  _renderTriangle() {
    this.sketch[this.drawFunction](
          this.x, 
          this.y,
          this.x + this.radius,
          this.y + this.radius,
          this.x + this.radius,
          this.y - this.radius
    );
  }

}

module.exports = Shape;