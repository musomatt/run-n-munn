import { TILE_SIZE } from './constants.js';
import { Vec2 } from './vec2.js';
import { SpriteLoader } from './sprite.js';
import { Munn as RustMunn } from './pkg/engine.js';

const animationSettings = {
  speed: 15,
  frameSize: new Vec2(100, 100),
};

export class Munn {
  constructor() {
    this.inner = new RustMunn();
    this.loadAnimations();
  }

  loadAnimations() {
    this.animateIdle = new SpriteLoader({
      ...animationSettings,
      totalFrames: 2,
    });

    this.animateRun = new SpriteLoader({
      ...animationSettings,
      speed: 3,
      totalFrames: 7,
    });

    this.animateIdle.load('munn-idle.png');
    this.animateRun.load('munn-runn.png');
  }

  move = (dx, dy) => this.inner.move_by(dx, dy);
  update = (dt) => this.inner.update(dt);
  draw = (ctx) => {
    ctx.fillStyle = '#333';
    ctx.fillRect(
      this.inner.position.x,
      this.inner.position.y,
      TILE_SIZE,
      TILE_SIZE
    );

    this.animateRun.draw(ctx, this.position);
  };
}
