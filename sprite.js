import { Vec2 } from './vec2.js';

export class SpriteLoader {
  constructor(options) {
    // properties for loading the spritesheet
    this.image = null;

    // set the total number of frames in the sprite sheet
    this.totalFrames = options.totalFrames || 0;

    // the current frame we're on
    this.currentFrame = 0;

    // number of frames before switching to the next frame
    this.speed = options.speed || 50;

    // number of frames elapsed
    this.df = 0;

    // the size of a frame in the sprite sheet
    this.frameSize = options.frameSize || new Vec2(0, 0);
  }

  load(location) {
    this.image = new Image(
      this.frameSize.x * this.totalFrames,
      this.frameSize.y
    );

    this.image.src = location;
  }

  draw(ctx) {
    if (this.df === this.speed) {
      const nextFrame = this.currentFrame + 1;
      this.currentFrame = nextFrame < this.totalFrames ? nextFrame : 0;
      this.df = 0;
    }

    ctx.drawImage(
      this.image,
      this.currentFrame * this.frameSize.x,
      0,
      this.frameSize.x,
      this.frameSize.y,
      0,
      0,
      this.frameSize.x,
      this.frameSize.y
    );

    this.df++;
  }
}
