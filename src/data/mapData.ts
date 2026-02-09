export interface MapLocation {
  id: string;
  name: string;
  lat: number;
  lng: number;
  type: "destination" | "trekking" | "cultural" | "wildlife";
  status: "open" | "blocked";
  blockReason?: string;
  weather: {
    temp: number;
    condition: string;
    humidity: number;
    wind: number;
  };
  culturalTips: {
    dos: string[];
    donts: string[];
  };
  description: string;
  elevation: string;
}

export interface RoadIssue {
  id: string;
  lat: number;
  lng: number;
  type: "landslide" | "construction" | "weather" | "permit";
  severity: "low" | "medium" | "high";
  description: string;
  expectedClearance?: string;
}

export const mapLocations: MapLocation[] = [
  {
    id: "kathmandu",
    name: "Kathmandu Durbar Square",
    lat: 27.7044,
    lng: 85.3056,
    type: "cultural",
    status: "open",
    weather: {
      temp: 22,
      condition: "Partly Cloudy",
      humidity: 65,
      wind: 8,
    },
    culturalTips: {
      dos: [
        "Remove shoes before entering temples",
        "Walk clockwise around stupas",
        "Ask permission before photographing locals",
        "Dress modestly in religious sites",
      ],
      donts: [
        "Point feet at religious objects or people",
        "Touch religious offerings",
        "Enter temples during menstruation (some temples)",
        "Wear revealing clothing in sacred areas",
      ],
    },
    description: "UNESCO World Heritage Site featuring ancient palaces, courtyards, and temples dating back to the Malla period.",
    elevation: "1,400m",
  },
  {
    id: "everest-base",
    name: "Everest Base Camp",
    lat: 28.0025,
    lng: 86.8528,
    type: "trekking",
    status: "open",
    weather: {
      temp: -8,
      condition: "Clear",
      humidity: 35,
      wind: 25,
    },
    culturalTips: {
      dos: [
        "Greet locals with 'Namaste'",
        "Support local teahouses",
        "Carry out all trash",
        "Respect Sherpa traditions",
      ],
      donts: [
        "Trek alone without experience",
        "Ignore altitude sickness symptoms",
        "Disturb wildlife or prayer flags",
        "Skip acclimatization days",
      ],
    },
    description: "The legendary base camp at 5,364m, gateway to the world's highest peak.",
    elevation: "5,364m",
  },
  {
    id: "pokhara",
    name: "Pokhara Lakeside",
    lat: 28.2096,
    lng: 83.9856,
    type: "destination",
    status: "open",
    weather: {
      temp: 24,
      condition: "Sunny",
      humidity: 55,
      wind: 5,
    },
    culturalTips: {
      dos: [
        "Try local Thakali cuisine",
        "Hire local guides for paragliding",
        "Visit World Peace Pagoda at sunrise",
        "Explore the old town markets",
      ],
      donts: [
        "Swim in the lake without local guidance",
        "Bargain aggressively with vendors",
        "Litter near the lake",
        "Miss the Sarangkot sunrise",
      ],
    },
    description: "Nepal's adventure capital with stunning Annapurna views reflected in Phewa Lake.",
    elevation: "827m",
  },
  {
    id: "lumbini",
    name: "Lumbini (Buddha's Birthplace)",
    lat: 27.4833,
    lng: 83.2768,
    type: "cultural",
    status: "open",
    weather: {
      temp: 28,
      condition: "Hot",
      humidity: 70,
      wind: 10,
    },
    culturalTips: {
      dos: [
        "Maintain silence in meditation zones",
        "Visit Maya Devi Temple early morning",
        "Explore monasteries from different countries",
        "Light a candle at the Eternal Flame",
      ],
      donts: [
        "Wear shoes in sacred areas",
        "Take photos during ceremonies",
        "Disturb meditating pilgrims",
        "Touch the Ashoka Pillar",
      ],
    },
    description: "Sacred birthplace of Siddhartha Gautama, UNESCO World Heritage Site.",
    elevation: "150m",
  },
  {
    id: "chitwan",
    name: "Chitwan National Park",
    lat: 27.5000,
    lng: 84.3333,
    type: "wildlife",
    status: "open",
    weather: {
      temp: 30,
      condition: "Humid",
      humidity: 80,
      wind: 5,
    },
    culturalTips: {
      dos: [
        "Book safaris with licensed operators",
        "Attend Tharu cultural shows",
        "Wake early for best wildlife sightings",
        "Tip guides appropriately",
      ],
      donts: [
        "Make loud noises during safari",
        "Get too close to wildlife",
        "Feed animals",
        "Leave the vehicle without permission",
      ],
    },
    description: "Nepal's premier wildlife destination, home to rhinos, tigers, and 500+ bird species.",
    elevation: "150m",
  },
  {
    id: "annapurna",
    name: "Annapurna Circuit",
    lat: 28.5500,
    lng: 83.8833,
    type: "trekking",
    status: "blocked",
    blockReason: "Heavy snowfall - Thorong La Pass closed until conditions improve (estimated 3-5 days)",
    weather: {
      temp: -12,
      condition: "Snowing",
      humidity: 85,
      wind: 45,
    },
    culturalTips: {
      dos: [
        "Get proper permits (TIMS & ACAP)",
        "Hire local porters from registered agencies",
        "Stay in local teahouses",
        "Carry altitude medication",
      ],
      donts: [
        "Attempt Thorong La in bad weather",
        "Skip acclimatization at Manang",
        "Trek after sunset",
        "Ignore local weather warnings",
      ],
    },
    description: "One of the world's most iconic trekking routes, circumnavigating the Annapurna massif.",
    elevation: "5,416m (Thorong La)",
  },
  {
    id: "mustang",
    name: "Upper Mustang",
    lat: 29.1833,
    lng: 83.9500,
    type: "cultural",
    status: "open",
    weather: {
      temp: 8,
      condition: "Dry",
      humidity: 25,
      wind: 15,
    },
    culturalTips: {
      dos: [
        "Obtain restricted area permit",
        "Respect the unique Tibetan Buddhist culture",
        "Visit ancient cave monasteries",
        "Try traditional buckwheat dishes",
      ],
      donts: [
        "Enter without proper permits",
        "Photograph military installations",
        "Remove artifacts from caves",
        "Disrespect local customs",
      ],
    },
    description: "The 'Forbidden Kingdom' - a preserved Tibetan Buddhist culture in a dramatic desert landscape.",
    elevation: "3,840m",
  },
];

export const roadIssues: RoadIssue[] = [
  {
    id: "road-1",
    lat: 27.8500,
    lng: 85.9000,
    type: "landslide",
    severity: "high",
    description: "Major landslide on Arniko Highway. Road completely blocked.",
    expectedClearance: "48-72 hours",
  },
  {
    id: "road-2",
    lat: 28.3500,
    lng: 83.8000,
    type: "construction",
    severity: "medium",
    description: "Road widening project. Single lane traffic, expect delays.",
    expectedClearance: "Ongoing until March 2025",
  },
  {
    id: "road-3",
    lat: 27.6000,
    lng: 84.5000,
    type: "weather",
    severity: "low",
    description: "Fog advisory. Reduced visibility in morning hours.",
    expectedClearance: "Daily, clears by 10 AM",
  },
];

export const userLocation = {
  lat: 27.7172,
  lng: 85.3240,
  name: "Your Location (Kathmandu)",
};
