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
    background: [222,50,255,0]
  },
  loopsPerBgChange: 10,
  numberOfCircles: 15,
  shapeFunctions: [
    'ellipse',
    'rect',
    'bezier',
    'triangle',
    'line',
    'curve'
  ]
};

let circleList = [];
let loopNum = 0; // tracking loops per Bg change

function getRandomFunction() {
  let rand = randomInt(0,config.shapeFunctions.length - 1);
  return config.shapeFunctions[rand];
}

function mySketch(s){

  s.setup = function (){

    let $canvasWrapper = $(config.canvasWrapper);

    // put in canvasWrapper
    s.createCanvas(
      $canvasWrapper.innerWidth(),
      $canvasWrapper.innerHeight()
    ).parent($canvasWrapper[0]);


    // Modes
    s.colorMode(s.HSB);
    s.noFill();
    s.ellipseMode(s.CORNER);

    for (let i=0; i < config.numberOfCircles; i++) {
      let c = new Circle(randomInt(s.width));
      c.setRadius(50);
      circleList.push(c);
    }

    s.background.apply(s,config.color.background);
  };

  s.draw = function() {

    if (loopNum === 0) {
      config.color.background[0] = mod(config.color.background[0] + 1, 255);
      s.background.apply(s,config.color.background);
    }
    loopNum = mod(loopNum + 1, config.loopsPerBgChange);

    circleList.map(function(circle) {
      let color = circle.color;

      // if at the bottom, randomly start over from the top
      if (circle.y >= s.height ) {
        console.log('bottom');
        circle.y = 0;
        circle.x = randomInt(s.width);
        return;
      }

      circle.x = mod(circle.x + s.random(0,0), s.width);
      circle.y = circle.y + s.random(0,10);
      circle.radius = Math.max(1,circle.radius + s.random(-1,1));

      let i = randomInt(0,2);
      color[i] = mod(color[i] + randomInt(-5,5), 255);
      //
      color[3] = color[3] - 1 || 255;

      s.stroke(color[0], color[1], color[2]);
      s.strokeWeight(randomInt(1,5));


      let fn = getRandomFunction();

      // randomness just to see what happens
      if (fn === 'ellipse' || fn === 'rect') {
        s[fn](circle.x, circle.y, circle.radius, circle.radius);
      } else {
        s[fn](
          circle.x, 
          circle.y,
          circle.x + randomInt(1,5),
          circle.y + randomInt(1,5),
          circle.x + circle.radius * randomInt(0,1),
          circle.y + circle.radius * randomInt(0,1),
          circle.x + circle.radius * randomInt(0,1),
          circle.y + circle.radius * randomInt(0,1)
        );
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