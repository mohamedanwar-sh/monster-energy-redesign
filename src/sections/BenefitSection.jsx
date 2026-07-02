import { memo, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { motion } from "../utils/motion";

gsap.registerPlugin(ScrollTrigger);

const benefits = [
  {
    eyebrow: "01",
    title: "Clean ignition",
    detail: "Fast energy for the first move, the first rep, or the first late-night edit.",
    stat: "Fast hit",
  },
  {
    eyebrow: "02",
    title: "Locked-in focus",
    detail: "Built for long sessions when timing, attention, and consistency matter.",
    stat: "Deep work",
  },
  {
    eyebrow: "03",
    title: "Harder output",
    detail: "A heavier charge for training, streams, creative work, and high-pressure moments.",
    stat: "More drive",
  },
  {
    eyebrow: "04",
    title: "Full-send mode",
    detail: "That unmistakable Monster edge when the pace climbs and the night keeps going.",
    stat: "Max edge",
  },
];

const BenefitSection = () => {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return undefined;

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const revealItems = gsap.utils.toArray(".benefit-reveal", section);
      const can = section.querySelector(".benefit-can");
      const rings = gsap.utils.toArray(".benefit-orbit", section);

      gsap.set(revealItems, { autoAlpha: 0, y: 28 });
      gsap.set(can, { y: 10, rotate: -2, scale: 0.98, force3D: true });
      gsap.set(rings, { scale: 0.94, opacity: 0.28, force3D: true });

      if (reduceMotion) {
        gsap.set(revealItems, { autoAlpha: 1, y: 0 });
        gsap.set(can, { y: 0, rotate: 0, scale: 1 });
        gsap.set(rings, { scale: 1, opacity: 0.46 });
        return undefined;
      }

      const intro = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 72%",
          once: true,
        },
      });

      intro
        .to(revealItems, {
          autoAlpha: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.08,
          ease: motion.ease.entrance,
        })
        .to(
          can,
          {
            y: 0,
            rotate: 0,
            scale: 1,
            duration: 1,
            ease: motion.ease.editorialReveal,
          },
          0.08,
        )
        .to(
          rings,
          {
            scale: 1,
            opacity: 0.46,
            duration: 1,
            stagger: 0.08,
            ease: motion.ease.editorialReveal,
          },
          0.12,
        );

      const float = gsap.to(can, {
        y: -12,
        rotate: 1.2,
        duration: 3.6,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      return () => {
        intro.scrollTrigger?.kill();
        intro.kill();
        float.kill();
      };
    },
    { scope: sectionRef },
  );

  return (
    <section id="benefits" ref={sectionRef} className="benefit-section">
      <div className="benefit-atmosphere" aria-hidden="true" />

      <div className="benefit-inner">
        <div className="benefit-copy benefit-reveal">
          <p className="benefit-kicker">Why it hits different</p>
          <h2>Energy built for momentum.</h2>
          <p>
            From the first sip to the final push, Monster keeps the experience
            direct: bold flavor, fast energy, and enough edge to keep momentum alive.
          </p>
          <a href="#testimonials" className="benefit-next-link">
            See what people are saying
          </a>
        </div>

        <div className="benefit-showcase benefit-reveal" aria-hidden="true">
          <span className="benefit-orbit benefit-orbit--outer" />
          <span className="benefit-orbit benefit-orbit--inner" />
          <span className="benefit-energy-line benefit-energy-line--top" />
          <span className="benefit-energy-line benefit-energy-line--bottom" />
          <img
            src="/images/original-classic.webp"
            alt=""
            loading="lazy"
            decoding="async"
            className="benefit-can"
            draggable="false"
          />
          <img
            src="/images/monster-claw-mark.webp"
            alt=""
            loading="lazy"
            decoding="async"
            className="benefit-claw"
            draggable="false"
          />
        </div>

        <div className="benefit-grid">
          {benefits.map((benefit) => (
            <article key={benefit.title} className="benefit-card benefit-reveal">
              <div className="benefit-card-top">
                <span>{benefit.eyebrow}</span>
                <strong>{benefit.stat}</strong>
              </div>
              <h3>{benefit.title}</h3>
              <p>{benefit.detail}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default memo(BenefitSection);
