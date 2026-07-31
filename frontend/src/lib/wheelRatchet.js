/**
 * Trinquete de ruleta sincronizado con la rotación REAL de la rueda.
 *
 * Por qué así y no con un temporizador: `react-custom-roulette` anima la
 * rueda con CSS (su propia curva de easing y duración). Cualquier curva que
 * inventemos por fuera es una aproximación que se desfasa. En cambio, aquí
 * leemos en cada frame el ángulo real del elemento que rota y disparamos un
 * golpe cada vez que cruza un "diente".
 *
 * Resultado: los clicks siguen exactamente la velocidad de la rueda —densos
 * al arrancar, cada vez más separados al frenar— sin importar qué easing o
 * `spinDuration` use la librería.
 */

import { ratchet } from './audio';

/** Cuántos dientes tiene el borde de la rueda (como los pegs de un casino). */
const PEGS = 24;
const DEGREES_PER_PEG = 360 / PEGS;

/** Nunca más de un golpe cada X ms, para que a máxima velocidad no sature. */
const MIN_INTERVAL_MS = 38;

/** Lee el ángulo (en grados) de la matriz de transformación de un elemento. */
function angleOf(el) {
  const t = window.getComputedStyle(el).transform;
  if (!t || t === 'none') return null;

  // matrix(a, b, c, d, e, f) -> ángulo = atan2(b, a)
  const m = t.match(/matrix\(([^)]+)\)/);
  if (m) {
    const [a, b] = m[1].split(',').map(Number);
    return (Math.atan2(b, a) * 180) / Math.PI;
  }

  const m3d = t.match(/matrix3d\(([^)]+)\)/);
  if (m3d) {
    const v = m3d[1].split(',').map(Number);
    return (Math.atan2(v[1], v[0]) * 180) / Math.PI;
  }

  return null;
}

/**
 * Busca, dentro del contenedor, el elemento que realmente está rotando.
 * Se queda con el que más ángulo acumula entre dos lecturas.
 */
function findSpinner(container) {
  const candidates = Array.from(container.querySelectorAll('*'));
  const readings = candidates
    .map((el) => ({ el, angle: angleOf(el) }))
    .filter((r) => r.angle !== null);

  return readings;
}

/**
 * Arranca el trinquete.
 *
 * @param {HTMLElement} container Contenedor de la rueda.
 * @returns {() => void} función para detenerlo.
 */
export function startWheelRatchet(container) {
  if (typeof window === 'undefined' || !container) return () => {};

  let raf = null;
  let stopped = false;

  let spinner = null;
  let lastAngle = null;
  let accumulated = 0;      // grados girados en total (sin saltos de ±180)
  let nextPegAt = DEGREES_PER_PEG;
  let lastPlayed = 0;
  let lastVelocity = 0;

  // Velocidad máxima observada, para normalizar la intensidad a 0..1.
  let peakVelocity = 0;

  const pickSpinner = () => {
    const readings = findSpinner(container);
    if (!readings.length) return null;

    // Si aún no sabemos cuál rota, tomamos el de mayor |ángulo|: durante el
    // giro es el que se mueve. Se re-evalúa hasta que haya movimiento real.
    let best = readings[0];
    readings.forEach((r) => {
      if (Math.abs(r.angle) > Math.abs(best.angle)) best = r;
    });
    return best.el;
  };

  const frame = () => {
    if (stopped) return;

    if (!spinner) spinner = pickSpinner();

    if (spinner) {
      const angle = angleOf(spinner);

      if (angle !== null) {
        if (lastAngle !== null) {
          // Desenrollar el salto de +180/-180 de atan2.
          let delta = angle - lastAngle;
          if (delta > 180) delta -= 360;
          if (delta < -180) delta += 360;

          const step = Math.abs(delta);
          accumulated += step;

          // Velocidad instantánea en grados por frame.
          lastVelocity = step;
          if (step > peakVelocity) peakVelocity = step;

          // Un golpe por cada diente cruzado.
          while (accumulated >= nextPegAt) {
            const now = performance.now();
            if (now - lastPlayed >= MIN_INTERVAL_MS) {
              const intensity = peakVelocity > 0
                ? Math.min(lastVelocity / peakVelocity, 1)
                : 1;
              ratchet(intensity);
              lastPlayed = now;
            }
            nextPegAt += DEGREES_PER_PEG;
          }
        }

        lastAngle = angle;
      }
    }

    raf = requestAnimationFrame(frame);
  };

  raf = requestAnimationFrame(frame);

  return () => {
    stopped = true;
    if (raf) cancelAnimationFrame(raf);
  };
}
