export class Audio {
  constructor() {
    this.backgroundAudioElement = document.createElement('audio');
    this.backgroundAudioElement.src = 'runn-n-munn.mp3';
    this.backgroundAudioElement.volume = 0.4;
  }

  startBackgroundMusic = () => {
    this.backgroundAudioElement.play();
  };

  stopAudio = () => {
    this.backgroundAudioElement.src = '';
  };
}
