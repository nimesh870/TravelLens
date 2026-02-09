import { CreditCard, Map, Award, Lock, CheckCircle, Globe, Stamp, Share2, Leaf, LogIn } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import ShareModal from "@/components/ShareModal";
import { badges } from "@/data/badges";
import { destinations } from "@/data/destinations";
import { useAuth } from "@/contexts/AuthContext";
import { PageTransition, FadeUpSection, StaggerSection, StaggerItem } from "@/components/animations";

const Passport = () => {
  const { user, isAuthenticated } = useAuth();
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [selectedBadge, setSelectedBadge] = useState<typeof badges[0] | null>(null);

  const handleShareBadge = (badge: typeof badges[0]) => {
    setSelectedBadge(badge);
    setShareModalOpen(true);
  };

  // If not logged in, show login prompt
  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        
        <PageHeader
          tag="Passport"
          title="Your Knowledge"
          highlight="Passport"
          subtitle="Track your learning journey, collect stamps, and showcase your responsible travel achievements."
        />

        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-md mx-auto text-center">
              <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
                <CreditCard className="w-12 h-12 text-primary" />
              </div>
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                Sign in to access your Passport
              </h2>
              <p className="text-muted-foreground mb-8">
                Create an account or sign in to track your learning progress, collect badges, and build your sustainable travel score.
              </p>
              <Link to="/login">
                <Button size="lg" className="gap-2">
                  <LogIn className="w-5 h-5" />
                  Sign In to Continue
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    );
  }

  // User stats from auth context
  const xpToNextLevel = (user.level + 1) * 500;
  const progressPercentage = (user.visitedDestinations.length / destinations.length) * 100;
  
  // Get visited places with images
  const visitedPlaces = user.visitedDestinations.map(id => {
    const dest = destinations.find(d => d.id === id);
    return dest ? {
      id: dest.id,
      name: dest.name,
      image: dest.image,
      date: "Recently visited",
      culturalScore: Math.floor(Math.random() * 15) + 85, // Demo score
    } : null;
  }).filter(Boolean);

  // Get earned badges
  const earnedBadges = badges.filter(b => user.badges.includes(b.id));

  return (
    <PageTransition className="min-h-screen bg-background">
      <Navbar />
      
      <PageHeader
        tag="Passport"
        title="Your Knowledge"
        highlight="Passport"
        subtitle="Track your learning journey, collect stamps, and showcase your responsible travel achievements."
      />

      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Passport Card */}
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-br from-primary/20 via-card to-card rounded-2xl border border-primary/30 p-6 sticky top-24">
                {/* Passport Header */}
                <div className="text-center mb-6 pb-6 border-b border-border">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-amber-500 border-4 border-primary/30 flex items-center justify-center mx-auto mb-4 relative">
                    <span className="text-3xl font-bold text-primary-foreground">{user.avatar}</span>
                    <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-card border-2 border-primary flex items-center justify-center">
                      <span className="text-sm font-bold text-primary">{user.level}</span>
                    </div>
                  </div>
                  <h2 className="font-display text-2xl font-semibold text-foreground">
                    {user.displayName}
                  </h2>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                  <p className="text-xs text-primary mt-1 capitalize">{user.userPath || "Explorer"} Path</p>
                </div>

                {/* XP Progress */}
                <div className="mb-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Level {user.level} Progress</span>
                    <span className="text-foreground font-medium">{user.xp} / {xpToNextLevel} XP</span>
                  </div>
                  <Progress value={(user.xp / xpToNextLevel) * 100} className="h-3" />
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-secondary/50 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-foreground">{user.visitedDestinations.length}</div>
                    <div className="text-xs text-muted-foreground">Destinations</div>
                  </div>
                  <div className="bg-secondary/50 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-foreground">{user.badges.length}</div>
                    <div className="text-xs text-muted-foreground">Badges</div>
                  </div>
                  <div className="bg-secondary/50 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-foreground">{user.completedQuizzes.length}</div>
                    <div className="text-xs text-muted-foreground">Quizzes</div>
                  </div>
                  <div className="bg-green-500/10 rounded-xl p-4 text-center border border-green-500/20">
                    <div className="text-2xl font-bold text-green-500">{user.sustainabilityScore}%</div>
                    <div className="text-xs text-muted-foreground">Sustainability</div>
                  </div>
                </div>

                {/* Exploration Progress */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Exploration Progress</span>
                    <span className="text-foreground font-medium">{Math.round(progressPercentage)}%</span>
                  </div>
                  <Progress value={progressPercentage} className="h-2" />
                </div>
                <p className="text-xs text-muted-foreground text-center mb-6">
                  {user.visitedDestinations.length} of {destinations.length} destinations explored
                </p>

                {/* Share Passport Button */}
                <Button className="w-full bg-primary gap-2" onClick={() => setShareModalOpen(true)}>
                  <Share2 className="w-4 h-4" />
                  Share Passport
                </Button>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Sustainability Score Card */}
              <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/10 rounded-2xl border border-green-500/30 p-6">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-green-500/20 flex items-center justify-center">
                    <Leaf className="w-8 h-8 text-green-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                      Sustainable Travel Score
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Your commitment to responsible tourism, cultural respect, and environmental awareness.
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <Progress value={user.sustainabilityScore} className="h-3 bg-green-500/20" />
                      </div>
                      <span className="text-2xl font-bold text-green-500">{user.sustainabilityScore}%</span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mt-4">
                      <div className="text-center">
                        <div className="text-lg font-semibold text-foreground">{Math.min(100, user.sustainabilityScore + 14)}%</div>
                        <div className="text-xs text-muted-foreground">Cultural Respect</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold text-foreground">{Math.min(100, user.sustainabilityScore + 7)}%</div>
                        <div className="text-xs text-muted-foreground">Safety Awareness</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold text-foreground">{Math.max(0, user.sustainabilityScore - 8)}%</div>
                        <div className="text-xs text-muted-foreground">Eco Practices</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stamps Collection */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Stamp className="w-5 h-5 text-primary" />
                  <h3 className="font-display text-xl font-semibold text-foreground">
                    Collected Stamps
                  </h3>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {visitedPlaces.length > 0 ? (
                    visitedPlaces.map((place: any) => (
                      <div
                        key={place.id}
                        className="bg-card rounded-xl border border-border overflow-hidden group hover-lift"
                      >
                        <div className="aspect-square relative">
                          <img
                            src={place.image}
                            alt={place.name}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
                            <div className="w-16 h-16 rounded-full border-4 border-primary bg-primary/20 flex items-center justify-center rotate-12 animate-scale-in">
                              <CheckCircle className="w-8 h-8 text-primary" />
                            </div>
                          </div>
                          <div className="absolute top-2 right-2 px-2 py-1 rounded-full bg-green-500/90 text-white text-xs font-medium">
                            {place.culturalScore}%
                          </div>
                        </div>
                        <div className="p-3 text-center">
                          <div className="font-semibold text-foreground">{place.name}</div>
                          <div className="text-xs text-muted-foreground">{place.date}</div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-full text-center py-8 text-muted-foreground">
                      <Map className="w-12 h-12 mx-auto mb-2 opacity-50" />
                      <p>No stamps collected yet. Start exploring destinations!</p>
                    </div>
                  )}
                  
                  {/* Locked destinations */}
                  {destinations.filter(d => !user.visitedDestinations.includes(d.id)).slice(0, 3).map((dest) => (
                    <Link
                      key={dest.id}
                      to={`/destination/${dest.id}`}
                      className="bg-card/50 rounded-xl border border-border overflow-hidden opacity-60 hover:opacity-100 transition-opacity"
                    >
                      <div className="aspect-square relative bg-secondary flex items-center justify-center">
                        <Lock className="w-8 h-8 text-muted-foreground" />
                      </div>
                      <div className="p-3 text-center">
                        <div className="font-semibold text-muted-foreground">{dest.name}</div>
                        <div className="text-xs text-muted-foreground">Not visited</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Earned Badges */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-primary" />
                    <h3 className="font-display text-xl font-semibold text-foreground">
                      Achievement Badges
                    </h3>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {user.badges.length} / {badges.length} earned
                  </span>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {earnedBadges.length > 0 ? (
                    earnedBadges.map((badge) => (
                      <div
                        key={badge.id}
                        className="group relative p-4 rounded-xl bg-card border border-primary/30 hover:border-primary transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${badge.gradient} flex items-center justify-center`}>
                            <span className="text-2xl">{badge.icon}</span>
                          </div>
                          <div className="flex-1">
                            <div className="font-semibold text-foreground flex items-center gap-2">
                              {badge.name}
                              <CheckCircle className="w-4 h-4 text-green-500" />
                            </div>
                            <div className="text-xs text-muted-foreground">{badge.description}</div>
                            <div className="text-xs text-primary mt-1">+{badge.xpValue} XP</div>
                          </div>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => handleShareBadge(badge)}
                        >
                          <Share2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-full text-center py-8 text-muted-foreground">
                      <Award className="w-12 h-12 mx-auto mb-2 opacity-50" />
                      <p>No badges earned yet. Complete quizzes and explore to earn badges!</p>
                    </div>
                  )}
                </div>
              </div>

              {/* CTA */}
              <div className="bg-gradient-to-r from-primary/20 to-primary/5 rounded-2xl p-8 text-center">
                <Globe className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-display text-2xl font-semibold text-foreground mb-2">
                  Continue Your Journey
                </h3>
                <p className="text-muted-foreground mb-6">
                  Explore more destinations, complete quizzes, and become a certified responsible traveler.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/explore">
                    <Button size="lg" className="bg-primary">
                      Explore Destinations
                    </Button>
                  </Link>
                  <Link to="/learn">
                    <Button size="lg" variant="outline">
                      Take a Quiz
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {selectedBadge && (
        <ShareModal 
          isOpen={shareModalOpen}
          onClose={() => setShareModalOpen(false)}
          title={`I earned the ${selectedBadge.name} badge on TravelLens!`}
          description={selectedBadge.description}
        />
      )}

      <ShareModal 
        isOpen={shareModalOpen && !selectedBadge}
        onClose={() => setShareModalOpen(false)}
        title={`Check out my TravelLens Passport! Level ${user.level} Explorer`}
        description={`I've explored ${user.visitedDestinations.length} destinations and earned ${user.badges.length} badges with a ${user.sustainabilityScore}% sustainability score!`}
      />

      <Footer />
    </PageTransition>
  );
};

export default Passport;
