/**
 * DDC Game - Sintesis Audio Web (Web Audio API)
 * Memberikan kesan bunyi interaktif tanpa memerlukan fail audio luaran.
 * Hak Cipta (c) 2026 Perpustakaan Tun Abdul Razak, Universiti Teknologi MARA
 */

class SoundEffects {
  constructor() {
    this.ctx = null;
    this.muted = false;
  }

  init() {
    if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.muted = !this.muted;
    return this.muted;
  }

  // Bunyi sentuhan / angkat buku
  playPickup() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(440, this.ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.08);
    } catch (e) {}
  }

  // Bunyi meletak buku ke dalam slot
  playDrop() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(240, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(160, this.ctx.currentTime + 0.09);

      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.09);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.09);
    } catch (e) {}
  }

  // Alias untuk playPlace (digunakan oleh pengendali susunan buku)
  playPlace() {
    this.playDrop();
  }

  // Bunyi Jawapan Betul (Chime harmoni C-E-G-C)
  playCorrect() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.09);

        const startTime = this.ctx.currentTime + idx * 0.09;
        gain.gain.setValueAtTime(0.18, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.35);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(startTime);
        osc.stop(startTime + 0.35);
      });
    } catch (e) {}
  }

  // Bunyi Jawapan Salah (Buzz lembut)
  playWrong() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(180, this.ctx.currentTime);
      osc.frequency.setValueAtTime(130, this.ctx.currentTime + 0.12);

      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.28);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.28);
    } catch (e) {}
  }

  // Bunyi Kejayaan Keraian Selesai Semua 10 Tahap (Fanfare Victory Chime)
  playVictory() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    try {
      // Melodi keraian menaik: C5, E5, G5, C6, diikuti kord penuh G5+C6+E6
      const fanfareNotes = [
        { f: 523.25, t: 0.00, d: 0.18 }, // C5
        { f: 659.25, t: 0.12, d: 0.18 }, // E5
        { f: 783.99, t: 0.24, d: 0.18 }, // G5
        { f: 1046.50, t: 0.36, d: 0.55 }, // C6
        // Kord kemuncak serentak
        { f: 659.25, t: 0.42, d: 0.65 }, // E5
        { f: 783.99, t: 0.42, d: 0.65 }, // G5
        { f: 1318.51, t: 0.42, d: 0.85 }  // E6
      ];

      fanfareNotes.forEach(note => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        const start = this.ctx.currentTime + note.t;
        osc.frequency.setValueAtTime(note.f, start);

        gain.gain.setValueAtTime(0.2, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + note.d);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(start);
        osc.stop(start + note.d);
      });
    } catch (e) {}
  }
}

const sounds = new SoundEffects();
