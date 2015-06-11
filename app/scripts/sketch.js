// sketch.js
/*jshint newcap: false */

'use strict';
let p5 = require('p5');
let $ = require('jquery');
let randomInt = require('./randomInt');
let Shape = require('./shape');

let config = {
  canvasWrapper: '.canvas-wrapper',
  numberOfShapes: 40
};

let shapeList = [];

function mySketch(s){

  s.setup = function (){

    // create canvas and put in canvasWrapper
    let $canvasWrapper = $(config.canvasWrapper);
    s.createCanvas(
      $canvasWrapper.innerWidth(),
      $canvasWrapper.innerHeight()
    ).parent($canvasWrapper[0]);

    for (let i=0; i < config.numberOfShapes; i++) {
      let shape = new Shape(randomInt(s.width));
      shape.setSketch(s);
      shapeList.push(shape);
    }

    // Setup modes
    s.colorMode(s.HSB);
    s.noFill();
    s.ellipseMode(s.CORNER);

    //s.background.apply(s,config.color.background);
  };

  s.draw = function() {

    shapeList.map(function(shape) {

      // update stroke color
      shape.moveColorRandom(-5,5);
      s.stroke.apply(s,shape.getColor());


      // if at the bottom, start back at top randomly positioned x
      if (shape.y >= s.height ) {
        shape.move(randomInt(s.width), 0);
        return;
      }

      // move shape away from mouse if getting close
      // otherwise, continue straight down
      if (shape.getDistanceFromMouse() < 150) {
        shape.moveAwayFromMouse(5);
      } else {
        shape.move(0,1);
      }

      //randomly grow or shrink radius
      shape.changeRadius(s.random(-1,1));
      shape.render();
    });
  };

  s.windowResized = function() {
    let $canvasWrapper = $(config.canvasWrapper);

    let w = $canvasWrapper.innerWidth();
    let h = $canvasWrapper.height();

    // put in canvasWrapper
    s.resizeCanvas(w,h-3);

  };
}

function init() {
  return new p5(mySketch);
}

module.exports = {
  init
};