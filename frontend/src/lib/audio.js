/**
 * Motor de audio de la rifa (Web Audio, sin archivos ni dependencias).
 *
 * Por qué propio en vez de `cuelume` aquí: cuelume es una paleta *curada*
 * de 10 cues de interfaz (click, toggle, success…). No incluye un
 * trinquete de ruleta, ni una fanfarria de casino, ni un "pop" de fuego
 * artificial, y tampoco permite variar tono/volumen por golpe, que es
 * justo lo que necesita la ruleta para sonar como una de verdad.
 *
 * Todo se sintetiza en el momento, así que no hay descargas ni latencia.
 */

let ctx = null;
let master = null;
let enabled = true;
let unlocked = false;

/** Crea (o recupera) el AudioContext compartido. */
function audio() {
  if (typeof window === 'undefined') return null;

  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtx) return null;

  if (!ctx) {
    try {
      ctx = new AudioCtx();
      master = ctx.createGain();
      master.gain.value = 0.9;
      master.connect(ctx.destination);
    } catch {
      return null;
    }
  }

  // Los navegadores arrancan el contexto suspendido hasta que hay un
  // gesto del usuario; reintentar es barato y evita silencios raros.
  if (ctx.state === 'suspended') {
    ctx.resume().catch(() => {});
  }

  return ctx;
}

/**
 * Desbloquea el audio en el primer gesto del usuario.
 *
 * Esta es la causa habitual de que "a veces los botones no suenan": si el
 * AudioContext se crea fuera de un gesto, el navegador lo deja suspendido
 * y los primeros sonidos se descartan en silencio.
 */
export function initSound() {
  if (typeof window === 'undefined' || unlocked) return;

  const unlock = () => {
    const c = audio();
    if (c && c.state === 'running') {
      unlocked = true;
      window.removeEventListener('pointerdown', unlock);
      window.removeEventListener('keydown', unlock);
      window.removeEventListener('touchstart', unlock);
    }
  };

  window.addEventListener('pointerdown', unlock, { passive: true });
  window.addEventListener('keydown', unlock);
  window.addEventListener('touchstart', unlock, { passive: true });
}

/** Silencia o reactiva toda la paleta de sonidos del juego. */
export function setSoundEnabled(value) {
  enabled = Boolean(value);
}

/* ------------------------------------------------------------------ */
/* Utilidades de síntesis                                             */
/* ------------------------------------------------------------------ */

/** Tono simple con envolvente ADSR corta. */
function tone({
  freq,
  type = 'sine',
  start = 0,
  duration = 0.2,
  gain = 0.2,
  attack = 0.005,
  glideTo = null,
}) {
  const c = audio();
  if (!c) return;

  const t0 = c.currentTime + start;
  const osc = c.createOscillator();
  const g = c.createGain();

  osc.type = type;
  osc.frequency.setValueAtTime(freq, t0);
  if (glideTo) {
    osc.frequency.exponentialRampToValueAtTime(Math.max(glideTo, 1), t0 + duration);
  }

  g.gain.setValueAtTime(0.0001, t0);
  g.gain.exponentialRampToValueAtTime(gain, t0 + attack);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);

  osc.connect(g);
  g.connect(master);
  osc.start(t0);
  osc.stop(t0 + duration + 0.02);
}

/** Ráfaga de ruido (para clicks secos, pops y percusión). */
function noise({ start = 0, duration = 0.08, gain = 0.2, hp = 800, lp = 8000 }) {
  const c = audio();
  if (!c) return;

  const t0 = c.currentTime + start;
  const frames = Math.max(1, Math.floor(c.sampleRate * duration));
  const buffer = c.createBuffer(1, frames, c.sampleRate);
  const data = buffer.getChannelData(0);

  for (let i = 0; i < frames; i += 1) {
    data[i] = Math.random() * 2 - 1;
  }

  const src = c.createBufferSource();
  src.buffer = buffer;

  const hpf = c.createBiquadFilter();
  hpf.type = 'highpass';
  hpf.frequency.value = hp;

  const lpf = c.createBiquadFilter();
  lpf.type = 'lowpass';
  lpf.frequency.value = lp;

  const g = c.createGain();
  g.gain.setValueAtTime(gain, t0);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);

  src.connect(hpf);
  hpf.connect(lpf);
  lpf.connect(g);
  g.connect(master);
  src.start(t0);
  src.stop(t0 + duration + 0.02);
}

/* ------------------------------------------------------------------ */
/* Paleta de la rifa                                                  */
/* ------------------------------------------------------------------ */

/** Click seco de interfaz (botones). */
export function click() {
  if (!enabled) return;
  noise({ duration: 0.03, gain: 0.16, hp: 1500, lp: 7000 });
  tone({ freq: 420, type: 'triangle', duration: 0.05, gain: 0.1 });
}

/** Click de navegación, un poco más brillante. */
export function navigate() {
  if (!enabled) return;
  noise({ duration: 0.025, gain: 0.13, hp: 2000, lp: 9000 });
  tone({ freq: 700, type: 'triangle', duration: 0.07, gain: 0.1, glideTo: 900 });
}

/**
 * Click-clack suave, al estilo del selector de idioma del portafolio.
 *
 * A diferencia de `navigate()`, aquí el ruido se filtra bajo (nada por
 * encima de ~3.5 kHz) y el tono es grave, así que resulta cálido y
 * mecánico en vez de chillón.
 */
export function toggle() {
  if (!enabled) return;

  // "Click": pulso corto y sordo.
  noise({ duration: 0.018, gain: 0.1, hp: 300, lp: 3200 });
  tone({ freq: 210, type: 'sine', duration: 0.045, gain: 0.11, glideTo: 170 });

  // "Clack": segundo golpe apenas después, un poco más grave.
  noise({ start: 0.055, duration: 0.02, gain: 0.08, hp: 260, lp: 2800 });
  tone({ freq: 165, type: 'sine', start: 0.055, duration: 0.06, gain: 0.09, glideTo: 130 });
}

/**
 * Diente del trinquete de la ruleta.
 *
 * `intensity` (0..1) viene de la velocidad real de giro: cuando la rueda
 * va rápido los golpes son más fuertes y agudos; al frenar quedan más
 * suaves y graves, igual que un trinquete real perdiendo inercia.
 */
export function ratchet(intensity = 1) {
  if (!enabled) return;

  const i = Math.max(0.15, Math.min(intensity, 1));

  noise({
    duration: 0.02 + 0.01 * (1 - i),
    gain: 0.05 + 0.13 * i,
    hp: 1200 + 1800 * i,
    lp: 6000 + 4000 * i,
  });

  tone({
    freq: 240 + 320 * i,
    type: 'square',
    duration: 0.03,
    gain: 0.03 + 0.05 * i,
  });
}

/** Fanfarria de premio: arpegio mayor ascendente + campanas brillantes. */
export function jackpot() {
  if (!enabled) return;

  // Arpegio mayor (do–mi–sol–do), el gesto de "victoria" más reconocible.
  const arp = [523.25, 659.25, 783.99, 1046.5];
  arp.forEach((f, idx) => {
    tone({ freq: f, type: 'triangle', start: idx * 0.11, duration: 0.32, gain: 0.22 });
    tone({ freq: f * 2, type: 'sine', start: idx * 0.11, duration: 0.22, gain: 0.08 });
  });

  // Remate: acorde sostenido con brillo tipo campana de casino.
  const holdAt = arp.length * 0.11;
  [1046.5, 1318.5, 1568.0].forEach((f) => {
    tone({ freq: f, type: 'sine', start: holdAt, duration: 0.9, gain: 0.12 });
  });

  // Repique de campanita, el "cha-ching" de la máquina.
  for (let k = 0; k < 8; k += 1) {
    tone({
      freq: 1800 + Math.random() * 900,
      type: 'sine',
      start: holdAt + 0.05 + k * 0.07,
      duration: 0.18,
      gain: 0.06,
    });
  }
}

/** Derrota: descenso tipo "sad trombone" con un zumbido grave. */
export function lose() {
  if (!enabled) return;

  // Cuatro notas bajando (el gesto clásico de "perdiste" en TV).
  const steps = [392.0, 349.23, 311.13, 261.63];
  steps.forEach((f, idx) => {
    tone({
      freq: f,
      type: 'sawtooth',
      start: idx * 0.16,
      duration: 0.26,
      gain: 0.13,
      glideTo: f * 0.94,
    });
  });

  // Zumbido final grave, breve, para cerrar sin ser molesto.
  tone({
    freq: 150,
    type: 'sawtooth',
    start: steps.length * 0.16,
    duration: 0.5,
    gain: 0.1,
    glideTo: 90,
  });
}

/** Pop de fuego artificial: chasquido + cola de chispas. */
export function pop() {
  if (!enabled) return;

  // El estallido: golpe corto de ruido con cuerpo grave.
  noise({ duration: 0.05, gain: 0.22, hp: 500, lp: 9000 });
  tone({ freq: 160, type: 'sine', duration: 0.12, gain: 0.16, glideTo: 60 });

  // Las chispas cayendo después del estallido.
  for (let k = 0; k < 10; k += 1) {
    noise({
      start: 0.06 + Math.random() * 0.35,
      duration: 0.03,
      gain: 0.03 + Math.random() * 0.03,
      hp: 3000,
      lp: 12000,
    });
  }
}

/** Confirmación de acción correcta (formulario válido, BD reiniciada). */
export function success() {
  if (!enabled) return;
  [523.25, 659.25, 783.99].forEach((f, idx) => {
    tone({ freq: f, type: 'triangle', start: idx * 0.08, duration: 0.22, gain: 0.16 });
  });
}

/** Aviso de error, discreto (dos notas descendentes). */
export function error() {
  if (!enabled) return;
  tone({ freq: 330, type: 'square', duration: 0.14, gain: 0.12 });
  tone({ freq: 233, type: 'square', start: 0.13, duration: 0.22, gain: 0.12 });
}
