import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import heroImage from "@/assets/hero-nepal.jpg";
import { motion } from "framer-motion";

const Login = () => {
  const navigate = useNavigate();
  const { login, signup, isAuthenticated } = useAuth();
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");

  if (isAuthenticated) {
    navigate("/");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isSignup) {
        const result = await signup(email, password, displayName);
        if (result.success) {
          toast.success("Account created! Welcome to TravelLens");
          navigate("/");
        } else {
          toast.error(result.error || "Failed to create account");
        }
      } else {
        const result = await login(email, password);
        if (result.success) {
          toast.success("Welcome back to TravelLens!");
          navigate("/");
        } else {
          toast.error(result.error || "Invalid credentials");
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setIsLoading(true);
    try {
      const result = await login("demo@travellens.app", "demo123");
      if (result.success) {
        toast.success("Logged in as Demo Explorer! Explore all features.");
        navigate("/");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Side - Form */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-1 flex items-center justify-center p-8"
      >
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-center"
          >
            <Link to="/" className="inline-flex items-center gap-2 mb-8">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">TL</span>
              </div>
              <span className="font-display text-2xl font-semibold text-foreground">
                TravelLens
              </span>
            </Link>
            <h1 className="font-display text-3xl font-medium text-foreground">
              {isSignup ? "Create your account" : "Welcome back"}
            </h1>
            <p className="text-muted-foreground mt-2">
              {isSignup
                ? "Start your journey of learning before traveling"
                : "Continue your exploration journey"}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            {/* Demo Login Button */}
            <Button
              variant="outline"
              className="w-full gap-2 border-primary/30 hover:bg-primary/10"
              onClick={handleDemoLogin}
              disabled={isLoading}
            >
              <Sparkles className="w-4 h-4 text-primary" />
              Try Demo Account
              <span className="text-xs text-muted-foreground ml-2">(Full Access)</span>
            </Button>
          </motion.div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            {isSignup && (
              <div className="space-y-2">
                <Label htmlFor="displayName">Display Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="displayName"
                    type="text"
                    placeholder="Your name"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="pl-10"
                    required={isSignup}
                    minLength={2}
                    maxLength={50}
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                  maxLength={100}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10"
                  required
                  minLength={6}
                  maxLength={100}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full gap-2" disabled={isLoading}>
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  {isSignup ? "Create Account" : "Sign In"}
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </motion.form>

          {/* Toggle */}
          <p className="text-center text-sm text-muted-foreground">
            {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
            <button
              type="button"
              onClick={() => setIsSignup(!isSignup)}
              className="text-primary hover:underline font-medium"
            >
              {isSignup ? "Sign in" : "Sign up"}
            </button>
          </p>

          {/* Demo Credentials Hint */}
          <div className="p-4 bg-secondary/50 rounded-xl border border-border">
            <p className="text-xs text-muted-foreground text-center">
              <span className="font-semibold text-foreground">Demo credentials:</span><br />
              Email: demo@travellens.app<br />
              Password: demo123
            </p>
          </div>
        </div>
      </motion.div>

      {/* Right Side - Image */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="hidden lg:block flex-1 relative"
      >
        <img
          src={heroImage}
          alt="Nepal landscape"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="absolute bottom-12 left-12 right-12"
        >
          <blockquote className="text-foreground">
            <p className="text-xl font-display font-medium mb-4">
              "TravelLens taught me more about Nepal's culture in one week than I learned from guidebooks in months."
            </p>
            <footer className="text-muted-foreground">
              <span className="font-semibold text-foreground">Sarah Chen</span>
              <span className="mx-2">•</span>
              Virtual Explorer, San Francisco
            </footer>
          </blockquote>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;
