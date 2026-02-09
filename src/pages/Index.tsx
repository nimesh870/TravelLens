import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Destinations from "@/components/Destinations";
import VRExperience from "@/components/VRExperience";
import WhyTravelLens from "@/components/WhyTravelLens";
import Footer from "@/components/Footer";
import { PageTransition } from "@/components/animations";

const Index = () => {
  return (
    <PageTransition className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Destinations />
      <VRExperience />
      <WhyTravelLens />
      <Footer />
    </PageTransition>
  );
};

export default Index;
