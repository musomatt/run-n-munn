import { BULLET_SIZE } from './constants.js';

export class Bullet {
  constructor(munnPosition) {
    this.position = munnPosition;
    this.direction;
  }

  draw = (ctx) => {
    ctx.fillStyle = '#92EC1D';
    ctx.fillRect(this.position.x, this.position.y, BULLET_SIZE, BULLET_SIZE);
  };
}
