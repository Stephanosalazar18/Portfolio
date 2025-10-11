import DisplaceCard from "@/components/displace-cards/Displace";
import Footer from "@/components/footer/Footer";
import GlobalGradientBG from "@/components/gradient/GlobalGradientBG";
import Gradient from "@/components/gradient/Gradient";
import Navbar from "@/components/navbar/Navbar";
import SectionPresentation from "@/components/presentationCard/SectionPresentation";

export default function Home() {
  return (
    <div>
      <Navbar />
      <SectionPresentation/>
      <DisplaceCard/>      
    </div>
  );
}
