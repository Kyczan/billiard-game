import { BALL_RAD, GAME_WIDTH, GAME_HEIGHT } from './constants';

class Ball {
  constructor(ctx, position = { x: 0, y: 0 }, speed = { x: 0, y: 0 }, color) {
    this.ctx = ctx;
    this.position = position;
    this.speed = speed;
    this.color = color;
  }

  draw() {
    const img = new Image();
    img.src = this.color;
    this.ctx.drawImage(
      img,
      this.position.x - BALL_RAD - 5,
      this.position.y - BALL_RAD - 5,
      BALL_RAD * 2 + 10,
      BALL_RAD * 2 + 10
    );
  }

  move() {
    const slowFactor = 0.993;
    this.position.x += this.speed.x;
    this.position.y += this.speed.y;
    this.setSpeed(
      Math.abs(this.speed.x * slowFactor) < 0.1 ? 0 : this.speed.x * slowFactor,
      Math.abs(this.speed.y * slowFactor) < 0.1 ? 0 : this.speed.y * slowFactor
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
    // Warning!
    // Hardcore math included!
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
    const r2 = 4 * BALL_RAD * BALL_RAD;
    for (let i = 0; i < balls.length; i++) {
      let b = balls[i];
      if (b === this) continue;
      let { x: bx, y: by } = b.position;
      let xx = x - bx;
      let yy = y - by;
      let d2 = xx * xx + yy * yy;
      if (
        d2 <= r2 &&
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
