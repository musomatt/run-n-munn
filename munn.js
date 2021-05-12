import { TILE_SIZE, WIDTH } from './constants.js';
import { Grid, GROUND, SPACE } from './grid.js';
import { isInBounds, randomNumber } from './maths.js';
import { Vec2 } from './vec2.js';
import { SpriteLoader } from './sprite.js';

const animationSettings = {
  speed: 15,
  frameSize: new Vec2(100, 100),
};

export class Munn {
  constructor() {
    this.position = new Vec2(randomNumber(0, WIDTH), 500);
    this.velocity = new Vec2(0, 0);
    this.gravity = new Vec2(0, 200);
    this.isJumping = false;
    this.health = 15;
    this.fillStyle = '#333';
    this.isMoving = false;
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

    if (!isInBounds(tileX, 0, Grid[0].length - 1) || !isInBounds(tileY, 0, Grid.length - 1)) {
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

  approach = (goal, current, dt) => {
    const difference = goal - current;

    if (difference > dt) {
      return difference + dt;
    }

    if (difference < -dt) {
      return different - dt;
    }

    return goal;
  };

  update = (dt) => {
    this.velocity.add(new Vec2(0, this.gravity.y * dt));

    let newPosition = new Vec2(this.position.x + this.velocity.x * dt, this.position.y + this.velocity.y * dt);

    if (!this.canMove(newPosition)) {
      newPosition = this.position;
      this.velocity = new Vec2(0, 0);
      this.isMoving = false;
    } else {
      this.isMoving = true;
    }

    this.position.copy(newPosition);
  };

  draw = (ctx) => {
    ctx.fillStyle = this.fillStyle;
    ctx.fillRect(this.position.x, this.position.y, TILE_SIZE, TILE_SIZE);

    // this.animateIdle.draw(ctx);
    this.animateRun.draw(ctx);
    if (this.isMoving) {
      this.animateRun.draw(ctx, this.position);
    } else {
      this.animateIdle.draw(ctx, this.position);
    }
  };

  takeHit = (value) => {
    this.health -= value;
    this.fillStyle = '#BF40BF';
    setTimeout(() => {
      this.fillStyle = '#333';
    }, 300);
  };
}
