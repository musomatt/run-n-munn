import { Grid, GROUND, SPACE } from './grid.js';
import { isInBounds } from './maths.js';
import { Vec2 } from './vec2.js';
import { SpriteLoader } from './sprite.js';

const WIDTH = 1200;
const HEIGHT = 675;
const TILE_SIZE = 25;

class Munn {
  constructor() {
    this.position = new Vec2(0, 0);
    this.velocity = new Vec2(0, 0);
    this.gravity = new Vec2(0, 200);
    this.isJumping = false;

    this.sprite = new SpriteLoader({
      speed: 25,
      frameSize: new Vec2(100, 100),
      totalFrames: 2,
    });
    this.sprite.load('munn-sprite.png');
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
    this.sprite.draw(ctx);
  };
}

class Game {
  constructor(canvas, scale) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.ctx.scale(scale, scale);
    this.munn = new Munn();
  }

  update = (dt) => {
    this.munn.update(dt);
  };

  render = () => {
    this.ctx.clearRect(0, 0, WIDTH, HEIGHT);
    this.munn.draw(this.ctx);
  };

  loop = (last = -1) => {
    const now = Date.now();

    let dt = (now - last) / 1000;

    last = now;

    if (dt > 0.15) {
      dt = 0.15;
    }

    this.update(dt);
    this.render(this.canvas);

    requestAnimationFrame(() => this.loop(last));
  };

  init = () => {
    document.addEventListener('keydown', (event) => {
      event.stopPropagation();
      event.preventDefault();
      switch (event.key) {
        case 'ArrowLeft':
          this.munn.move(-TILE_SIZE, 0);
          break;
        case 'ArrowRight':
          this.munn.move(TILE_SIZE, 0);
          break;
        case 'ArrowUp':
          this.munn.move(0, -TILE_SIZE);
          break;
        case 'ArrowDown':
          this.munn.move(0, TILE_SIZE);
          break;
      }
    });
    requestAnimationFrame(this.loop);
  };
}

const scale = window.devicePixelRatio;
const canvas = document.getElementsByTagName('canvas')[0];
canvas.width = Math.floor(WIDTH * scale);
canvas.height = Math.floor(HEIGHT * scale);

const game = new Game(canvas, scale);
game.init();
