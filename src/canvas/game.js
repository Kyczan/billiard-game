import Canvas from './canvas';
import { GAME_WIDTH, GAME_HEIGHT } from '../constants';

const game = new Canvas('game');
game.setDimensions(GAME_WIDTH, GAME_HEIGHT);

export default game;
