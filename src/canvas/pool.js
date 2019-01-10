import Canvas from './canvas';
import { POOL_WIDTH, POOL_HEIGHT } from '../constants';
import BgImage from '../../assets/pool.png';

const background = new Image();
background.src = BgImage;

const pool = new Canvas('pool');
pool.setDimensions(POOL_WIDTH, POOL_HEIGHT);

const ctx = pool.getCtx();
background.onload = () => {
  ctx.drawImage(background, 0, 0, POOL_WIDTH, POOL_HEIGHT);
};

export default pool;
