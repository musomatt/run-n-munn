import { WIDTH, HEIGHT, BOSS_SIZE } from './constants.js';
import { Vec2 } from './vec2.js';

export class Boss {
  constructor() {
    this.position = new Vec2(WIDTH / 2 - BOSS_SIZE / 2, HEIGHT / 2 - BOSS_SIZE / 2);
    this.health = 100;
  }

  draw = (ctx) => {
    ctx.fillStyle = '#B3A712';
    ctx.fillRect(this.position.x, this.position.y, BOSS_SIZE, BOSS_SIZE);
  };

  takeHit = (value) => {
    this.health -= value;
  };
}
