import kathmanduImg from "@/assets/kathmandu.jpg";
import pokharaImg from "@/assets/pokhara.jpg";
import chitwanImg from "@/assets/chitwan.jpg";
import everestImg from "@/assets/everest.jpg";
import lumbiniImg from "@/assets/lumbini.jpg";
import swayambhuImg from "@/assets/swayambhu.jpg";

export type StayType = "hotel" | "homestay" | "resort";

export interface Stay {
  id: string;
  name: string;
  type: StayType;
  destination: string;
  destinationId: string;
  image: string;
  rating: number;
  reviews: number;
  pricePerNight: number;
  currency: string;
  description: string;
  amenities: string[];
  highlighted: boolean;
}

export const stays: Stay[] = [
  // Kathmandu
  {
    id: "dwarika-hotel",
    name: "Dwarika's Hotel",
    type: "hotel",
    destination: "Kathmandu",
    destinationId: "kathmandu",
    image: kathmanduImg,
    rating: 4.8,
    reviews: 342,
    pricePerNight: 180,
    currency: "USD",
    description: "A heritage boutique hotel showcasing Nepal's ancient architecture with intricately carved windows and doors salvaged from across the valley.",
    amenities: ["WiFi", "Pool", "Spa", "Restaurant", "Heritage Tours", "Yoga"],
    highlighted: true,
  },
  {
    id: "kathmandu-guest-house",
    name: "Kathmandu Guest House",
    type: "homestay",
    destination: "Kathmandu",
    destinationId: "kathmandu",
    image: kathmanduImg,
    rating: 4.3,
    reviews: 587,
    pricePerNight: 35,
    currency: "USD",
    description: "An iconic family-run guesthouse in the heart of Thamel. Experience authentic Nepali hospitality with home-cooked meals and local insights.",
    amenities: ["WiFi", "Breakfast", "Garden", "Laundry", "Tour Desk"],
    highlighted: false,
  },
  {
    id: "hyatt-regency-kathmandu",
    name: "Hyatt Regency Kathmandu",
    type: "hotel",
    destination: "Kathmandu",
    destinationId: "kathmandu",
    image: kathmanduImg,
    rating: 4.6,
    reviews: 410,
    pricePerNight: 150,
    currency: "USD",
    description: "A luxury hotel set amidst lush gardens near Boudhanath Stupa, blending modern comfort with traditional Nepali design.",
    amenities: ["WiFi", "Pool", "Spa", "Restaurant", "Gym", "Conference"],
    highlighted: false,
  },

  // Pokhara
  {
    id: "temple-tree-resort",
    name: "Temple Tree Resort & Spa",
    type: "resort",
    destination: "Pokhara",
    destinationId: "pokhara",
    image: pokharaImg,
    rating: 4.7,
    reviews: 276,
    pricePerNight: 120,
    currency: "USD",
    description: "A stunning lakeside resort with panoramic views of Machhapuchhre and the Annapurna range. Perfect blend of luxury and nature.",
    amenities: ["WiFi", "Pool", "Spa", "Lake View", "Restaurant", "Bar"],
    highlighted: true,
  },
  {
    id: "gurung-homestay",
    name: "Gurung Heritage Homestay",
    type: "homestay",
    destination: "Pokhara",
    destinationId: "pokhara",
    image: pokharaImg,
    rating: 4.9,
    reviews: 124,
    pricePerNight: 25,
    currency: "USD",
    description: "Stay with a traditional Gurung family in Sarangkot. Wake up to spectacular sunrise views and enjoy home-cooked dal bhat.",
    amenities: ["Breakfast", "Mountain View", "Cultural Experience", "Trekking Guide"],
    highlighted: true,
  },
  {
    id: "fish-tail-lodge",
    name: "Fish Tail Lodge",
    type: "resort",
    destination: "Pokhara",
    destinationId: "pokhara",
    image: pokharaImg,
    rating: 4.5,
    reviews: 198,
    pricePerNight: 95,
    currency: "USD",
    description: "Accessible only by pontoon raft across Phewa Lake, this iconic lodge offers a unique retreat surrounded by water and mountains.",
    amenities: ["WiFi", "Lake Access", "Restaurant", "Garden", "Boat Transfer"],
    highlighted: false,
  },

  // Chitwan
  {
    id: "barahi-jungle-lodge",
    name: "Barahi Jungle Lodge",
    type: "resort",
    destination: "Chitwan",
    destinationId: "chitwan",
    image: chitwanImg,
    rating: 4.8,
    reviews: 215,
    pricePerNight: 200,
    currency: "USD",
    description: "An eco-luxury lodge on the banks of the Rapti River. Includes guided safaris, canoe rides, and cultural performances.",
    amenities: ["WiFi", "Pool", "Safari", "All-Inclusive", "Nature Walks", "Spa"],
    highlighted: true,
  },
  {
    id: "tharu-homestay",
    name: "Tharu Community Homestay",
    type: "homestay",
    destination: "Chitwan",
    destinationId: "chitwan",
    image: chitwanImg,
    rating: 4.6,
    reviews: 89,
    pricePerNight: 20,
    currency: "USD",
    description: "Experience the indigenous Tharu way of life. Enjoy traditional meals, cultural dances, and village walks led by local hosts.",
    amenities: ["Breakfast", "Cultural Show", "Village Tour", "Organic Food"],
    highlighted: false,
  },

  // Everest Region
  {
    id: "everest-view-hotel",
    name: "Hotel Everest View",
    type: "hotel",
    destination: "Everest Region",
    destinationId: "everest",
    image: everestImg,
    rating: 4.4,
    reviews: 156,
    pricePerNight: 250,
    currency: "USD",
    description: "The world's highest altitude hotel at 3,880m. Offers breathtaking panoramic views of Everest, Lhotse, and Ama Dablam.",
    amenities: ["Heating", "Restaurant", "Oxygen", "Mountain View", "Lounge"],
    highlighted: true,
  },
  {
    id: "namche-lodge",
    name: "Sherpa Culture Homestay",
    type: "homestay",
    destination: "Everest Region",
    destinationId: "everest",
    image: everestImg,
    rating: 4.7,
    reviews: 203,
    pricePerNight: 30,
    currency: "USD",
    description: "Stay with a Sherpa family in Namche Bazaar. Learn about mountaineering traditions and enjoy warm yak butter tea by the fire.",
    amenities: ["Breakfast", "Heating", "Cultural Stories", "Trekking Tips"],
    highlighted: false,
  },

  // Lumbini
  {
    id: "lumbini-buddha-garden",
    name: "Buddha Garden Resort",
    type: "resort",
    destination: "Lumbini",
    destinationId: "lumbini",
    image: lumbiniImg,
    rating: 4.3,
    reviews: 142,
    pricePerNight: 75,
    currency: "USD",
    description: "A peaceful retreat near the sacred garden. Ideal for pilgrims and travelers seeking spiritual tranquility.",
    amenities: ["WiFi", "Garden", "Meditation Hall", "Restaurant", "Bicycle Rental"],
    highlighted: false,
  },

  // Swayambhunath
  {
    id: "traditional-newari-home",
    name: "Newari Heritage Home",
    type: "homestay",
    destination: "Swayambhunath",
    destinationId: "swayambhu",
    image: swayambhuImg,
    rating: 4.5,
    reviews: 98,
    pricePerNight: 40,
    currency: "USD",
    description: "A beautifully restored Newari home with carved wooden windows near the Monkey Temple. Experience centuries-old architecture and traditions.",
    amenities: ["Breakfast", "Rooftop View", "Cultural Tour", "WiFi", "Home Cooking"],
    highlighted: false,
  },
];

export const stayTypeLabels: Record<StayType, string> = {
  hotel: "Hotel",
  homestay: "Homestay",
  resort: "Resort",
};
