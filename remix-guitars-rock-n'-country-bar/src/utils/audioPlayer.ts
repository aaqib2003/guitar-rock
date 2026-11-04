// Web Audio API Synthesizer for Guitars Bar Jukebox Preview
class RiffSynthesizer {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private intervalId: number | null = null;
  private currentStep: number = 0;
  private masterGain: GainNode | null = null;
  private volume: number = 0.6;

  private initContext() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.volume, this.ctx.currentTime, 0.05);
    }
  }

  public getVolume(): number {
    return this.volume;
  }

  public playTrack(notes: number[], bpm: number, genre: string, onStep?: (step: number) => void) {
    this.stop();
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    this.isPlaying = true;
    this.currentStep = 0;
    const stepDurationMs = (60 / bpm / 2) * 1000;

    const playTone = () => {
      if (!this.isPlaying || !this.ctx || !this.masterGain) return;

      const freq = notes[this.currentStep % notes.length];
      const now = this.ctx.currentTime;

      // 1. Primary string oscillator
      const osc = this.ctx.createOscillator();
      const noteGain = this.ctx.createGain();

      // Rock & blues have sawtooth / distortion tone; country has triangle / bright tone
      osc.type = genre.includes('Rock') || genre.includes('Blues') ? 'sawtooth' : 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      // Lowpass filter to mimic vintage amplifier cabinet
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(genre.includes('Rock') ? 1400 : 2200, now);
      filter.Q.setValueAtTime(3, now);

      // Attack and pluck decay envelope
      noteGain.gain.setValueAtTime(0.001, now);
      noteGain.gain.exponentialRampToValueAtTime(0.35, now + 0.03);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, now + (stepDurationMs / 1000) * 1.8);

      osc.connect(filter);
      filter.connect(noteGain);
      noteGain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + (stepDurationMs / 1000) * 2);

      // 2. Subtle harmonic octave for rich electric guitar body
      const subOsc = this.ctx.createOscillator();
      const subGain = this.ctx.createGain();
      subOsc.type = 'sine';
      subOsc.frequency.setValueAtTime(freq / 2, now);
      subGain.gain.setValueAtTime(0.001, now);
      subGain.gain.exponentialRampToValueAtTime(0.15, now + 0.02);
      subGain.gain.exponentialRampToValueAtTime(0.0001, now + (stepDurationMs / 1000) * 1.2);

      subOsc.connect(subGain);
      subGain.connect(this.masterGain);
      subOsc.start(now);
      subOsc.stop(now + (stepDurationMs / 1000) * 1.5);

      if (onStep) {
        onStep(this.currentStep % notes.length);
      }

      this.currentStep++;
    };

    playTone();
    this.intervalId = window.setInterval(playTone, stepDurationMs);
  }

  public stop() {
    this.isPlaying = false;
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }
}

export const riffAudio = new RiffSynthesizer();
