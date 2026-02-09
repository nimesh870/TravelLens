import { Globe, Bot, Headset, ArrowRight } from "lucide-react";
import { FadeUpSection } from "./animations";
import { motion } from "framer-motion";

const features = [
  {
    icon: Globe,
    tag: "Virtual Exploration",
    title: "The World at Your Fingertips",
    description: "Don't just look at photos. Walk through ancient temples and bustling markets in full 360°. Feel the atmosphere of places you've only dreamed of.",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=2671&auto=format&fit=crop",
  },
  {
    icon: Bot,
    tag: "AI Companion",
    title: "A Guide Who Knows Everything",
    description: "Curious about that statue? Just ask. Your AI guide shares local legends, history, and hidden foodie spots instantly.",
    image: "https://images.unsplash.com/photo-1588414734732-660b07304ddb?q=80&w=2574&auto=format&fit=crop",
  },
  {
    icon: Headset,
    tag: "Immersive VR",
    title: "Step Inside the Story",
    description: "Put on your headset and stand on the edge of a mountain. Interactive hotspots let you touch history and unlock deep cultural secrets.",
    image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=2694&auto=format&fit=crop",
  },
];

const WhyTravelLens = () => {
  return (
    <section id="community" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        {/* Header */}
        <FadeUpSection className="text-center mb-16">
          <span className="text-sm tracking-widest text-primary uppercase mb-4 block">
            Why TravelLens?
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-medium text-foreground mb-4">
            Travel Deeper.{" "}
            <span className="italic text-gradient">Understand More.</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We bridge the gap between dreaming and doing. Experience the authenticity of travel without leaving your home.
          </p>
        </FadeUpSection>
        
        {/* Feature Cards */}
        <div className="space-y-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
              className={`grid lg:grid-cols-2 gap-8 items-center ${
                index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
              }`}
            >
              {/* Content */}
              <div className={index % 2 === 1 ? "lg:col-start-2" : ""}>
                <span className="text-xs tracking-widest text-primary uppercase mb-4 block">
                  {feature.tag}
                </span>
                <h3 className="font-display text-3xl md:text-4xl font-medium text-foreground mb-4">
                  {feature.title}
                </h3>
                <p className="text-lg text-muted-foreground mb-6">
                  {feature.description}
                </p>
                <a
                  href="/learn"
                  className="inline-flex items-center gap-2 text-primary hover:gap-3 transition-all"
                >
                  Learn more
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
              
              {/* Image */}
              <div className={`relative rounded-2xl overflow-hidden aspect-[4/3] ${index % 2 === 1 ? "lg:col-start-1" : ""}`}>
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1.5 rounded-full text-xs font-medium glass-effect text-foreground flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    Live Preview Active
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyTravelLens;
