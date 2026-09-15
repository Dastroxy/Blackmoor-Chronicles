/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * THE BLACKMOOR CHRONICLES — SOUND & VOICE SYSTEM
 * Synthesizes atmospheric Victorian chapel acoustics using Web Audio API
 * and coordinates external voiceover MP3 tracks with synchronized text fallbacks.
 */

class GothicAudioSystem {
  private ctx: AudioContext | null = null;
  private ambientGain: GainNode | null = null;
  private sfxGain: GainNode | null = null;
  private masterGain: GainNode | null = null;
  private windOsc: OscillatorNode | null = null;
  private windFilter: BiquadFilterNode | null = null;
  private currentAudio: HTMLAudioElement | null = null;
  private isMuted: boolean = false;
  private volume: number = 0.7;
  private isAmbiencePlaying: boolean = false;

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.value = this.volume;
        this.masterGain.connect(this.ctx.destination);

        this.ambientGain = this.ctx.createGain();
        this.ambientGain.gain.value = 0.15;
        this.ambientGain.connect(this.masterGain);

        this.sfxGain = this.ctx.createGain();
        this.sfxGain.gain.value = 0.4;
        this.sfxGain.connect(this.masterGain);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.masterGain) {
      this.masterGain.gain.value = this.isMuted ? 0 : this.volume;
    }
    if (this.currentAudio) {
      this.currentAudio.volume = this.isMuted ? 0 : this.volume;
    }
  }

  public getVolume(): number {
    return this.volume;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.masterGain) {
      this.masterGain.gain.value = this.isMuted ? 0 : this.volume;
    }
    if (this.currentAudio) {
      this.currentAudio.muted = this.isMuted;
    }
    return this.isMuted;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public getIsAmbiencePlaying(): boolean {
    return this.isAmbiencePlaying;
  }

  /**
   * Generates low ambient chapel wind drone
   */
  public startAmbience() {
    this.initContext();
    if (!this.ctx || !this.ambientGain || this.isAmbiencePlaying) return;

    try {
      // Modulated pink-noise/sine wind simulation
      const osc = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(55, this.ctx.currentTime); // Low A

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(140, this.ctx.currentTime);
      filter.Q.setValueAtTime(4, this.ctx.currentTime);

      lfo.frequency.setValueAtTime(0.12, this.ctx.currentTime); // slow swell
      lfoGain.gain.setValueAtTime(40, this.ctx.currentTime);
      lfo.connect(lfoGain);
      lfoGain.connect(filter.frequency);

      osc.connect(filter);
      filter.connect(this.ambientGain);

      osc.start();
      lfo.start();

      this.windOsc = osc;
      this.windFilter = filter;
      this.isAmbiencePlaying = true;
    } catch {
      // Web audio initialization might be blocked before first gesture
    }
  }

  public stopAmbience() {
    if (this.windOsc) {
      try {
        this.windOsc.stop();
        this.windOsc.disconnect();
      } catch {}
      this.windOsc = null;
    }
    this.isAmbiencePlaying = false;
  }

  public toggleAmbience(): boolean {
    if (this.isAmbiencePlaying) {
      this.stopAmbience();
      return false;
    } else {
      this.startAmbience();
      return true;
    }
  }

  /**
   * Synthesizes deep church bell toll (St. Aurelius Bell)
   */
  public playBellToll(strikeCount: number = 1) {
    this.initContext();
    if (!this.ctx || !this.sfxGain || this.isMuted) return;

    const ctx = this.ctx;
    const baseFreq = 110; // Low bell fundamental
    const intervals = [1, 2.01, 2.76, 3.82, 5.2]; // bell harmonics

    const ringSingleBell = (timeOffset: number) => {
      intervals.forEach((ratio, index) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = index === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(baseFreq * ratio, ctx.currentTime + timeOffset);

        const volume = (1 / (index + 1)) * 0.25;
        gain.gain.setValueAtTime(volume, ctx.currentTime + timeOffset);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + timeOffset + 3.5);

        osc.connect(gain);
        gain.connect(this.sfxGain!);

        osc.start(ctx.currentTime + timeOffset);
        osc.stop(ctx.currentTime + timeOffset + 3.8);
      });
    };

    for (let i = 0; i < strikeCount; i++) {
      ringSingleBell(i * 1.6);
    }
  }

  /**
   * Sound of locker latch / metal door click
   */
  public playLockerLatch() {
    this.initContext();
    if (!this.ctx || !this.sfxGain || this.isMuted) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(140, this.ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.1);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.11);
    } catch {}
  }

  public playDoorClick() {
    this.playLockerLatch();
  }

  /**
   * 4-tone modern academy electronic chime
   */
  public playSchoolBell() {
    this.initContext();
    if (!this.ctx || !this.sfxGain || this.isMuted) return;

    const ctx = this.ctx;
    const tones = [523.25, 659.25, 783.99, 1046.5];
    tones.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const startTime = ctx.currentTime + idx * 0.12;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);
      gain.gain.setValueAtTime(0.18, startTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 1.2);

      osc.connect(gain);
      gain.connect(this.sfxGain!);

      osc.start(startTime);
      osc.stop(startTime + 1.25);
    });
  }

  /**
   * Sound of paper rustle / archive turning
   */
  public playPaperRustle() {
    this.initContext();
    if (!this.ctx || !this.sfxGain || this.isMuted) return;

    try {
      const bufferSize = this.ctx.sampleRate * 0.08;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
      }
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 1800;
      filter.Q.value = 2;

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.sfxGain);

      noise.start();
    } catch {}
  }

  /**
   * Sound of wax seal stamp / heavy lock click
   */
  public playWaxSeal() {
    this.initContext();
    if (!this.ctx || !this.sfxGain || this.isMuted) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(90, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(35, this.ctx.currentTime + 0.15);

      gain.gain.setValueAtTime(0.4, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.2);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.22);
    } catch {}
  }

  /**
   * Clock mechanical tick
   */
  public playClockTick() {
    this.initContext();
    if (!this.ctx || !this.sfxGain || this.isMuted) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1200, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.02);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.025);
    } catch {}
  }

  /**
   * Plays voiceover file if available at /audio/{name}.mp3, with callbacks
   */
  public playAudioTrack(
    src: string,
    onEnded?: () => void,
    onError?: () => void
  ): { stop: () => void; isPlaying: () => boolean } {
    this.stopCurrentTrack();

    const audio = new Audio(src);
    audio.volume = this.isMuted ? 0 : this.volume;
    this.currentAudio = audio;

    let playing = false;

    audio.addEventListener('play', () => {
      playing = true;
    });

    audio.addEventListener('ended', () => {
      playing = false;
      if (onEnded) onEnded();
    });

    audio.addEventListener('error', () => {
      playing = false;
      if (onError) onError();
    });

    audio.play().catch(() => {
      // Audio file might not exist or autoplay policy blocked
      if (onError) onError();
    });

    return {
      stop: () => {
        audio.pause();
        audio.currentTime = 0;
        playing = false;
      },
      isPlaying: () => playing
    };
  }

  public stopCurrentTrack() {
    if (this.currentAudio) {
      try {
        this.currentAudio.pause();
        this.currentAudio.currentTime = 0;
      } catch {}
      this.currentAudio = null;
    }
  }
}

export const soundMaster = new GothicAudioSystem();
