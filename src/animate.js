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
      ball.draw();
      ball.setSpeed((Math.random() - 0.5) * 5, (Math.random() - 0.5) * 5);
      ball.move();
    });
  }

  clear() {
    this.ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
  }
}

export default Animate;
