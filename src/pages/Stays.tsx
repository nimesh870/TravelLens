import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Star, MapPin, Wifi, UtensilsCrossed, Waves, TreePine, Heart, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import { stays, stayTypeLabels, type Stay, type StayType } from "@/data/stays";
import { PageTransition, FadeUpSection, StaggerSection, StaggerItem } from "@/components/animations";
import { motion } from "framer-motion";
import { toast } from "sonner";

const typeStyles: Record<StayType, string> = {
  hotel: "bg-primary/20 text-primary border-primary/30",
  homestay: "badge-nature",
  resort: "badge-spiritual",
};

const amenityIcons: Record<string, typeof Wifi> = {
  WiFi: Wifi,
  Pool: Waves,
  Restaurant: UtensilsCrossed,
  Garden: TreePine,
};

const StayCard = ({ stay, onView }: { stay: Stay; onView: (s: Stay) => void }) => (
  <motion.div
    whileHover={{ y: -4 }}
    transition={{ duration: 0.2 }}
    className="bg-card rounded-2xl border border-border overflow-hidden hover-lift cursor-pointer group"
    onClick={() => onView(stay)}
  >
    <div className="aspect-[4/3] relative overflow-hidden">
      <img
        src={stay.image}
        alt={stay.name}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 card-overlay" />

      <div className="absolute top-4 left-4 flex gap-2">
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${typeStyles[stay.type]}`}>
          {stayTypeLabels[stay.type]}
        </span>
        {stay.highlighted && (
          <span className="px-3 py-1 rounded-full text-xs font-medium badge-vr">
            Featured
          </span>
        )}
      </div>

      <div className="absolute top-4 right-4">
        <button
          onClick={(e) => {
            e.stopPropagation();
            toast.success(`${stay.name} saved to wishlist!`);
          }}
          className="w-9 h-9 rounded-full glass-effect flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
        >
          <Heart className="w-4 h-4" />
        </button>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-5">
        <h3 className="font-display text-xl font-semibold text-foreground mb-1">
          {stay.name}
        </h3>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="w-3.5 h-3.5" />
          <span>{stay.destination}</span>
        </div>
      </div>
    </div>

    <div className="p-5">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1.5">
          <Star className="w-4 h-4 text-primary fill-current" />
          <span className="font-semibold text-foreground">{stay.rating}</span>
          <span className="text-sm text-muted-foreground">({stay.reviews} reviews)</span>
        </div>
        <div className="text-right">
          <span className="text-xl font-bold text-foreground">${stay.pricePerNight}</span>
          <span className="text-sm text-muted-foreground"> /night</span>
        </div>
      </div>

      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
        {stay.description}
      </p>

      <div className="flex flex-wrap gap-1.5">
        {stay.amenities.slice(0, 4).map((amenity) => (
          <span
            key={amenity}
            className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-secondary text-secondary-foreground"
          >
            {amenity}
          </span>
        ))}
        {stay.amenities.length > 4 && (
          <span className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-secondary text-muted-foreground">
            +{stay.amenities.length - 4} more
          </span>
        )}
      </div>
    </div>
  </motion.div>
);

const Stays = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeType, setActiveType] = useState<StayType | "all">("all");
  const [activeDestination, setActiveDestination] = useState<string>("all");
  const [selectedStay, setSelectedStay] = useState<Stay | null>(null);

  const uniqueDestinations = [...new Set(stays.map((s) => s.destination))];

  const filteredStays = stays.filter((stay) => {
    const matchesSearch =
      stay.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stay.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stay.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = activeType === "all" || stay.type === activeType;
    const matchesDest = activeDestination === "all" || stay.destination === activeDestination;
    return matchesSearch && matchesType && matchesDest;
  });

  const featuredStays = stays.filter((s) => s.highlighted);

  return (
    <PageTransition className="min-h-screen bg-background">
      <Navbar />

      <PageHeader
        tag="Accommodation"
        title="Find Your Perfect"
        highlight="Stay"
        subtitle="Browse handpicked homestays, boutique hotels, and luxury resorts across Nepal's most beautiful destinations."
      />

      {/* Featured Stays */}
      <section className="py-8">
        <div className="container mx-auto px-6">
          <FadeUpSection className="mb-6">
            <h2 className="font-display text-2xl font-semibold text-foreground">
              Featured Stays
            </h2>
            <p className="text-muted-foreground text-sm mt-1">
              Our top picks for an unforgettable Nepal experience
            </p>
          </FadeUpSection>

          <StaggerSection className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {featuredStays.map((stay) => (
              <StaggerItem key={stay.id}>
                <StayCard stay={stay} onView={setSelectedStay} />
              </StaggerItem>
            ))}
          </StaggerSection>
        </div>
      </section>

      {/* All Stays */}
      <section className="py-8 bg-secondary/30">
        <div className="container mx-auto px-6">
          <FadeUpSection className="mb-6">
            <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
              All Accommodations
            </h2>

            {/* Search */}
            <div className="relative mb-4">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search by name, destination..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 bg-card border-border h-12"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Type filter */}
              <div className="flex gap-2 flex-wrap">
                <Button
                  variant={activeType === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveType("all")}
                  className={activeType === "all" ? "bg-primary" : ""}
                >
                  All Types
                </Button>
                {(["hotel", "homestay", "resort"] as StayType[]).map((type) => (
                  <Button
                    key={type}
                    variant={activeType === type ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveType(type)}
                    className={activeType === type ? "bg-primary" : ""}
                  >
                    {stayTypeLabels[type]}s
                  </Button>
                ))}
              </div>

              {/* Destination filter */}
              <div className="flex gap-2 flex-wrap">
                <Button
                  variant={activeDestination === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveDestination("all")}
                  className={activeDestination === "all" ? "bg-primary" : ""}
                >
                  All Places
                </Button>
                {uniqueDestinations.map((dest) => (
                  <Button
                    key={dest}
                    variant={activeDestination === dest ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveDestination(dest)}
                    className={activeDestination === dest ? "bg-primary" : ""}
                  >
                    {dest}
                  </Button>
                ))}
              </div>
            </div>
          </FadeUpSection>

          <StaggerSection className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {filteredStays.map((stay) => (
              <StaggerItem key={stay.id}>
                <StayCard stay={stay} onView={setSelectedStay} />
              </StaggerItem>
            ))}
          </StaggerSection>

          {filteredStays.length === 0 && (
            <div className="text-center py-16">
              <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No stays found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </section>

      {/* Detail Modal */}
      <Dialog open={!!selectedStay} onOpenChange={() => setSelectedStay(null)}>
        {selectedStay && (
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="font-display text-2xl">{selectedStay.name}</DialogTitle>
            </DialogHeader>

            <div className="space-y-5">
              <div className="rounded-xl overflow-hidden aspect-video">
                <img
                  src={selectedStay.image}
                  alt={selectedStay.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex items-center gap-3 flex-wrap">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${typeStyles[selectedStay.type]}`}>
                  {stayTypeLabels[selectedStay.type]}
                </span>
                <div className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 text-primary fill-current" />
                  <span className="font-semibold text-foreground">{selectedStay.rating}</span>
                  <span className="text-sm text-muted-foreground">({selectedStay.reviews} reviews)</span>
                </div>
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <Link to={`/destination/${selectedStay.destinationId}`} className="hover:text-primary transition-colors underline">
                    {selectedStay.destination}
                  </Link>
                </div>
              </div>

              <p className="text-muted-foreground leading-relaxed">{selectedStay.description}</p>

              <div>
                <h4 className="font-semibold text-foreground mb-3">Amenities</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedStay.amenities.map((amenity) => (
                    <span
                      key={amenity}
                      className="px-3 py-1.5 rounded-lg text-sm font-medium bg-secondary text-secondary-foreground"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div>
                  <span className="text-3xl font-bold text-foreground">${selectedStay.pricePerNight}</span>
                  <span className="text-muted-foreground"> /night</span>
                </div>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => {
                      toast.success(`${selectedStay.name} saved to wishlist!`);
                    }}
                    className="gap-2"
                  >
                    <Heart className="w-4 h-4" />
                    Save
                  </Button>
                  <Button
                    className="bg-primary gap-2"
                    onClick={() => {
                      toast.info("Booking coming soon!", {
                        description: `We're setting up reservations for ${selectedStay.name}.`,
                      });
                    }}
                  >
                    Book Now
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>

      <Footer />
    </PageTransition>
  );
};

export default Stays;
