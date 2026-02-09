import { Award, Lock, Share2 } from "lucide-react";
import { useState } from "react";
import { badges, Badge } from "@/data/badges";
import { Button } from "@/components/ui/button";
import ShareModal from "./ShareModal";

interface BadgeCardProps {
  badge: Badge;
  isEarned: boolean;
  onShare?: () => void;
}

const BadgeCard = ({ badge, isEarned, onShare }: BadgeCardProps) => {
  const rarityColors = {
    common: "border-gray-500/30 text-gray-400",
    uncommon: "border-green-500/30 text-green-400",
    rare: "border-blue-500/30 text-blue-400",
    legendary: "border-amber-500/30 text-amber-400",
  };

  return (
    <div className={`relative group p-4 rounded-2xl border transition-all ${
      isEarned 
        ? "bg-card border-primary/30 hover:border-primary" 
        : "bg-card/50 border-border opacity-60"
    }`}>
      {/* Badge Icon */}
      <div className={`w-16 h-16 mx-auto mb-3 rounded-xl flex items-center justify-center ${
        isEarned 
          ? `bg-gradient-to-br ${badge.gradient}` 
          : "bg-secondary"
      }`}>
        {isEarned ? (
          <span className="text-3xl">{badge.icon}</span>
        ) : (
          <Lock className="w-6 h-6 text-muted-foreground" />
        )}
      </div>

      {/* Rarity Tag */}
      <div className="absolute top-3 right-3">
        <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium uppercase border ${rarityColors[badge.rarity]}`}>
          {badge.rarity}
        </span>
      </div>

      {/* Info */}
      <div className="text-center">
        <h4 className="font-semibold text-foreground text-sm mb-1">
          {badge.name}
        </h4>
        <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
          {badge.description}
        </p>
        <div className="text-xs text-primary font-medium">
          +{badge.xpValue} XP
        </div>
      </div>

      {/* Share Button (earned only) */}
      {isEarned && onShare && (
        <Button 
          variant="ghost" 
          size="sm" 
          className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={onShare}
        >
          <Share2 className="w-4 h-4" />
        </Button>
      )}
    </div>
  );
};

interface BadgeShowcaseProps {
  earnedBadges?: string[];
}

const BadgeShowcase = ({ earnedBadges = ["culture-starter", "safety-aware", "first-steps", "eco-learner"] }: BadgeShowcaseProps) => {
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);
  const [activeCategory, setActiveCategory] = useState<Badge["category"] | "all">("all");

  const categories: { id: Badge["category"] | "all"; label: string }[] = [
    { id: "all", label: "All Badges" },
    { id: "culture", label: "Culture" },
    { id: "safety", label: "Safety" },
    { id: "exploration", label: "Exploration" },
    { id: "sustainability", label: "Sustainability" },
    { id: "achievement", label: "Achievement" },
  ];

  const filteredBadges = activeCategory === "all" 
    ? badges 
    : badges.filter(b => b.category === activeCategory);

  const handleShare = (badge: Badge) => {
    setSelectedBadge(badge);
    setShareModalOpen(true);
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="font-display text-3xl font-semibold text-foreground mb-2 flex items-center gap-3">
              <Award className="w-8 h-8 text-primary" />
              Achievement Badges
            </h2>
            <p className="text-muted-foreground">
              Collect badges by completing quizzes and exploring destinations
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-primary">
              {earnedBadges.length}/{badges.length}
            </div>
            <div className="text-sm text-muted-foreground">Badges Earned</div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <Button
              key={cat.id}
              variant={activeCategory === cat.id ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(cat.id)}
              className={activeCategory === cat.id ? "bg-primary" : ""}
            >
              {cat.label}
            </Button>
          ))}
        </div>

        {/* Badge Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filteredBadges.map((badge) => (
            <BadgeCard
              key={badge.id}
              badge={badge}
              isEarned={earnedBadges.includes(badge.id)}
              onShare={earnedBadges.includes(badge.id) ? () => handleShare(badge) : undefined}
            />
          ))}
        </div>
      </div>

      {selectedBadge && (
        <ShareModal 
          isOpen={shareModalOpen}
          onClose={() => setShareModalOpen(false)}
          title={`I earned the ${selectedBadge.name} badge on TravelLens!`}
          description={selectedBadge.description}
        />
      )}
    </section>
  );
};

export default BadgeShowcase;
