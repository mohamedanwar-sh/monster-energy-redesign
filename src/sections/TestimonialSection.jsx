import { useCallback, useEffect, useRef, useState } from "react";
import { cards } from "../constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useMediaQuery } from "react-responsive";
import { motion } from "../utils/motion";

const TestimonialSection = () => {
  const sectionRef = useRef(null);
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);
  const triggerButtonRef = useRef(null);
  const vdRef = useRef([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isDesktop = useMediaQuery({ query: "(min-width: 1280px)" });
  const modalTitleId = "testimonial-modal-title";
  const modalDescriptionId = "testimonial-modal-description";

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const q = gsap.utils.selector(section);
      const titleOne = q(".first-title");
      const titleTwo = q(".sec-title");
      const titleThree = q(".third-title");
      const videoCards = q(".vd-card");
      const pinBox = q(".pin-box")[0];
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reduceMotion) {
        gsap.set(videoCards, { autoAlpha: 1, yPercent: 0, scale: 1 });
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: motion.scrub,
        },
      });

      tl.to(titleOne, {
        xPercent: isDesktop ? 42 : 8,
        opacity: 0.88,
        ease: motion.ease.scrollScrub,
      })
        .to(
          titleTwo,
          { xPercent: isDesktop ? 16 : 4, opacity: 0.92, ease: motion.ease.scrollScrub },
          "<"
        )
        .to(
          titleThree,
          { xPercent: isDesktop ? -32 : -7, opacity: 0.88, ease: motion.ease.scrollScrub },
          "<"
        );

      if (!isDesktop) {
        gsap.fromTo(videoCards, {
          yPercent: 12,
          autoAlpha: 0,
          scale: 0.96,
        }, {
          yPercent: 0,
          autoAlpha: 1,
          scale: 1,
          stagger: 0.08,
          duration: 0.7,
          ease: motion.ease.entrance,
          scrollTrigger: {
            trigger: pinBox,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        });
        return;
      }

      const pinTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "10% top",
          end: "200% top",
          scrub: motion.scrub,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      pinTl.fromTo(videoCards, {
        yPercent: 55,
        autoAlpha: 0,
        scale: 0.92,
      }, {
        yPercent: 0,
        autoAlpha: 1,
        scale: 1,
        stagger: 0.2,
        ease: motion.ease.scrollScrub,
      });
    },
    { dependencies: [isDesktop], scope: sectionRef, revertOnUpdate: true }
  );

  const handlePlay = (index) => {
    const video = vdRef.current[index];
    if (video && video.paused) {
      video.play().catch((error) => console.warn("Play error:", error));
    }
  };

  const handlePause = (index) => {
    const video = vdRef.current[index];
    if (video && !video.paused) {
      video.pause();
    }
  };

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedVideo(null);

    window.requestAnimationFrame(() => {
      triggerButtonRef.current?.focus();
    });
  }, []);

  useEffect(() => {
    if (!isModalOpen) return undefined;

    closeButtonRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeModal();
        return;
      }

      if (event.key !== "Tab") return;

      const modal = modalRef.current;
      if (!modal) return;

      const focusableElements = modal.querySelectorAll(
        'button, [href], iframe, video[controls], [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (!firstElement || !lastElement) {
        event.preventDefault();
        return;
      }

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isModalOpen, closeModal]);

  const handleClick = (link, cardName, triggerButton) => {
    if (link) {
      triggerButtonRef.current = triggerButton;
      setSelectedVideo({ link, name: cardName });
      setIsModalOpen(true);
    }
  };

  const getYouTubeEmbedUrl = (url) => {
    if (url.includes("youtube.com/shorts/")) {
      const videoId = url.split("/shorts/")[1]?.split("?")[0];
      return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    }
    if (url.includes("youtu.be")) {
      const videoId = url.split("/").pop()?.split("?")[0];
      return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    }
    if (url.includes("watch?v=")) {
      const videoId = url.split("v=")[1]?.split("&")[0];
      return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    }
    return url;
  };

  return (
    <>
      <section
        id="testimonials"
        ref={sectionRef}
        className="testimonials-section"
        data-testid="testimonials-section"
        style={{ backgroundColor: "black" }}
      >
        <div className="absolute size-full flex flex-col items-center pt-[5vw] pointer-events-none">
          <h1 className="text-white first-title">What's</h1>
          <h1 className="sec-title">Everyone</h1>
          <h1 className="text-white third-title">Talking</h1>
        </div>

        <div className="pin-box">
          {cards.map((card, index) => (
            <button
              key={index}
              type="button"
              className={`vd-card ${card.translation || ''} ${card.rotation || ''}`}
              onMouseEnter={() => handlePlay(index)}
              onMouseLeave={() => handlePause(index)}
              onFocus={() => handlePlay(index)}
              onBlur={() => handlePause(index)}
              onClick={(event) => handleClick(card.link, card.name, event.currentTarget)}
              aria-label={`Open ${card.name.trim()}'s Monster review`}
              style={{ cursor: card.link ? "pointer" : "default" }}
            >
              <video
                ref={(el) => (vdRef.current[index] = el)}
                src={card.src}
                playsInline
                muted
                loop
                className="size-full object-cover"
              />
              
              {/* Profile Image + Name - Bottom Left */}
              {card.img && (
                <div className="absolute bottom-3 left-3 z-10 flex items-center gap-2">
                  {/* Circular profile image with #88BE00 border ring */}
                  <div 
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden shadow-lg"
                    style={{ border: "2px solid #88BE00" }}
                  >
                    <img 
                      src={card.img} 
                      alt={card.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Name - NO background */}
                  <p className="text-white text-sm font-condensed font-bold drop-shadow-lg">
                    @{card.name.trim()}
                  </p>
                </div>
              )}

              {/* Play Overlay Indicator */}
              {card.link && (
                <div className="absolute inset-0 bg-black/0 hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 hover:opacity-100 transition-opacity duration-300 transform hover:scale-110">
                    <svg 
                      className="w-12 h-12 text-white" 
                      fill="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path d="M10 8.64L15.27 12 10 15.36V8.64zM8 5v14l11-7L8 5z"/>
                    </svg>
                  </div>
                </div>
              )}
            </button>
          ))}
        </div>
      </section>

      {/* Modal */}
      {isModalOpen && selectedVideo && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-labelledby={modalTitleId}
          aria-describedby={modalDescriptionId}
          data-testid="testimonial-modal"
          onClick={closeModal}
        >
          <div 
            ref={modalRef}
            className="relative w-full max-w-5xl mx-4 bg-black rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              ref={closeButtonRef}
              onClick={closeModal}
              type="button"
              aria-label="Close review video"
              data-testid="testimonial-modal-close"
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-black/80 rounded-full flex items-center justify-center transition-all duration-300 text-white"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Video title with circular profile image + #88BE00 border */}
            <div className="p-4 flex items-center gap-3">
              {cards.find(c => c.name === selectedVideo.name)?.img && (
                <div 
                  className="w-10 h-10 rounded-full overflow-hidden"
                  style={{ border: "2px solid #88BE00" }}
                >
                  <img 
                    src={cards.find(c => c.name === selectedVideo.name)?.img} 
                    alt={selectedVideo.name.trim()}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <h3 id={modalTitleId} className="text-white font-condensed text-xl drop-shadow-lg">
                @{selectedVideo.name.trim()}'s Review
              </h3>
              <p id={modalDescriptionId} className="sr-only">
                Embedded Monster Energy review video from {selectedVideo.name.trim()}.
              </p>
            </div>

            {/* Video container */}
            <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
              {selectedVideo.link.includes("youtube") ? (
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src={getYouTubeEmbedUrl(selectedVideo.link)}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : (
                <video
                  className="absolute top-0 left-0 w-full h-full object-contain"
                  controls
                  autoPlay
                  src={selectedVideo.link}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TestimonialSection;
