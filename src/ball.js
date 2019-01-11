import { BALL_RAD, GAME_WIDTH, GAME_HEIGHT } from './constants';

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
    this.r2 = 4 * BALL_RAD * BALL_RAD;
    this.slowFactor = 0.993;
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
    this.setSpeed(
      Math.abs(this.speed.x * this.slowFactor) < 0.1
        ? 0
        : this.speed.x * this.slowFactor,
      Math.abs(this.speed.y * this.slowFactor) < 0.1
        ? 0
        : this.speed.y * this.slowFactor
    );
  }

  setSpeed(x = 0, y = 0) {
    this.speed.x = x;
    this.speed.y = y;
  }

  detectWallCollision() {
    const { x: px, y: py } = this.position;
    const { x: sx, y: sy } = this.speed;
    if (px - BALL_RAD <= 0 || px + BALL_RAD >= GAME_WIDTH) {
      this.setSpeed(-sx, sy);
    }
    if (py - BALL_RAD <= 0 || py + BALL_RAD >= GAME_HEIGHT) {
      this.setSpeed(sx, -sy);
    }
  }

  calcNewSpeed(b) {
    const friction = 0.87;
    const s1 = this.speed;
    const s2 = b.speed;
    const p1 = this.position;
    const p2 = b.position;
    let power =
      Math.abs(s1.x) + Math.abs(s1.y) + Math.abs(s2.x) + Math.abs(s2.y);
    power = power * 0.00482;

    const opposite = p1.y - p2.y;
    const adjacent = p1.x - p2.x;
    const rotation = Math.atan2(opposite, adjacent);

    const speed2 = {
      x: 90 * Math.cos(rotation + Math.PI) * power,
      y: 90 * Math.sin(rotation + Math.PI) * power
    };
    b.speed.x = (b.speed.x + speed2.x) * friction;
    b.speed.y = (b.speed.y + speed2.y) * friction;

    const speed1 = {
      x: 90 * Math.cos(rotation) * power,
      y: 90 * Math.sin(rotation) * power
    };
    this.speed.x = (this.speed.x + speed1.x) * friction;
    this.speed.y = (this.speed.y + speed1.y) * friction;
  }

  detectBallCollision(balls) {
    // check if length between two centres of balls
    // is less than 2 * radius
    const { x, y } = this.position;
    for (let i = 0; i < balls.length; i++) {
      let b = balls[i];
      if (b === this) continue;
      let { x: bx, y: by } = b.position;
      let xx = x - bx;
      let yy = y - by;
      let d2 = xx * xx + yy * yy;
      if (
        d2 <= this.r2 &&
        (this.speed.x !== 0 ||
          this.speed.y !== 0 ||
          b.speed.x !== 0 ||
          b.speed.y !== 0)
      ) {
        this.calcNewSpeed(b);
      }
    }
  }
}

export default Ball;
