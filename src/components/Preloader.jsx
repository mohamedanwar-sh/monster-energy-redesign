import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Preloader = ({ isReady, onExitStart, onComplete }) => {
  const rootRef = useRef(null);
  const didExitRef = useRef(false);

  /* ── Intro timeline ────────────────────────────────────── */
  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      gsap.set(".preloader__logo-mask", {
        clipPath: reduceMotion
          ? "inset(0% 0% 0% 0%)"
          : "inset(0% 100% 0% 0%)",
      });
      gsap.set(".preloader__logo", {
        autoAlpha: reduceMotion ? 1 : 0,
        y: reduceMotion ? 0 : 14,
      });
      gsap.set(".preloader__eyebrow, .preloader__status", {
        autoAlpha: reduceMotion ? 1 : 0,
        y: reduceMotion ? 0 : 12,
      });
      gsap.set(".preloader__progress-fill", { scaleX: 0 });
      gsap.set(".preloader__sweep", { xPercent: -120 });

      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });

      intro
        .to(".preloader__logo", {
          autoAlpha: 1,
          y: 0,
          duration: reduceMotion ? 0.01 : 0.55,
        })
        .to(
          ".preloader__logo-mask",
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: reduceMotion ? 0.01 : 1.05,
          },
          reduceMotion ? 0 : "<0.05"
        )
        .to(
          ".preloader__logo",
          {
            filter: "drop-shadow(0 0 28px rgba(110, 255, 0, 0.5))",
            duration: reduceMotion ? 0.01 : 0.8,
            ease: "power2.out",
          },
          "<0.2"
        )
        .to(
          ".preloader__eyebrow, .preloader__status",
          {
            autoAlpha: 1,
            y: 0,
            stagger: 0.08,
            duration: reduceMotion ? 0.01 : 0.45,
          },
          "<0.28"
        )
        .to(
          ".preloader__progress-fill",
          {
            scaleX: 0.78,
            duration: reduceMotion ? 0.01 : 1.8,
            ease: "power2.out",
          },
          "<0.12"
        )
        .to(
          ".preloader__sweep",
          {
            xPercent: 120,
            duration: reduceMotion ? 0.01 : 1.4,
            repeat: reduceMotion ? 0 : -1,
            repeatDelay: 0.35,
            ease: "power2.inOut",
          },
          "<0.15"
        )
        .to(
          ".preloader__glow",
          {
            opacity: reduceMotion ? 0.35 : 0.8,
            scale: reduceMotion ? 1 : 1.08,
            duration: reduceMotion ? 0.01 : 1.8,
            repeat: reduceMotion ? 0 : -1,
            yoyo: true,
            ease: "sine.inOut",
          },
          "<"
        );

      return () => intro.kill();
    },
    { scope: rootRef }
  );

  /* ── Exit timeline ─────────────────────────────────────── */
  useGSAP(
    () => {
      if (!isReady || didExitRef.current) return;

      didExitRef.current = true;
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const exit = gsap.timeline({
        defaults: { ease: "power3.inOut" },
        onStart: onExitStart,
        onComplete,
      });

      exit
        .to(".preloader__progress-fill", {
          scaleX: 1,
          duration: reduceMotion ? 0.01 : 0.42,
          ease: "power2.out",
        })
        .to(
          ".preloader__status",
          {
            autoAlpha: 0,
            y: -8,
            duration: reduceMotion ? 0.01 : 0.22,
          },
          ">-0.04"
        )
        .to(
          ".preloader__logo",
          {
            scale: reduceMotion ? 1 : 0.985,
            filter: "drop-shadow(0 0 42px rgba(110, 255, 0, 0.72))",
            duration: reduceMotion ? 0.01 : 0.3,
            ease: "power2.out",
          },
          "<"
        )
        .to(".preloader__panel", {
          yPercent: reduceMotion ? 0 : -4,
          autoAlpha: 0,
          duration: reduceMotion ? 0.01 : 0.55,
        })
        .to(
          rootRef.current,
          {
            yPercent: -100,
            duration: reduceMotion ? 0.01 : 0.9,
          },
          reduceMotion ? "<" : "<0.08"
        );

      return () => exit.kill();
    },
    { scope: rootRef, dependencies: [isReady], revertOnUpdate: true }
  );

  return (
    <aside
      ref={rootRef}
      className="preloader"
      aria-label="Loading Monster Energy experience"
      aria-live="polite"
    >
      <div className="preloader__texture" aria-hidden="true" />
      <div className="preloader__glow" aria-hidden="true" />
      <div className="preloader__vignette" aria-hidden="true" />

      <div className="preloader__panel">
        <p className="preloader__eyebrow">Monster Energy</p>

        <div className="preloader__mark-shell">
          <div className="preloader__scan" aria-hidden="true" />
          <div className="preloader__logo-mask" aria-hidden="true">
            <img
              src="/images/m.png"
              alt=""
              className="preloader__logo"
              draggable="false"
            />
          </div>
        </div>

        <div className="preloader__progress" aria-hidden="true">
          <span className="preloader__progress-rail" />
          <span className="preloader__progress-fill" />
          <span className="preloader__sweep" />
        </div>

        <p className="preloader__status">
          {isReady ? "Entering the energy" : "Chqarging the experience"}
        </p>
      </div>
    </aside>
  );
};

export default Preloader;