import { Shield, AlertTriangle, Heart, Phone, MapPin, Thermometer, Mountain, Droplets, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import { PageTransition, FadeUpSection, StaggerSection, StaggerItem } from "@/components/animations";
import { motion } from "framer-motion";

const safetyCategories = [
  {
    icon: Mountain,
    title: "Altitude Sickness",
    description: "Essential information about acclimatization and recognizing symptoms of altitude sickness.",
    tips: [
      "Ascend gradually - no more than 300-500m per day above 3,000m",
      "Stay hydrated - drink 3-4 liters of water daily",
      "Recognize symptoms: headache, nausea, dizziness",
      "Descend immediately if symptoms worsen",
    ],
  },
  {
    icon: Thermometer,
    title: "Weather Conditions",
    description: "Understanding Nepal's diverse climate zones and seasonal weather patterns.",
    tips: [
      "Best trekking seasons: March-May and September-November",
      "Monsoon season (June-August) brings heavy rainfall",
      "Temperature drops significantly at altitude",
      "Always carry rain gear and warm layers",
    ],
  },
  {
    icon: Droplets,
    title: "Health & Hygiene",
    description: "Staying healthy during your Nepal adventure with proper precautions.",
    tips: [
      "Drink only bottled or purified water",
      "Get recommended vaccinations before travel",
      "Carry a first-aid kit with essentials",
      "Practice good hand hygiene",
    ],
  },
  {
    icon: Shield,
    title: "Travel Insurance",
    description: "Protecting yourself with comprehensive travel and medical coverage.",
    tips: [
      "Ensure coverage for high-altitude trekking",
      "Include helicopter evacuation coverage",
      "Keep policy documents accessible",
      "Register with your embassy",
    ],
  },
];

const emergencyContacts = [
  { name: "Tourist Police", number: "1144", available: "24/7" },
  { name: "Nepal Police", number: "100", available: "24/7" },
  { name: "Himalayan Rescue Association", number: "+977-1-4440292", available: "Office hours" },
  { name: "CIWEC Hospital (Kathmandu)", number: "+977-1-4424111", available: "24/7" },
];

const Safety = () => {
  return (
    <PageTransition className="min-h-screen bg-background">
      <Navbar />
      
      <PageHeader
        tag="Safety"
        title="Travel Smart,"
        highlight="Stay Safe"
        subtitle="Essential safety information and guidelines for exploring Nepal responsibly."
      />

      {/* Alert Banner */}
      <section className="py-6">
        <div className="container mx-auto px-6">
          <FadeUpSection>
            <div className="bg-primary/10 border border-primary/20 rounded-2xl p-6 flex items-start gap-4">
              <AlertTriangle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-foreground mb-1">Travel Advisory</h3>
                <p className="text-muted-foreground text-sm">
                  Always check current travel advisories before planning your trip. Register with your embassy and inform someone of your travel itinerary. Virtual tours on TravelLens can help you prepare for your real journey.
                </p>
              </div>
            </div>
          </FadeUpSection>
        </div>
      </section>

      {/* Safety Categories */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <FadeUpSection className="mb-8">
            <h2 className="font-display text-3xl font-medium text-foreground text-center">
              Safety Guidelines
            </h2>
          </FadeUpSection>
          <StaggerSection className="grid md:grid-cols-2 gap-6">
            {safetyCategories.map((category) => (
              <StaggerItem key={category.title}>
                <div className="bg-card rounded-2xl border border-border p-6 hover-lift">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <category.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-display text-xl font-semibold text-foreground">
                        {category.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {category.description}
                      </p>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {category.tips.map((tip, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-nature mt-0.5 flex-shrink-0" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </StaggerItem>
            ))}
          </StaggerSection>
        </div>
      </section>

      {/* Emergency Contacts */}
      <section className="py-12 bg-secondary/30">
        <div className="container mx-auto px-6">
          <FadeUpSection className="text-center mb-8">
            <h2 className="font-display text-3xl font-medium text-foreground mb-2">
              Emergency Contacts
            </h2>
            <p className="text-muted-foreground">
              Save these numbers before your trip
            </p>
          </FadeUpSection>
          <StaggerSection className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {emergencyContacts.map((contact) => (
              <StaggerItem key={contact.name}>
                <div className="bg-card rounded-xl border border-border p-4 text-center">
                  <Phone className="w-8 h-8 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold text-foreground text-sm mb-1">
                    {contact.name}
                  </h3>
                  <div className="text-lg font-bold text-primary mb-1">
                    {contact.number}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {contact.available}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerSection>
        </div>
      </section>

      {/* VR Safety Training */}
      <section className="py-16">
        <div className="container mx-auto px-6 text-center">
          <FadeUpSection>
            <Heart className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="font-display text-3xl font-medium text-foreground mb-4">
              Practice with VR Safety Tours
            </h2>
            <p className="text-muted-foreground mb-8">
              Experience realistic scenarios and learn how to handle emergencies in a safe virtual environment before your actual trip.
            </p>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button size="lg" className="bg-primary" onClick={() => toast.info("VR Safety Training coming soon!", { description: "Interactive safety scenarios are being developed." })}>
                Start Safety Training
              </Button>
            </motion.div>
          </FadeUpSection>
        </div>
      </section>

      <Footer />
    </PageTransition>
  );
};

export default Safety;
