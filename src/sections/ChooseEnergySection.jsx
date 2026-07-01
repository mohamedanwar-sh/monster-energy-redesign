import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { flavorlists } from "../constants";
import { motion } from "../utils/motion";

const ChooseEnergySection = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const sectionRef = useRef(null);
  const canRefs = useRef([]);
  const detailRef = useRef(null);
  const selectedFlavor = flavorlists[selectedIndex];

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      gsap.to(section, {
        "--energy-glow": selectedFlavor.glowColor,
        duration: 0.55,
        ease: motion.ease.microInteraction,
      });

      canRefs.current.forEach((can, index) => {
        if (!can) return;

        gsap.to(can, {
          autoAlpha: index === selectedIndex ? 1 : 0,
          xPercent: index === selectedIndex ? 0 : 20,
          yPercent: index === selectedIndex ? 0 : 4,
          scale: index === selectedIndex ? 1 : 0.82,
          rotate: index === selectedIndex ? 0 : -3,
          duration: index === selectedIndex ? 0.65 : 0.28,
          ease: motion.ease.entrance,
          overwrite: true,
        });
      });

      gsap.fromTo(
        detailRef.current,
        { autoAlpha: 0, y: 18 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.48,
          ease: motion.ease.entrance,
          overwrite: true,
        },
      );
    },
    { scope: sectionRef, dependencies: [selectedIndex] },
  );

  return (
    <section
      id="choose-energy"
      ref={sectionRef}
      className="choose-energy-section"
      style={{ "--energy-glow": selectedFlavor.glowColor }}
    >
      <div className="choose-energy-inner">
        <div className="choose-energy-copy">
          <p className="choose-energy-kicker">Choose Your Energy</p>
          <h2>
            Pick the charge
            <span>for your next mode.</span>
          </h2>
        </div>

        <div className="choose-energy-stage" aria-live="polite">
          <div className="choose-energy-glow" aria-hidden="true" />
          {flavorlists.map((flavor, index) => (
            <img
              key={flavor.name}
              ref={(node) => {
                canRefs.current[index] = node;
              }}
              src={`/images/${flavor.drink}`}
              alt={flavor.name}
              loading="lazy"
              decoding="async"
              className="choose-energy-can"
              draggable="false"
            />
          ))}
        </div>

        <div className="choose-energy-panel">
          <div ref={detailRef} className="choose-energy-details">
            <p className="choose-energy-label">Selected flavor</p>
            <h3 style={{ color: selectedFlavor.accent }}>{selectedFlavor.name}</h3>
            <div className="choose-energy-notes">
              {selectedFlavor.notes.map((note) => (
                <span key={note}>{note}</span>
              ))}
            </div>
            <div className="choose-energy-best">
              <span>Best For</span>
              <p>{selectedFlavor.bestFor}</p>
            </div>
          </div>

          <div className="choose-energy-selector" aria-label="Choose a Monster flavor">
            {flavorlists.map((flavor, index) => (
              <button
                key={flavor.name}
                type="button"
                className="choose-energy-option"
                aria-pressed={selectedIndex === index}
                aria-label={`Select ${flavor.name}`}
                onClick={() => setSelectedIndex(index)}
                style={{ "--option-accent": flavor.glowColor }}
              >
                <span className="choose-energy-swatch" aria-hidden="true" />
                <span>{flavor.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChooseEnergySection;
