import Canvas from './canvas';
import { POOL_WIDTH, POOL_HEIGHT } from './constants';
import BgImage from '../assets/pool.png';

class Background {
  constructor() {
    this.background = new Image();
    this.background.src = BgImage;
  }

  setBackground() {
    const canvas = new Canvas('pool');
    const ctx = canvas.getCtx();
    canvas.setDimensions(POOL_WIDTH, POOL_HEIGHT);
    this.background.onload = () => {
      ctx.drawImage(this.background, 0, 0, POOL_WIDTH, POOL_HEIGHT);
    };
  }
}

export default Background;
