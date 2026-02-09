import { Link } from "react-router-dom";
import { Compass, Mail, MapPin, Phone } from "lucide-react";
import { FadeUpSection } from "./animations";

const footerLinks = {
  explore: [
    { label: "Destinations", href: "/explore" },
    { label: "VR Tours", href: "/learn" },
    { label: "Cultural Heritage", href: "/explore" },
    { label: "Adventure Trails", href: "/explore" },
  ],
  company: [
    { label: "About Us", href: "/learn" },
    { label: "Our Mission", href: "/learn" },
    { label: "Careers", href: "/community" },
    { label: "Press Kit", href: "/community" },
  ],
  support: [
    { label: "Help Center", href: "/safety" },
    { label: "Safety Guidelines", href: "/safety" },
    { label: "VR Requirements", href: "/learn" },
    { label: "Contact Us", href: "/community" },
  ],
};

const Footer = () => {
  return (
    <footer className="py-16 bg-card border-t border-border">
      <div className="container mx-auto px-6">
        <FadeUpSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
            {/* Brand */}
            <div className="lg:col-span-2">
              <Link to="/" className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1">
                  <Compass className="w-6 h-6 text-primary" />
                  <Compass className="w-6 h-6 text-primary" />
                </div>
                <span className="font-display text-xl font-semibold text-foreground">
                  TravelLens
                </span>
              </Link>
              <p className="text-muted-foreground mb-6 max-w-sm">
                Experience the world's most breathtaking destinations through immersive virtual reality. Travel deeper, understand more.
              </p>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span>Kathmandu, Nepal</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-primary" />
                  <span>hello@travellens.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-primary" />
                  <span>+977 1 234 5678</span>
                </div>
              </div>
            </div>
            
            {/* Links */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">Explore</h4>
              <ul className="space-y-2">
                {footerLinks.explore.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-foreground mb-4">Company</h4>
              <ul className="space-y-2">
                {footerLinks.company.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-foreground mb-4">Support</h4>
              <ul className="space-y-2">
                {footerLinks.support.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Bottom */}
          <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2024 TravelLens. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <Link to="/safety" className="hover:text-foreground transition-colors">Privacy Policy</Link>
              <Link to="/safety" className="hover:text-foreground transition-colors">Terms of Service</Link>
              <Link to="/safety" className="hover:text-foreground transition-colors">Cookies</Link>
            </div>
          </div>
        </FadeUpSection>
      </div>
    </footer>
  );
};

export default Footer;
