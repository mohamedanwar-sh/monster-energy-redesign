import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { motion } from "../utils/motion";

gsap.registerPlugin(ScrollTrigger);

const energyProfiles = [
  {
    label: "Energy Boost",
    value: 94,
    accent: "var(--color-monster-green)",
    description: "Fast ignition for high-output moments.",
  },
  {
    label: "Gaming Focus",
    value: 88,
    accent: "var(--color-ultra-blue)",
    description: "Clean alertness for long competitive runs.",
  },
  {
    label: "Workout Power",
    value: 82,
    accent: "var(--color-ultra-paradise)",
    description: "A steady charge for heavy sets and movement.",
  },
  {
    label: "Night Sessions",
    value: 91,
    accent: "var(--color-juice-mango)",
    description: "Built for late edits, streams, and deep focus.",
  },
];

const EnergyProfileSection = () => {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const rows = gsap.utils.toArray(".energy-profile-row", section);
      const bars = gsap.utils.toArray(".energy-profile-fill", section);
      const values = gsap.utils.toArray(".energy-profile-value", section);

      gsap.set(bars, { scaleX: 0, transformOrigin: "left center" });
      gsap.set(rows, { autoAlpha: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 20 });

      if (reduceMotion) {
        bars.forEach((bar) => {
          gsap.set(bar, { scaleX: Number(bar.dataset.value) / 100 });
        });
        values.forEach((value) => {
          value.textContent = `${value.dataset.value}%`;
        });
        return undefined;
      }

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 72%",
          once: true,
        },
      });

      timeline
        .to(rows, {
          autoAlpha: 1,
          y: 0,
          duration: 0.55,
          stagger: 0.08,
          ease: motion.ease.entrance,
        })
        .to(
          bars,
          {
            scaleX: (index, bar) => Number(bar.dataset.value) / 100,
            duration: 0.9,
            stagger: 0.08,
            ease: motion.ease.entrance,
          },
          "<0.12",
        );

      values.forEach((value, index) => {
        const counter = { amount: 0 };
        timeline.to(
          counter,
          {
            amount: Number(value.dataset.value),
            duration: 0.9,
            ease: motion.ease.microInteraction,
            onUpdate: () => {
              value.textContent = `${Math.round(counter.amount)}%`;
            },
          },
          0.18 + index * 0.08,
        );
      });

      return () => timeline.kill();
    },
    { scope: sectionRef },
  );

  return (
    <section id="energy-profile" ref={sectionRef} className="energy-profile-section">
      <div className="energy-profile-inner">
        <div className="energy-profile-heading">
          <p>Energy Profile</p>
          <h2>Dial your intensity</h2>
        </div>

        <div className="energy-profile-grid">
          {energyProfiles.map((profile) => (
            <article
              key={profile.label}
              className="energy-profile-row"
              style={{ "--profile-accent": profile.accent }}
            >
              <div className="energy-profile-meta">
                <div>
                  <h3>{profile.label}</h3>
                  <p>{profile.description}</p>
                </div>
                <span className="energy-profile-value" data-value={profile.value}>
                  0%
                </span>
              </div>

              <div
                className="energy-profile-track"
                role="meter"
                aria-label={profile.label}
                aria-valuemin="0"
                aria-valuemax="100"
                aria-valuenow={profile.value}
              >
                <span
                  className="energy-profile-fill"
                  data-value={profile.value}
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EnergyProfileSection;
