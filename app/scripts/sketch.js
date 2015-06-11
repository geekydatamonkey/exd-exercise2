// sketch.js
/*jshint newcap: false */

'use strict';
let p5 = require('p5');
//let _ = require('lodash');
let $ = require('jquery');
let mod = require('./mod');
let randomInt = require('./randomInt');
let Circle = require('./circle');

let config = {
  canvasWrapper: '.canvas-wrapper',
  color: {
    background: '#eee'
  },
  numberOfCircles: 20
};

let circleList = [];

function mySketch(s){

  s.setup = function (){

    let $canvasWrapper = $(config.canvasWrapper);

    // put in canvasWrapper
    s.createCanvas(
      $canvasWrapper.innerWidth(),
      $canvasWrapper.innerHeight()
    ).parent($canvasWrapper[0]);

    s.background(config.color.background);
    s.colorMode(s.HSB);
    s.noFill();

    for (let i=0; i < config.numberOfCircles; i++) {
      let c = new Circle(randomInt(s.width));
      circleList.push(c);
    }

  };

  s.draw = function() {

    circleList.map(function(circle) {
      let color = circle.color;

      // if at the bottom, randomly start over from the top
      if (circle.y >= s.height) {
        circle.y = 0;
        circle.x = randomInt(s.width);
        return;
      }

      circle.x = mod(circle.x + s.random(0,-0.5), s.width);
      circle.y = mod(circle.y + s.random(0,10), s.height);
      circle.radius = Math.max(1,circle.radius + s.random(-1,1));

      let i = randomInt(0,2);
      color[i] = mod(color[i] + randomInt(-5,5), 255);

      s.stroke(color[0], color[1], color[2]);
      s.strokeWeight(randomInt(1,5));

      let shapes = ['ellipse','rect','bezier'];
      let fn = shapes[randomInt(0,shapes.length - 1)];

      // randomness just to see what happens
      if (fn === 'ellipse' || fn === 'rect') {
        s[fn](circle.x, circle.y, circle.radius, circle.radius);
      } else {
        s[fn](
          circle.x, circle.y,
          randomInt(s.width),randomInt(s.height),
          randomInt(s.width),randomInt(s.height),
          randomInt(s.width),randomInt(s.height)
        )
      }
   
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