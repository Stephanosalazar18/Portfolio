"use client";

import React, { useEffect, useRef } from 'react'
import './navbar.css'
import { useGSAP } from '@gsap/react';
import { SplitText } from "gsap/all";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useScrambleCycle from '../effect_components/ScrambleCycle';


const menuItems = [
  { label: "Home", route: "/" },
  { label: "About", route: "#about" },
  { label: "Projects", route: "#Projects" },
  { label: "Github", route: "https://github.com/Stephanosalazar18" },
  { label: "Contact", route: "#outro" },
];

const Navbar = () => {

  const menuLinksRef = useRef([]);
  const menuLinkContainersRef = useRef([]);
  const menuLinksWrapperRef = useRef(null);
  const linkHighlighterRef = useRef(null);

  const navbarRef = useRef(null);
  const navPRef = useRef(null);
  // Ref para animar el bloque "Scroll" + flecha dentro de su máscara
  const navP2Ref = useRef(null);
  const navSvgRef = useRef(null);
  const charRef = useRef(null);

  const currentX = useRef(0);
  const targetX = useRef(0);
  const lerpFactor = 0.05;

  const currentHighlighterX = useRef(0);
  const targetHighlighterX = useRef(0);
  const currentHighlighterWidth = useRef(0);
  const targetHighlighterWidth = useRef(0);

  const animationFrameRef = useRef(null);


  // Registrar plugins una vez
  gsap.registerPlugin(SplitText, ScrollTrigger);

  const splitReadyRef = useRef(false);

  useGSAP(() => {
    const menuLinks = menuLinksRef.current;
    const menuLinkContainers = menuLinkContainersRef.current;
    const menuLinksWrapper = menuLinksWrapperRef.current;
    const linkHighlighter = linkHighlighterRef.current;


    menuLinks.forEach((link) => {
      const chars = link.querySelectorAll("span");
      chars.forEach((char, charIndex) => {
        const split = new SplitText(char, { type: "chars" });
        split.chars.forEach((char) => {
          char.classList.add("char");
        });
        if (charIndex === 1) {
          gsap.set(split.chars, { y: "110%" });
        }
      });
    });

    // Inicializar posición/anchura de la barra en el primer link
    if (linkHighlighter && menuLinksWrapper && menuLinkContainers.length) {
      const first = menuLinksWrapper.querySelector('.menu-link:first-child');
      const firstSpan = first?.querySelector('a span');
      if (first && firstSpan) {
        const firstRect = first.getBoundingClientRect();
        const wrapRect = menuLinksWrapper.getBoundingClientRect();
        const x0 = firstRect.left - wrapRect.left;
        const w0 = firstSpan.offsetWidth;
        currentHighlighterX.current = x0;
        targetHighlighterX.current = x0;
        currentHighlighterWidth.current = w0;
        targetHighlighterWidth.current = w0;
        gsap.set(linkHighlighter, { x: x0, width: w0, y: 0 });
      }
    }

    menuLinkContainers.forEach((link) => {
      const handleMouseEnter = () => {

        const linkCopy = link.querySelectorAll("a span");
        const visibleCopy = linkCopy[0];
        const animatedCopy = linkCopy[1];

        const visibleChars = visibleCopy.querySelectorAll(".char");
        gsap.to(visibleChars, {
          y: "-110%",
          stagger: 0.03,
          duration: 0.25,
          ease: "expo.inOut",
        });


        const animatedChars = animatedCopy.querySelectorAll(".char");
        gsap.to(animatedChars, {
          y: "0%",
          stagger: 0.03,
          duration: 0.25,
          ease: "expo.inOut",
        });

        const linkRect = link.getBoundingClientRect();
        const menuWrapperRect = menuLinksWrapper.getBoundingClientRect();

        targetHighlighterX.current = linkRect.left - menuWrapperRect.left;

        const linkCopyElement = link.querySelector("a span");
        targetHighlighterWidth.current = linkCopyElement
          ? linkCopyElement.offsetWidth
          : link.offsetWidth;
      };

      const handleMouseLeave = () => {

        const linkCopy = link.querySelectorAll("a span");
        const visibleCopy = linkCopy[0];
        const animatedCopy = linkCopy[1];

        const animatedChars = animatedCopy.querySelectorAll(".char");
        gsap.to(animatedChars, {
          y: "110%",
          stagger: 0.03,
          duration: 0.5,
          ease: "expo.inOut",
        });

        const visibleChars = visibleCopy.querySelectorAll(".char");
        gsap.to(visibleChars, {
          y: "0%",
          stagger: 0.03,
          duration: 0.5,
          ease: "expo.inOut",
        });
      };

      link.addEventListener("mouseenter", handleMouseEnter);
      link.addEventListener("mouseleave", handleMouseLeave);
      link._mouseEnterHandler = handleMouseEnter;
      link._mouseLeaveHandler = handleMouseLeave;
    });

    // marcar split listo
    splitReadyRef.current = true;

    // animación de la barra highlighter (lerp)
    const animate = () => {
      currentHighlighterX.current += (targetHighlighterX.current - currentHighlighterX.current) * lerpFactor;
      currentHighlighterWidth.current += (targetHighlighterWidth.current - currentHighlighterWidth.current) * lerpFactor;
      if (linkHighlighter) {
        gsap.set(linkHighlighter, { x: currentHighlighterX.current, width: currentHighlighterWidth.current });
      }
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      // limpiar listeners
      menuLinkContainers.forEach((link) => {
        if (!link) return;
        if (link._mouseEnterHandler) link.removeEventListener('mouseenter', link._mouseEnterHandler);
        if (link._mouseLeaveHandler) link.removeEventListener('mouseleave', link._mouseLeaveHandler);
      });
    };

  }, {})

  // ScrollTrigger: colapso progresivo con scrub
  useGSAP(() => {
    // Recolectar todas las letras visibles (copia 0) ya divididas
    const allVisibleChars = [];
    menuLinkContainersRef.current.forEach((link) => {
      if (!link) return;
      const spans = link.querySelectorAll('a span');
      const visibleCopy = spans[0];
      if (!visibleCopy) return;
      visibleCopy.querySelectorAll('.char').forEach((c) => allVisibleChars.push(c));
    });

    const tl = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: {
        trigger: navbarRef.current,
        start: 'top top', // activa desde el primer pixel de scroll
        end: '+=360', // píxeles de scroll para completar el colapso
        scrub: 1, // sin retardo de suavizado
        // markers: true,
      },
    });

    // 0 -> 0.3: letras y nav-p/nav-h1 suben fuera (efecto máscara)
    if (allVisibleChars.length) tl.to(allVisibleChars, { y: '-110%', duration: 0.3 }, 0.3);
    if (navPRef.current) tl.to(navPRef.current, { y: '-110%', duration: 0.3 }, 0);
    if (navP2Ref.current) tl.to(navP2Ref.current, { y: '-110%', duration: 0.3 }, 0);
    if (navSvgRef.current) tl.to(navSvgRef.current, { y: '110%', duration: 0.3 }, 0);


    // 0.3 -> 1: la barra se recoge (scaleY 1 -> 0)
    tl.to(navbarRef.current, { scaleY: 0, transformOrigin: 'top bottom', duration: 0.7 }, 0.3);
  }, []);

  useScrambleCycle(
    charRef, 
    ['The only limit is your imagination.'], 
      { duration: 1265, interval: 9435, startDelay: 400 }
    );

  return (
    <div className="navbar-container-wrapper">
      <div className="navbar-container" ref={navbarRef}>

        <nav >
          <div className="menu-links-wrapper" ref={menuLinksWrapperRef}>
            {menuItems.map((item, index) => (
              <div
                key={item.label}
                className="menu-link"
                ref={(el) => (menuLinkContainersRef.current[index] = el)}
              >
                <a
                  target={item.route.startsWith('http') ? '_blank' : undefined}
                  href={item.route}
                  ref={(el) => (menuLinksRef.current[index] = el)}
                >
                  <span>{item.label}</span>
                  <span>{item.label}</span>
                </a>
              </div>
            ))}
            {/* <div className="link-highlighter" ref={linkHighlighterRef} /> */}
          </div>
        </nav>
        <div className="nav-mid" >
          <img src="/assets/pc2.gif" />
        </div>
        <div className="nav-bott">
          <div className="nav-p">
            <p ref={navPRef}><span ref={charRef}>The only limit is your imagination.</span></p>
          </div>
          <div className="nav-h1" >
            <p ref={navP2Ref}>Scroll</p>
            <div className="nav-svg" ref={navSvgRef}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" width="24" height="24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25 12 21m0 0-3.75-3.75M12 21V3" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Navbar