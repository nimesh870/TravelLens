import { Eye, MousePointer, Layers, Play, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-nepal.jpg";
import { FadeUpSection, StaggerSection, StaggerItem } from "./animations";
import { motion } from "framer-motion";

const features = [
  {
    icon: Eye,
    title: "360° Views",
    description: "Full panoramic exploration",
  },
  {
    icon: MousePointer,
    title: "Hotspot Navigation",
    description: "Click to discover locations",
  },
  {
    icon: Layers,
    title: "Interactive Overlays",
    description: "Educational content on-demand",
  },
];

const stats = [
  { value: "9+", label: "VR Tours" },
  { value: "50+", label: "Hotspots" },
  { value: "HD", label: "Quality" },
];

const VRExperience = () => {
  return (
    <section id="learn" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <FadeUpSection>
            <span className="text-sm tracking-widest text-primary uppercase mb-4 block">
              VR Experience
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-medium text-foreground mb-6">
              Immersive Virtual Reality
              <span className="block text-gradient">Exploration</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Step into Nepal's most breathtaking locations with our fully interactive VR experience. Navigate through ancient temples, explore mountain trails, and discover hidden cultural treasures—all from your device.
            </p>
            
            {/* Features */}
            <StaggerSection className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              {features.map((feature) => (
                <StaggerItem key={feature.title}>
                  <div className="p-4 rounded-xl bg-card border border-border">
                    <feature.icon className="w-6 h-6 text-primary mb-3" />
                    <h4 className="font-semibold text-foreground mb-1">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerSection>
            
            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
                Try VR Demo
              </Button>
              <Button variant="ghost" size="lg" className="gap-2 text-foreground hover:bg-foreground/10">
                Browse All Tours
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </FadeUpSection>
          
          {/* VR Preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
              <img
                src={heroImage}
                alt="VR Experience Preview"
                className="w-full h-full object-cover"
              />
              
              {/* Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="w-20 h-20 rounded-full bg-primary/90 hover:bg-primary transition-colors flex items-center justify-center group">
                  <Play className="w-8 h-8 text-primary-foreground fill-current ml-1 group-hover:scale-110 transition-transform" />
                </button>
              </div>
              
              {/* VR Badge */}
              <div className="absolute top-4 right-4">
                <span className="px-3 py-1 rounded-full text-xs font-medium badge-vr">
                  360° VR Ready
                </span>
              </div>
              
              {/* Interactive Badge */}
              <div className="absolute bottom-4 left-4">
                <span className="px-3 py-1 rounded-full text-xs font-medium glass-effect text-foreground">
                  Interactive
                </span>
              </div>
            </div>
            
            {/* Stats */}
            <div className="absolute -bottom-6 left-6 right-6 flex justify-center">
              <div className="flex gap-6 px-6 py-4 rounded-xl glass-effect">
                {stats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-2xl font-bold text-primary">{stat.value}</div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default VRExperience;
