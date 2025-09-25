import React from 'react'
import './presentation.css'
import PixelatedAnimation from '../animationbat/pixelatedAnimation'

const PresentationCard = () => {
  return (
    <div id="footer" className="ftr">
      <div className="ftr-frame" aria-label="Card presentation panel">
        {/* Agujeros de carpeta (decorativos) */}
        <span className="ftr-hole ftr-hole--top" />
        <span className="ftr-hole ftr-hole--mid" />
        <span className="ftr-hole ftr-hole--bot" />

        {/* Cabecera con líneas punteadas */}
        <div className="ftr-row ftr-row-top">
          <div className="ftr-meta-left">
            <span className="ftr-square" aria-hidden />
          </div>
          <div className="ftr-meta-center">ABOUT</div>
          <div className="ftr-meta-right">
            <span className="ftr-square" aria-hidden />
          </div>
        </div>

        {/* Contenido principal */}
        <div className="ftr-content">
          <aside className="ftr-left" aria-hidden>
            {/* <div className="ftr-tag">
              <img src="/assets/card-3.jpeg" alt="hanging tag" />
            </div> */}
          </aside>

          <main className="ftr-main">
            <h1 className="ftr-display">
              <span>Gabriel Salazar</span>
            </h1>
            <div className="ftr-script">FullStack Programmer</div>
            <p className="ftr-copy">
              I&apos;m an enthusiastic and multifaceted visual artist, motion designer, graphic designer, illustrator, and
              photographer. Passionate about pushing creative boundaries, I constantly seek to expand my expertise and
              combine skills across various mediums. I thrive on problem‑solving and embrace challenges with a proactive
              and open‑minded approach.
            </p>
          </main>

          <div className="ftr-vertical">GABRIEL S'22 WORKS</div>
        </div>

        {/* Pie de página */}
        <div className="ftr-row ftr-row-bottom">
          <div className="ftr-bottom-left">
            <span className="ftr-square" aria-hidden />
          </div>
          <div className="ftr-bottom-center">
            <span className="ftr-k">CURRENTLY BASED IN</span>
            <span>VENEZUELA, CA </span>
            <span>AVAILABLE FOR FREELANCE</span>
          </div>
          <div className="ftr-bottom-right">
            <span>VEN, POZ 10.4330° N, -66.9120° W</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PresentationCard