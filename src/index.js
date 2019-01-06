import './index.css';
import Pool from '../assets/pool.png';

const ctx = document.getElementById('game').getContext('2d');
const img = new Image();
img.onload = function() {
  ctx.drawImage(img, 0, 0, 1000, 548);
};
img.src = Pool;
