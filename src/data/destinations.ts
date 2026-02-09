import kathmanduImg from "@/assets/kathmandu.jpg";
import pokharaImg from "@/assets/pokhara.jpg";
import lumbiniImg from "@/assets/lumbini.jpg";
import chitwanImg from "@/assets/chitwan.jpg";
import swayambhuImg from "@/assets/swayambhu.jpg";
import everestImg from "@/assets/everest.jpg";

// 360° panoramic images
import kathmandu360 from "@/assets/360/kathmandu-360.jpg";
import pokhara360 from "@/assets/360/pokhara-360.jpg";
import lumbini360 from "@/assets/360/lumbini-360.jpg";
import chitwan360 from "@/assets/360/chitwan-360.jpg";
import swayambhu360 from "@/assets/360/swayambhu-360.jpg";
import everest360 from "@/assets/360/everest-360.jpg";

export type DestinationType = "heritage" | "nature" | "spiritual";

export interface Destination {
  id: string;
  image: string;
  panorama: string;
  name: string;
  description: string;
  longDescription: string;
  region: string;
  type: DestinationType;
  bestTime: string;
  elevation: string;
  rating: number;
  highlights: string[];
  vrTours: number;
  hotspots: number;
}

export const destinations: Destination[] = [
  {
    id: "kathmandu",
    image: kathmanduImg,
    panorama: kathmandu360,
    name: "Kathmandu",
    description: "The vibrant capital city where ancient temples meet modern life",
    longDescription: "Kathmandu, the capital and largest city of Nepal, is a vibrant metropolis that serves as the country's cultural, historical, and economic heart. The city is home to seven UNESCO World Heritage Sites, including the famous Durbar Squares, ancient temples, and stupas that showcase centuries of Nepali art and architecture.",
    region: "Kathmandu Valley",
    type: "heritage",
    bestTime: "October to December",
    elevation: "1,400m",
    rating: 83,
    highlights: ["Durbar Square", "Pashupatinath Temple", "Boudhanath Stupa", "Thamel District"],
    vrTours: 3,
    hotspots: 15,
  },
  {
    id: "pokhara",
    image: pokharaImg,
    panorama: pokhara360,
    name: "Pokhara",
    description: "The serene lakeside city with stunning Himalayan views",
    longDescription: "Pokhara is Nepal's adventure capital and a gateway to the Annapurna Circuit. Nestled beside Phewa Lake with the dramatic Annapurna range as its backdrop, this city offers the perfect blend of natural beauty and modern amenities. The reflection of Machapuchare (Fishtail) in the lake creates one of Nepal's most iconic views.",
    region: "Gandaki Province",
    type: "nature",
    bestTime: "September to November",
    elevation: "827m",
    rating: 81,
    highlights: ["Phewa Lake", "World Peace Pagoda", "Davis Falls", "Sarangkot Sunrise"],
    vrTours: 4,
    hotspots: 12,
  },
  {
    id: "lumbini",
    image: lumbiniImg,
    panorama: lumbini360,
    name: "Lumbini",
    description: "The sacred birthplace of Lord Buddha",
    longDescription: "Lumbini is one of the world's most important spiritual sites, marking the birthplace of Siddhartha Gautama, who became the Buddha. This UNESCO World Heritage Site features the Maya Devi Temple, the sacred Bodhi tree, and monasteries built by Buddhist communities from around the world, each showcasing their unique architectural traditions.",
    region: "Province 5",
    type: "spiritual",
    bestTime: "October to March",
    elevation: "150m",
    rating: 89,
    highlights: ["Maya Devi Temple", "Ashoka Pillar", "World Peace Flame", "Monastic Zone"],
    vrTours: 2,
    hotspots: 8,
  },
  {
    id: "chitwan",
    image: chitwanImg,
    panorama: chitwan360,
    name: "Chitwan",
    description: "Nepal's premier wildlife sanctuary and jungle experience",
    longDescription: "Chitwan National Park is Nepal's first national park and a UNESCO World Heritage Site. Home to the endangered one-horned rhinoceros, Bengal tigers, and over 500 species of birds, this subtropical wilderness offers unforgettable wildlife encounters through jungle safaris, elephant rides, and canoe trips along the Rapti River.",
    region: "Province 3",
    type: "nature",
    bestTime: "October to March",
    elevation: "150m",
    rating: 79,
    highlights: ["Jungle Safari", "Elephant Breeding Center", "Tharu Cultural Show", "Canoe Rides"],
    vrTours: 3,
    hotspots: 10,
  },
  {
    id: "swayambhu",
    image: swayambhuImg,
    panorama: swayambhu360,
    name: "Swayambhunath",
    description: "The iconic Monkey Temple overlooking Kathmandu Valley",
    longDescription: "Swayambhunath, affectionately known as the Monkey Temple, is one of Nepal's most sacred Buddhist sites. Perched atop a hill overlooking Kathmandu Valley, this ancient stupa features the famous Buddha eyes that gaze in all four directions. The site combines Hindu and Buddhist iconography, reflecting Nepal's religious harmony.",
    region: "Kathmandu",
    type: "spiritual",
    bestTime: "Year-round",
    elevation: "1,400m",
    rating: 84,
    highlights: ["Main Stupa", "Buddha Eyes", "Prayer Wheels", "Panoramic Views"],
    vrTours: 2,
    hotspots: 7,
  },
  {
    id: "everest",
    image: everestImg,
    panorama: everest360,
    name: "Everest Region",
    description: "Trek to the base of the world's highest peak",
    longDescription: "The Everest Region, home to the world's highest peak at 8,848 meters, offers some of the most spectacular trekking experiences on Earth. From the bustling Sherpa town of Namche Bazaar to the spiritual Tengboche Monastery, and finally to Everest Base Camp itself, this journey takes you through breathtaking landscapes and rich Sherpa culture.",
    region: "Khumbu",
    type: "nature",
    bestTime: "March to May",
    elevation: "5,364m",
    rating: 96,
    highlights: ["Base Camp Trek", "Namche Bazaar", "Tengboche Monastery", "Kala Patthar Viewpoint"],
    vrTours: 5,
    hotspots: 20,
  },
];

export const getDestinationById = (id: string): Destination | undefined => {
  return destinations.find((dest) => dest.id === id);
};
