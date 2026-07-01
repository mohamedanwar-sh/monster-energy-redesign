import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { motion } from "../utils/motion";

gsap.registerPlugin(ScrollTrigger);

const benefits = [
  {
    eyebrow: "Benefit 01",
    title: "Clean ignition",
    detail: "A fast hit of energy without slowing the experience down.",
  },
  {
    eyebrow: "Benefit 02",
    title: "Locked-in focus",
    detail: "Built for long sessions when reaction time and attention matter.",
  },
  {
    eyebrow: "Benefit 03",
    title: "Harder output",
    detail: "A heavier charge for training, edits, streams, and late work.",
  },
  {
    eyebrow: "Benefit 04",
    title: "Full-send mode",
    detail: "That unmistakable Monster edge when the night keeps going.",
  },
];

const BenefitSection = () => {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const statements = gsap.utils.toArray(".benefit-chapter", section);
      const progressItems = gsap.utils.toArray(".benefit-step", section);
      const progressFill = section.querySelector(".benefit-progress-fill");
      const glow = section.querySelector(".benefit-story-glow");
      const claw = section.querySelector(".benefit-story-claw");
      const can = section.querySelector(".benefit-can");
      const rings = gsap.utils.toArray(".benefit-orbit", section);
      const stage = section.querySelector(".benefit-product-stage");

      gsap.set(statements, {
        autoAlpha: 0,
        yPercent: 16,
        scale: 0.96,
      });
      gsap.set(statements[0], {
        autoAlpha: 1,
        yPercent: 0,
        scale: 1,
      });
      gsap.set(progressFill, {
        scaleX: 1 / statements.length,
        transformOrigin: "left center",
      });
      gsap.set(progressItems, { autoAlpha: 0.34, scale: 0.92 });
      gsap.set(progressItems[0], { autoAlpha: 1, scale: 1 });
      gsap.set(rings, { autoAlpha: 0.36, scale: 0.92 });
      gsap.set(can, { yPercent: 0, rotate: 0, scale: 1 });
      gsap.set(stage, { yPercent: 0 });

      if (reduceMotion) {
        gsap.set(statements, { autoAlpha: 1, yPercent: 0, scale: 1 });
        gsap.set(progressFill, { scaleX: 1 });
        gsap.set(progressItems, { autoAlpha: 1, scale: 1 });
        gsap.set(rings, { autoAlpha: 0.5, scale: 1 });
        return undefined;
      }

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${Math.max(window.innerHeight * 3.35, 2800)}`,
          scrub: motion.scrub,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      statements.forEach((statement, index) => {
        if (index === 0) return;

        const previous = statements[index - 1];
        const previousStep = progressItems[index - 1];
        const currentStep = progressItems[index];
        const at = index * 1.12;

        timeline
          .to(
            previous,
            {
              autoAlpha: 0,
              yPercent: -14,
              scale: 0.95,
              duration: 0.78,
              ease: motion.ease.scrollScrub,
            },
            at,
          )
          .to(
            previousStep,
            {
              autoAlpha: 0.42,
              scale: 0.94,
              duration: 0.35,
              ease: motion.ease.scrollScrub,
            },
            at,
          )
          .to(
            statement,
            {
              autoAlpha: 1,
              yPercent: 0,
              scale: 1,
              duration: 0.88,
              ease: motion.ease.editorialReveal,
            },
            at + 0.12,
          )
          .to(
            currentStep,
            {
              autoAlpha: 1,
              scale: 1,
              duration: 0.45,
              ease: motion.ease.microInteraction,
            },
            at + 0.18,
          )
          .to(
            progressFill,
            {
              scaleX: (index + 1) / statements.length,
              duration: 0.72,
              ease: motion.ease.scrollScrub,
            },
            at + 0.08,
          )
          .to(
            can,
            {
              yPercent: index % 2 === 0 ? -3 : 3,
              rotate: index % 2 === 0 ? -1.25 : 1.25,
              scale: 1 + index * 0.018,
              duration: 0.86,
              ease: motion.ease.scrollScrub,
            },
            at,
          )
          .to(
            rings,
            {
              scale: 1 + index * 0.06,
              autoAlpha: 0.44 + index * 0.08,
              duration: 0.86,
              ease: motion.ease.scrollScrub,
            },
            at,
          );
      });

      timeline
        .to(stage, {
          yPercent: -4,
          duration: statements.length * 1.12,
          ease: motion.ease.scrollScrub,
        }, 0)
        .to(
          glow,
          {
            xPercent: 8,
            yPercent: -10,
            scale: 1.28,
            autoAlpha: 0.88,
            duration: statements.length * 1.12,
            ease: motion.ease.scrollScrub,
          },
          0,
        )
        .to(
          claw,
          {
            yPercent: -9,
            xPercent: -7,
            rotate: -2,
            duration: statements.length * 1.12,
            ease: motion.ease.scrollScrub,
          },
          0,
        );

      return () => timeline.kill();
    },
    { scope: sectionRef },
  );

  return (
    <section id="benefits" ref={sectionRef} className="benefit-section">
      <div className="benefit-story-glow" aria-hidden="true" />
        <img
          src="/images/m.png"
          alt=""
          loading="lazy"
          decoding="async"
          className="benefit-story-claw"
          draggable="false"
          aria-hidden="true"
      />

      <div className="benefit-story-inner">
        <div className="benefit-meta">
          <span>Benefits</span>
          <span>Scroll the charge</span>
        </div>

        <div className="benefit-product-stage" aria-hidden="true">
          <span className="benefit-orbit benefit-orbit--outer" />
          <span className="benefit-orbit benefit-orbit--inner" />
          <img
            src="/images/original-classic.webp"
            alt=""
            loading="lazy"
            decoding="async"
            className="benefit-can"
            draggable="false"
          />
          <img
            src="/images/m.png"
            alt=""
            loading="lazy"
            decoding="async"
            className="benefit-stage-claw"
            draggable="false"
          />
        </div>

        <div className="benefit-copy-panel">
          <div className="benefit-progress" aria-hidden="true">
            <span className="benefit-progress-fill" />
          </div>

          <div className="benefit-chapters">
            {benefits.map((benefit) => (
              <article key={benefit.title} className="benefit-chapter">
                <p>{benefit.eyebrow}</p>
                <h2>{benefit.title}</h2>
                <span>{benefit.detail}</span>
              </article>
            ))}
          </div>

          <div className="benefit-steps" aria-hidden="true">
            {benefits.map((benefit) => (
              <span key={benefit.eyebrow} className="benefit-step">
                {benefit.eyebrow.replace("Benefit ", "")}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitSection;
