/* tslint:disable */
/* eslint-disable */
/**
*/
export class Bullet {
  free(): void;
/**
*/
  update(): void;
/**
* @param {Vec2} munn_position
* @param {Vec2} direction
*/
  constructor(munn_position: Vec2, direction: Vec2);
/**
* @returns {Vec2}
*/
  direction: Vec2;
/**
* @returns {boolean}
*/
  is_destroyed: boolean;
/**
* @returns {Vec2}
*/
  position: Vec2;
}
/**
*/
export class Munn {
  free(): void;
/**
*/
  constructor();
/**
* @param {number} dx
* @param {number} dy
*/
  move_by(dx: number, dy: number): void;
/**
* @param {number} dt
*/
  update(dt: number): void;
/**
* @param {Vec2} position
* @returns {boolean}
*/
  can_move_to(position: Vec2): boolean;
/**
* @returns {Vec2}
*/
  gravity: Vec2;
/**
* @returns {boolean}
*/
  is_jumping: boolean;
/**
* @returns {Vec2}
*/
  position: Vec2;
/**
* @returns {Vec2}
*/
  velocity: Vec2;
}
/**
*/
export class Vec2 {
  free(): void;
/**
* @returns {boolean}
*/
  is_in_bounds(): boolean;
/**
* @returns {boolean}
*/
  is_grounded(): boolean;
/**
* @param {number} x
* @param {number} y
*/
  constructor(x: number, y: number);
/**
* @returns {number}
*/
  x: number;
/**
* @returns {number}
*/
  y: number;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_vec2_free: (a: number) => void;
  readonly __wbg_get_vec2_x: (a: number) => number;
  readonly __wbg_set_vec2_x: (a: number, b: number) => void;
  readonly __wbg_get_vec2_y: (a: number) => number;
  readonly __wbg_set_vec2_y: (a: number, b: number) => void;
  readonly vec2_is_in_bounds: (a: number) => number;
  readonly vec2_is_grounded: (a: number) => number;
  readonly vec2_new: (a: number, b: number) => number;
  readonly __wbg_munn_free: (a: number) => void;
  readonly __wbg_get_munn_gravity: (a: number) => number;
  readonly __wbg_set_munn_gravity: (a: number, b: number) => void;
  readonly __wbg_get_munn_is_jumping: (a: number) => number;
  readonly __wbg_set_munn_is_jumping: (a: number, b: number) => void;
  readonly munn_new: () => number;
  readonly munn_move_by: (a: number, b: number, c: number) => void;
  readonly munn_update: (a: number, b: number) => void;
  readonly munn_can_move_to: (a: number, b: number) => number;
  readonly __wbg_bullet_free: (a: number) => void;
  readonly __wbg_get_bullet_position: (a: number) => number;
  readonly __wbg_set_bullet_position: (a: number, b: number) => void;
  readonly __wbg_get_bullet_is_destroyed: (a: number) => number;
  readonly __wbg_set_bullet_is_destroyed: (a: number, b: number) => void;
  readonly __wbg_get_bullet_direction: (a: number) => number;
  readonly __wbg_set_bullet_direction: (a: number, b: number) => void;
  readonly bullet_update: (a: number) => void;
  readonly bullet_new: (a: number, b: number) => number;
  readonly __wbg_set_munn_position: (a: number, b: number) => void;
  readonly __wbg_set_munn_velocity: (a: number, b: number) => void;
  readonly __wbg_get_munn_position: (a: number) => number;
  readonly __wbg_get_munn_velocity: (a: number) => number;
}

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {InitInput | Promise<InitInput>} module_or_path
*
* @returns {Promise<InitOutput>}
*/
export default function init (module_or_path?: InitInput | Promise<InitInput>): Promise<InitOutput>;
