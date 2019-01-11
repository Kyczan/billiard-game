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
    this.slowFactor = 0.995;
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
      Math.abs(this.speed.x * this.slowFactor) < 0.05
        ? 0
        : this.speed.x * this.slowFactor,
      Math.abs(this.speed.y * this.slowFactor) < 0.05
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
    const s1 = this.speed;
    const s2 = b.speed;
    const p1 = this.position;
    const p2 = b.position;

    const pDifference = { x: p2.x - p1.x, y: p2.y - p1.y };
    const pDistance = Math.sqrt(
      pDifference.x * pDifference.x + pDifference.y * pDifference.y
    );
    const pNormal = {
      x: pDifference.x / pDistance,
      y: pDifference.y / pDistance
    };

    const sDifference = { x: s2.x - s1.x, y: s2.y - s1.y };
    const sDistance = Math.sqrt(
      sDifference.x * sDifference.x + sDifference.y * sDifference.y
    );
    const sNormal = {
      x: sDifference.x / sDistance,
      y: sDifference.y / sDistance
    };

    const dotProduct = sNormal.x * pNormal.x + sNormal.y * pNormal.y;

    let v1 = [s1.x - sNormal.x * dotProduct, s1.y - sNormal.y * dotProduct];
    let v2 = [s2.x + sNormal.x * dotProduct, s2.y + sNormal.y * dotProduct];

    this.setSpeed(...v1);
    // b.setSpeed(...v2);
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
