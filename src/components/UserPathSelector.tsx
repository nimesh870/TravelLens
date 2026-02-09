import { useState } from "react";
import { Shield, Compass, ArrowRight, Map, Brain, Trophy, Heart } from "lucide-react";

interface UserPathSelectorProps {
  onSelect: (path: "conscious" | "explorer") => void;
}

const UserPathSelector = ({ onSelect }: UserPathSelectorProps) => {
  const [hoveredPath, setHoveredPath] = useState<"conscious" | "explorer" | null>(null);

  return (
    <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
      {/* Conscious Learner Path */}
      <button
        onClick={() => onSelect("conscious")}
        onMouseEnter={() => setHoveredPath("conscious")}
        onMouseLeave={() => setHoveredPath(null)}
        className={`group relative p-8 rounded-3xl border-2 transition-all duration-500 text-left overflow-hidden ${
          hoveredPath === "conscious"
            ? "border-blue-500 bg-blue-500/10 scale-[1.02]"
            : "border-border bg-card hover:border-blue-500/50"
        }`}
      >
        {/* Background Glow */}
        <div className={`absolute inset-0 bg-gradient-to-br from-blue-500/20 to-transparent opacity-0 transition-opacity duration-500 ${hoveredPath === "conscious" ? "opacity-100" : ""}`} />
        
        <div className="relative z-10">
          {/* Icon */}
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 ${
            hoveredPath === "conscious" ? "bg-blue-500 scale-110" : "bg-blue-500/20"
          }`}>
            <Shield className={`w-8 h-8 transition-colors ${hoveredPath === "conscious" ? "text-white" : "text-blue-500"}`} />
          </div>

          {/* Title */}
          <h3 className="font-display text-2xl font-semibold text-foreground mb-3">
            Explore Safely
          </h3>
          
          {/* Subtitle */}
          <p className="text-muted-foreground mb-6">
            Real-time safety updates, live maps, weather alerts, and practical travel awareness.
          </p>

          {/* Features */}
          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Map className="w-4 h-4 text-blue-500" />
              <span>Live safety & road status maps</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Shield className="w-4 h-4 text-blue-500" />
              <span>Weather & accessibility alerts</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Heart className="w-4 h-4 text-blue-500" />
              <span>Cultural do's & don'ts</span>
            </div>
          </div>

          {/* CTA */}
          <div className={`flex items-center gap-2 font-medium transition-colors ${
            hoveredPath === "conscious" ? "text-blue-400" : "text-blue-500"
          }`}>
            <span>Start Safe Journey</span>
            <ArrowRight className={`w-4 h-4 transition-transform ${hoveredPath === "conscious" ? "translate-x-1" : ""}`} />
          </div>
        </div>
      </button>

      {/* Explorer Path */}
      <button
        onClick={() => onSelect("explorer")}
        onMouseEnter={() => setHoveredPath("explorer")}
        onMouseLeave={() => setHoveredPath(null)}
        className={`group relative p-8 rounded-3xl border-2 transition-all duration-500 text-left overflow-hidden ${
          hoveredPath === "explorer"
            ? "border-primary bg-primary/10 scale-[1.02]"
            : "border-border bg-card hover:border-primary/50"
        }`}
      >
        {/* Background Glow */}
        <div className={`absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-0 transition-opacity duration-500 ${hoveredPath === "explorer" ? "opacity-100" : ""}`} />
        
        <div className="relative z-10">
          {/* Icon */}
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 ${
            hoveredPath === "explorer" ? "bg-primary scale-110" : "bg-primary/20"
          }`}>
            <Compass className={`w-8 h-8 transition-colors ${hoveredPath === "explorer" ? "text-primary-foreground" : "text-primary"}`} />
          </div>

          {/* Title */}
          <h3 className="font-display text-2xl font-semibold text-foreground mb-3">
            Explore Deeply
          </h3>
          
          {/* Subtitle */}
          <p className="text-muted-foreground mb-6">
            Interactive learning, cultural discovery, quizzes, badges, and shareable achievements.
          </p>

          {/* Features */}
          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Brain className="w-4 h-4 text-primary" />
              <span>Gamified cultural learning</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Trophy className="w-4 h-4 text-primary" />
              <span>Earn badges & achievements</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Compass className="w-4 h-4 text-primary" />
              <span>360° VR exploration</span>
            </div>
          </div>

          {/* CTA */}
          <div className={`flex items-center gap-2 font-medium transition-colors ${
            hoveredPath === "explorer" ? "text-primary" : "text-primary"
          }`}>
            <span>Begin Adventure</span>
            <ArrowRight className={`w-4 h-4 transition-transform ${hoveredPath === "explorer" ? "translate-x-1" : ""}`} />
          </div>
        </div>
      </button>
    </div>
  );
};

export default UserPathSelector;
