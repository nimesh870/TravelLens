import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Search, MapPin, Calendar, Mountain, ThumbsUp, 
  Navigation, Cloud, Thermometer, AlertTriangle, CheckCircle,
  Filter, Map, Grid, List
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import LiveMap from "@/components/LiveMap";
import TravelPlanner from "@/components/TravelPlanner/index";
import WeatherWidget from "@/components/WeatherWidget";
import { destinations, DestinationType } from "@/data/destinations";
import { PageTransition, FadeUpSection, StaggerSection, StaggerItem } from "@/components/animations";
import { motion } from "framer-motion";

const typeStyles = {
  heritage: "badge-heritage",
  nature: "badge-nature",
  spiritual: "badge-spiritual",
};

const typeLabels = {
  heritage: "Heritage",
  nature: "Nature",
  spiritual: "Spiritual",
};

const Explore = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<DestinationType | "all">("all");
  const [viewMode, setViewMode] = useState<"map" | "grid">("map");

  const filteredDestinations = destinations.filter((dest) => {
    const matchesSearch = dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === "all" || dest.type === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <PageTransition className="min-h-screen bg-background">
      <Navbar />
      
      <PageHeader
        tag="Explore & Safety"
        title="Live Map of"
        highlight="Nepal"
        subtitle="Real-time destinations, weather, road conditions, and cultural guidance—all in one place."
      />

      <section className="py-8">
        <div className="container mx-auto px-6">
          {/* View Mode Toggle */}
          <FadeUpSection className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as "map" | "grid")} className="w-full sm:w-auto">
              <TabsList className="bg-secondary">
                <TabsTrigger value="map" className="gap-2">
                  <Map className="w-4 h-4" />
                  Live Map
                </TabsTrigger>
                <TabsTrigger value="grid" className="gap-2">
                  <Grid className="w-4 h-4" />
                  Grid View
                </TabsTrigger>
              </TabsList>
            </Tabs>

            {viewMode === "grid" && (
              <div className="flex gap-2">
                <Button
                  variant={activeFilter === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveFilter("all")}
                  className={activeFilter === "all" ? "bg-primary" : ""}
                >
                  All
                </Button>
                <Button
                  variant={activeFilter === "heritage" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveFilter("heritage")}
                  className={activeFilter === "heritage" ? "bg-heritage" : "badge-heritage bg-transparent"}
                >
                  Heritage
                </Button>
                <Button
                  variant={activeFilter === "nature" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveFilter("nature")}
                  className={activeFilter === "nature" ? "bg-nature" : "badge-nature bg-transparent"}
                >
                  Nature
                </Button>
                <Button
                  variant={activeFilter === "spiritual" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveFilter("spiritual")}
                  className={activeFilter === "spiritual" ? "bg-spiritual" : "badge-spiritual bg-transparent"}
                >
                  Spiritual
                </Button>
              </div>
            )}
          </FadeUpSection>

          {/* Map View */}
          {viewMode === "map" && (
            <FadeUpSection className="mb-12">
              <LiveMap />
              <div className="mt-4 p-4 bg-card rounded-xl border border-border">
                <div className="flex flex-wrap items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-muted-foreground">Open destinations with real-time info</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-500" />
                    <span className="text-muted-foreground">Blocked routes with reasons</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Cloud className="w-4 h-4 text-blue-500" />
                    <span className="text-muted-foreground">Live weather updates</span>
                  </div>
                </div>
              </div>
            </FadeUpSection>
          )}

          {/* Grid View */}
          {viewMode === "grid" && (
            <>
              {/* Search */}
              <FadeUpSection className="relative mb-8">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search destinations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 bg-card border-border h-12"
                />
              </FadeUpSection>

              {/* Results */}
              <StaggerSection className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDestinations.map((dest) => (
                  <StaggerItem key={dest.id}>
                    <Link
                      to={`/destination/${dest.id}`}
                      className="group relative rounded-2xl overflow-hidden bg-card hover-lift cursor-pointer block"
                    >
                      <div className="aspect-[3/4] relative overflow-hidden">
                        <img
                          src={dest.image}
                          alt={dest.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 card-overlay" />
                        
                        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${typeStyles[dest.type]}`}>
                            {typeLabels[dest.type]}
                          </span>
                          <span className="px-3 py-1 rounded-full text-xs font-medium badge-vr">
                            360° VR
                          </span>
                        </div>
                        
                        <div className="absolute top-4 right-4">
                          <span className="px-3 py-1 rounded-full text-xs font-medium glass-effect text-foreground/80">
                            {dest.region}
                          </span>
                        </div>
                        
                        <div className="absolute bottom-0 left-0 right-0 p-5">
                          {/* Weather Badge */}
                          <div className="mb-3">
                            <WeatherWidget destinationId={dest.id} compact />
                          </div>
                          <h3 className="font-display text-2xl font-semibold text-foreground mb-1">
                            {dest.name}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                            {dest.description}
                          </p>
                          
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5" />
                              <span>{dest.bestTime}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Mountain className="w-3.5 h-3.5" />
                              <span>{dest.elevation}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <ThumbsUp className="w-3.5 h-3.5" />
                              <span>{dest.rating}%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </StaggerItem>
                ))}
              </StaggerSection>

              {filteredDestinations.length === 0 && (
                <div className="text-center py-16">
                  <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">No destinations found</h3>
                  <p className="text-muted-foreground">Try adjusting your search or filters</p>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Travel Planner Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-6">
          <FadeUpSection className="text-center mb-8">
            <h2 className="font-display text-3xl font-semibold text-foreground mb-4">
              Plan Your Perfect Trip
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Create detailed itineraries, track your budget, pack smart, and never miss a moment. 
              Like having a professional travel planner in your pocket.
            </p>
          </FadeUpSection>
          <FadeUpSection delay={0.2}>
            <TravelPlanner />
          </FadeUpSection>
        </div>
      </section>

      <Footer />
    </PageTransition>
  );
};

export default Explore;
