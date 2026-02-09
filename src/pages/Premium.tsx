import { useState } from "react";
import { Sparkles, Check, Crown, Zap, Download, Users, Headset, Bot, Star, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import VideoModal from "@/components/VideoModal";
import { toast } from "sonner";
import { PageTransition, FadeUpSection, StaggerSection, StaggerItem } from "@/components/animations";
import { motion } from "framer-motion";

const plans = [
  {
    name: "Explorer",
    price: "Free",
    description: "Perfect for getting started with virtual travel",
    features: [
      "Access to 3 VR destinations",
      "Standard quality tours",
      "Basic cultural guides",
      "Community access",
    ],
    cta: "Current Plan",
    popular: false,
  },
  {
    name: "Voyager",
    price: "$9.99",
    period: "/month",
    description: "Unlock more destinations and premium features",
    features: [
      "Access to 10 VR destinations",
      "HD quality tours",
      "AI travel companion",
      "Offline downloads",
      "Priority support",
      "Ad-free experience",
    ],
    cta: "Upgrade Now",
    popular: true,
  },
  {
    name: "Pioneer",
    price: "$19.99",
    period: "/month",
    description: "The ultimate virtual travel experience",
    features: [
      "Unlimited VR destinations",
      "4K quality tours",
      "Advanced AI companion",
      "Exclusive content",
      "Early access to new tours",
      "VIP community events",
      "Personal travel curator",
      "Family sharing (up to 5)",
    ],
    cta: "Go Pioneer",
    popular: false,
  },
];

const premiumFeatures = [
  {
    icon: Headset,
    title: "4K VR Quality",
    description: "Experience destinations in stunning ultra-high definition with immersive spatial audio.",
  },
  {
    icon: Bot,
    title: "AI Travel Companion",
    description: "Your personal guide answers questions, shares stories, and customizes your experience.",
  },
  {
    icon: Download,
    title: "Offline Access",
    description: "Download tours to enjoy anywhere, even without internet connection.",
  },
  {
    icon: Users,
    title: "VIP Events",
    description: "Join exclusive live virtual tours and community events with expert guides.",
  },
];

const testimonials = [
  {
    quote: "Premium transformed my virtual travel experience. The AI guide makes every tour feel personal and engaging.",
    author: "Emily Watson",
    role: "Pioneer Member",
    rating: 5,
  },
  {
    quote: "The 4K quality is absolutely stunning. I feel like I'm actually standing at Everest Base Camp!",
    author: "Michael Torres",
    role: "Voyager Member",
    rating: 5,
  },
];

const Premium = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <PageTransition className="min-h-screen bg-background">
      <Navbar />
      
      <VideoModal
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
        videoUrl="https://youtu.be/MGSALKM2VeI?si=oHEMQSMm-axVGnkX"
        title="TravelLens Premium Demo"
      />
      
      <PageHeader
        tag="Premium"
        title="Unlock the Full"
        highlight="Experience"
        subtitle="Elevate your virtual journey with premium features, exclusive content, and personalized guidance."
      />

      {/* Pricing Plans */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <StaggerSection slow className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {plans.map((plan) => (
              <StaggerItem key={plan.name}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                  className={`relative rounded-2xl border p-6 h-full ${
                    plan.popular
                      ? "bg-gradient-to-b from-primary/10 to-card border-primary/50 scale-105"
                      : "bg-card border-border"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="px-4 py-1 rounded-full text-xs font-semibold bg-primary text-primary-foreground">
                        Most Popular
                      </span>
                    </div>
                  )}
                  
                  <div className="text-center mb-6">
                    <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                      {plan.name}
                    </h3>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                      {plan.period && <span className="text-muted-foreground">{plan.period}</span>}
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">{plan.description}</p>
                  </div>

                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <Check className="w-5 h-5 text-nature flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={`w-full ${
                      plan.popular
                        ? "bg-primary hover:bg-primary/90"
                        : plan.cta === "Current Plan"
                        ? "bg-secondary text-secondary-foreground"
                        : ""
                    }`}
                    variant={plan.cta === "Current Plan" ? "secondary" : "default"}
                    disabled={plan.cta === "Current Plan"}
                    onClick={() => plan.cta !== "Current Plan" && toast.info(`${plan.name} plan coming soon!`, { description: "Payment integration is being set up." })}
                  >
                    {plan.cta}
                  </Button>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerSection>
        </div>
      </section>

      {/* Premium Features */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-6">
          <FadeUpSection className="text-center mb-12">
            <h2 className="font-display text-3xl font-medium text-foreground mb-4">
              Premium Features
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Discover what makes Premium membership the ultimate virtual travel experience.
            </p>
          </FadeUpSection>

          <StaggerSection className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {premiumFeatures.map((feature) => (
              <StaggerItem key={feature.title}>
                <div className="bg-card rounded-2xl border border-border p-6 text-center hover-lift">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerSection>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <FadeUpSection className="text-center mb-12">
            <h2 className="font-display text-3xl font-medium text-foreground mb-4">
              What Members Say
            </h2>
          </FadeUpSection>

          <StaggerSection className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <StaggerItem key={index}>
                <div className="bg-card rounded-2xl border border-border p-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-primary fill-current" />
                    ))}
                  </div>
                  <p className="text-foreground mb-4 italic">"{testimonial.quote}"</p>
                  <div>
                    <div className="font-semibold text-foreground">{testimonial.author}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerSection>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20">
        <div className="container mx-auto px-6 text-center">
          <FadeUpSection>
            <Crown className="w-16 h-16 text-primary mx-auto mb-4" />
            <h2 className="font-display text-3xl font-medium text-foreground mb-4">
              Start Your Premium Journey Today
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Join thousands of explorers who've upgraded their virtual travel experience. Cancel anytime.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary gap-2" onClick={() => toast.info("Premium upgrade coming soon!", { description: "We're working on payment integration." })}>
                <Sparkles className="w-5 h-5" />
                Upgrade to Premium
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                onClick={() => setIsVideoOpen(true)}
                className="gap-2"
              >
                <Play className="w-5 h-5" />
                See Demo
              </Button>
              <Button size="lg" variant="ghost" onClick={() => { document.querySelector('.grid.md\\:grid-cols-3')?.scrollIntoView({ behavior: 'smooth' }); }}>
                Compare Plans
              </Button>
            </div>
          </FadeUpSection>
        </div>
      </section>

      <Footer />
    </PageTransition>
  );
};

export default Premium;
