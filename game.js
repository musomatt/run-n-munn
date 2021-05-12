import {
  TILE_SIZE,
  WIDTH,
  HEIGHT,
  BULLET_SIZE,
  MOVEMENT_KEYS,
  SHOOT_KEYS,
  BOSS_SIZE,
} from './constants.js';
import { Bullet } from './bullet.js';
import { Munn } from './munn.js';
import { Boss } from './boss.js';
import { Vec2 } from './vec2.js';
import { Audio } from './audio.js';

class Game {
  constructor(canvas, scale) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.ctx.scale(scale, scale);
    this.munn = new Munn();
    this.boss = new Boss();
    this.downKeys = {};
    this.bullets = [];
    this.audio = new Audio();
  }

  update = (dt) => {
    this.munn.update(dt);
    this.bullets.forEach((bullet) => bullet.move());
    this.checkBulletHitBoss();
  };

  render = () => {
    this.ctx.clearRect(0, 0, WIDTH, HEIGHT);
    this.munn.draw(this.ctx);
    if (this.boss.health > 0) {
      this.boss.draw(this.ctx);
    }
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

  checkBulletHitBoss = () => {
    const bossPosition = this.boss.position;
    const xRange = { from: bossPosition.x, to: bossPosition.x + BOSS_SIZE };
    const yRange = { from: bossPosition.y, to: bossPosition.y + BOSS_SIZE };
    this.bullets.forEach((bullet) => {
      if (
        bullet.position.x > xRange.from &&
        bullet.position.x < xRange.to &&
        bullet.position.y > yRange.from &&
        bullet.position.y < yRange.to
      ) {
        this.boss.health -= 3;
        bullet.isDestroyed = true;
        console.log(this.boss.health);
      }
    });
  };

  keyToDirection = () => {
    if (this.downKeys?.ArrowLeft) {
      if (this.downKeys?.ArrowRight) {
        return false;
      }
      if (this.downKeys?.ArrowUp) {
        return new Vec2(-BULLET_SIZE, -BULLET_SIZE);
      }
      if (this.downKeys?.ArrowDown) {
        return new Vec2(-BULLET_SIZE, BULLET_SIZE);
      }
      return new Vec2(-BULLET_SIZE, 0);
    }
    if (this.downKeys?.ArrowRight) {
      if (this.downKeys?.ArrowLeft) {
        return false;
      }
      if (this.downKeys?.ArrowUp) {
        return new Vec2(BULLET_SIZE, -BULLET_SIZE);
      }
      if (this.downKeys?.ArrowDown) {
        return new Vec2(BULLET_SIZE, BULLET_SIZE);
      }
      return new Vec2(BULLET_SIZE, 0);
    }
    if (this.downKeys?.ArrowDown) {
      return new Vec2(0, BULLET_SIZE);
    }
    if (this.downKeys?.ArrowUp) {
      return new Vec2(0, -BULLET_SIZE);
    }
  };

  fireBullet = () => {
    const bulletDirection = this.keyToDirection();
    if (bulletDirection) {
      const bullet = new Bullet(this.munn.position.clone(), bulletDirection);
      this.bullets.push(bullet);
    }
  };

  actionKeys = () => {
    const keys = Object.keys(this.downKeys);
    var activeDownKeys = keys.filter((key) => this.downKeys[key]);
    if (MOVEMENT_KEYS.some((r) => activeDownKeys.includes(r))) {
      if (activeDownKeys.includes('a')) {
        if (activeDownKeys.includes('w')) {
          this.munn.move(-TILE_SIZE, -TILE_SIZE);
        } else {
          this.munn.move(-TILE_SIZE, 0);
        }
      } else if (activeDownKeys.includes('d')) {
        if (activeDownKeys.includes('w')) {
          this.munn.move(TILE_SIZE, -TILE_SIZE);
        } else {
          this.munn.move(TILE_SIZE, 0);
        }
      } else if (activeDownKeys.includes('w')) {
        this.munn.move(0, -TILE_SIZE);
      } else if (activeDownKeys.includes('s')) {
        this.munn.move(0, TILE_SIZE);
      }
    }
    if (SHOOT_KEYS.some((r) => activeDownKeys.includes(r))) {
      this.fireBullet();
    }
  };

  init = () => {
    document.addEventListener('keydown', (event) => {
      event.stopPropagation();
      event.preventDefault();
      const actionKeys = MOVEMENT_KEYS.concat(SHOOT_KEYS);
      if (actionKeys.includes(event.key)) {
        this.downKeys[event.key] = true;
        this.actionKeys();
      }
    });

    document.addEventListener('keyup', (event) => {
      event.stopPropagation();
      event.preventDefault();
      const actionKeys = MOVEMENT_KEYS.concat(SHOOT_KEYS);

      if (actionKeys.includes(event.key)) {
        this.downKeys[event.key] = false;
      }
    });

    // this.audio.startBackgroundMusic();

    requestAnimationFrame(this.loop);
  };
}

window.startGame = () => {
  const scale = window.devicePixelRatio;
  const canvas = document.getElementsByTagName('canvas')[0];
  canvas.width = Math.floor(WIDTH * scale);
  canvas.height = Math.floor(HEIGHT * scale);

  const game = new Game(canvas, scale);
  game.init();

  document.getElementById('start-game').style.display = 'none';
};
