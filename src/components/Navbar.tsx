import { Link, useLocation } from "react-router-dom";
import { Compass, BookOpen, Users, CreditCard, Sparkles, Menu, X, Map, User, LogOut, Bed } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navItems = [
  { label: "Explore", icon: Map, href: "/explore" },
  { label: "Stays", icon: Bed, href: "/stays" },
  { label: "Learn", icon: BookOpen, href: "/learn" },
  { label: "Community", icon: Users, href: "/community" },
  { label: "Passport", icon: CreditCard, href: "/passport" },
  { label: "Premium", icon: Sparkles, href: "/premium" },
];

const Navbar = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-effect">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="flex items-center gap-1">
              <Compass className="w-6 h-6 text-primary transition-transform group-hover:rotate-45" />
              <Compass className="w-6 h-6 text-primary transition-transform group-hover:-rotate-45" />
            </div>
            <span className="font-display text-xl font-semibold text-foreground">
              TravelLens
            </span>
          </Link>

          {/* Navigation Links - Desktop */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className={`flex items-center gap-2 px-4 py-2 text-sm transition-colors rounded-lg ${
                  location.pathname === item.href
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            ))}
          </div>

          {/* CTA Button & Theme Toggle & User Menu & Mobile Menu Toggle */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            
            {isAuthenticated && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="gap-2 px-2">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="bg-primary/20 text-primary text-xs">
                        {user.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden sm:block text-sm font-medium text-foreground">
                      {user.displayName}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-1.5">
                    <p className="text-sm font-medium text-foreground">{user.displayName}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-primary font-medium">Level {user.level}</span>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-xs text-muted-foreground">{user.xp} XP</span>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/passport" className="cursor-pointer">
                      <User className="w-4 h-4 mr-2" />
                      My Passport
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="text-destructive cursor-pointer">
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/login">
                <Button className="hidden sm:flex bg-primary text-primary-foreground hover:bg-primary/90">
                  Sign In
                </Button>
              </Link>
            )}
            
            <button
              className="lg:hidden p-2 text-foreground"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-border pt-4">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 text-sm transition-colors rounded-lg ${
                    location.pathname === item.href
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </Link>
              ))}
              
              {isAuthenticated && user ? (
                <>
                  <div className="px-4 py-3 border-t border-border mt-2">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback className="bg-primary/20 text-primary">
                          {user.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-foreground">{user.displayName}</p>
                        <p className="text-xs text-muted-foreground">Level {user.level} • {user.xp} XP</p>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full mt-2 text-destructive border-destructive/30"
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                </>
              ) : (
                <Link to="/login" className="mt-2" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full bg-primary">Sign In</Button>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
