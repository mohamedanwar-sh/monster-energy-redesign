import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { motion } from "../utils/motion";

const HeroSection = () => {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const heroVideo = section.querySelector(".hero-video");
      const heroTexture = section.querySelector(".hero-texture");
      const heroCopy = section.querySelector(".hero-copy");
      const heroActions = section.querySelector(".hero-actions");
      const heroScrollCue = section.querySelector(".hero-scroll-cue");
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (!reduceMotion) {
        gsap.fromTo(
          [heroCopy, heroActions, heroScrollCue],
          { autoAlpha: 0, y: 24 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.85,
            stagger: 0.08,
            delay: 0.15,
            ease: motion.ease.entrance,
          },
        );
      }

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

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !("IntersectionObserver" in window)) {
      setShouldLoadVideo(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        setShouldLoadVideo(true);
        observer.disconnect();
      },
      { rootMargin: "0px" },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!shouldLoadVideo) return;

    const video = videoRef.current;
    if (!video) return;

    video.load();
    video.play().catch(() => {});
  }, [shouldLoadVideo]);

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
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster="/videos/posters/zaza-poster.webp"
            className="hero-video absolute inset-0 w-full h-full object-cover"
            aria-label="Monster Energy hero video"
          >
            {shouldLoadVideo && (
              <>
                <source src="/videos/zaza.webm" type="video/webm" />
                <source src="/videos/zaza.mp4" type="video/mp4" />
              </>
            )}
          </video>

          {/* vignette — darkens edges only, centre stays bright */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.42) 42%, rgba(0,0,0,0.18) 100%), radial-gradient(ellipse at center, transparent 38%, rgba(0,0,0,0.62) 100%)",
            }}
          />
        </div>

        <div className="hero-content">
          <div className="hero-copy">
            <p>Monster Energy Redesign Concept</p>
            <h1>Unleash a sharper energy experience.</h1>
            <span>
              A premium landing page concept for Monster fans, built around bold
              motion, flavor discovery, product energy, and creator reviews.
            </span>
          </div>

          <div className="hero-actions" aria-label="Primary page actions">
            <a href="#flavors">Explore flavors</a>
            <a href="#testimonials">Watch reviews</a>
          </div>

          <a href="#about" className="hero-scroll-cue" aria-label="Scroll to brand story">
            <span>Scroll the drop</span>
            <i aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
