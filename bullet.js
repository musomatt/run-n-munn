import { BULLET_SIZE, TILE_SIZE } from './constants.js';
import { isInBounds } from './maths.js';
import { Grid } from './grid.js';
import { Vec2 } from './vec2.js';

export class Bullet {
  constructor(munnPosition, direction, colour = '#92EC1D') {
    this.position = new Vec2(munnPosition.x + TILE_SIZE / 2, munnPosition.y + TILE_SIZE / 2);
    this.isDestroyed = false;
    this.direction = direction;
    this.colour = colour;
  }

  move = () => {
    this.position = this.position.add(this.direction);
    if (isInBounds(this.position.x, 0, Grid[0].length - 1) || isInBounds(this.position.y, 0, Grid.length - 1)) {
      this.isDestroyed = true;
    }
  };

  draw = (ctx) => {
    ctx.fillStyle = this.colour;
    ctx.fillRect(this.position.x, this.position.y, BULLET_SIZE, BULLET_SIZE);

    // destroy bullet after 5 seconds to test it works
    setTimeout(() => {
      this.isDestroyed = true;
    }, 5000);
  };
}
