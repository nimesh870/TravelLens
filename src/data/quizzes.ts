export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: "culture" | "safety" | "etiquette" | "geography";
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  location: string;
  questions: QuizQuestion[];
  badge: {
    name: string;
    icon: string;
    color: string;
  };
  difficulty: "easy" | "medium" | "hard";
  xpReward: number;
}

export const quizzes: Quiz[] = [
  {
    id: "kathmandu-culture",
    title: "Kathmandu Cultural Etiquette",
    description: "Test your knowledge of cultural practices in the capital city",
    location: "Kathmandu",
    difficulty: "easy",
    xpReward: 50,
    badge: {
      name: "Culture Explorer",
      icon: "🏛️",
      color: "from-amber-500 to-orange-500",
    },
    questions: [
      {
        id: "kc1",
        question: "What is the proper way to walk around a Buddhist stupa?",
        options: ["Counter-clockwise", "Clockwise", "Any direction", "Through the center"],
        correctAnswer: 1,
        explanation: "Walking clockwise (to the right) around stupas and temples is considered auspicious in Buddhist tradition.",
        category: "etiquette",
      },
      {
        id: "kc2",
        question: "What should you do before entering a Hindu temple?",
        options: ["Clap three times", "Remove your shoes", "Touch the door frame", "Ring a bell"],
        correctAnswer: 1,
        explanation: "Removing shoes before entering temples shows respect for the sacred space.",
        category: "etiquette",
      },
      {
        id: "kc3",
        question: "Which hand should you use when giving or receiving items in Nepal?",
        options: ["Left hand", "Right hand or both hands", "Either hand", "Doesn't matter"],
        correctAnswer: 1,
        explanation: "The right hand or both hands together is considered respectful. The left hand is considered impure.",
        category: "culture",
      },
      {
        id: "kc4",
        question: "What is 'Namaste' and how is it performed?",
        options: [
          "A handshake with eye contact",
          "Palms together with a slight bow",
          "A wave with your right hand",
          "A hug between friends"
        ],
        correctAnswer: 1,
        explanation: "Namaste is a greeting performed by pressing palms together near the chest with a slight bow.",
        category: "culture",
      },
    ],
  },
  {
    id: "trekking-safety",
    title: "Himalayan Trekking Safety",
    description: "Essential safety knowledge for high-altitude adventures",
    location: "Everest Region",
    difficulty: "medium",
    xpReward: 100,
    badge: {
      name: "Safety Champion",
      icon: "🏔️",
      color: "from-blue-500 to-cyan-500",
    },
    questions: [
      {
        id: "ts1",
        question: "What is the recommended daily altitude gain while trekking at high elevations?",
        options: ["1,000+ meters", "300-500 meters", "No limit if fit", "100 meters only"],
        correctAnswer: 1,
        explanation: "Limiting daily altitude gain to 300-500 meters above 3,000m helps prevent altitude sickness.",
        category: "safety",
      },
      {
        id: "ts2",
        question: "What are the early symptoms of Acute Mountain Sickness (AMS)?",
        options: [
          "Extreme hunger and thirst",
          "Headache, nausea, fatigue",
          "Improved vision and hearing",
          "Increased energy levels"
        ],
        correctAnswer: 1,
        explanation: "Headache, nausea, dizziness, and fatigue are early warning signs of AMS.",
        category: "safety",
      },
      {
        id: "ts3",
        question: "What should you do if you experience severe AMS symptoms?",
        options: [
          "Rest at the same altitude",
          "Push through to the next camp",
          "Descend immediately",
          "Take painkillers and continue"
        ],
        correctAnswer: 2,
        explanation: "Descending is the most effective treatment for severe AMS. Delay can be life-threatening.",
        category: "safety",
      },
      {
        id: "ts4",
        question: "How much water should you drink daily while trekking at altitude?",
        options: [
          "1-2 liters",
          "3-4 liters",
          "Same as sea level",
          "As little as possible"
        ],
        correctAnswer: 1,
        explanation: "Staying well-hydrated (3-4 liters daily) helps prevent altitude sickness.",
        category: "safety",
      },
      {
        id: "ts5",
        question: "What is the 'golden rule' of high-altitude trekking?",
        options: [
          "Never trek alone",
          "Climb high, sleep low",
          "Always carry oxygen",
          "Trek only in morning"
        ],
        correctAnswer: 1,
        explanation: "'Climb high, sleep low' means you can hike to higher elevations but should sleep at lower ones for acclimatization.",
        category: "safety",
      },
    ],
  },
  {
    id: "nepali-customs",
    title: "Nepali Customs & Traditions",
    description: "Learn about the rich traditions that make Nepal unique",
    location: "Nepal",
    difficulty: "easy",
    xpReward: 50,
    badge: {
      name: "Tradition Keeper",
      icon: "🎭",
      color: "from-purple-500 to-pink-500",
    },
    questions: [
      {
        id: "nc1",
        question: "What does 'Dal Bhat' consist of?",
        options: [
          "Momos and soup",
          "Rice, lentils, and sides",
          "Bread and curry",
          "Noodles and vegetables"
        ],
        correctAnswer: 1,
        explanation: "Dal Bhat is the national dish - steamed rice with lentil soup, usually served with vegetables and pickles.",
        category: "culture",
      },
      {
        id: "nc2",
        question: "What is Dashain?",
        options: [
          "A type of meditation",
          "Nepal's biggest festival",
          "A mountain range",
          "A traditional dance"
        ],
        correctAnswer: 1,
        explanation: "Dashain is Nepal's longest and most important Hindu festival, celebrating the victory of good over evil.",
        category: "culture",
      },
      {
        id: "nc3",
        question: "Why should you not point the soles of your feet at people or religious objects?",
        options: [
          "It's bad luck",
          "Feet are considered impure",
          "It's a form of greeting",
          "No specific reason"
        ],
        correctAnswer: 1,
        explanation: "In Nepali culture, feet are considered the lowest and most impure part of the body.",
        category: "etiquette",
      },
    ],
  },
  {
    id: "wildlife-conservation",
    title: "Chitwan Wildlife Conservation",
    description: "Test your knowledge about Nepal's wildlife and conservation",
    location: "Chitwan",
    difficulty: "medium",
    xpReward: 75,
    badge: {
      name: "Wildlife Guardian",
      icon: "🦏",
      color: "from-green-500 to-emerald-500",
    },
    questions: [
      {
        id: "wc1",
        question: "Which endangered animal is Chitwan National Park most famous for protecting?",
        options: [
          "Snow Leopard",
          "One-horned Rhinoceros",
          "Red Panda",
          "Himalayan Monal"
        ],
        correctAnswer: 1,
        explanation: "Chitwan is home to one of the largest populations of the endangered Greater One-horned Rhinoceros.",
        category: "geography",
      },
      {
        id: "wc2",
        question: "What should you do if you encounter a rhino while on a jungle walk?",
        options: [
          "Run directly away",
          "Stand still and make noise",
          "Climb a tree or find cover",
          "Approach slowly"
        ],
        correctAnswer: 2,
        explanation: "Rhinos have poor eyesight but excellent hearing. Climbing a tree or finding solid cover is the safest option.",
        category: "safety",
      },
      {
        id: "wc3",
        question: "Which indigenous community is native to the Chitwan region?",
        options: [
          "Sherpa",
          "Tharu",
          "Gurung",
          "Tamang"
        ],
        correctAnswer: 1,
        explanation: "The Tharu people are indigenous to the Terai region and have lived in harmony with the jungle for centuries.",
        category: "culture",
      },
    ],
  },
];

export const getQuizById = (id: string): Quiz | undefined => {
  return quizzes.find((quiz) => quiz.id === id);
};
