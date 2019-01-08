import Context from './context';
import { BALL_RAD } from './constants';

class Ball {
  constructor(x = 0, y = 0, color = 'white') {
    this.x = x;
    this.y = y;
    this.color = color;
  }
  draw() {
    const ctx = new Context().getCtx();
    const circle = new Path2D();
    circle.arc(this.x, this.y, BALL_RAD, 0, 2 * Math.PI);
    ctx.fillStyle = this.color;
    ctx.fill(circle);
    ctx.strokeStyle = 'black';
    ctx.stroke(circle);
  }
}

export default Ball;
