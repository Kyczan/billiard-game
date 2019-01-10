import Animate from './animate';
import Balls from './balls';
import game from './canvas/game';
import './canvas/pool';
import './index.css';

function run() {
  const ctx = game.getCtx();
  const balls = new Balls(ctx).setBalls();
  new Animate(ctx).startAnimation(balls);
}

run();
