import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { motion } from "../utils/motion";

const HeroSection = () => {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const heroVideo = section.querySelector(".hero-video");
      const heroTexture = section.querySelector(".hero-texture");

      const heroTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "1% top",
          end: "bottom top",
          scrub: motion.scrub,
        },
      });

      heroTl
        .to(heroVideo, {
          scale: 1.04,
          yPercent: 8,
          ease: motion.ease.scrollScrub,
        })
        .to(
          heroTexture,
          {
            yPercent: -6,
            opacity: 0.35,
            ease: motion.ease.scrollScrub,
          },
          "<",
        );
    },
    { scope: sectionRef },
  );

  return (
    <section id="top" ref={sectionRef} className="bg-main-bg" data-testid="hero-section">
      <div className="hero-container">
        <div className="absolute inset-0 z-1 overflow-hidden pointer-events-none">
          <img
            src="/images/texture.webp"
            alt=""
            aria-hidden="true"
            fetchPriority="high"
            decoding="async"
            className="hero-texture w-full h-full object-cover opacity-50 md:opacity-45"
            style={{ mixBlendMode: "luminosity" }}
          />

          <video
            src="/videos/zaza.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="hero-video absolute inset-0 w-full h-full object-cover"
            aria-label="Monster Energy hero video"
          />

          {/* vignette — darkens edges only, centre stays bright */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.55) 100%)",
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
