import { BULLET_SIZE } from './constants.js';
import { Bullets as RustBullets, Vec2 } from './pkg/engine.js';

export class Bullets {
  constructor(colour = '#92EC1D') {
    this.colour = colour;
    this.inner = new RustBullets();
  }

  onCollision = (xRange, yRange, action) =>
    this.inner.on_collision(
      xRange.from,
      xRange.to,
      yRange.from,
      yRange.to,
      action
    );

  push = (position, direction) =>
    this.inner.push(
      new Vec2(position.x, position.y),
      new Vec2(direction.x, direction.y)
    );

  update = () => this.inner.update();

  draw = (ctx) => {
    ctx.fillStyle = this.colour;
    this.inner.for_each((bullet) => {
      ctx.fillRect(
        bullet.position.x,
        bullet.position.y,
        BULLET_SIZE,
        BULLET_SIZE
      );
    });
  };
}
