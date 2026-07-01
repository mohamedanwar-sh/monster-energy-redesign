import { useGSAP } from "@gsap/react";
import { flavorlists } from "../constants/index.js";
import gsap from "gsap";
import { useRef } from "react";
import { useMediaQuery } from "react-responsive";
import { motion } from "../utils/motion";

const FlavorSlider = () => {
  const sliderRef = useRef(null);
  const isTablet = useMediaQuery({
    query: "(max-width: 1024px)",
  });

  useGSAP(
    () => {
      const slider = sliderRef.current;
      const section = slider?.closest(".flavor-section");
      if (!slider || !section) return;

      const q = gsap.utils.selector(slider);
      const firstTitle = section.querySelector(".first-text-split");
      const flavorBand = section.querySelector(".flavor-text-scroll");
      const secondTitle = section.querySelector(".second-text-split");
      const scrollAmount = Math.max(slider.scrollWidth - window.innerWidth, 0);
      let horizontalTl;

      // Desktop horizontal pin.
      if (!isTablet && scrollAmount > 0) {
        horizontalTl = gsap.timeline({
          id: "flavor-scroll-tl",
          scrollTrigger: {
            trigger: section,
            start: "2% top",
            end: `+=${scrollAmount + 1050}px`,
            scrub: motion.scrub,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
        horizontalTl.to(section, {
          x: `-${scrollAmount + 1050}px`,
          ease: motion.ease.scrollScrub,
        });
      }

      if (firstTitle && flavorBand && secondTitle) {
        const titleTl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom 80%",
            scrub: motion.scrub,
          },
        });

        titleTl
          .to(firstTitle, {
            xPercent: -30,
            ease: motion.ease.scrollScrub,
          })
          .to(
            flavorBand,
            { xPercent: -22, ease: motion.ease.scrollScrub },
            "<",
          )
          .to(
            secondTitle,
            { xPercent: -10, ease: motion.ease.scrollScrub },
            "<",
          );
      }

      q(".flavor-card").forEach((card) => {
        const bg = card.querySelector(".flavor-bg");
        const elements = card.querySelector(".flavor-elements");

        if (!isTablet && horizontalTl) {
          if (bg) {
            gsap.fromTo(
              bg,
              { yPercent: 30, autoAlpha: 0, scale: 1.08 },
              {
                yPercent: 0,
                autoAlpha: 1,
                scale: 1,
                duration: 1.2,
                ease: motion.ease.microInteraction,
                scrollTrigger: {
                  trigger: card,
                  start: "left 85%",
                  toggleActions: "play none none reverse",
                  containerAnimation: horizontalTl,
                },
              },
            );
          }

          if (elements) {
            gsap.fromTo(
              elements,
              { yPercent: 20, autoAlpha: 0 },
              {
                yPercent: 0,
                autoAlpha: 1,
                duration: 1,
                delay: 0.2,
                ease: motion.ease.microInteraction,
                scrollTrigger: {
                  trigger: card,
                  start: "left 85%",
                  toggleActions: "play none none reverse",
                  containerAnimation: horizontalTl,
                },
              },
            );
          }

          return;
        }

        if (bg) {
          gsap.fromTo(
            bg,
            { yPercent: 25, autoAlpha: 0, scale: 1.06 },
            {
              yPercent: 0,
              autoAlpha: 1,
              scale: 1,
              duration: 1.2,
              ease: motion.ease.microInteraction,
              scrollTrigger: {
                trigger: card,
                start: "top 88%",
                toggleActions: "play none none reverse",
              },
            },
          );
        }

        if (elements) {
          gsap.fromTo(
            elements,
            { yPercent: 15, autoAlpha: 0 },
            {
              yPercent: 0,
              autoAlpha: 1,
              duration: 1,
              ease: motion.ease.microInteraction,
              scrollTrigger: {
                trigger: card,
                start: "top 88%",
                toggleActions: "play none none reverse",
              },
            },
          );
        }
      });
    },
    { dependencies: [isTablet], scope: sliderRef, revertOnUpdate: true },
  );

  return (
    <div ref={sliderRef} className="slider-wrapper bg-black">
      <div className="flavors">
        {flavorlists.map((flavor) => (
          <div
            key={flavor.name}
            className={`flavor-card relative z-30 w-[min(22rem,calc(100vw-2rem))] flex-none lg:w-[50vw] lg:h-[70vh] md:w-[90vw] md:h-[50vh] h-80 ${flavor.rotation}`}
          >
            {/* bg svg — animated: float up + fade in */}
            {flavor.bg && (
              <img
                src={`/images/${flavor.bg}`}
                alt=""
                loading="lazy"
                decoding="async"
                className="flavor-bg absolute bottom-0 w-full max-w-full object-contain"
                style={{ opacity: 0 }}        /* start hidden; GSAP reveals */
              />
            )}

            {/* drink can — static, always visible */}
            <img
              src={`/images/${flavor.drink}`}
              alt={flavor.name}
              loading="lazy"
              decoding="async"
              className="drinks"
            />

            {/* elements — animated: float up + fade in after bg */}
            {flavor.elements && (
              <img
                src={`/images/${flavor.elements}`}
                alt=""
                loading="lazy"
                decoding="async"
                className="flavor-elements elements"
                style={{ opacity: 0 }}        /* start hidden; GSAP reveals */
              />
            )}

            {/* flavor name */}
            <h1 style={{ color: flavor.accent }}>{flavor.name}</h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlavorSlider;
