import { GAME_WIDTH, GAME_HEIGHT } from './constants';

class Animate {
  constructor(ctx) {
    this.ctx = ctx;
  }
  startAnimation = balls => {
    this.draw(balls);
    window.requestAnimationFrame(() => this.startAnimation(balls));
  };

  draw(balls) {
    this.clear();
    balls.forEach(ball => {
      ball.detectWallCollision();
      ball.draw();
      ball.move();
      ball.detectBallCollision(balls);
    });
  }

  clear() {
    this.ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
  }
}

export default Animate;
