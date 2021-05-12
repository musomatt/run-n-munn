import { Vec2 } from './vec2.js';

export const WIDTH = 1200;
export const HEIGHT = 675;
export const TILE_SIZE = 25;
export const BOSS_SIZE = 150;
export const BULLET_SIZE = 5;
export const SHOOT_KEYS = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'];
export const MOVEMENT_KEYS = ['a', 'd', 'w', 's'];
export const BULLET_DIRECTIONS = {
  upLeft: new Vec2(-BULLET_SIZE, -BULLET_SIZE),
  downLeft: new Vec2(-BULLET_SIZE, BULLET_SIZE),
  left: new Vec2(-BULLET_SIZE, 0),
  upRight: new Vec2(BULLET_SIZE, -BULLET_SIZE),
  downRight: new Vec2(BULLET_SIZE, BULLET_SIZE),
  right: new Vec2(BULLET_SIZE, 0),
  down: new Vec2(0, BULLET_SIZE),
  up: new Vec2(0, -BULLET_SIZE),
};
