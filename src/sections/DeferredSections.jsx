import Footer from "../components/Footer";
import BenefitSection from "./BenefitSection";
import ChooseEnergySection from "./ChooseEnergySection";
import EnergyProfileSection from "./EnergyProfileSection";
import FlavorSection from "./FlavorSection";
import MessageSection from "./MessageSection";
import TestimonialSection from "./TestimonialSection";

const DeferredSections = () => (
  <>
    <MessageSection />
    <FlavorSection />
    <ChooseEnergySection />
    <EnergyProfileSection />
    <BenefitSection />
    <TestimonialSection />
    <Footer />
  </>
);

export default DeferredSections;
