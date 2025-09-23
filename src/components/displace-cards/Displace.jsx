"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { ReactLenis } from "@studio-freight/react-lenis";
import "./displace.css";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

const Card = ({ title, copy, year, category, logo, tags, images, index }) => {
  return (
    <div className="card" id={`card-${index + 1}`}>
      <div className="card-inner">
        <header className="card-header">
          <div className="card-title-block">
            <h1 className="card-title">{title}</h1>
          </div>
          <div className="card-summary">
            <p>{copy}</p>
            <a className="card-cta" href="#">VIEW PROJECT →</a>
          </div>
          <aside className="card-meta">
            <div className="card-year">{year}</div>
            <div className="card-tags">
              {tags?.map((t, i) => (
                <span className="tag" key={i}>{t}</span>
              ))}
            </div>
            <div className="card-tags">
              {logo?.map((t, i) => (
                <span className="logo" key={i}>{t}</span>
              ))}
            </div>
          </aside>
        </header>

        <div className="card-divider" />

        <section className="card-body">

          <div className="card-media">
            <div className="media-main">
              <img src={images?.main} alt={`${title} main`} />
            </div>
            <div className="media-side">
              {images?.thumbs?.slice(0, 2).map((src, i) => (
                <div className="thumb" key={i}>
                  <img src={src} alt={`${title} thumb ${i + 1}`} />
                </div>
              ))}
            </div>
            <div className="media-main">
              <img src={images?.main} alt={`${title} main`} />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default function DisplaceCard() {
  const cards = [
    {
      title: "Trello App",
      year: "2025",
      category: "Development",
      tags: ["React", "React", "NextJS", "TypeScript", "TailwindCSS"],
      logo: ["logo", "logo", "logo", "logo"],
      copy: "A web application built with React, NextJS, and TypeScript, showcasing a modern and responsive design.",
      images: {
        main: "/slide-img-1.jpg",
        thumbs: ["/slide-img-2.jpg", "/slide-img-3.jpg"],
      },
    },
    {
      title: "Autumn Things",
      year: "2024",
      category: "Motion Works",
      tags: ["3D Texturing", "3D Rendering", "Motion Graphics"],
      copy: "A motion exploration blending seasonal palettes with tactile textures for a warm, nostalgic mood.",
      images: {
        main: "/slide-img-4.jpg",
        thumbs: ["/slide-img-1.jpg", "/slide-img-2.jpg"],
      },
    },
    {
      title: "Digital Presence",
      year: "2025",
      category: "Web Projects",
      tags: ["UX/UI", "Design Systems", "Prototyping"],
      copy: "Cutting-edge web experiences that merge clarity, speed, and a distinctive brand presence.",
      images: {
        main: "/slide-img-3.jpg",
        thumbs: ["/slide-img-4.jpg", "/slide-img-2.jpg"],
      },
    }
  ];

  const container = useRef();

  useGSAP(() => {
    // Seleccionar elementos DOM de las cards (evitar confusión con el array de datos "cards")
    const cardEls = gsap.utils.toArray(".cards .card");
    if (!cardEls.length) return;

    // Trigger envolvente opcional (sin pin)
    ScrollTrigger.create({
      trigger: cardEls[0],
      start: "top top",
      endTrigger: cardEls[cardEls.length - 1],
      end: () => cardEls[cardEls.length - 1].getBoundingClientRect().height, // o "+=200%"

      pin: '.card-all',
      pinSpacing: false,
    });

    // Por cada card: pin hasta que llegue la siguiente
    cardEls.forEach((cardEl, index) => {
      const isLastCard = index === cardEls.length - 1;
      const cardInner = cardEl.querySelector(".card-inner");

      ScrollTrigger.create({
        trigger: cardEl,
        start: "top 5%",
        endTrigger: '.outro',
        end: "bottom top",
        pin: true,
        pinSpacing: false,
      });

      gsap.to(cardInner, {
        ease: "none",
        scrollTrigger: {
          trigger: cardEl,
          start: "top 85%",
          endTrigger: '.outro',
          end: "top 15%",
          scrub: true,
        },
      })
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  },
    { scope: container }
  );

  return (
    <div className="displace-container" ref={container}>

      <div className="card-all"></div>
      <section className="cards">
        {cards.map((card, index) => (
          <Card key={index} {...card} index={index} />
        ))}
      </section>
      <section className="outro">
        <h1>Let’s build a brand that leaves a mark.</h1>
      </section>

    </div>
  );
}
