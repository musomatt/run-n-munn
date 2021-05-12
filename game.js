import { TILE_SIZE, WIDTH, HEIGHT, BULLET_SIZE } from './constants.js';
import { Bullet } from './bullet.js';
import { Munn } from './munn.js';
import { Boss } from './boss.js';
import { Vec2 } from './vec2.js';

class Game {
  constructor(canvas, scale) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.ctx.scale(scale, scale);
    this.munn = new Munn();
    this.boss = new Boss();
    this.downKeys = {};
    this.bullets = [];
  }

  update = (dt) => {
    this.munn.update(dt);
    this.bullets.forEach((bullet) => bullet.move());
  };

  render = () => {
    this.ctx.clearRect(0, 0, WIDTH, HEIGHT);
    this.munn.draw(this.ctx);
    this.boss.draw(this.ctx);
    this.bullets.forEach((bullet, index, object) => {
      if (bullet.isDestroyed) {
        object.splice(index, 1);
      } else {
        bullet.draw(this.ctx);
      }
    });
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

  keyToDirection = () => {
    if (this.downKeys?.ArrowLeft) {
      return new Vec2(-BULLET_SIZE, 0);
    }
    if (this.downKeys?.ArrowRight) {
      return new Vec2(BULLET_SIZE, 0);
    }
  };

  init = () => {
    document.addEventListener('keydown', (event) => {
      event.stopPropagation();
      event.preventDefault();
      switch (event.key) {
        case 'ArrowLeft':
          this.downKeys.ArrowLeft = true;
          break;
        case 'ArrowRight':
          this.downKeys.ArrowRight = true;

          const bullet = new Bullet(this.munn.position.clone(), this.keyToDirection());
          this.bullets.push(bullet);
          break;
        case 'ArrowUp':
          this.downKeys.ArrowUp = true;
          break;
        case 'ArrowDown':
          this.downKeys.ArrowDown = true;
          break;
        case 'a':
          this.munn.move(-TILE_SIZE, 0);
          break;
        case 'd':
          this.munn.move(TILE_SIZE, 0);
          break;
        case 'w':
          this.munn.move(0, -TILE_SIZE);
          break;
        case 's':
          this.munn.move(0, TILE_SIZE);
          break;
      }
    });
    document.addEventListener('keyup', (event) => {
      event.stopPropagation();
      event.preventDefault();
      switch (event.key) {
        case 'ArrowLeft':
          this.downKeys.ArrowLeft = false;
          break;
        case 'ArrowRight':
          this.downKeys.ArrowRight = false;
          break;
        case 'ArrowUp':
          this.downKeys.ArrowUp = false;
          break;
        case 'ArrowDown':
          this.downKeys.ArrowDown = false;
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
