import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";

const FlavorTitle = () => {
  const titleRef = useRef(null);

  useGSAP(() => {
    const title = titleRef.current;
    const flavorSection = title?.closest(".flavor-section");
    if (!title || !flavorSection) return undefined;

    const q = gsap.utils.selector(titleRef);
    const firstTextSplit = SplitText.create(q(".first-text-split h1"), { type: "chars" });
    const secondTextSplit = SplitText.create(q(".second-text-split h1"), { type: "chars" });
    
    gsap.from(firstTextSplit.chars, {
      yPercent: 200,
      stagger: 0.02,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: flavorSection,
        start: "top 30%",
      },
    });
    
    gsap.to(q(".flavor-text-scroll"), {
      duration: 1,
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      scrollTrigger: {
        trigger: flavorSection,
        start: "top 10%",
      },
    });
    
    gsap.from(secondTextSplit.chars, {
      yPercent: 200,
      stagger: 0.02,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: flavorSection,
        start: "top 1%",
      },
    });

    return () => {
      firstTextSplit.revert();
      secondTextSplit.revert();
    };
  }, { scope: titleRef });

  return (
    <div ref={titleRef} className="general-title col-center h-full 2xl:gap-32 xl:gap-24 gap-16 bg-black">
      {/* First text - White */}
      <div className="overflow-hidden 2xl:py-0 py-3 first-text-split">
        <h1 className="text-white">We have 3</h1>
      </div>
      
      {/* Middle highlighted text - Monster Energy Green with Black text */}
      <div
        style={{
          clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)",
        }}
        className="flavor-text-scroll"
      >
        <div className="bg-monster-green pb-5 2xl:pt-0 pt-3 2xl:px-5 px-3">
          <h2 className="text-black font-bold tracking-wider">MONSTER</h2>
        </div>
      </div>
      
      {/* Last text - Monster Green for brand consistency */}
      <div className="overflow-hidden 2xl:py-0 py-3 second-text-split">
        <h1 className="text-monster-green">delicious flavors</h1>
      </div>
    </div>
  );
};

export default FlavorTitle;
