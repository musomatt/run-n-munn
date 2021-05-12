import { WIDTH, HEIGHT, BOSS_SIZE } from './constants.js';
import { Vec2 } from './vec2.js';
import { randomNumber } from './maths.js';

export class Boss {
  constructor() {
    this.defaultPosition = new Vec2(
      WIDTH / 2 - BOSS_SIZE / 2,
      HEIGHT / 2 - BOSS_SIZE / 2
    );
    this.health = 100;
    this.image = new Image(BOSS_SIZE, BOSS_SIZE);
    this.image.src = './boss.png';
    this.shakeCounter = 0;
    this.shakeFrames = 10;
  }

  getShake = () => {
    const newX = randomNumber(-3, 3);
    const newY = randomNumber(-3, 3);
    return new Vec2(newX, newY);
  };

  update = (dt) => {
    this.position = this.defaultPosition.clone();

    if (this.shakeCounter === this.shakeFrames) {
      this.position.add(this.getShake());
      this.shakeCounter = 0;
    }

    this.shakeCounter++;
  };

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
