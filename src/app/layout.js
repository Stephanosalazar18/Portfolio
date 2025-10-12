import "./globals.css";

export const metadata = {
  title: "Stephano Salazar | Portfolio",
  description: "Portfolio interactivo de Stephano Salazar. Proyectos destacados, animaciones web, desarrollo frontend y backend con Next.js, React, GSAP, Tailwind y más.",
  keywords: [
    "Portfolio",
    "Stephano Salazar",
    "Frontend Developer",
    "Backend Developer",
    "Web developer",
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
        <img className="background-image" src="/background-texture3.jpg" alt="background" />
        {children}
      </body>
    </html>
  );
}
