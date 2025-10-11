import { useEffect } from "react";

const useScrambleCycle = (ref, words, opts = {}) => {
    useEffect(() => {
      const el = ref.current;
      if (!el || !Array.isArray(words) || words.length === 0) return;

      const chars = opts.chars ||
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789#?°*+-_/<>$%@& ";
      const duration = opts.duration ?? 600; // ms por transición
      const interval = opts.interval ?? 1800; // ms entre palabras
      const startDelay = opts.startDelay ?? 800; // ms arranque

      let index = 0;
      let raf = 0;
      let timer = 0;

      const scrambleTo = (to) => {
        const from = el.textContent || "";
        const maxLen = Math.max(from.length, to.length);
        const queue = new Array(maxLen).fill(0).map((_, i) => {
          return {
            from: from[i] || "",
            to: to[i] || "",
            // cada carácter tiene una ventana de glitch distinta dentro de duration
            start: Math.random() * (duration * 0.4),
            end: Math.random() * (duration * 0.6) + duration * 0.4,
          };
        });

        const t0 = performance.now();
        const step = () => {
          const t = performance.now() - t0;
          let done = 0;
          let out = "";
          for (let i = 0; i < queue.length; i++) {
            const { from, to, start, end } = queue[i];
            if (t < start) {
              out += from;
            } else if (t >= end) {
              out += to;
              done++;
            } else {
              out += chars[(Math.random() * chars.length) | 0];
            }
          }
          el.textContent = out;
          if (done < queue.length) {
            raf = requestAnimationFrame(step);
          }
        };

        if (raf) cancelAnimationFrame(raf);
        raf = requestAnimationFrame(step);
      };

      const tick = () => {
        scrambleTo(words[index % words.length]);
        index++;
        timer = window.setTimeout(tick, interval);
      };

      const start = window.setTimeout(tick, startDelay);

      return () => {
        if (raf) cancelAnimationFrame(raf);
        if (timer) clearTimeout(timer);
        clearTimeout(start);
      };
    }, [ref, words, opts.duration, opts.interval, opts.startDelay, opts.chars]);
  };

export default useScrambleCycle;