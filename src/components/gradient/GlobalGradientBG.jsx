"use client";

import { useEffect, useRef } from "react";
import "./gradient.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function GlobalGradientBG() {
  const textRef = useRef(null);

  useEffect(() => {
    const onMove = (e) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const cx = ((e.clientX / w) - 0.5) * 100;
      const cy = ((e.clientY / h) - 0.5) * 100;
      const offsetX = Math.max(-25, Math.min(25, cx));
      const offsetY = Math.max(-25, Math.min(25, cy));
      document.documentElement.style.setProperty("--mouse-x-offset", `${offsetX}%`);
      document.documentElement.style.setProperty("--mouse-y-offset", `${offsetY}%`);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useEffect(() => {
    // Parallax con GSAP + ScrollTrigger limitado del top hasta la mitad del viewport
    gsap.registerPlugin(ScrollTrigger);
    const el = textRef.current;
    if (!el) return;

    // Desplazamiento inicial hacia arriba (px) para que empiece “debajo” del navbar
    const getStartOffset = () => -Math.min(window.innerHeight * 0.25, 140);
    // La animación termina al alcanzar la mitad del viewport desde el top
    const getEndDistance = () => Math.round(window.innerHeight / 3);

    // Fijar posición inicial
    gsap.set(el, { y: getStartOffset() });

    const tween = gsap.to(el, {
      y: 0, // llega al centro (el contenedor ya centra; y:0 lo alinea al centro)
      ease: "back.inOut(0.3)",
      scrollTrigger: {
        // Usamos posiciones absolutas de scroll: del 0 hasta la mitad del viewport
        start: 0,
        end: () => "+=" + getEndDistance(),
        scrub: 1,
      },
    });

    return () => {
      tween.scrollTrigger && tween.scrollTrigger.kill();
      tween.kill();
    };
  }, []);

  return (
    <div className="site-gradient-bg" aria-hidden>
      <p ref={textRef} className="gradient-bg-p">HEY</p>
    </div>
  );
}
