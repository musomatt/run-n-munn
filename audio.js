export class Audio {
  constructor() {
    this.backgroundAudioElement = document.createElement('audio');
    this.backgroundAudioElement.src = 'runn-n-munn-bg.mp3';
    this.backgroundAudioElement.volume = 0.4;

    this.pickleCollision = document.createElement('audio');
    this.pickleCollision.src = 'pickleshot.mp3';
    this.pickleCollision.loop = false;
    this.backgroundAudioElement.volume = 0.2;
  }

  startBackgroundMusic = () => {
    this.backgroundAudioElement.play();
  };

  playPickleCollision = () => {
    this.pickleCollision.currentTime = 0;
    this.pickleCollision.play();
  };

  stopAudio = () => {
    this.backgroundAudioElement.src = '';
  };
}
