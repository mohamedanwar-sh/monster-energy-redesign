import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText, ScrollTrigger } from "gsap/all";
import { useRef } from "react";
import { motion } from "../utils/motion";

gsap.registerPlugin(SplitText, ScrollTrigger);

const MessageSection = () => {
  const sectionRef = useRef(null);

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  useGSAP(
    () => {
      const firstMsgSplit = SplitText.create(".first-message", {
        type: "words",
      });
      const secMsgSplit = SplitText.create(".second-message", {
        type: "words",
      });
      const paragraphSplit = SplitText.create(".message-content p", {
        type: "words,lines",
        linesClass: "paragraph-line",
        aria: "none",
      });

      if (prefersReducedMotion) {
        gsap.set(firstMsgSplit.words, { color: "var(--color-white)" });
        gsap.set(secMsgSplit.words,   { color: "var(--color-white)" });
        gsap.set(".msg-text-scroll", {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        });
        return () => {
          firstMsgSplit.revert();
          secMsgSplit.revert();
          paragraphSplit.revert();
        };
      }

      gsap.fromTo(
        firstMsgSplit.words,
        { color: "rgba(255,255,255,0.08)" },
        {
          color: "var(--color-white)",
          ease: motion.ease.scrollScrub,
          stagger: 0.35,
          scrollTrigger: {
            trigger: ".first-message",
            start: "top 70%",
            end: "bottom 40%",
            scrub: motion.scrub,
          },
        }
      );

      gsap.fromTo(
        secMsgSplit.words,
        { color: "rgba(255,255,255,0.08)" },
        {
          color: "var(--color-white)",
          ease: motion.ease.scrollScrub,
          stagger: 0.35,
          scrollTrigger: {
            trigger: ".second-message",
            start: "top center",
            end: "bottom 40%",
            scrub: motion.scrub,
          },
        }
      );

      gsap.to(".msg-text-scroll", {
        duration: 1,
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        ease: motion.ease.editorialReveal,
        scrollTrigger: {
          trigger: ".msg-text-scroll",
          start: "top 65%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(paragraphSplit.words, {
        yPercent: 110,
        rotate: 1.5,
        autoAlpha: 0,
        ease: motion.ease.entrance,
        duration: 0.8,
        stagger: 0.012,
        scrollTrigger: {
          trigger: ".message-content p",
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      return () => {
        firstMsgSplit.revert();
        secMsgSplit.revert();
        paragraphSplit.revert();
      };
    },
    { scope: sectionRef }
  );

  return (
    <section id="about" ref={sectionRef} className="message-content">

      {/* ── Background texture ─────────────────────────────────────────
          Layer order (bottom → top):
          1. black base (from .message-content in globals)
          2. texture image  — opacity raised so it actually shows
          3. thin dark gradient — only darkens edges, not the centre
      ──────────────────────────────────────────────────────────────── */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Texture — opacity 50% mobile / 45% desktop so it's clearly visible */}
          <img
            src="/images/texture.webp"
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover opacity-50 md:opacity-45"
            style={{ mixBlendMode: "luminosity" }}   /* keeps it desaturated on black bg */
          />
        {/* Subtle vignette — only dims edges, centre stays bright */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.55) 100%)",
          }}
        />
      </div>

      {/* ── Green top edge ──────────────────────────────────────────── */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-monster-green z-10" />

      {/* ── Main content ────────────────────────────────────────────── */}
      <div className="container mx-auto flex justify-center items-center
                      py-16 md:py-28 px-4 md:px-0 relative z-10">
        <div className="w-full h-full">

          <div className="msg-wrapper">

            {/* First headline */}
            <h1
              className="first-message general-title
                         2xl:max-w-4xl md:max-w-2xl max-w-[85vw]
                         text-center font-display"
              style={{ color: "rgba(255,255,255,0.08)" }}
            >
              Born to be wild and
            </h1>

            {/* "Unleash the Beast" scrolling band */}
            <div
              style={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)" }}
              className="msg-text-scroll"
            >
              <div
                className="px-4 md:px-8 pb-2 md:pb-5 border-[3px] md:border-[.5vw] border-black"
                style={{ backgroundColor: "var(--color-monster-green)" }}
              >
                <h2
                  className="general-title font-display"
                  style={{ color: "var(--color-black)" }}
                >
                  Unleash the Beast
                </h2>
              </div>
            </div>

            {/* Second headline */}
            <h1
              className="second-message general-title
                         2xl:max-w-7xl md:max-w-4xl max-w-[85vw]
                         text-center font-display"
              style={{ color: "rgba(255,255,255,0.08)" }}
            >
              fuel every drop of raw energy within you
            </h1>

          </div>

          {/* Paragraph */}
          <div className="flex justify-center items-center mt-8 md:mt-20">
            <div className="max-w-md px-5 md:px-10 flex justify-center items-center overflow-hidden">
              <p
                className="text-center text-sm md:text-lg leading-relaxed font-body"
                style={{ color: "var(--color-monster-gray)" }}
              >
                Monster Energy delivers a big, bad buzz — born from athletes,
                artists, and rebels who refuse to slow down. One sip. Unstoppable.
              </p>
            </div>
          </div>

          {/* Glow dot */}
          <div
            className="absolute left-1/2 -translate-x-1/2 bottom-6 md:bottom-12 w-1 h-1 rounded-full"
            style={{
              backgroundColor: "var(--color-monster-green)",
              boxShadow: "0 0 24px 8px rgba(124,183,1,0.5)",
            }}
          />

        </div>
      </div>

      {/* ── Green bottom edge ───────────────────────────────────────── */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-monster-green z-10" />

    </section>
  );
};

export default MessageSection;
