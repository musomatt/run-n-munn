// run: cargo watch -c -s 'wasm-pack build --target web' -i 'pkg' -i '*.js'

#![allow(dead_code)]
#![allow(unused_imports)]
#![allow(unused_macros)]

use std::sync::Arc;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);
}

macro_rules! log {
    ($($t:tt)*) => (log(&format_args!($($t)*).to_string()))
}

const WIDTH: usize = 1200;
const HEIGHT: usize = 675;
const TILE_SIZE: usize = 25;
const NUM_COLS: usize = WIDTH / TILE_SIZE;
const NUM_ROWS: usize = HEIGHT / TILE_SIZE;
const GROUND_ROW: usize = 21;

// lazy_static::lazy_static! {
//     static ref GRID: [[u8; NUM_COLS]; NUM_ROWS] = [[0; NUM_COLS]; NUM_ROWS];
//     static ref MUNN: Arc<Munn> = Arc::new(Munn::default());
// }

#[wasm_bindgen]
#[derive(Default, Clone, Copy)]
pub struct Vec2 {
    pub x: f32,
    pub y: f32,
}

#[wasm_bindgen]
impl Vec2 {
    pub fn is_in_bounds(&self) -> bool {
        self.x >= 0.0 && self.x < NUM_COLS as f32 && self.y >= 0.0 && self.y < NUM_ROWS as f32
    }

    pub fn is_grounded(&self) -> bool {
        self.y == GROUND_ROW as f32
    }

    #[wasm_bindgen(constructor)]
    pub fn new(x: f32, y: f32) -> Self {
        Self { x, y }
    }
}

impl std::ops::AddAssign for Vec2 {
    fn add_assign(&mut self, other: Self) {
        *self = Self {
            x: self.x + other.x,
            y: self.y + other.y,
        };
    }
}

#[wasm_bindgen]
#[derive(Clone, Copy)]
pub struct Munn {
    pub position: Vec2,
    pub velocity: Vec2,
    pub gravity: Vec2,
    pub is_jumping: bool,
}

impl Default for Munn {
    fn default() -> Self {
        Self {
            position: Vec2::default(),
            velocity: Vec2::default(),
            gravity: Vec2 { x: 0.0, y: 200.0 },
            is_jumping: false,
        }
    }
}

#[wasm_bindgen]
impl Munn {
    #[wasm_bindgen(constructor)]
    pub fn new() -> Self {
        Self::default()
    }

    pub fn move_by(&mut self, dx: f32, dy: f32) {
        let position = Vec2 {
            x: self.position.x + dx,
            y: self.position.y + dy,
        };
        if self.can_move_to(&position) {
            self.position.x += dx;
            self.position.y += dy;
        }
    }

    pub fn update(&mut self, dt: f32) {
        self.velocity.x += 0.0;
        self.velocity.y += self.gravity.y * dt;
        let new_position = Vec2 {
            x: self.position.x + self.velocity.x * dt,
            y: self.position.y + self.velocity.y * dt,
        };

        if !self.can_move_to(&new_position) {
            self.velocity = Vec2::default();
        } else {
            self.position = new_position;
        }
    }

    pub fn can_move_to(&self, position: &Vec2) -> bool {
        let tile = Vec2 {
            x: (position.x / TILE_SIZE as f32).floor(),
            y: (position.y / TILE_SIZE as f32).floor(),
        };
        tile.is_in_bounds() && !tile.is_grounded()
    }
}

#[wasm_bindgen]
pub struct Bullet {
    pub position: Vec2,
    pub is_destroyed: bool,
    pub direction: Vec2,
}

#[wasm_bindgen]
impl Bullet {
    pub fn update(&mut self) {
        self.position += self.direction;
        if self.position.is_in_bounds() {
            self.is_destroyed = true
        }
    }

    #[wasm_bindgen(constructor)]
    pub fn new(munn_position: Vec2, direction: Vec2) -> Self {
        Self {
            position: Vec2 {
                x: munn_position.x + TILE_SIZE as f32 / 2.0,
                y: munn_position.y + TILE_SIZE as f32 / 2.0,
            },
            is_destroyed: false,
            direction,
        }
    }
}
