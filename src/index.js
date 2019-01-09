import Animate from './animate';
import Background from './background';
import Balls from './balls';
import Canvas from './canvas';
import { GAME_WIDTH, GAME_HEIGHT } from './constants';
import './index.css';

function run() {
  new Background().setBackground();
  new Canvas().setDimensions(GAME_WIDTH, GAME_HEIGHT);
  const balls = new Balls().setBalls();
  new Animate().startAnimation(balls);
}

run();
