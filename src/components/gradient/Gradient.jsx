"use client";

import React, { useEffect, useRef } from 'react'
import './gradient.css'

const Gradient = () => {

  const gradientRef = useRef(null)

  useEffect(() => {

    const moveGradient = (e) => {
      const winWidth = window.innerWidth
      const winHeight = window.innerHeight

      // Coordenadas normalizadas (-50%..+50%) respecto al centro
      const centeredX = ((e.clientX / winWidth) - 0.5) * 100
      const centeredY = ((e.clientY / winHeight) - 0.5) * 100

      // Suavizado: reducir amplitud para no eclipsar animación autónoma
      const offsetX = Math.max(-25, Math.min(25, centeredX))
      const offsetY = Math.max(-25, Math.min(25, centeredY))

      if (gradientRef.current) {
        gradientRef.current.style.setProperty('--mouse-x-offset', `${offsetX}%`)
        gradientRef.current.style.setProperty('--mouse-y-offset', `${offsetY}%`)
      }

    }

    document.addEventListener("mousemove", moveGradient)

    return function cleanup() {
      document.removeEventListener("mousemove", moveGradient)
    }

  }, [gradientRef])

  return (
      <div className='gradient-bg' ref={gradientRef} data-scroll-container>
        <div className='blink justify-center flex align-center'>
          <p className="gradient-bg-p">HEY</p>
        </div>
      </div>
  )
}

export default Gradient