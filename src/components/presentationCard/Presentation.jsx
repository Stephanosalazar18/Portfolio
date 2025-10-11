"use client";
import React, { useRef } from "react";
import "./presentation.css";

import useScrambleCycle from "../effect_components/ScrambleCycle";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const PresentationCard = () => {

  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const bottomRef = useRef(null);
  const cordRef = useRef(null);
  const spanRef = useRef(null)
  const span2Ref = useRef(null)
  // Refs para el parallax
  const cardRef = useRef(null);
  const cardFrameRef = useRef(null);


  useScrambleCycle(
    leftRef,
    ['FULLSTACK', 'PROGRAMMER', 'FRONTEND', 'BACKEND', 'DEVELOPER', 'DESIGNER', 'UI/UX', 'CURIOUS', 'H4CK#?* '],
    { duration: 520, interval: 1700, startDelay: 600 }
  );

  useScrambleCycle(
    rightRef,
    ['JAVASCRIPT', 'TYPESCRIPT', 'PYTHON', 'C', 'BASH', 'LINUX', 'NODE.JS', 'NEXT.JS', 'NEST.JS', 'EXPRESS', 'REACT', 'MONGODB', 'PROSTGRESSQL', 'MYSQL'],
    { duration: 560, interval: 1850, startDelay: 900 }
  );

  useScrambleCycle(
    bottomRef,
    ['FREELANCE', 'CHAMBA', 'WORK', 'REMOTE', 'FULL-TIME', 'PART-TIME', 'CONTRACT'],
    { duration: 560, interval: 1850, startDelay: 900 }
  );

  useScrambleCycle(
    cordRef,
    ['10.4330° N, -66.9120° W'],
    { duration: 2380, interval: 12000, startDelay: 5000 }
  );

  useScrambleCycle(
    spanRef,
    ['A'],
    { duration: 560, interval: 1850, startDelay: 10000 }
  );

  useScrambleCycle(
    span2Ref,
    ['E'],
    { duration: 560, interval: 8550, startDelay: 900 }
  );

  // Registrar plugin una única vez por módulo
  gsap.registerPlugin(ScrollTrigger);

  // Parallax: cuando el top de la sección toca el bottom del viewport,
  // movemos la card-frame hasta el centro mientras se colapsa el navbar (~360px)
  useGSAP(() => {
    const frame = cardFrameRef.current;
    const card = cardRef.current;
    if (!frame || !card) return;

    // Estado inicial: un poco por debajo para sensación de parallax (no colapso)
    // Usamos yPercent para que sea relativo a la altura del frame y sea responsivo
    gsap.set(frame, { yPercent: 35 });

    const tween = gsap.to(frame, {
      yPercent: -100,
      ease: "none",
      scrollTrigger: {
        trigger: card,
        start: "top bottom", // cuando el top de la sección toca el bottom del viewport
        end: "+=360",        // misma distancia que el colapso del navbar
        scrub: 1,
        invalidateOnRefresh: true,
        // markers: true,
      },
    })

    gsap.set(card, { height: "80vh" })

    return () => {
      tween?.scrollTrigger?.kill();
      tween?.kill();
    };
  }, []);

  return (
    <div className="card-presentation" ref={cardRef} id="about">
      <div className="card-frame" ref={cardFrameRef}>
        <div className="frame-1">
          <div className="rectangle-frame-1">
          </div>
        </div>
        <div className="frame-2">
          <div className="top-frame-2">
            <span ref={leftRef}>FULL STACK</span>
            <span ref={rightRef}>JAVASCRIPT</span>
          </div>
          <div className="mid-frame-2">
            <div>

            </div>
          </div>
          <div className="bottom-frame-2">
            <div className="square" />
            <span>AVAILABLE FOR <span ref={bottomRef}>FREELANCE</span></span>
            <div className="square" />
          </div>
        </div>
        <div className="frame-3">
          <div className="top-frame-3">
            <div className="square" />
            <span>ABOUT</span>
            <div className="square" />

          </div>
          <div className="title-frame-3">
            <h1>Gabriel Salazar</h1>
          </div>
          <div className="sub-frame-3">
            <h2>Full Stack Developer</h2>
          </div>
          <div className="text-frame-3">
            <p>I am Gabriel Salazar, a developer who creates at the intersection of design and logic.
              <br />
              My job is to bridge the gap between creative vision and technical execution. I specialize in full-stack development, fluently handling both the art of a well-designed user experience and the science of a solid, high-performance infrastructure.
              <br />
              I am driven by the creation of clean code and the architecture of systems that not only work, but endure. I am always ready to collaborate on projects that require meticulous attention to detail and a strong desire to innovate.</p>
          </div>
          <div className="bottom-frame-3">
            <span>CURRENTLY BASED IN</span>
            <span>V<span ref={span2Ref}>E</span>NEZUEL<span ref={spanRef}>A</span>, CA</span>
            <span>VEN  <span ref={cordRef}>10.4330° N, -66.9120° W</span></span>
          </div>
        </div>
        <div className="frame-4">
          <div className="rectangle-frame-4">
            <span>GABRIEL. S'22</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PresentationCard;