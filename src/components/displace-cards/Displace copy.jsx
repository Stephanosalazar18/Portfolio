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
    const footer = document.querySelector("#footer");
    const lastCard = document.querySelector("#card-3");
    const sectionCards = gsap.utils.toArray(".card");

    // ScrollTrigger.create({
    //   trigger: cards[0],
    //   start: "top top",
    //   endTrigger: cards[cards.length - 1],
    //   end: index === cards.length
    //     ? `+=${cards.length * 100}vh`
    //     : "top top",
    //   pin: true,
    //   pinSpacing: false,
    //   scrub: 1,
    // });

    sectionCards.forEach((card, index, cards) => {
      // const isLastCard = index === cards.length - 1;
      // const cardInner = card.querySelector(`#card-${index + 1}`);
      let nextCard = cards[index + 1] || lastCard
      let endScalePoint = `top+=${nextCard.offsetTop - card.offsetTop}`

      // if (!isLastCard) {
      //   ScrollTrigger.create({
      //     trigger: card,
      //     start: "top top",
      //     endTrigger: ".outro",
      //     end: "top top",
      //     pin: true,
      //     pinSpacing: false,
      //   });

      gsap.to(card, {
        scrollTrigger: {
          trigger: card,
          start: "top top",
          end: index === cards.length
            ? `+=${lastCard.offsetHeight / 2}`
            : footer.offsetTop - window.innerHeight,
          pin: true,
          scrub: true,
        },
      });
    })
    },
  );

  return (
    <div className="displace-container" ref={container}>

      <div className="card-all"></div>
      <section className="cards">
        {cards.map((card, index) => (
          <Card key={index} {...card} index={index} />
        ))}
      </section>

    </div>
  );
}
