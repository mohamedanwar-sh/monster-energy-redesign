import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { lazy, Suspense, useEffect, useLayoutEffect, useState } from "react";

import NavBar from "./components/NavBar";
import Preloader from "./components/Preloader";

import HeroSection from "./sections/HeroSection";

const DeferredSections = lazy(() => import("./sections/DeferredSections"));

gsap.registerPlugin(ScrollTrigger);

// ============================
// Critical Assets
// ============================
const criticalAssets = [
  { type: "image", src: "/images/monster-energy-logo.webp" },
  { type: "image", src: "/images/monster-claw-mark.webp" },
  { type: "image", src: "/images/texture.webp" },
];

// ============================
// Helpers
// ============================
const wait = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const withTimeout = (promise, ms) =>
  Promise.race([promise, wait(ms)]);

const waitForImage = (src) =>
  new Promise((resolve) => {
    const img = new Image();

    const finish = () => {
      if (img.decode) {
        img.decode().catch(() => {}).finally(resolve);
      } else {
        resolve();
      }
    };

    img.onload = finish;
    img.onerror = resolve;
    img.src = src;
  });

const waitForVideo = (src) =>
  new Promise((resolve) => {
    const video = document.createElement("video");

    let finished = false;

    const complete = () => {
      if (finished) return;

      finished = true;
      clearTimeout(timeout);

      video.removeAttribute("src");
      video.load();

      resolve();
    };

    const timeout = setTimeout(complete, 4500);

    video.preload = "auto";
    video.muted = true;
    video.playsInline = true;

    video.addEventListener("loadeddata", complete, { once: true });
    video.addEventListener("canplaythrough", complete, { once: true });
    video.addEventListener("error", complete, { once: true });

    video.src = src;
    video.load();
  });

const preloadCriticalAssets = () =>
  Promise.all(
    criticalAssets.map((asset) =>
      withTimeout(
        asset.type === "video"
          ? waitForVideo(asset.src)
          : waitForImage(asset.src),
        5000
      )
    )
  );

const resetWindowScroll = () => {
  const root = document.documentElement;
  const previousScrollBehavior = root.style.scrollBehavior;

  root.style.scrollBehavior = "auto";
  window.scrollTo({ top: 0, left: 0, behavior: "auto" });

  window.requestAnimationFrame(() => {
    root.style.scrollBehavior = previousScrollBehavior;
  });
};

// ============================
// App
// ============================
const App = () => {
  const [assetsReady, setAssetsReady] = useState(false);
  const [contentVisible, setContentVisible] = useState(true);
  const [showPreloader, setShowPreloader] = useState(true);

  useLayoutEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    resetWindowScroll();
  }, []);

  // Preload assets
  useEffect(() => {
    let mounted = true;

    Promise.all([
      preloadCriticalAssets(),
      wait(650), // Minimum loader duration
    ]).then(() => {
      if (mounted) setAssetsReady(true);
    });

    return () => {
      mounted = false;
    };
  }, []);

  // Lock scroll while preloader is active
  useEffect(() => {
    document.documentElement.classList.toggle(
      "preloader-active",
      showPreloader
    );

    return () => {
      document.documentElement.classList.remove("preloader-active");
    };
  }, [showPreloader]);

  useEffect(() => {
    if (showPreloader) return undefined;

    let nestedFrame;
    const frame = window.requestAnimationFrame(() => {
      resetWindowScroll();
      ScrollTrigger.refresh();

      nestedFrame = window.requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    });

    return () => {
      window.cancelAnimationFrame(frame);
      if (nestedFrame) window.cancelAnimationFrame(nestedFrame);
    };
  }, [showPreloader]);

  return (
    <>
      <main
        data-testid="app-shell"
        className={`app-shell ${
          contentVisible
            ? "app-shell--visible"
            : "app-shell--hidden"
        }`}
        aria-hidden={showPreloader}
      >
        <NavBar />

        <HeroSection />

        <Suspense fallback={null}>
          <DeferredSections />
        </Suspense>
      </main>

      {showPreloader && (
        <Preloader
          isReady={assetsReady}
          onExitStart={() => {
            resetWindowScroll();
            setContentVisible(true);
          }}
          onComplete={() => setShowPreloader(false)}
        />
      )}
    </>
  );
};

export default App;
