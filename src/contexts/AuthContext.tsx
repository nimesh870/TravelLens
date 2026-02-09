import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface UserProfile {
  id: string;
  email: string;
  displayName: string;
  avatar: string;
  bio: string;
  joinedDate: string;
  userPath: "learner" | "explorer" | null;
  xp: number;
  level: number;
  badges: string[];
  completedQuizzes: string[];
  visitedDestinations: string[];
  sustainabilityScore: number;
  stamps: string[];
}

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (email: string, password: string, displayName: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  addBadge: (badgeId: string) => void;
  addXP: (amount: number) => void;
  completeQuiz: (quizId: string) => void;
  visitDestination: (destinationId: string) => void;
  setUserPath: (path: "learner" | "explorer") => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo credentials
const DEMO_EMAIL = "demo@travellens.app";
const DEMO_PASSWORD = "demo123";

const createDefaultProfile = (email: string, displayName: string): UserProfile => ({
  id: crypto.randomUUID(),
  email,
  displayName,
  avatar: displayName.slice(0, 2).toUpperCase(),
  bio: "Passionate traveler exploring Nepal virtually",
  joinedDate: new Date().toISOString(),
  userPath: null,
  xp: 0,
  level: 1,
  badges: [],
  completedQuizzes: [],
  visitedDestinations: [],
  sustainabilityScore: 0,
  stamps: [],
});

const DEMO_PROFILE: UserProfile = {
  id: "demo-user-001",
  email: DEMO_EMAIL,
  displayName: "Demo Explorer",
  avatar: "DE",
  bio: "Demo account for exploring TravelLens features",
  joinedDate: new Date().toISOString(),
  userPath: "explorer",
  xp: 1250,
  level: 5,
  badges: ["culture_curious", "peak_seeker", "eco_warrior"],
  completedQuizzes: ["kathmandu-culture", "everest-safety"],
  visitedDestinations: ["kathmandu", "pokhara", "everest"],
  sustainabilityScore: 72,
  stamps: ["kathmandu", "pokhara"],
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("travellens_user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem("travellens_user");
      }
    }
    setIsLoading(false);
  }, []);

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("travellens_user", JSON.stringify(user));
    }
  }, [user]);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Check for demo credentials
    if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
      setUser(DEMO_PROFILE);
      return { success: true };
    }

    // Check for existing user in localStorage
    const savedUsers = localStorage.getItem("travellens_users");
    if (savedUsers) {
      const users = JSON.parse(savedUsers);
      const existingUser = users[email];
      if (existingUser && existingUser.password === password) {
        setUser(existingUser.profile);
        return { success: true };
      }
    }

    // For demo purposes, allow any email/password that looks valid
    if (email.includes("@") && password.length >= 6) {
      const newProfile = createDefaultProfile(email, email.split("@")[0]);
      setUser(newProfile);
      return { success: true };
    }

    return { success: false, error: "Invalid email or password" };
  };

  const signup = async (email: string, password: string, displayName: string): Promise<{ success: boolean; error?: string }> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    if (!email.includes("@")) {
      return { success: false, error: "Invalid email address" };
    }

    if (password.length < 6) {
      return { success: false, error: "Password must be at least 6 characters" };
    }

    if (displayName.length < 2) {
      return { success: false, error: "Display name must be at least 2 characters" };
    }

    // Create new user
    const newProfile = createDefaultProfile(email, displayName);
    
    // Save to localStorage "database"
    const savedUsers = localStorage.getItem("travellens_users") || "{}";
    const users = JSON.parse(savedUsers);
    users[email] = { password, profile: newProfile };
    localStorage.setItem("travellens_users", JSON.stringify(users));

    setUser(newProfile);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("travellens_user");
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    if (!user) return;
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
  };

  const addBadge = (badgeId: string) => {
    if (!user || user.badges.includes(badgeId)) return;
    updateProfile({ badges: [...user.badges, badgeId] });
  };

  const addXP = (amount: number) => {
    if (!user) return;
    const newXP = user.xp + amount;
    const newLevel = Math.floor(newXP / 500) + 1;
    updateProfile({ xp: newXP, level: newLevel });
  };

  const completeQuiz = (quizId: string) => {
    if (!user || user.completedQuizzes.includes(quizId)) return;
    updateProfile({ completedQuizzes: [...user.completedQuizzes, quizId] });
    addXP(100);
  };

  const visitDestination = (destinationId: string) => {
    if (!user || user.visitedDestinations.includes(destinationId)) return;
    updateProfile({ 
      visitedDestinations: [...user.visitedDestinations, destinationId],
      stamps: [...user.stamps, destinationId],
    });
    addXP(50);
  };

  const setUserPath = (path: "learner" | "explorer") => {
    updateProfile({ userPath: path });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        logout,
        updateProfile,
        addBadge,
        addXP,
        completeQuiz,
        visitDestination,
        setUserPath,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
