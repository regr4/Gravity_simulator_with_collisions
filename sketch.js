let bodies = [];
let dt = 1;
var G = 50;
var flag = true;

function setup() {
  createCanvas(400, 400);
  frameRate(100);
  stroke(0);
  textAlign(CENTER);
  ellipseMode(RADIUS);
  for (i = 0; i < 10; i++) {
    bodies.push(new Body(
      createVector(
        random(-width / 2, width / 2),
        random(-height / 2, height / 2)),
      createVector(
        random(-1, 1),
        random(-1, 1)),
      random(1, 10),
      10));
  }
}

function draw() {
  fill(255);
  background(0);
  let a = bodies.length;
  for (let i = 0; i < a; i++) {
    if (flag) {
      bodies[i].show();
      bodies[i].update();
      for (let j = 0; j < a; j++) {
        if (i != j && flag) {
          bodies[i].attract(bodies[j]);
        }
      }
    }
  }
  flag = true;
}