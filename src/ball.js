import Canvas from './canvas';
import { BALL_RAD } from './constants';

class Ball {
  constructor(
    position = { x: 0, y: 0 },
    speed = { x: 0, y: 0 },
    color = 'white'
  ) {
    this.position = position;
    this.speed = speed;
    this.color = color;
  }

  draw() {
    const ctx = new Canvas().getCtx();
    const circle = new Path2D();
    circle.arc(this.position.x, this.position.y, BALL_RAD, 0, 2 * Math.PI);
    ctx.fillStyle = this.color;
    ctx.fill(circle);
    ctx.strokeStyle = 'black';
    ctx.stroke(circle);
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
