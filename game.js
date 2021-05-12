import { Vec2 } from './vec2.js';

const WIDTH = 1200;
const HEIGHT = 675;
const TILE_SIZE = 25;

class Munn {
  constructor() {
    this.position = new Vec2(0, 0);
    this.velocity = new Vec2(0, 0);
    this.gravity = new Vec2(0, 2);
  }

  update(dt) {}

  draw(ctx) {
    ctx.fillStyle = '#333';
    ctx.fillRect(this.position.x, this.position.y, TILE_SIZE, TILE_SIZE);
  }
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
    requestAnimationFrame(this.loop);
  };
}

const scale = window.devicePixelRatio;
const canvas = document.getElementsByTagName('canvas')[0];
canvas.width = Math.floor(WIDTH * scale);
canvas.height = Math.floor(HEIGHT * scale);

const game = new Game(canvas, scale);
game.init();
