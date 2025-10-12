import "./globals.css";

export const metadata = {
  title: "Stephano Salazar | Portfolio",
  description: "Portfolio interactivo de Stephano Salazar. Proyectos destacados, animaciones web, desarrollo frontend y backend con Next.js, React, GSAP, Tailwind y más.",
  keywords: [
    "Portfolio",
    "Stephano Salazar",
    "Frontend Developer",
    "Backend Developer",
    "Web Developer",
  ],
  author: [{ name: "Stephano Salazar", url: "https://github.com/Stephanosalazar18" }],
  // openGraph: {
  //   title: "Stephano Salazar | Portfolio",
  //   description: "Portfolio interactivo con proyectos destacados y animaciones web.",
  //   url: "https://tu-dominio.com",
  //   siteName: "Stephano Salazar Portfolio",
  //   images: [
  //     {
  //       url: "/background-texture3.jpg",
  //       width: 1200,
  //       height: 630,
  //       alt: "Portfolio Stephano Salazar"
  //     }
  //   ],
  //   locale: "es_ES",
  //   type: "website"
  // },
  // twitter: {
  //   card: "summary_large_image",
  //   title: "Stephano Salazar | Portfolio",
  //   description: "Portfolio interactivo con proyectos destacados y animaciones web.",
  //   images: ["/background-texture3.jpg"]
  // }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={` antialiased`}
      >
        <svg style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}>
          <filter id="grain">
            {/* Genera un ruido tipo fractal */}
            <feTurbulence 
              type="fractalNoise" 
              baseFrequency="0.65" 
              numOctaves="3" 
              result="noise" 
            />
            {/* Desatura el ruido (lo hace blanco y negro) */}
            <feColorMatrix type="saturate" values="0" />
            {/* Ajusta la opacidad del ruido */}
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.5"/>
            </feComponentTransfer>
            {/* Mezcla la imagen original con el ruido generado */}
            <feBlend mode="multiply" in="SourceGraphic" in2="noise" />
          </filter>
        </svg>
        <img className="background-image" src="/background-texture3.jpg" alt="background" />
        {children}
      </body>
    </html>
  );
}
