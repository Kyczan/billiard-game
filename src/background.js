import Context from './context';
import { POOL_WIDTH, POOL_HEIGHT } from './constants';
import BgImage from '../assets/pool.png';

class Background {
  constructor() {
    this.background = new Image();
    this.background.src = BgImage;
  }

  setBackground() {
    const ctx = new Context('pool').getCtx();
    this.background.onload = () => {
      ctx.drawImage(this.background, 0, 0, POOL_WIDTH, POOL_HEIGHT);
    };
  }
}

export default Background;
