import context from './context';
import { POOL_WIDTH, POOL_HEIGHT } from './constants';
import BgImage from '../assets/pool.png';

const ctx = context('pool');

class Background {
  constructor() {
    this.background = new Image();
    this.background.src = BgImage;
  }

  setBackground() {
    this.background.onload = () => {
      ctx.drawImage(this.background, 0, 0, POOL_WIDTH, POOL_HEIGHT);
    };
  }
}

const background = () => new Background().setBackground();

export default background;
