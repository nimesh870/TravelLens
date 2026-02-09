import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import DestinationCard from "./DestinationCard";
import { destinations } from "@/data/destinations";
import { FadeUpSection, StaggerSection, StaggerItem } from "./animations";

const Destinations = () => {
  return (
    <section id="destinations" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        {/* Header */}
        <FadeUpSection className="text-center mb-16">
          <span className="text-sm tracking-widest text-primary uppercase mb-4 block">
            Destinations
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-medium text-foreground mb-4">
            Explore Nepal's Treasures
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From ancient temples to towering peaks, discover the diverse beauty of Nepal through immersive virtual experiences.
          </p>
        </FadeUpSection>
        
        {/* Grid */}
        <StaggerSection className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {destinations.map((destination) => (
            <StaggerItem key={destination.name}>
              <DestinationCard {...destination} />
            </StaggerItem>
          ))}
        </StaggerSection>
        
        {/* CTA */}
        <FadeUpSection className="text-center">
          <Link to="/explore">
            <Button variant="outline" size="lg" className="gap-2 border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground">
              View All Destinations
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </FadeUpSection>
      </div>
    </section>
  );
};

export default Destinations;
