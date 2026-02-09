import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Play, Calendar, Mountain, ThumbsUp, MapPin, Eye, MousePointer, Clock, Share2, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VRViewer from "@/components/VRViewer";
import ShareModal from "@/components/ShareModal";
import { getDestinationById, destinations } from "@/data/destinations";
import WeatherWidget from "@/components/WeatherWidget";
import { motion } from "framer-motion";
import { PageTransition, FadeUpSection } from "@/components/animations";

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

const Destination = () => {
  const { id } = useParams<{ id: string }>();
  const destination = id ? getDestinationById(id) : undefined;
  const [vrOpen, setVrOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);

  if (!destination) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-4xl text-foreground mb-4">Destination Not Found</h1>
          <Link to="/explore">
            <Button>Back to Explore</Button>
          </Link>
        </div>
      </div>
    );
  }

  const relatedDestinations = destinations
    .filter((d) => d.id !== destination.id && d.type === destination.type)
    .slice(0, 3);

  return (
    <PageTransition className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative h-[70vh] min-h-[500px]">
        <motion.div
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${destination.image})` }}
        />
        <div className="absolute inset-0 hero-overlay" />
        
        <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-end pb-12">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            <Link
              to="/explore"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6 w-fit"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Explore
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.5 }} className="flex flex-wrap gap-2 mb-4">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${typeStyles[destination.type]}`}>
              {typeLabels[destination.type]}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-medium badge-vr">
              360° VR
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-medium glass-effect text-foreground/80">
              {destination.region}
            </span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.5 }} className="font-display text-5xl md:text-6xl font-medium text-foreground mb-4">
            {destination.name}
          </motion.h1>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.5 }} className="flex flex-wrap items-center gap-6 text-muted-foreground mb-6">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{destination.bestTime}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mountain className="w-4 h-4" />
              <span>{destination.elevation}</span>
            </div>
            <div className="flex items-center gap-2">
              <ThumbsUp className="w-4 h-4" />
              <span>{destination.rating}% recommend</span>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.5 }} className="flex flex-wrap gap-4">
            <Button size="lg" className="bg-primary gap-2" onClick={() => setVrOpen(true)}>
              <Play className="w-5 h-5" />
              Start VR Tour
            </Button>
            <Button size="lg" variant="outline" className="gap-2 border-foreground/20 text-foreground hover:bg-foreground/10">
              <Heart className="w-5 h-5" />
              Save
            </Button>
            <Button size="lg" variant="outline" className="gap-2 border-foreground/20 text-foreground hover:bg-foreground/10" onClick={() => setShareOpen(true)}>
              <Share2 className="w-5 h-5" />
              Share
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <FadeUpSection>
                <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                  About {destination.name}
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {destination.longDescription}
                </p>
              </FadeUpSection>

              <FadeUpSection delay={0.1}>
                <h3 className="font-display text-xl font-semibold text-foreground mb-4">
                  Highlights
                </h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {destination.highlights.map((highlight) => (
                    <div
                      key={highlight}
                      className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border"
                    >
                      <MapPin className="w-5 h-5 text-primary" />
                      <span className="text-foreground">{highlight}</span>
                    </div>
                  ))}
                </div>
              </FadeUpSection>

              {/* VR Preview */}
              <FadeUpSection delay={0.2}>
                <h3 className="font-display text-xl font-semibold text-foreground mb-4">
                  360° VR Experience
                </h3>
                <div className="relative rounded-2xl overflow-hidden aspect-video">
                  <img
                    src={destination.panorama}
                    alt={`${destination.name} 360° Preview`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-background/40 flex items-center justify-center">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setVrOpen(true)}
                      className="w-20 h-20 rounded-full bg-primary/90 hover:bg-primary transition-colors flex items-center justify-center"
                    >
                      <Play className="w-8 h-8 text-primary-foreground fill-current ml-1" />
                    </motion.button>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between">
                    <span className="px-3 py-1 rounded-full text-xs font-medium badge-vr">
                      360° Interactive Panorama
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-medium glass-effect text-foreground">
                      Drag to Explore
                    </span>
                  </div>
                </div>
              </FadeUpSection>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <FadeUpSection delay={0.1}>
                <WeatherWidget destinationId={destination.id} />
              </FadeUpSection>

              <FadeUpSection delay={0.2}>
                <div className="bg-card rounded-2xl border border-border p-6">
                  <Button className="w-full mt-6 bg-primary" onClick={() => setVrOpen(true)}>
                    Start 360° Tour
                  </Button>
                </div>
              </FadeUpSection>

              {relatedDestinations.length > 0 && (
                <FadeUpSection delay={0.3}>
                  <div className="bg-card rounded-2xl border border-border p-6">
                    <h3 className="font-display text-lg font-semibold text-foreground mb-4">
                      Related Destinations
                    </h3>
                    <div className="space-y-3">
                      {relatedDestinations.map((dest) => (
                        <Link
                          key={dest.id}
                          to={`/destination/${dest.id}`}
                          className="flex items-center gap-3 p-2 rounded-xl hover:bg-secondary/50 transition-colors"
                        >
                          <img
                            src={dest.image}
                            alt={dest.name}
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                          <div>
                            <div className="font-medium text-foreground">{dest.name}</div>
                            <div className="text-xs text-muted-foreground">{dest.region}</div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </FadeUpSection>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <VRViewer
        isOpen={vrOpen}
        onClose={() => setVrOpen(false)}
        image={destination.panorama}
        title={`${destination.name} - 360° Experience`}
      />

      <ShareModal
        isOpen={shareOpen}
        onClose={() => setShareOpen(false)}
        title={`Explore ${destination.name} on TravelLens!`}
        description={destination.description}
      />
    </PageTransition>
  );
};

export default Destination;
