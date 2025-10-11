"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import "./displace.css";
import Outro from "./Outro";
import { ReactLenis } from 'lenis/react'

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

const isVideo = (src) => /\.(mp4|webm|ogg|mov)$/i.test(src || "");

const MediaElement = ({ src, alt }) => {
  if (!src) return null;
  return isVideo(src) ? (
    <video
      src={src}
      aria-label={alt}
      playsInline
      autoPlay
      loop
      muted
      preload="metadata"
    />
  ) : (
    <img src={src} alt={alt} />
  );
};

const Card = ({ title, view, copy, year, category, logo, tags, images, index, link }) => {
  return (
    <div className="card" id={`card-${index + 1}`}>
      <div className="card-inner">
        <div className="card-title-featured">
          <span>FEATURED 0{index + 1}</span>
          <button><a target="_blank" href={link}><span>{view}</span></a></button>
        </div>
        <header className="card-header">
          <div className="card-title-block">
            <a className="card-title" href="#">
              <h1 >{title}</h1>
            </a>
          </div>
          <div className="card-summary">
            <p>{copy}</p>
          </div>
          <aside className="card-meta">
            <div className="card-year">{year}</div>
            <div className="card-category">{category}</div>
            <div className="card-tags">
              {tags?.map((t, i) => (
                <span className="tag" key={i}>{t}</span>
              ))}
            </div>
            <div className="card-logos" aria-label="Tecnologías / Logos">
              {logo?.map((src, i) => {
                const fullSrc = src.startsWith('/') ? src : `/assets/logos/${src}`;
                const alt = src.replace(/\/(.*\/)?/, '').replace(/[-_]/g, ' ').replace(/\..+$/, '');
                return (
                  <span className="logo-wrapper" key={i} title={alt}>
                    <img className="logo-img" src={fullSrc} alt={alt} loading="lazy" />
                  </span>
                );
              })}
            </div>
          </aside>
        </header>

        <div className="card-divider" />

        <section className="card-body">
          <div className="card-media">
            <div className="media-main">
              <MediaElement src={images?.main} alt={`${title} main`} />
            </div>
            <div className="media-side">
              {images?.thumbs?.slice(0, 2).map((src, i) => (
                <div className="thumb" key={i}>
                  <MediaElement src={src} alt={`${title} thumb ${i + 1}`} />
                </div>
              ))}
            </div>
            <div className="media-main">
              <MediaElement src={images?.main2} alt={`${title} main`} />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

const cards = [
  {
    title: "Trello App",
    view: "ALL PROJECTS >",
    link: "https://github.com/Stephanosalazar18",
    year: "2025",
    category: "Development",
    tecnologies: [
      "Next.js 14 (App Router)",
      "React 18",
      "TypeScript",
      "Prisma ORM",
      "PostgreSQL",
      "Clerk (auth & organizations)",
      "Stripe (suscripciones)",
      "TailwindCSS",
      "Zod",
      "React Hook Form",
      "TanStack Query",
      "Server Actions",
      "Unsplash API",
      "Lucide Icons"
    ],
    tags: [
      "Next.js",
      "React",
      "TypeScript",
      "Prisma",
      "PostgreSQL",
      "Stripe",
      "Clerk",
      "TailwindCSS",
      "Zod",
      "Server Actions"
    ],
    logo: [
      "/assets/logos/html5.svg", 
      "/assets/logos/css.svg",
      "/assets/logos/typescript.svg",
      "/assets/logos/react.svg",
      "/assets/logos/nodejs.svg",
      "/assets/logos/tailwindcss.svg",
      "/assets/logos/nextjs.svg",
      "/assets/logos/postgresql.svg",
      "/assets/logos/tanstack.svg",
      "/assets/logos/zod.svg",
      "/assets/logos/prisma.svg",
      "/assets/logos/supabase.svg",
      "/assets/logos/stripe.svg",
      "/assets/logos/clerk.svg",
    ],
    copy: "Kanban board-style application (Trello style) with management of organizations, boards, lists, and cards; drag & drop support, subscriptions, limits per plan, and responsive UI.",
    images: {
      main: "/assets/featured-1.jpg",
      main2: "/assets/featured-1.mp4",
      thumbs: ["/assets/featured-1-1.jpg", "/assets/featured-1-4.jpg"]
    }
  },
  {
    title: "Apple Website",
    year: "2025",
    category: "Development",
    tecnologies: [
      "Next.js 14",
      "React 18",
      "TypeScript",
      "TailwindCSS",
      "GSAP",
      "Prettier"
    ],
    tags: [
      "Next.js",
      "React",
      "JavaScript",
      "TailwindCSS",
      "GSAP",
      "Sentry",
      "UI/UX",
    ],
    logo: [
      "/assets/logos/html5.svg",
      "/assets/logos/css.svg",
      "/assets/logos/javascript.svg",
      "/assets/logos/react.svg",
      "/assets/logos/nodejs.svg",
      "/assets/logos/tailwindcss.svg",
      "/assets/logos/gsap.svg",
      "/assets/logos/vitejs.svg",
      "/assets/logos/sentry.svg",
    ],
    copy: "Landing type showcase inspired by Apple website: hero sections with animated scrolling, smooth transitions, reusable components, responsive design, image optimization, and a focus on microinteractions and performance.",
    images: {
      main: "/assets/featured-2.webm",
      main2: "/assets/featured-2-2.mp4",
      thumbs: ["/assets/featured-2-2.jpg", "/assets/featured-2-3.mp4"]
    }
  },
  {
    title: "Personal portfolio with Next.js and GSAP",
    year: "2025",
    category: "Web Development",
    tecnologies: [
      "Next.js",
      "React",
      "GSAP (GreenSock Animation Platform)",
    ],
    tags: [
      "Next.js",
      "GSAP",
      "Frontend",
      "React"
    ],
    logo: [
      "/assets/logos/html5.svg",
      "/assets/logos/css.svg",
      "/assets/logos/javascript.svg",
      "/assets/logos/nextjs.svg",
      "/assets/logos/react.svg",

    ],
    copy: "Interactive personal portfolio to showcase projects and skills. Developed with Next.js for optimized performance and server-side rendering. Includes complex animations and smooth page transitions implemented with the GSAP library, creating a dynamic and engaging user experience.",
    images: {
      main: "/assets/featured-3.mp4",
      main2: "/assets/featured-3-1.webm",
      thumbs: [
        "/assets/featured-3-3.webm",
        "/assets/featured-3-2.webm"
      ]
    }
  }
];

export default function DisplaceCard() {
  const container = useRef();
  const lenisRef = useRef();

  useEffect(() => {
    function update(time) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }
    gsap.ticker.add(update);
    return () => gsap.ticker.remove(update);
  }, []);

  useGSAP(() => {
    const cardEls = gsap.utils.toArray(".cards .card");
    if (!cardEls.length) return;
    ScrollTrigger.create({
      trigger: cardEls[0],
      start: "top top",
      endTrigger: cardEls[cardEls.length - 1],
      end: () => cardEls[cardEls.length - 1].getBoundingClientRect().height,
      pin: '.card-all',
      pinSpacing: false,
    });
    cardEls.forEach((cardEl, index) => {
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
      });
    });
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, { scope: container });

  // Solo Lenis sobre el contenido desplazable
  return (
    <>
      <ReactLenis root options={{ autoRaf: false }} ref={lenisRef} />
      <div className="displace-container" ref={container} id="Projects">
        <div className="card-all"></div>
        <section className="cards">
          {cards.map((card, index) => (
            <Card key={index} {...card} index={index} />
          ))}
        </section>
        <section className="outro">
          <Outro />
        </section>
      </div>
    </>
  );
}
