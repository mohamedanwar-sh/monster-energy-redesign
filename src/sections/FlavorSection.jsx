import FlavorSlider from "../components/FlavorSlider";
import FlavorTitle from "../components/FlavorTitle";
const FlavorSection = () => {
  return (
    <section id="flavors" className="flavor-section">
      <div className="h-full flex lg:flex-row flex-col items-center relative">
        <div className="lg:w-[57%] flex-none h-80 lg:h-full md:mt-20 xl:mt-0">
          <FlavorTitle />
        </div>
        <div className="h-full">
            <FlavorSlider />
        </div>
      </div>
      <a href="#choose-energy" className="flavor-next-link">
        Pick your energy
      </a>
    </section>
  );
};

export default FlavorSection;
