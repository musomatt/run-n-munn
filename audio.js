export class Audio {
  constructor() {
    this.backgroundAudioElement = document.createElement('audio');
    this.backgroundAudioElement.src = 'runn-n-munn-bg.mp3';
    this.backgroundAudioElement.volume = 0.1;
  }

  startBackgroundMusic = () => {
    this.backgroundAudioElement.play();
  };

  stopAudio = () => {
    this.backgroundAudioElement.src = '';
  };
}
