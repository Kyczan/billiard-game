import { BALL_RAD } from './constants';

class Ball {
  constructor(
    ctx,
    position = { x: 0, y: 0 },
    speed = { x: 0, y: 0 },
    color = 'white'
  ) {
    this.ctx = ctx;
    this.position = position;
    this.speed = speed;
    this.color = color;
  }

  draw() {
    const circle = new Path2D();
    circle.arc(this.position.x, this.position.y, BALL_RAD, 0, 2 * Math.PI);
    this.ctx.fillStyle = this.color;
    this.ctx.fill(circle);
    this.ctx.strokeStyle = 'black';
    this.ctx.stroke(circle);
  }

  move() {
    this.position.x += this.speed.x;
    this.position.y += this.speed.y;
  }

  setSpeed(x = 0, y = 0) {
    this.speed.x = x;
    this.speed.y = y;
  }
}

export default Ball;
