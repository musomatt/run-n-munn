import { BULLET_SIZE, TILE_SIZE } from './constants.js';
import { Bullet as RustBullet, Vec2 } from './pkg/engine.js';

export class Bullet {
  constructor(munnPosition, direction, colour = '#92EC1D') {
    this.colour = colour;
    this.inner = new RustBullet(
      new Vec2(munnPosition.x, munnPosition.y),
      new Vec2(direction.x, direction.y)
    );
  }

  move = () => this.inner.update();

  draw = (ctx) => {
    ctx.fillStyle = this.colour;
    ctx.fillRect(
      this.inner.position.x,
      this.inner.position.y,
      BULLET_SIZE,
      BULLET_SIZE
    );

    // destroy bullet after 5 seconds to test it works
    setTimeout(() => (this.inner.is_destroyed = true), 5000);
  };
}
