import Ball from './ball';
import { BALL_RAD, GAME_WIDTH, GAME_HEIGHT } from './constants';
import BallWhite from '../assets/ball_white.png';
import BallBlack from '../assets/ball_black.png';
import BallYellow from '../assets/ball_yellow.png';
import BallRed from '../assets/ball_red.png';

class Balls {
  constructor(ctx) {
    this.ctx = ctx;
  }
  generatePositions() {
    // ball radius
    const ball_r = BALL_RAD;

    // starting point for first ball in triangle
    // we want 8 ball to be in the center of right half of pool
    // and lets add some randomness
    const start_x =
      GAME_WIDTH * 0.75 - 2 * ball_r * 1.732 + (Math.random() - 0.5) * 10;
    const start_y = GAME_HEIGHT * 0.5 + (Math.random() - 0.5) * 10;

    const colors = [
      BallYellow,
      BallRed,
      BallYellow,
      BallRed,
      BallBlack,
      BallYellow,
      BallRed,
      BallYellow,
      BallRed,
      BallYellow,
      BallRed,
      BallYellow,
      BallRed,
      BallYellow,
      BallRed
    ];

    const ballsPos = [];
    let k = 0;

    // this is how triangle of balls is generated [i,j]:
    //                         [4,4]
    //                   [3,3] [4,3]
    //             [2,2] [3,2] [4,2]
    //       [1,1] [2,1] [3,1] [4,1]
    // [0,0] [1,0] [2,0] [3,0] [4,0]
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < i + 1; j++) {
        ballsPos.push({
          x: start_x + ball_r * i * 1.732,
          y: start_y + ball_r * i - ball_r * j * 2,
          color: colors[k++]
        });
      }
    }

    // in the end let's add white ball
    // lets add some randomness
    ballsPos.push({
      x: GAME_WIDTH * 0.25 - Math.random() * 10,
      y: start_y + (Math.random() - 0.5) * 5,
      color: BallWhite
    });

    return ballsPos;
  }

  setBalls() {
    const ballPos = this.generatePositions();
    const balls = [];
    ballPos.forEach(b => {
      const ball = new Ball(
        this.ctx,
        { x: b.x, y: b.y },
        { x: 0, y: 0 },
        b.color
      );
      balls.push(ball);
    });
    balls[balls.length - 1].setSpeed(10, 1.5);
    return balls;
  }
}

export default Balls;
