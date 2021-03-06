import { TILE_SIZE, WIDTH, HEIGHT, BULLET_SIZE, MOVEMENT_KEYS, SHOOT_KEYS, BOSS_SIZE, BULLET_DIRECTIONS } from './constants.js';
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
    this.munnBullets = [];
    this.bossBullets = [];
    this.stopBulletCountdown = 5;
    this.initialCountDownForBullets = 60;
    this.access;
  }

  update = (dt) => {
    this.munn.update(dt);
    this.boss.update(dt);
    this.munnBullets.forEach((bullet) => bullet.move());
    this.checkBulletHit(this.boss, this.munnBullets);
    this.checkBulletHit(this.munn, this.bossBullets);
    if (this.stopBulletCountdown === 0) {
      this.fireBossBullet();
      this.stopBulletCountdown = 5;
    } else if (this.initialCountDownForBullets > 0) {
      this.initialCountDownForBullets--;
    } else {
      this.stopBulletCountdown--;
    }
    this.bossBullets.forEach((bullet) => bullet.move());
  };

  render = () => {
    this.ctx.clearRect(0, 0, WIDTH, HEIGHT);
    this.munn.draw(this.ctx);
    if (this.boss.health > 0) {
      this.boss.draw(this.ctx);
    }
    this.munnBullets.forEach((bullet, index, object) => {
      if (bullet.isDestroyed) {
        object.splice(index, 1);
      } else {
        bullet.draw(this.ctx);
      }
    });
    this.bossBullets.forEach((bullet) => bullet.draw(this.ctx));
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

  checkBulletHit = (target, attackingBullets) => {
    const xRange = { from: target.position.x };
    const yRange = { from: target.position.y };
    if (target.hasOwnProperty('isJumping')) {
      xRange.to = target.position.x + TILE_SIZE;
      yRange.to = target.position.y + TILE_SIZE;
    } else {
      xRange.to = target.position.x + BOSS_SIZE;
      yRange.to = target.position.y + BOSS_SIZE;
    }

    attackingBullets.forEach((bullet) => {
      if (bullet.position.x > xRange.from && bullet.position.x < xRange.to && bullet.position.y > yRange.from && bullet.position.y < yRange.to) {
        this.audio.playPickleCollision();
        target.takeHit(3);
        bullet.isDestroyed = true;
      }
    });
  };

  keyToDirection = () => {
    if (this.downKeys?.ArrowLeft) {
      if (this.downKeys?.ArrowRight) {
        return false;
      }
      if (this.downKeys?.ArrowUp) {
        return BULLET_DIRECTIONS.upLeft;
      }
      if (this.downKeys?.ArrowDown) {
        return BULLET_DIRECTIONS.downLeft;
      }
      return BULLET_DIRECTIONS.left;
    }
    if (this.downKeys?.ArrowRight) {
      if (this.downKeys?.ArrowLeft) {
        return false;
      }
      if (this.downKeys?.ArrowUp) {
        return BULLET_DIRECTIONS.upRight;
      }
      if (this.downKeys?.ArrowDown) {
        return BULLET_DIRECTIONS.downRight;
      }
      return BULLET_DIRECTIONS.right;
    }
    if (this.downKeys?.ArrowDown) {
      return BULLET_DIRECTIONS.down;
    }
    if (this.downKeys?.ArrowUp) {
      return BULLET_DIRECTIONS.up;
    }
  };

  fireMunnBullet = () => {
    const bulletDirection = this.keyToDirection();
    if (bulletDirection) {
      this.audio.playCucmberThrow();
      const bullet = new Bullet(this.munn.position.clone(), bulletDirection);
      this.munnBullets.push(bullet);
    }
  };

  fireBossBullet = () => {
    if (this.boss.health < 0) {
      return;
    }
    const directionKeys = Object.keys(BULLET_DIRECTIONS);
    const directionKey = directionKeys[Math.floor(Math.random() * directionKeys.length)];
    const bulletDirection = BULLET_DIRECTIONS[directionKey];
    const bossCentre = new Vec2(this.boss.position.x + BOSS_SIZE / 2, this.boss.position.y + BOSS_SIZE / 2);
    const bullet = new Bullet(bossCentre, bulletDirection, '#ed4351');
    this.bossBullets.push(bullet);
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
      this.fireMunnBullet();
    }
  };

  onMidiAccessSuccess(access) {
    this.midiAccess = access;
    if (access.inputs && access.inputs.size > 0) {
      const inputs = access.inputs.values();
      for (let input = inputs.next(); input && !input.done; input = inputs.next()) {
        const opt = document.createElement('option');
        opt.text = input.value.name;
        document.getElementById('selectMidiDevice').add(opt);
      }
    }

    access.onstatechange = (e) => {
      const midiDropdown = document.getElementById('selectMidiDevice');
      const currentOptions = Array.from(midiDropdown.options).map((option) => option.value);
      if (e.port.state === 'connected' && !currentOptions.includes(e.port.name)) {
        const opt = document.createElement('option');
        opt.text = e.port.name;
        midiDropdown.add(opt);
      }
      if (e.port.state === 'disconnected' && currentOptions.includes(e.port.name)) {
        const disconnectedDeviceIndex = currentOptions.indexOf(e.port.name);
        midiDropdown.remove(disconnectedDeviceIndex);
      }
    };
  }

  onMidiAccessFailure(error) {
    document.getElementById('midiInfo').innerHTML = 'Please use Google Chrome if you would like to use a MIDI device.';
    console.log('Oopsy woopsy', error.code);
  }

  handleMidiMessage(message) {
    const noteOnMidi = 144;
    const noteOffMidi = 128;
    const midiToKey = {
      60: 'a',
      61: 'w',
      62: 's',
      63: 'd',
      64: 'ArrowLeft',
      65: 'ArrowUp',
      66: 'ArrowDown',
      67: 'ArrowRight',
    };
    const arrowKey = midiToKey[message.data[1]];
    if (message.data[0] === noteOnMidi && arrowKey) {
      this.downKeys[arrowKey] = true;
      this.actionKeys();
    } else if (message.data[0] === noteOffMidi && arrowKey) {
      this.downKeys[arrowKey] = false;
    }
  }

  init = () => {
    try {
      navigator.requestMIDIAccess().then((access) => this.onMidiAccessSuccess(access));
    } catch (err) {
      this.onMidiAccessFailure(err);
    }
    document.getElementById('selectMidiDevice').addEventListener('change', () => {
      const selectedDevice = document.getElementById('selectMidiDevice').value;
      const inputs = this.midiAccess.inputs.values();
      const outputs = this.midiAccess.outputs.values();
      for (let output = outputs.next(); output && !output.done; output = outputs.next())
        if (output.value.name === selectedDevice) {
          console.log(output.value);
          output.value.send(new Uint8Array([144, 47, 12]));
          output.value.send(new Uint8Array([144, 48, 12]));
          output.value.send(new Uint8Array([144, 46, 12]));
        }
      for (let input = inputs.next(); input && !input.done; input = inputs.next())
        if (input.value.name === selectedDevice) {
          input.value.onmidimessage = (message) => this.handleMidiMessage(message);
        } else {
          input.value.onmidimessage = '';
        }
    });
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

    this.audio.startBackgroundMusic();

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

  ['start-game', 'pickle'].forEach((id) => (document.getElementById(id).style.display = 'none'));
};
