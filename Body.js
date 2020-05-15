class Body {
  constructor(r, v, m, rad) {
    this.position = r;
    this.velocity = v;
    this.mass = m;
    this.radius = rad; //make equal to m for equal density
    this.acceleration = createVector(0, 0);
  }
  show() {
    push();
    translate(width / 2, height / 2);
    stroke(255);
    fill(255);
    ellipse(this.position.x,
      this.position.y,
      this.radius);
    stroke(0);
    fill(0);
    text(round(this.mass),
      this.position.x,
      this.position.y + textSize() / 2);
    pop();
  }
  attract(body) {
    if (dist(
        this.position.x, this.position.y,
        body.position.x, body.position.y) <
      this.radius + body.radius) {
      this.merge(body);
    } else {
      let d2 = max(sq(dist(this.position.x, this.position.y, body.position.x, body.position.y)), 100);
      let attraction = (-G * this.mass * body.mass / (d2 * this.mass));
      let u = this.position.copy();
      u = u.sub(body.position);
      u.normalize();
      u.mult(attraction);
      this.acceleration = u;
    }
  }
  update() {
    /*let u = this.acceleration;
    this.velocity.add(u.mult(dt));
    u = this.velocity;
    this.position.add(u.mult(dt));*/

    this.velocity.add(p5.Vector.mult(
      this.acceleration, dt));
    this.position.add(p5.Vector.mult(
      this.velocity, dt));

    /*if (this.position.mag() > 500){
      this.position = createVector(0, 0);
    }*/

    if (this.position.x > width / 2 -
      this.radius) {
      this.velocity.x = -abs(this.velocity.x);
    }
    if (this.position.x < -width / 2 +
      this.radius) {
      this.velocity.x =
        abs(this.velocity.x);
    }
    if (this.position.y > height / 2 -
      this.radius) {
      this.velocity.y = -abs(this.velocity.y);
    }
    if (this.position.y < -height / 2 +
      this.radius) {
      this.velocity.y =
        abs(this.velocity.y);
    }
  }
  merge(body) {
    bodies.push(new Body(
      p5.Vector.add(this.position,
        body.position).div(2),
      p5.Vector.add(
        p5.Vector.mult(
          this.velocity, this.mass),
        p5.Vector.mult(
          body.velocity, body.mass)).div(
        this.mass + body.mass),
      this.mass + body.mass,
      sqrt(this.radius ** 2 +
        body.radius ** 2)));
    bodies.splice(bodies.indexOf(this), 1);
    bodies.splice(bodies.indexOf(body), 1);
    flag = false;
    redraw();
  }
}