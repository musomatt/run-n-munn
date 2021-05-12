import { TILE_SIZE } from './constants.js';
import { Grid, GROUND, SPACE } from './grid.js';
import { isInBounds } from './maths.js';
import { Vec2 } from './vec2.js';
import { SpriteLoader } from './sprite.js';

const animationSettings = {
  speed: 15,
  frameSize: new Vec2(100, 100),
};

export class Munn {
  constructor() {
    this.position = new Vec2(0, 0);
    this.velocity = new Vec2(0, 0);
    this.gravity = new Vec2(0, 200);
    this.isJumping = false;

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

  canMove = (newPosition) => {
    const tileX = Math.floor(newPosition.x / TILE_SIZE);
    const tileY = Math.floor(newPosition.y / TILE_SIZE);

    if (
      !isInBounds(tileX, 0, Grid[0].length - 1) ||
      !isInBounds(tileY, 0, Grid.length - 1)
    ) {
      return false;
    }

    switch (Grid[tileY][tileX]) {
      case GROUND:
        return false;
      case SPACE:
        return true;
    }
  };

  move = (dx, dy) => {
    const newPosition = this.position.clone().add(new Vec2(dx, dy));
    if (this.canMove(newPosition)) {
      this.position = newPosition;
    }
  };

  update = (dt) => {
    this.velocity.add(new Vec2(0, this.gravity.y * dt));

    let newPosition = new Vec2(
      this.position.x + this.velocity.x * dt,
      this.position.y + this.velocity.y * dt
    );

    if (!this.canMove(newPosition)) {
      newPosition = this.position;
      this.velocity = new Vec2(0, 0);
    }

    this.position.copy(newPosition);
  };

  draw = (ctx) => {
    this.animateRun.draw(ctx, this.position);
  };
}
