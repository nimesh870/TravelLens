export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: "culture" | "safety" | "exploration" | "sustainability" | "achievement";
  rarity: "common" | "uncommon" | "rare" | "legendary";
  requirement: string;
  xpValue: number;
  gradient: string;
}

export const badges: Badge[] = [
  // Culture Badges
  {
    id: "culture-starter",
    name: "Culture Curious",
    description: "Completed your first cultural quiz",
    icon: "🎭",
    category: "culture",
    rarity: "common",
    requirement: "Complete 1 cultural quiz",
    xpValue: 50,
    gradient: "from-purple-500 to-pink-500",
  },
  {
    id: "culture-enthusiast",
    name: "Culture Enthusiast",
    description: "Deep understanding of Nepali traditions",
    icon: "🏛️",
    category: "culture",
    rarity: "uncommon",
    requirement: "Complete 5 cultural quizzes with 80%+ score",
    xpValue: 150,
    gradient: "from-amber-500 to-orange-500",
  },
  {
    id: "culture-master",
    name: "Cultural Ambassador",
    description: "Mastery of Nepali cultural knowledge",
    icon: "👑",
    category: "culture",
    rarity: "rare",
    requirement: "Complete all cultural quizzes with 90%+ score",
    xpValue: 500,
    gradient: "from-yellow-400 to-amber-600",
  },
  
  // Safety Badges
  {
    id: "safety-aware",
    name: "Safety Aware",
    description: "Learned essential travel safety tips",
    icon: "🛡️",
    category: "safety",
    rarity: "common",
    requirement: "Complete safety orientation",
    xpValue: 50,
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    id: "altitude-expert",
    name: "Altitude Expert",
    description: "Mastered high-altitude safety protocols",
    icon: "🏔️",
    category: "safety",
    rarity: "uncommon",
    requirement: "Complete trekking safety quiz with 90%+",
    xpValue: 200,
    gradient: "from-sky-400 to-blue-600",
  },
  {
    id: "safety-champion",
    name: "Safety Champion",
    description: "Complete safety preparation for any adventure",
    icon: "⚕️",
    category: "safety",
    rarity: "rare",
    requirement: "Complete all safety modules",
    xpValue: 400,
    gradient: "from-emerald-500 to-teal-500",
  },
  
  // Exploration Badges
  {
    id: "first-steps",
    name: "First Steps",
    description: "Completed your first virtual tour",
    icon: "👣",
    category: "exploration",
    rarity: "common",
    requirement: "Complete 1 VR tour",
    xpValue: 30,
    gradient: "from-green-500 to-emerald-500",
  },
  {
    id: "valley-explorer",
    name: "Valley Explorer",
    description: "Explored all Kathmandu Valley destinations",
    icon: "🗺️",
    category: "exploration",
    rarity: "uncommon",
    requirement: "Complete all Kathmandu Valley tours",
    xpValue: 200,
    gradient: "from-orange-500 to-red-500",
  },
  {
    id: "peak-seeker",
    name: "Peak Seeker",
    description: "Virtually reached Everest Base Camp",
    icon: "⛰️",
    category: "exploration",
    rarity: "rare",
    requirement: "Complete Everest Base Camp VR experience",
    xpValue: 350,
    gradient: "from-slate-400 to-zinc-600",
  },
  {
    id: "nepal-master",
    name: "Nepal Master",
    description: "Explored every destination virtually",
    icon: "🌟",
    category: "exploration",
    rarity: "legendary",
    requirement: "Complete all VR tours in the platform",
    xpValue: 1000,
    gradient: "from-yellow-400 via-orange-500 to-red-500",
  },
  
  // Sustainability Badges
  {
    id: "eco-learner",
    name: "Eco Learner",
    description: "Learned about sustainable travel practices",
    icon: "🌱",
    category: "sustainability",
    rarity: "common",
    requirement: "Complete eco-tourism module",
    xpValue: 50,
    gradient: "from-green-400 to-emerald-600",
  },
  {
    id: "green-traveler",
    name: "Green Traveler",
    description: "Committed to responsible tourism",
    icon: "🌍",
    category: "sustainability",
    rarity: "uncommon",
    requirement: "Take the sustainability pledge",
    xpValue: 150,
    gradient: "from-teal-400 to-green-600",
  },
  {
    id: "eco-champion",
    name: "Eco Champion",
    description: "True advocate for sustainable travel",
    icon: "🌿",
    category: "sustainability",
    rarity: "rare",
    requirement: "Complete all sustainability content with pledges",
    xpValue: 400,
    gradient: "from-lime-400 to-green-500",
  },
  
  // Achievement Badges
  {
    id: "quiz-master",
    name: "Quiz Master",
    description: "Achieved perfect scores consistently",
    icon: "🧠",
    category: "achievement",
    rarity: "rare",
    requirement: "Get 100% on 10 quizzes",
    xpValue: 500,
    gradient: "from-violet-500 to-purple-600",
  },
  {
    id: "speed-learner",
    name: "Speed Learner",
    description: "Completed daily challenges for a week",
    icon: "⚡",
    category: "achievement",
    rarity: "uncommon",
    requirement: "7-day learning streak",
    xpValue: 200,
    gradient: "from-yellow-500 to-orange-500",
  },
  {
    id: "community-star",
    name: "Community Star",
    description: "Active contributor to the community",
    icon: "⭐",
    category: "achievement",
    rarity: "uncommon",
    requirement: "Share 10 experiences in community",
    xpValue: 250,
    gradient: "from-pink-500 to-rose-500",
  },
];

export const getBadgesByCategory = (category: Badge["category"]): Badge[] => {
  return badges.filter((badge) => badge.category === category);
};

export const getBadgeById = (id: string): Badge | undefined => {
  return badges.find((badge) => badge.id === id);
};
