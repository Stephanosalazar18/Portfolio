import React, { useRef } from 'react'
import './outro.css'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { SplitText } from 'gsap/all';
import useScrambleCycle from '../effect_components/ScrambleCycle';
import { useStableScrambleConfig } from '../effect_components/scrambleConfig';


const otherItems = [
  { label: "CV", route: "/" },

];

const socialItems = [
  { label: "Linkedin", route: "https://www.linkedin.com/in/gabriel-salazar-792727262/" },
  { label: "Github", route: "https://github.com/Stephanosalazar18" },

];

const menuItems = [
  { label: "Home", route: "/" },
  { label: "About", route: "#about" },
  { label: "Projects", route: "#Projects" },
  { label: "Contact", route: "#outro" },
];

const Outro = () => {
  const socialLinksWrapperRef = useRef(null);
  const socialLinkContainersRef = useRef([]);
  const socialLinksRef = useRef([]);

  const charRef1 = useRef([]);
  const charRef2 = useRef([]);
  const charRef3 = useRef([]);
  const charRef4 = useRef([]);
  const charRef5 = useRef([]);
  const charRef6 = useRef([]);
  const charRef7 = useRef([]);

  gsap.registerPlugin(SplitText);

  useGSAP(() => {
    // Recolectar TODOS los contenedores (antes se sobrescribían los índices de los refs)
    const allContainers = Array.from(document.querySelectorAll('.footer-link'));
    socialLinkContainersRef.current = allContainers;
    // Links (anchors) correspondientes
    socialLinksRef.current = allContainers.map(el => el.querySelector('a')).filter(Boolean);

    // Split solo una vez por span
    socialLinksRef.current.forEach((link) => {
      const chars = link.querySelectorAll('span');
      chars.forEach((char, idx) => {
        if (char.dataset.splitDone) return; // evita duplicar
        const split = new SplitText(char, { type: 'chars' });
        split.chars.forEach((char) => {
          char.classList.add('char')
        });
        if (idx === 1) gsap.set(split.chars, { y: '110%' });
        char.dataset.splitDone = '1';
      });
    });

    // Handlers hover: animación sólo hacia arriba y reset invisible
    allContainers.forEach(container => {
      if (container._mouseEnterHandler) return;
      const anchor = container.querySelector('a');
      if (!anchor) return;

      const handleMouseEnter = () => {
        const spans = anchor.querySelectorAll('span');
        if (spans.length < 2) return;
        const visibleCopy = spans[0];
        const animatedCopy = spans[1];

        const visibleChars = visibleCopy.querySelectorAll('.char');
        const animatedChars = animatedCopy.querySelectorAll('.char');
        // Reiniciar estado antes de cada hover
        gsap.set(visibleChars, { y: 0 });
        gsap.set(animatedChars, { y: '110%' });

        gsap.to(visibleChars, {
          y: '-110%',
          stagger: 0.03,
          duration: 0.24,
          ease: 'expo.inOut'
        });
        gsap.to(animatedChars, {
          y: '0%',
          stagger: 0.03,
          duration: 0.24,
          ease: 'expo.inOut',
          onComplete: () => {
            // Reset silencioso para repetir en siguiente hover
            gsap.set(visibleChars, { y: 0 });
            gsap.set(animatedChars, { y: '110%' });
          }
        });
      };

      container._mouseEnterHandler = handleMouseEnter;
      container.addEventListener('mouseenter', handleMouseEnter);
    });

    return () => {
      socialLinkContainersRef.current.forEach((char) => {
        if (!char) return;
        if (char._mouseEnterHandler) char.removeEventListener('mouseenter', char._mouseEnterHandler);
        delete char._mouseEnterHandler;
      });
    };
  }, {})

  // Configuraciones estables (se generan una sola vez cuando el componente se monta)
  const cfg1 = useStableScrambleConfig({ duration: [300, 800], interval: [1600, 6900], startDelay: [200, 5000] });
  const cfg2 = useStableScrambleConfig({ duration: [280, 760], interval: [1400, 4000], startDelay: [100, 4200] });
  const cfg3 = useStableScrambleConfig({ duration: [260, 780], interval: [2000, 18000], startDelay: [150, 3600] });
  const cfg4 = useStableScrambleConfig({ duration: [300, 820], interval: [1800, 12500], startDelay: [120, 4800] });
  const cfg5 = useStableScrambleConfig({ duration: [340, 840], interval: [2500, 4000], startDelay: [200, 5200] });
  const cfg6 = useStableScrambleConfig({ duration: [180, 500], interval: [1200, 9000], startDelay: [80, 1600] });

  useScrambleCycle(charRef1, ['A'], cfg1);
  useScrambleCycle(charRef2, ['E'], cfg2);
  useScrambleCycle(charRef3, ['A'], cfg3);
  useScrambleCycle(charRef4, ['E'], cfg4);
  useScrambleCycle(charRef5, ['GNE'], cfg5);
  useScrambleCycle(charRef6, ["GS'22", "22'GS", "G2'S2", "$G'22"], cfg6);
  useScrambleCycle(
    charRef7, 
    ['\\SEE YOU LATER!', '`•´', '´`•´`', '``•´´', '´`•´`'], 
    { duration: 200, interval: 1000, startDelay: 400 }
  );

  return (
    <div className="outro-container-wrapper" id="outro">
      <div className="new-footer">
        <footer>
          <div >
            <div className="top-footer">
              <span className="footer-title" ref={charRef7}>\SEE YOU LATER! `•´</span>
            </div>
            <div className="bottom-footer">
              <div className="menu-footer-links" ref={socialLinksWrapperRef}>
                <span className="footer-title">\RESUME</span>
                {otherItems.map((item, index) => (
                  <div
                    key={item.label}
                    className="footer-link"
                    ref={(el) => (socialLinkContainersRef.current[index] = el)}
                  >
                    <a
                      target="_blank"
                      href={item.route}
                      ref={(el) => (socialLinksRef.current[index] = el)}
                    >
                      <span>{item.label}</span>
                      <span>{item.label}</span>
                    </a>
                  </div>
                ))}
              </div>
              <div className="menu-footer-links" >
                <span className="footer-title">\NAVIGATE TO</span>
                {menuItems.map((item, index) => (
                  <div
                    key={item.label}
                    className="footer-link"
                    ref={(el) => (socialLinkContainersRef.current[index] = el)}
                  >
                    <a
                      href={item.route}
                      ref={(el) => (socialLinksRef.current[index] = el)}
                    >
                      <span>{item.label}</span>
                      <span>{item.label}</span>
                    </a>
                  </div>
                ))}
                {/* <div className="link-highlighter" ref={linkHighlighterRef} /> */}
              </div>
              <div className="menu-footer-links" ref={socialLinksWrapperRef}>
                <span className="footer-title">{'\\ME :)'}</span>
                {socialItems.map((item, index) => (
                  <div
                    key={item.label}
                    className="footer-link"
                    ref={(el) => (socialLinkContainersRef.current[index] = el)}
                  >
                    <a
                      target="_blank"
                      href={item.route}
                      ref={(el) => (socialLinksRef.current[index] = el)}
                    >
                      <span>{item.label}</span>
                      <span>{item.label}</span>
                    </a>
                  </div>
                ))}
              </div>
            </div>
            <h1 className="outro-brand"></h1>
            <div className="outro-meta">
              <div className="meta-left">C<span ref={charRef1}>A</span>RACAS, VEN<span ref={charRef2}>E</span>ZUEL<span ref={charRef3}>A</span></div>
              <div className="meta-center"><span ref={charRef6}>GS'22</span></div>
              <div className="meta-right">D<span ref={charRef4}>E</span>SI<span ref={charRef5}>GNE</span>D & BUILT BY ME {"<"}3 </div>
            </div>
          </div>
        </footer>
      </div>
    </div>

  )
}

export default Outro