import { useState } from "react";
import { Compass, Play, ChevronDown, Shield, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-nepal.jpg";
import UserPathSelector from "./UserPathSelector";

const Hero = () => {
  const [showPathSelector, setShowPathSelector] = useState(false);

  const handlePathSelect = (path: "conscious" | "explorer") => {
    // Could store in localStorage or context for personalization
    const targetRoute = path === "conscious" ? "/explore" : "/learn";
    window.location.href = targetRoute;
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 hero-overlay" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        {!showPathSelector ? (
          <>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-effect mb-8 animate-fade-in">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm tracking-widest text-muted-foreground uppercase">
                Learn Before You Travel
              </span>
            </div>
            
            {/* Heading */}
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-medium text-foreground mb-6 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              Why Should You{" "}
              <span className="block italic text-gradient">
                Care About Nepal?
              </span>
            </h1>
            
            {/* Subheading */}
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              Because smart travelers prepare. Know the culture, understand the safety, and experience the magic—before you even book your flight.
            </p>
            
            {/* CTAs - Centered and Prominent */}
            <div className="flex flex-col items-center gap-6 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
              {/* Main CTA - Large and Glowing */}
              <Button 
                size="lg" 
                onClick={() => setShowPathSelector(true)}
                className="gap-3 px-10 py-7 text-lg bg-primary text-primary-foreground hover:bg-primary/90 animate-glow rounded-2xl"
              >
                <Compass className="w-6 h-6" />
                Start Your Journey
              </Button>

              {/* Secondary CTAs */}
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <Link to="/explore">
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="gap-2 px-8 py-6 text-base border-blue-500/50 text-blue-400 hover:bg-blue-500/10 hover:border-blue-500"
                  >
                    <Shield className="w-5 h-5" />
                    Explore Safely
                  </Button>
                </Link>
                <Link to="/learn">
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="gap-2 px-8 py-6 text-base border-primary/50 text-primary hover:bg-primary/10 hover:border-primary"
                  >
                    <Play className="w-5 h-5" />
                    Explore Deeply
                  </Button>
                </Link>
              </div>
            </div>
          </>
        ) : (
          <div className="animate-fade-in">
            <h2 className="font-display text-3xl md:text-4xl font-medium text-foreground mb-4">
              Choose Your Path
            </h2>
            <p className="text-muted-foreground mb-10 max-w-xl mx-auto">
              You can switch between paths anytime. This just helps us personalize your experience.
            </p>
            <UserPathSelector onSelect={handlePathSelect} />
            <Button 
              variant="ghost" 
              className="mt-8 text-muted-foreground"
              onClick={() => setShowPathSelector(false)}
            >
              ← Back
            </Button>
          </div>
        )}
      </div>
      
      {/* Scroll Indicator */}
      {!showPathSelector && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce-subtle">
          <span className="text-xs tracking-widest text-muted-foreground uppercase">Discover</span>
          <ChevronDown className="w-5 h-5 text-muted-foreground" />
        </div>
      )}
    </section>
  );
};

export default Hero;
