// Utilidades para generar configuraciones aleatorias (estables) para useScrambleCycle
// Mantiene interval <= 15000 como solicitaste.

import { useRef } from 'react';

// Clamp helper
const clamp = (v, min, max) => Math.min(Math.max(v, min), max);

// Genera un entero aleatorio en [min, max]
function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Genera una configuración aleatoria (no estable entre renders)
export function randomScrambleConfig(ranges = {}) {
  const {
    duration = [300, 800],
    interval = [1500, 15000],
    startDelay = [100, 6000],
  } = ranges;

  const cfg = {
    duration: randInt(duration[0], duration[1]),
    interval: clamp(randInt(interval[0], interval[1]), 0, 15000),
    startDelay: randInt(startDelay[0], startDelay[1]),
  };
  return cfg;
}

// Hook que fija la configuración la primera vez y la reutiliza (estable)
export function useStableScrambleConfig(ranges) {
  const ref = useRef(null);
  if (!ref.current) {
    ref.current = randomScrambleConfig(ranges);
  }
  return ref.current;
}

// Atajo por compatibilidad con nombre tipo factory
export const makeScrambleConfig = useStableScrambleConfig;
