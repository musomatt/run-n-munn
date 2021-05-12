import { WIDTH, HEIGHT, BOSS_SIZE } from './constants.js';
import { Vec2 } from './vec2.js';

export class Boss {
  constructor() {
    this.position = new Vec2(
      WIDTH / 2 - BOSS_SIZE / 2,
      HEIGHT / 2 - BOSS_SIZE / 2
    );
    this.health = 100;
    this.image = new Image(BOSS_SIZE, BOSS_SIZE);
    this.image.src = './boss.png';
  }

  draw = (ctx) => {
    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      BOSS_SIZE,
      BOSS_SIZE
    );
  };
}
