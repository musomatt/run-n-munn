export class Audio {
  constructor() {
    this.backgroundAudioElement = document.createElement('audio');
    this.backgroundAudioElement.src = 'runn-n-munn-bg.mp3';
    this.backgroundAudioElement.volume = 0.3;

    this.pickleCollision = document.createElement('audio');
    this.pickleCollision.src = 'pickleshot.mp3';
    this.pickleCollision.loop = false;
    this.pickleCollision.volume = 0.2;

    this.cucumberThrow = document.createElement('audio');
    this.cucumberThrow.src = 'cucumberthrow.mp3';
    this.cucumberThrow.loop = false;
    this.cucumberThrow.volume = 0.1;
  }

  startBackgroundMusic = () => {
    this.backgroundAudioElement.play();
  };

  playPickleCollision = () => {
    this.pickleCollision.currentTime = 0;
    this.pickleCollision.play();
  };

  playCucmberThrow = () => {
    this.cucumberThrow.currentTime = 0;
    this.cucumberThrow.play();
  };

  stopAudio = () => {
    this.backgroundAudioElement.src = '';
  };
}
