// Comprehensive trip templates for smart itinerary generation
// Each destination has activities, restaurants, hotels with realistic timings and costs

export interface PlaceTemplate {
  name: string;
  type: "attraction" | "restaurant" | "hotel" | "transport";
  duration: string; // e.g., "2 hours"
  cost: { budget: number; mid: number; luxury: number };
  timeSlot: "morning" | "afternoon" | "evening" | "anytime";
  coordinates: [number, number];
  notes: string;
  category?: string;
}

export interface DayTemplate {
  theme: string;
  description: string;
}

export interface DestinationTemplate {
  id: string;
  name: string;
  coordinates: [number, number];
  dayThemes: DayTemplate[];
  places: {
    attractions: PlaceTemplate[];
    restaurants: PlaceTemplate[];
    hotels: PlaceTemplate[];
    transport: PlaceTemplate[];
  };
  budgetGuide: {
    budget: { dailyMin: number; dailyMax: number; description: string };
    mid: { dailyMin: number; dailyMax: number; description: string };
    luxury: { dailyMin: number; dailyMax: number; description: string };
  };
  packingSuggestions: string[];
  tips: string[];
}

export const destinationTemplates: DestinationTemplate[] = [
  {
    id: "kathmandu",
    name: "Kathmandu Valley",
    coordinates: [27.7172, 85.324],
    dayThemes: [
      { theme: "Heritage Discovery", description: "Explore ancient temples and UNESCO sites" },
      { theme: "Spiritual Journey", description: "Visit sacred stupas and monasteries" },
      { theme: "Cultural Immersion", description: "Markets, museums, and local life" },
      { theme: "Day Trip Adventure", description: "Explore surrounding valley attractions" },
      { theme: "Art & Craft", description: "Traditional crafts and Newari culture" },
      { theme: "Nature & Views", description: "Hiking and panoramic experiences" },
      { theme: "Relaxation", description: "Spa, gardens, and leisurely exploration" },
    ],
    places: {
      attractions: [
        { name: "Swayambhunath Stupa (Monkey Temple)", type: "attraction", duration: "2 hours", cost: { budget: 3, mid: 3, luxury: 3 }, timeSlot: "morning", coordinates: [27.7149, 85.2905], notes: "Best at sunrise for amazing valley views", category: "Religious" },
        { name: "Boudhanath Stupa", type: "attraction", duration: "2 hours", cost: { budget: 4, mid: 4, luxury: 4 }, timeSlot: "afternoon", coordinates: [27.7215, 85.362], notes: "Largest stupa in Nepal, great for kora walk", category: "Religious" },
        { name: "Pashupatinath Temple", type: "attraction", duration: "2 hours", cost: { budget: 10, mid: 10, luxury: 10 }, timeSlot: "morning", coordinates: [27.7107, 85.3487], notes: "Sacred Hindu temple, observe cremation ghats", category: "Religious" },
        { name: "Kathmandu Durbar Square", type: "attraction", duration: "3 hours", cost: { budget: 10, mid: 10, luxury: 10 }, timeSlot: "anytime", coordinates: [27.7047, 85.3066], notes: "Ancient royal palace complex", category: "Heritage" },
        { name: "Patan Durbar Square", type: "attraction", duration: "3 hours", cost: { budget: 10, mid: 10, luxury: 10 }, timeSlot: "anytime", coordinates: [27.6727, 85.325], notes: "Best preserved of the three squares", category: "Heritage" },
        { name: "Bhaktapur Durbar Square", type: "attraction", duration: "4 hours", cost: { budget: 15, mid: 15, luxury: 15 }, timeSlot: "morning", coordinates: [27.672, 85.4298], notes: "Medieval city, try local juju dhau", category: "Heritage" },
        { name: "Garden of Dreams", type: "attraction", duration: "1.5 hours", cost: { budget: 2, mid: 2, luxury: 2 }, timeSlot: "afternoon", coordinates: [27.7137, 85.3165], notes: "Peaceful neo-classical garden", category: "Nature" },
        { name: "Narayanhiti Palace Museum", type: "attraction", duration: "2 hours", cost: { budget: 5, mid: 5, luxury: 5 }, timeSlot: "afternoon", coordinates: [27.7174, 85.3206], notes: "Former royal palace, fascinating history", category: "Museum" },
        { name: "Kopan Monastery", type: "attraction", duration: "3 hours", cost: { budget: 0, mid: 0, luxury: 0 }, timeSlot: "morning", coordinates: [27.7383, 85.3643], notes: "Buddhist meditation center with courses", category: "Religious" },
        { name: "Thamel Walking Tour", type: "attraction", duration: "2 hours", cost: { budget: 0, mid: 15, luxury: 30 }, timeSlot: "evening", coordinates: [27.7153, 85.3123], notes: "Vibrant tourist district, shopping paradise", category: "Cultural" },
        { name: "Chandragiri Hills Cable Car", type: "attraction", duration: "4 hours", cost: { budget: 20, mid: 20, luxury: 20 }, timeSlot: "morning", coordinates: [27.6851, 85.2195], notes: "Panoramic Himalayan views", category: "Nature" },
        { name: "Nagarkot Sunrise", type: "attraction", duration: "5 hours", cost: { budget: 15, mid: 25, luxury: 50 }, timeSlot: "morning", coordinates: [27.7172, 85.5206], notes: "Famous viewpoint for sunrise over Himalayas", category: "Nature" },
      ],
      restaurants: [
        { name: "Bhojan Griha", type: "restaurant", duration: "2 hours", cost: { budget: 25, mid: 35, luxury: 50 }, timeSlot: "evening", coordinates: [27.7088, 85.3141], notes: "Traditional Nepali feast with cultural show", category: "Fine Dining" },
        { name: "Thamel House Restaurant", type: "restaurant", duration: "1.5 hours", cost: { budget: 15, mid: 20, luxury: 30 }, timeSlot: "evening", coordinates: [27.7149, 85.3119], notes: "Authentic Newari cuisine in heritage building", category: "Traditional" },
        { name: "OR2K", type: "restaurant", duration: "1 hour", cost: { budget: 8, mid: 12, luxury: 15 }, timeSlot: "anytime", coordinates: [27.7148, 85.3128], notes: "Vegetarian/vegan Middle Eastern fusion", category: "Vegetarian" },
        { name: "Roadhouse Cafe", type: "restaurant", duration: "1 hour", cost: { budget: 10, mid: 15, luxury: 20 }, timeSlot: "anytime", coordinates: [27.7152, 85.3101], notes: "Best wood-fired pizza in town", category: "Western" },
        { name: "Café du Temple", type: "restaurant", duration: "1 hour", cost: { budget: 5, mid: 8, luxury: 12 }, timeSlot: "morning", coordinates: [27.7047, 85.3069], notes: "Rooftop views of Durbar Square", category: "Cafe" },
        { name: "Yangling Tibetan Restaurant", type: "restaurant", duration: "1 hour", cost: { budget: 5, mid: 8, luxury: 10 }, timeSlot: "anytime", coordinates: [27.7161, 85.3125], notes: "Authentic momos and thukpa", category: "Tibetan" },
        { name: "Fire & Ice Pizzeria", type: "restaurant", duration: "1 hour", cost: { budget: 10, mid: 15, luxury: 20 }, timeSlot: "evening", coordinates: [27.7145, 85.3103], notes: "Italian classics, local favorite", category: "Western" },
        { name: "Local Momo Street Stall", type: "restaurant", duration: "30 mins", cost: { budget: 2, mid: 2, luxury: 2 }, timeSlot: "anytime", coordinates: [27.7156, 85.3108], notes: "Authentic street food experience", category: "Street Food" },
      ],
      hotels: [
        { name: "Dwarika's Hotel", type: "hotel", duration: "1 night", cost: { budget: 200, mid: 300, luxury: 500 }, timeSlot: "anytime", coordinates: [27.7127, 85.3339], notes: "Heritage luxury, UNESCO recognition", category: "Luxury" },
        { name: "Hyatt Regency Kathmandu", type: "hotel", duration: "1 night", cost: { budget: 150, mid: 200, luxury: 350 }, timeSlot: "anytime", coordinates: [27.7216, 85.3619], notes: "Near Boudhanath, excellent amenities", category: "Luxury" },
        { name: "Hotel Yak & Yeti", type: "hotel", duration: "1 night", cost: { budget: 100, mid: 150, luxury: 250 }, timeSlot: "anytime", coordinates: [27.7134, 85.3186], notes: "Historic palace grounds, central location", category: "Upscale" },
        { name: "Z Hotel Thamel", type: "hotel", duration: "1 night", cost: { budget: 60, mid: 80, luxury: 100 }, timeSlot: "anytime", coordinates: [27.7156, 85.3112], notes: "Modern boutique in heart of Thamel", category: "Mid-range" },
        { name: "Hotel Encounter Nepal", type: "hotel", duration: "1 night", cost: { budget: 30, mid: 40, luxury: 50 }, timeSlot: "anytime", coordinates: [27.7144, 85.3098], notes: "Great budget option with rooftop", category: "Budget" },
        { name: "Zostel Kathmandu", type: "hotel", duration: "1 night", cost: { budget: 10, mid: 15, luxury: 25 }, timeSlot: "anytime", coordinates: [27.7159, 85.3127], notes: "Social hostel for backpackers", category: "Hostel" },
      ],
      transport: [
        { name: "Airport Transfer", type: "transport", duration: "45 mins", cost: { budget: 10, mid: 20, luxury: 40 }, timeSlot: "anytime", coordinates: [27.6966, 85.3591], notes: "Tribhuvan International Airport pickup", category: "Transfer" },
        { name: "Kathmandu to Bhaktapur", type: "transport", duration: "1 hour", cost: { budget: 5, mid: 15, luxury: 30 }, timeSlot: "morning", coordinates: [27.672, 85.4298], notes: "Local bus or private taxi", category: "Day Trip" },
        { name: "Kathmandu to Nagarkot", type: "transport", duration: "1.5 hours", cost: { budget: 8, mid: 25, luxury: 50 }, timeSlot: "morning", coordinates: [27.7172, 85.5206], notes: "Mountain viewpoint transfer", category: "Day Trip" },
      ],
    },
    budgetGuide: {
      budget: { dailyMin: 30, dailyMax: 50, description: "Hostels, local food, public transport" },
      mid: { dailyMin: 80, dailyMax: 150, description: "3-star hotels, mix of local and tourist restaurants" },
      luxury: { dailyMin: 200, dailyMax: 500, description: "5-star hotels, fine dining, private guides" },
    },
    packingSuggestions: ["Comfortable walking shoes", "Modest clothing for temples", "Scarf/shawl for religious sites", "Sunscreen", "Reusable water bottle", "Power bank", "Camera"],
    tips: ["Remove shoes before entering temples", "Walk clockwise around Buddhist sites", "Bargain at markets but be respectful", "Carry small bills for tips"],
  },
  {
    id: "pokhara",
    name: "Pokhara",
    coordinates: [28.2096, 83.9856],
    dayThemes: [
      { theme: "Lake & Mountains", description: "Phewa Lake and mountain views" },
      { theme: "Adventure Day", description: "Paragliding, zip-lining, or rafting" },
      { theme: "Peace & Spirituality", description: "Stupas and meditation" },
      { theme: "Nature Exploration", description: "Caves, waterfalls, and gardens" },
      { theme: "Trekking Preparation", description: "Gear up for Annapurna trails" },
      { theme: "Cultural Discovery", description: "Museums and local villages" },
      { theme: "Relaxation", description: "Lakeside leisure and spa" },
    ],
    places: {
      attractions: [
        { name: "Sarangkot Sunrise", type: "attraction", duration: "4 hours", cost: { budget: 10, mid: 25, luxury: 50 }, timeSlot: "morning", coordinates: [28.2443, 83.9515], notes: "Spectacular Annapurna views at dawn", category: "Nature" },
        { name: "Phewa Lake Boating", type: "attraction", duration: "2 hours", cost: { budget: 5, mid: 8, luxury: 15 }, timeSlot: "afternoon", coordinates: [28.2096, 83.9567], notes: "Row to Tal Barahi Temple island", category: "Lake" },
        { name: "World Peace Pagoda", type: "attraction", duration: "3 hours", cost: { budget: 0, mid: 5, luxury: 20 }, timeSlot: "afternoon", coordinates: [28.1942, 83.9431], notes: "Hike or boat + hike for sunset views", category: "Religious" },
        { name: "Paragliding", type: "attraction", duration: "3 hours", cost: { budget: 80, mid: 100, luxury: 150 }, timeSlot: "morning", coordinates: [28.2443, 83.9515], notes: "Tandem flight from Sarangkot", category: "Adventure" },
        { name: "Davis Falls", type: "attraction", duration: "1 hour", cost: { budget: 1, mid: 1, luxury: 1 }, timeSlot: "anytime", coordinates: [28.1831, 83.9489], notes: "Unique underground waterfall", category: "Nature" },
        { name: "Gupteshwor Cave", type: "attraction", duration: "1 hour", cost: { budget: 1, mid: 1, luxury: 1 }, timeSlot: "anytime", coordinates: [28.1825, 83.9492], notes: "Sacred cave opposite Davis Falls", category: "Nature" },
        { name: "International Mountain Museum", type: "attraction", duration: "2 hours", cost: { budget: 4, mid: 4, luxury: 4 }, timeSlot: "afternoon", coordinates: [28.1998, 83.9456], notes: "History of Himalayan mountaineering", category: "Museum" },
        { name: "Begnas Lake", type: "attraction", duration: "4 hours", cost: { budget: 10, mid: 20, luxury: 40 }, timeSlot: "morning", coordinates: [28.1723, 84.0956], notes: "Quieter alternative to Phewa", category: "Lake" },
        { name: "Zip Flyer", type: "attraction", duration: "2 hours", cost: { budget: 70, mid: 70, luxury: 70 }, timeSlot: "morning", coordinates: [28.2399, 83.9589], notes: "One of world's steepest zip lines", category: "Adventure" },
        { name: "Lakeside Walking Tour", type: "attraction", duration: "2 hours", cost: { budget: 0, mid: 0, luxury: 0 }, timeSlot: "evening", coordinates: [28.2088, 83.9573], notes: "Shops, cafes, and sunset views", category: "Cultural" },
        { name: "Australian Camp Trek", type: "attraction", duration: "6 hours", cost: { budget: 15, mid: 30, luxury: 60 }, timeSlot: "morning", coordinates: [28.2899, 83.8754], notes: "Easy day hike with mountain views", category: "Trekking" },
      ],
      restaurants: [
        { name: "Moondance Restaurant", type: "restaurant", duration: "1.5 hours", cost: { budget: 15, mid: 20, luxury: 30 }, timeSlot: "evening", coordinates: [28.2085, 83.9578], notes: "Lakeside fine dining, great steaks", category: "Western" },
        { name: "Busy Bee Cafe", type: "restaurant", duration: "1 hour", cost: { budget: 8, mid: 12, luxury: 15 }, timeSlot: "morning", coordinates: [28.2092, 83.9581], notes: "Best breakfast in Lakeside", category: "Cafe" },
        { name: "Godfather's Pizzeria", type: "restaurant", duration: "1 hour", cost: { budget: 8, mid: 12, luxury: 15 }, timeSlot: "evening", coordinates: [28.2089, 83.9576], notes: "Wood-fired pizza institution", category: "Western" },
        { name: "Thakali Kitchen", type: "restaurant", duration: "1 hour", cost: { budget: 5, mid: 8, luxury: 12 }, timeSlot: "anytime", coordinates: [28.2078, 83.9585], notes: "Authentic Thakali dal bhat", category: "Traditional" },
        { name: "AM/PM Organic Cafe", type: "restaurant", duration: "1 hour", cost: { budget: 6, mid: 10, luxury: 15 }, timeSlot: "morning", coordinates: [28.2091, 83.958], notes: "Healthy, organic options", category: "Vegetarian" },
        { name: "Fresh Elements", type: "restaurant", duration: "1 hour", cost: { budget: 10, mid: 15, luxury: 20 }, timeSlot: "evening", coordinates: [28.2095, 83.9575], notes: "Farm-to-table concept", category: "Fine Dining" },
        { name: "Lemon Tree Restaurant", type: "restaurant", duration: "1 hour", cost: { budget: 8, mid: 12, luxury: 18 }, timeSlot: "evening", coordinates: [28.2087, 83.9579], notes: "Nepali and international fusion", category: "Fusion" },
      ],
      hotels: [
        { name: "Tiger Mountain Pokhara Lodge", type: "hotel", duration: "1 night", cost: { budget: 300, mid: 400, luxury: 600 }, timeSlot: "anytime", coordinates: [28.2234, 83.9923], notes: "Luxury eco-lodge with stunning views", category: "Luxury" },
        { name: "Temple Tree Resort", type: "hotel", duration: "1 night", cost: { budget: 150, mid: 200, luxury: 300 }, timeSlot: "anytime", coordinates: [28.2045, 83.9556], notes: "Lakeside luxury with pool", category: "Luxury" },
        { name: "Hotel Middle Path", type: "hotel", duration: "1 night", cost: { budget: 60, mid: 80, luxury: 120 }, timeSlot: "anytime", coordinates: [28.2093, 83.9577], notes: "Great mid-range lakeside option", category: "Mid-range" },
        { name: "Hotel Barahi", type: "hotel", duration: "1 night", cost: { budget: 80, mid: 100, luxury: 150 }, timeSlot: "anytime", coordinates: [28.2081, 83.9582], notes: "Premium lakeside location", category: "Mid-range" },
        { name: "Zostel Pokhara", type: "hotel", duration: "1 night", cost: { budget: 8, mid: 12, luxury: 20 }, timeSlot: "anytime", coordinates: [28.21, 83.9574], notes: "Backpacker favorite hostel", category: "Hostel" },
        { name: "Hotel Lake Star", type: "hotel", duration: "1 night", cost: { budget: 25, mid: 35, luxury: 50 }, timeSlot: "anytime", coordinates: [28.2085, 83.9575], notes: "Clean budget hotel", category: "Budget" },
      ],
      transport: [
        { name: "Kathmandu to Pokhara Bus", type: "transport", duration: "7 hours", cost: { budget: 10, mid: 20, luxury: 40 }, timeSlot: "morning", coordinates: [28.2096, 83.9856], notes: "Tourist bus with AC", category: "Intercity" },
        { name: "Kathmandu to Pokhara Flight", type: "transport", duration: "30 mins", cost: { budget: 100, mid: 120, luxury: 150 }, timeSlot: "morning", coordinates: [28.1997, 83.9823], notes: "Scenic mountain flight", category: "Flight" },
        { name: "Sarangkot Taxi", type: "transport", duration: "30 mins", cost: { budget: 10, mid: 15, luxury: 25 }, timeSlot: "morning", coordinates: [28.2443, 83.9515], notes: "Early morning for sunrise", category: "Local" },
      ],
    },
    budgetGuide: {
      budget: { dailyMin: 25, dailyMax: 45, description: "Hostels, local eateries, shared activities" },
      mid: { dailyMin: 70, dailyMax: 130, description: "Lakeside hotels, restaurants, activities" },
      luxury: { dailyMin: 180, dailyMax: 450, description: "Resort stays, private tours, premium activities" },
    },
    packingSuggestions: ["Sunglasses", "Swimwear", "Light hiking shoes", "Rain jacket", "Binoculars for views", "Action camera for adventures"],
    tips: ["Book paragliding 1 day ahead", "Start early for Sarangkot sunrise", "Rent a bicycle for lakeside exploration", "Check weather for mountain visibility"],
  },
  {
    id: "everest",
    name: "Everest Region",
    coordinates: [27.9881, 86.925],
    dayThemes: [
      { theme: "Arrival & Acclimatization", description: "Fly to Lukla, trek to Phakding" },
      { theme: "Valley Trek", description: "Trek through Sherpa villages" },
      { theme: "Namche Bazaar", description: "Explore Sherpa capital, acclimatize" },
      { theme: "High Altitude Views", description: "Viewpoints and monasteries" },
      { theme: "Everest Base Camp", description: "The ultimate destination" },
      { theme: "Kala Patthar", description: "Best Everest panorama at sunrise" },
      { theme: "Return Journey", description: "Trek back with new perspectives" },
    ],
    places: {
      attractions: [
        { name: "Lukla Landing", type: "attraction", duration: "1 hour", cost: { budget: 180, mid: 180, luxury: 350 }, timeSlot: "morning", coordinates: [27.6868, 86.7277], notes: "World's most exciting airport", category: "Adventure" },
        { name: "Namche Bazaar", type: "attraction", duration: "1 day", cost: { budget: 0, mid: 0, luxury: 0 }, timeSlot: "anytime", coordinates: [27.8069, 86.7103], notes: "Sherpa capital, great for acclimatization", category: "Cultural" },
        { name: "Everest View Hotel", type: "attraction", duration: "3 hours", cost: { budget: 20, mid: 30, luxury: 50 }, timeSlot: "morning", coordinates: [27.8233, 86.7173], notes: "Highest placed hotel with Everest views", category: "Viewpoint" },
        { name: "Tengboche Monastery", type: "attraction", duration: "2 hours", cost: { budget: 5, mid: 5, luxury: 5 }, timeSlot: "afternoon", coordinates: [27.8364, 86.764], notes: "Most important monastery in region", category: "Religious" },
        { name: "Everest Base Camp", type: "attraction", duration: "4 hours", cost: { budget: 0, mid: 0, luxury: 0 }, timeSlot: "morning", coordinates: [28.0025, 86.8528], notes: "The iconic destination at 5,364m", category: "Trekking" },
        { name: "Kala Patthar", type: "attraction", duration: "5 hours", cost: { budget: 0, mid: 0, luxury: 0 }, timeSlot: "morning", coordinates: [28.0017, 86.8294], notes: "Best sunrise view of Everest at 5,545m", category: "Viewpoint" },
        { name: "Sherpa Culture Museum", type: "attraction", duration: "1 hour", cost: { budget: 3, mid: 3, luxury: 3 }, timeSlot: "afternoon", coordinates: [27.8069, 86.7103], notes: "Learn about Sherpa traditions", category: "Museum" },
        { name: "Sagarmatha National Park", type: "attraction", duration: "8 hours", cost: { budget: 30, mid: 30, luxury: 30 }, timeSlot: "anytime", coordinates: [27.9367, 86.7127], notes: "UNESCO World Heritage Site entry", category: "Nature" },
      ],
      restaurants: [
        { name: "Namche Bakery", type: "restaurant", duration: "1 hour", cost: { budget: 8, mid: 12, luxury: 15 }, timeSlot: "morning", coordinates: [27.8069, 86.7103], notes: "Famous cinnamon rolls and coffee", category: "Cafe" },
        { name: "Everest Steak House", type: "restaurant", duration: "1 hour", cost: { budget: 15, mid: 20, luxury: 30 }, timeSlot: "evening", coordinates: [27.8065, 86.7098], notes: "Best yak steak at altitude", category: "Western" },
        { name: "Hermann Helmers Bakery", type: "restaurant", duration: "1 hour", cost: { budget: 6, mid: 10, luxury: 15 }, timeSlot: "morning", coordinates: [27.8069, 86.7103], notes: "German-style bakery goods", category: "Cafe" },
        { name: "Teahouse Dal Bhat", type: "restaurant", duration: "1 hour", cost: { budget: 5, mid: 8, luxury: 10 }, timeSlot: "anytime", coordinates: [27.8, 86.72], notes: "Unlimited refills, trekker staple", category: "Traditional" },
      ],
      hotels: [
        { name: "Yeti Mountain Home Namche", type: "hotel", duration: "1 night", cost: { budget: 80, mid: 120, luxury: 200 }, timeSlot: "anytime", coordinates: [27.8069, 86.7103], notes: "Luxury at altitude", category: "Luxury" },
        { name: "Hotel Sherpaland", type: "hotel", duration: "1 night", cost: { budget: 40, mid: 60, luxury: 100 }, timeSlot: "anytime", coordinates: [27.8065, 86.7098], notes: "Comfortable with great views", category: "Mid-range" },
        { name: "Basic Teahouse Lodge", type: "hotel", duration: "1 night", cost: { budget: 10, mid: 15, luxury: 25 }, timeSlot: "anytime", coordinates: [27.82, 86.73], notes: "Authentic trekking experience", category: "Budget" },
        { name: "Everest Summit Lodge", type: "hotel", duration: "1 night", cost: { budget: 100, mid: 150, luxury: 250 }, timeSlot: "anytime", coordinates: [27.8364, 86.764], notes: "Comfort lodges along the trail", category: "Luxury" },
      ],
      transport: [
        { name: "Kathmandu to Lukla Flight", type: "transport", duration: "40 mins", cost: { budget: 180, mid: 200, luxury: 350 }, timeSlot: "morning", coordinates: [27.6868, 86.7277], notes: "Weather dependent, book backup days", category: "Flight" },
        { name: "Porter Service", type: "transport", duration: "1 day", cost: { budget: 15, mid: 20, luxury: 30 }, timeSlot: "anytime", coordinates: [27.7, 86.75], notes: "Carry up to 30kg per porter", category: "Support" },
        { name: "Helicopter Tour", type: "transport", duration: "4 hours", cost: { budget: 500, mid: 800, luxury: 1200 }, timeSlot: "morning", coordinates: [28.0025, 86.8528], notes: "Luxury EBC experience", category: "Flight" },
      ],
    },
    budgetGuide: {
      budget: { dailyMin: 50, dailyMax: 80, description: "Basic teahouses, simple meals, group trek" },
      mid: { dailyMin: 100, dailyMax: 180, description: "Comfort lodges, better food, private guide" },
      luxury: { dailyMin: 250, dailyMax: 600, description: "Premium lodges, helicopter options, full support" },
    },
    packingSuggestions: ["4-season sleeping bag", "Down jacket", "Trekking boots (broken in)", "Altitude medication", "Water purification", "Sunscreen SPF50", "Trekking poles"],
    tips: ["Acclimatize properly - 'climb high, sleep low'", "Stay hydrated at altitude", "Book Lukla flights with buffer days", "Carry cash - no ATMs above Namche"],
  },
  {
    id: "chitwan",
    name: "Chitwan National Park",
    coordinates: [27.5, 84.3333],
    dayThemes: [
      { theme: "Arrival & Orientation", description: "Check into lodge, evening program" },
      { theme: "Safari Adventure", description: "Jungle safari and wildlife spotting" },
      { theme: "River & Culture", description: "Canoe safari and Tharu culture" },
      { theme: "Deep Jungle", description: "Walking safari and bird watching" },
      { theme: "Conservation", description: "Elephant breeding center, community visits" },
    ],
    places: {
      attractions: [
        { name: "Jungle Safari (Jeep)", type: "attraction", duration: "4 hours", cost: { budget: 30, mid: 50, luxury: 100 }, timeSlot: "morning", coordinates: [27.5, 84.35], notes: "Best chance for rhino and tiger sightings", category: "Safari" },
        { name: "Canoe Safari", type: "attraction", duration: "2 hours", cost: { budget: 10, mid: 15, luxury: 25 }, timeSlot: "morning", coordinates: [27.52, 84.34], notes: "Spot crocodiles and birds on Rapti River", category: "Safari" },
        { name: "Walking Safari", type: "attraction", duration: "3 hours", cost: { budget: 20, mid: 30, luxury: 50 }, timeSlot: "morning", coordinates: [27.49, 84.32], notes: "Guided jungle trek with naturalist", category: "Safari" },
        { name: "Elephant Breeding Center", type: "attraction", duration: "2 hours", cost: { budget: 5, mid: 5, luxury: 5 }, timeSlot: "afternoon", coordinates: [27.568, 84.456], notes: "See baby elephants and conservation efforts", category: "Wildlife" },
        { name: "Tharu Cultural Program", type: "attraction", duration: "2 hours", cost: { budget: 5, mid: 10, luxury: 20 }, timeSlot: "evening", coordinates: [27.58, 84.46], notes: "Traditional stick dance and music", category: "Cultural" },
        { name: "Bird Watching", type: "attraction", duration: "3 hours", cost: { budget: 15, mid: 25, luxury: 40 }, timeSlot: "morning", coordinates: [27.5, 84.33], notes: "500+ species including rare birds", category: "Wildlife" },
        { name: "Sunset Viewpoint", type: "attraction", duration: "2 hours", cost: { budget: 0, mid: 5, luxury: 15 }, timeSlot: "evening", coordinates: [27.59, 84.45], notes: "River views at golden hour", category: "Nature" },
        { name: "Tharu Village Visit", type: "attraction", duration: "2 hours", cost: { budget: 5, mid: 10, luxury: 20 }, timeSlot: "afternoon", coordinates: [27.58, 84.47], notes: "Learn about indigenous culture", category: "Cultural" },
      ],
      restaurants: [
        { name: "Lodge Dining (Full Board)", type: "restaurant", duration: "varies", cost: { budget: 20, mid: 40, luxury: 80 }, timeSlot: "anytime", coordinates: [27.58, 84.46], notes: "Most lodges offer meal packages", category: "Lodge" },
        { name: "KC's Restaurant Sauraha", type: "restaurant", duration: "1 hour", cost: { budget: 8, mid: 12, luxury: 18 }, timeSlot: "evening", coordinates: [27.5825, 84.4611], notes: "Backpacker favorite", category: "International" },
        { name: "Tharu Kitchen", type: "restaurant", duration: "1 hour", cost: { budget: 5, mid: 8, luxury: 12 }, timeSlot: "evening", coordinates: [27.58, 84.46], notes: "Local Tharu cuisine", category: "Traditional" },
      ],
      hotels: [
        { name: "Meghauli Serai (Taj)", type: "hotel", duration: "1 night", cost: { budget: 400, mid: 500, luxury: 800 }, timeSlot: "anytime", coordinates: [27.5623, 84.2417], notes: "Ultra-luxury safari lodge", category: "Luxury" },
        { name: "Barahi Jungle Lodge", type: "hotel", duration: "1 night", cost: { budget: 150, mid: 200, luxury: 350 }, timeSlot: "anytime", coordinates: [27.5687, 84.4378], notes: "Riverside luxury eco-lodge", category: "Luxury" },
        { name: "Sapana Village Lodge", type: "hotel", duration: "1 night", cost: { budget: 60, mid: 80, luxury: 120 }, timeSlot: "anytime", coordinates: [27.583, 84.462], notes: "Community-run boutique lodge", category: "Mid-range" },
        { name: "Hotel Parkland", type: "hotel", duration: "1 night", cost: { budget: 30, mid: 40, luxury: 60 }, timeSlot: "anytime", coordinates: [27.5825, 84.4611], notes: "Good value in Sauraha", category: "Budget" },
        { name: "Chitwan Forest Resort", type: "hotel", duration: "1 night", cost: { budget: 80, mid: 100, luxury: 150 }, timeSlot: "anytime", coordinates: [27.575, 84.45], notes: "Jungle-edge location", category: "Mid-range" },
      ],
      transport: [
        { name: "Kathmandu to Chitwan Bus", type: "transport", duration: "5 hours", cost: { budget: 10, mid: 20, luxury: 35 }, timeSlot: "morning", coordinates: [27.5825, 84.4611], notes: "Tourist bus to Sauraha", category: "Intercity" },
        { name: "Pokhara to Chitwan Bus", type: "transport", duration: "4 hours", cost: { budget: 8, mid: 15, luxury: 30 }, timeSlot: "morning", coordinates: [27.5825, 84.4611], notes: "Direct tourist connection", category: "Intercity" },
        { name: "Internal Park Jeep", type: "transport", duration: "varies", cost: { budget: 20, mid: 35, luxury: 60 }, timeSlot: "anytime", coordinates: [27.5, 84.35], notes: "Required for park access", category: "Safari" },
      ],
    },
    budgetGuide: {
      budget: { dailyMin: 40, dailyMax: 70, description: "Basic lodge, shared safaris, budget meals" },
      mid: { dailyMin: 100, dailyMax: 180, description: "Boutique lodge, private activities, full board" },
      luxury: { dailyMin: 250, dailyMax: 600, description: "5-star lodge, exclusive safaris, premium experience" },
    },
    packingSuggestions: ["Neutral colored clothing", "Binoculars", "Insect repellent", "Light long sleeves", "Camera with zoom lens", "Comfortable walking shoes", "Hat for sun"],
    tips: ["Early morning safaris have best wildlife sightings", "Maintain silence in the jungle", "Book jeep safaris in advance during peak season", "Tip your guide and driver"],
  },
  {
    id: "lumbini",
    name: "Lumbini",
    coordinates: [27.4833, 83.2667],
    dayThemes: [
      { theme: "Pilgrimage Day", description: "Visit Buddha's birthplace and sacred sites" },
      { theme: "Monastery Tour", description: "Explore international monasteries" },
      { theme: "Meditation & Peace", description: "Mindfulness and spiritual practices" },
    ],
    places: {
      attractions: [
        { name: "Maya Devi Temple", type: "attraction", duration: "2 hours", cost: { budget: 2, mid: 2, luxury: 2 }, timeSlot: "morning", coordinates: [27.4697, 83.2755], notes: "Exact birthplace of Buddha", category: "Religious" },
        { name: "Ashoka Pillar", type: "attraction", duration: "1 hour", cost: { budget: 0, mid: 0, luxury: 0 }, timeSlot: "morning", coordinates: [27.4698, 83.2753], notes: "Ancient marker from 249 BC", category: "Heritage" },
        { name: "Sacred Garden", type: "attraction", duration: "2 hours", cost: { budget: 0, mid: 0, luxury: 0 }, timeSlot: "anytime", coordinates: [27.47, 83.276], notes: "Peaceful grounds around Maya Devi", category: "Religious" },
        { name: "World Peace Pagoda", type: "attraction", duration: "1 hour", cost: { budget: 0, mid: 0, luxury: 0 }, timeSlot: "afternoon", coordinates: [27.4785, 83.2728], notes: "Japanese-built white stupa", category: "Religious" },
        { name: "International Monastery Zone", type: "attraction", duration: "4 hours", cost: { budget: 0, mid: 0, luxury: 0 }, timeSlot: "anytime", coordinates: [27.48, 83.28], notes: "Monasteries from 25+ countries", category: "Religious" },
        { name: "Thai Monastery", type: "attraction", duration: "1 hour", cost: { budget: 0, mid: 0, luxury: 0 }, timeSlot: "afternoon", coordinates: [27.4812, 83.2789], notes: "Golden spires and ornate design", category: "Religious" },
        { name: "Chinese Monastery", type: "attraction", duration: "1 hour", cost: { budget: 0, mid: 0, luxury: 0 }, timeSlot: "afternoon", coordinates: [27.4823, 83.2801], notes: "Traditional Chinese Buddhist architecture", category: "Religious" },
        { name: "Lumbini Museum", type: "attraction", duration: "1.5 hours", cost: { budget: 2, mid: 2, luxury: 2 }, timeSlot: "afternoon", coordinates: [27.4756, 83.2734], notes: "History of Buddhism and excavations", category: "Museum" },
        { name: "Eternal Peace Flame", type: "attraction", duration: "30 mins", cost: { budget: 0, mid: 0, luxury: 0 }, timeSlot: "evening", coordinates: [27.4752, 83.2738], notes: "Symbolic flame for world peace", category: "Religious" },
      ],
      restaurants: [
        { name: "Lumbini Village Lodge Restaurant", type: "restaurant", duration: "1 hour", cost: { budget: 8, mid: 12, luxury: 18 }, timeSlot: "anytime", coordinates: [27.4833, 83.2667], notes: "Best in the area", category: "International" },
        { name: "Local Nepali Thali", type: "restaurant", duration: "1 hour", cost: { budget: 4, mid: 6, luxury: 10 }, timeSlot: "anytime", coordinates: [27.48, 83.27], notes: "Simple local meals", category: "Traditional" },
        { name: "Korean Temple Food", type: "restaurant", duration: "1 hour", cost: { budget: 6, mid: 10, luxury: 15 }, timeSlot: "anytime", coordinates: [27.482, 83.278], notes: "Vegetarian at Korean monastery", category: "Vegetarian" },
      ],
      hotels: [
        { name: "Buddha Maya Garden Hotel", type: "hotel", duration: "1 night", cost: { budget: 80, mid: 120, luxury: 180 }, timeSlot: "anytime", coordinates: [27.4725, 83.2761], notes: "Best hotel in Lumbini", category: "Mid-range" },
        { name: "Lumbini Buddha Garden Resort", type: "hotel", duration: "1 night", cost: { budget: 50, mid: 70, luxury: 100 }, timeSlot: "anytime", coordinates: [27.483, 83.268], notes: "Peaceful garden setting", category: "Mid-range" },
        { name: "Hotel Ananda Inn", type: "hotel", duration: "1 night", cost: { budget: 25, mid: 35, luxury: 50 }, timeSlot: "anytime", coordinates: [27.484, 83.265], notes: "Budget-friendly option", category: "Budget" },
        { name: "Korean Temple Stay", type: "hotel", duration: "1 night", cost: { budget: 15, mid: 20, luxury: 30 }, timeSlot: "anytime", coordinates: [27.482, 83.278], notes: "Unique meditation experience", category: "Budget" },
      ],
      transport: [
        { name: "Kathmandu to Bhairahawa Flight", type: "transport", duration: "30 mins", cost: { budget: 100, mid: 120, luxury: 150 }, timeSlot: "morning", coordinates: [27.5057, 83.4163], notes: "Then 30 min drive to Lumbini", category: "Flight" },
        { name: "Tourist Bus from Kathmandu", type: "transport", duration: "9 hours", cost: { budget: 15, mid: 25, luxury: 40 }, timeSlot: "morning", coordinates: [27.4833, 83.2667], notes: "Long but affordable option", category: "Intercity" },
        { name: "Bicycle Rental", type: "transport", duration: "varies", cost: { budget: 3, mid: 5, luxury: 10 }, timeSlot: "anytime", coordinates: [27.48, 83.27], notes: "Best way to explore the grounds", category: "Local" },
        { name: "Electric Rickshaw", type: "transport", duration: "varies", cost: { budget: 5, mid: 8, luxury: 15 }, timeSlot: "anytime", coordinates: [27.47, 83.275], notes: "Within Lumbini complex", category: "Local" },
      ],
    },
    budgetGuide: {
      budget: { dailyMin: 25, dailyMax: 45, description: "Basic guesthouse, local food, bicycle" },
      mid: { dailyMin: 60, dailyMax: 100, description: "Good hotel, nice meals, guided tours" },
      luxury: { dailyMin: 120, dailyMax: 200, description: "Best available, private guides, comfort" },
    },
    packingSuggestions: ["Modest clothing", "Comfortable walking shoes", "Sun protection", "Water bottle", "Camera", "Meditation cushion (optional)"],
    tips: ["Remove shoes at all temples", "Dress modestly - cover shoulders and knees", "Best visited at sunrise for peaceful atmosphere", "Rent a bicycle for the monastery zone"],
  },
  {
    id: "swayambhu",
    name: "Swayambhunath Area",
    coordinates: [27.7149, 85.2905],
    dayThemes: [
      { theme: "Sacred Morning", description: "Sunrise at the stupa and surroundings" },
      { theme: "Local Discovery", description: "Explore nearby monasteries and views" },
    ],
    places: {
      attractions: [
        { name: "Swayambhunath Stupa", type: "attraction", duration: "2 hours", cost: { budget: 3, mid: 3, luxury: 3 }, timeSlot: "morning", coordinates: [27.7149, 85.2905], notes: "Ancient hilltop stupa with valley views", category: "Religious" },
        { name: "Natural History Museum", type: "attraction", duration: "1.5 hours", cost: { budget: 2, mid: 2, luxury: 2 }, timeSlot: "afternoon", coordinates: [27.7145, 85.2908], notes: "Near the stupa complex", category: "Museum" },
        { name: "Manjushri Shrine", type: "attraction", duration: "30 mins", cost: { budget: 0, mid: 0, luxury: 0 }, timeSlot: "anytime", coordinates: [27.7147, 85.2903], notes: "Legendary founder of Kathmandu", category: "Religious" },
        { name: "Surrounding Monasteries", type: "attraction", duration: "1.5 hours", cost: { budget: 0, mid: 0, luxury: 0 }, timeSlot: "anytime", coordinates: [27.7151, 85.2907], notes: "Multiple Tibetan monasteries nearby", category: "Religious" },
      ],
      restaurants: [
        { name: "Stupa View Restaurant", type: "restaurant", duration: "1 hour", cost: { budget: 8, mid: 12, luxury: 18 }, timeSlot: "morning", coordinates: [27.7148, 85.2904], notes: "Breakfast with views", category: "Cafe" },
        { name: "Local Tea House", type: "restaurant", duration: "30 mins", cost: { budget: 2, mid: 3, luxury: 5 }, timeSlot: "anytime", coordinates: [27.7146, 85.2902], notes: "Simple Nepali tea and snacks", category: "Traditional" },
      ],
      hotels: [
        { name: "Hotel Vajra", type: "hotel", duration: "1 night", cost: { budget: 50, mid: 80, luxury: 120 }, timeSlot: "anytime", coordinates: [27.7155, 85.2895], notes: "Near Swayambhu with cultural programs", category: "Mid-range" },
      ],
      transport: [
        { name: "Taxi from Thamel", type: "transport", duration: "20 mins", cost: { budget: 3, mid: 5, luxury: 10 }, timeSlot: "morning", coordinates: [27.7149, 85.2905], notes: "Quick morning trip for sunrise", category: "Local" },
      ],
    },
    budgetGuide: {
      budget: { dailyMin: 20, dailyMax: 35, description: "Usually visited as day trip from Kathmandu" },
      mid: { dailyMin: 40, dailyMax: 70, description: "With guided tour and nice lunch" },
      luxury: { dailyMin: 80, dailyMax: 150, description: "Private guide, premium experience" },
    },
    packingSuggestions: ["Comfortable shoes for stairs", "Camera", "Water", "Small bills for offerings"],
    tips: ["Go early to avoid crowds and heat", "Watch out for monkeys - secure belongings", "365 steps to climb", "Combine with Thamel exploration"],
  },
];

// Smart trip generator functions
export const generateSmartItinerary = (
  destinationId: string,
  numberOfDays: number,
  budgetLevel: "budget" | "mid" | "luxury",
  travelStyle: "relaxed" | "balanced" | "intensive"
): { 
  days: Array<{ 
    theme: string; 
    description: string;
    places: Array<{
      name: string;
      type: "attraction" | "restaurant" | "hotel" | "transport";
      time: string;
      duration: string;
      cost: number;
      notes: string;
      coordinates?: [number, number];
    }>;
  }>;
  estimatedBudget: {
    accommodation: number;
    food: number;
    activities: number;
    transport: number;
    total: number;
  };
  packingSuggestions: string[];
  tips: string[];
} => {
  const template = destinationTemplates.find(d => d.id === destinationId) || destinationTemplates[0];
  
  // Calculate activities per day based on travel style
  const activitiesPerDay = travelStyle === "relaxed" ? 2 : travelStyle === "balanced" ? 3 : 4;
  
  const days: Array<{ 
    theme: string; 
    description: string;
    places: Array<{
      name: string;
      type: "attraction" | "restaurant" | "hotel" | "transport";
      time: string;
      duration: string;
      cost: number;
      notes: string;
      coordinates?: [number, number];
    }>;
  }> = [];
  
  // Track used places to avoid repetition
  const usedAttractions = new Set<string>();
  const usedRestaurants = new Set<string>();
  
  let totalAccommodation = 0;
  let totalFood = 0;
  let totalActivities = 0;
  let totalTransport = 0;
  
  // Add arrival transport on day 1
  const arrivalTransport = template.places.transport[0];
  
  for (let dayIndex = 0; dayIndex < numberOfDays; dayIndex++) {
    const dayTheme = template.dayThemes[dayIndex % template.dayThemes.length];
    const places: Array<{
      name: string;
      type: "attraction" | "restaurant" | "hotel" | "transport";
      time: string;
      duration: string;
      cost: number;
      notes: string;
      coordinates?: [number, number];
    }> = [];
    
    // Add transport on first day
    if (dayIndex === 0 && arrivalTransport) {
      const transportCost = arrivalTransport.cost[budgetLevel];
      places.push({
        name: arrivalTransport.name,
        type: "transport",
        time: "08:00",
        duration: arrivalTransport.duration,
        cost: transportCost,
        notes: arrivalTransport.notes,
        coordinates: arrivalTransport.coordinates,
      });
      totalTransport += transportCost;
    }
    
    // Morning attractions
    const morningAttractions = template.places.attractions.filter(
      a => (a.timeSlot === "morning" || a.timeSlot === "anytime") && !usedAttractions.has(a.name)
    );
    
    const afternoonAttractions = template.places.attractions.filter(
      a => (a.timeSlot === "afternoon" || a.timeSlot === "anytime") && !usedAttractions.has(a.name)
    );
    
    const eveningAttractions = template.places.attractions.filter(
      a => a.timeSlot === "evening" && !usedAttractions.has(a.name)
    );
    
    // Select morning activity
    if (morningAttractions.length > 0 && places.length < activitiesPerDay) {
      const attraction = morningAttractions[Math.floor(Math.random() * morningAttractions.length)];
      usedAttractions.add(attraction.name);
      const cost = attraction.cost[budgetLevel];
      places.push({
        name: attraction.name,
        type: "attraction",
        time: "06:30",
        duration: attraction.duration,
        cost,
        notes: attraction.notes,
        coordinates: attraction.coordinates,
      });
      totalActivities += cost;
    }
    
    // Breakfast
    const breakfastOptions = template.places.restaurants.filter(
      r => (r.timeSlot === "morning" || r.timeSlot === "anytime") && !usedRestaurants.has(r.name)
    );
    if (breakfastOptions.length > 0) {
      const restaurant = breakfastOptions[Math.floor(Math.random() * breakfastOptions.length)];
      const cost = restaurant.cost[budgetLevel];
      places.push({
        name: restaurant.name,
        type: "restaurant",
        time: "09:30",
        duration: "1 hour",
        cost,
        notes: restaurant.notes,
        coordinates: restaurant.coordinates,
      });
      totalFood += cost;
    }
    
    // Late morning/early afternoon attraction
    if (afternoonAttractions.length > 0 && places.length < activitiesPerDay + 1) {
      const attraction = afternoonAttractions[Math.floor(Math.random() * afternoonAttractions.length)];
      usedAttractions.add(attraction.name);
      const cost = attraction.cost[budgetLevel];
      places.push({
        name: attraction.name,
        type: "attraction",
        time: "11:00",
        duration: attraction.duration,
        cost,
        notes: attraction.notes,
        coordinates: attraction.coordinates,
      });
      totalActivities += cost;
    }
    
    // Lunch
    const lunchOptions = template.places.restaurants.filter(
      r => r.timeSlot === "anytime" && !usedRestaurants.has(r.name)
    );
    if (lunchOptions.length > 0) {
      const restaurant = lunchOptions[Math.floor(Math.random() * lunchOptions.length)];
      const cost = restaurant.cost[budgetLevel];
      places.push({
        name: restaurant.name,
        type: "restaurant",
        time: "13:00",
        duration: "1 hour",
        cost,
        notes: restaurant.notes,
        coordinates: restaurant.coordinates,
      });
      totalFood += cost;
    }
    
    // Afternoon attraction
    const remainingAfternoon = template.places.attractions.filter(
      a => !usedAttractions.has(a.name)
    );
    if (remainingAfternoon.length > 0 && travelStyle !== "relaxed") {
      const attraction = remainingAfternoon[Math.floor(Math.random() * remainingAfternoon.length)];
      usedAttractions.add(attraction.name);
      const cost = attraction.cost[budgetLevel];
      places.push({
        name: attraction.name,
        type: "attraction",
        time: "15:00",
        duration: attraction.duration,
        cost,
        notes: attraction.notes,
        coordinates: attraction.coordinates,
      });
      totalActivities += cost;
    }
    
    // Evening restaurant
    const dinnerOptions = template.places.restaurants.filter(
      r => r.timeSlot === "evening" || r.timeSlot === "anytime"
    );
    if (dinnerOptions.length > 0) {
      const restaurant = dinnerOptions[Math.floor(Math.random() * dinnerOptions.length)];
      const cost = restaurant.cost[budgetLevel];
      places.push({
        name: restaurant.name,
        type: "restaurant",
        time: "19:00",
        duration: "1.5 hours",
        cost,
        notes: restaurant.notes,
        coordinates: restaurant.coordinates,
      });
      totalFood += cost;
    }
    
    // Evening activity (intensive only)
    if (eveningAttractions.length > 0 && travelStyle === "intensive") {
      const attraction = eveningAttractions[Math.floor(Math.random() * eveningAttractions.length)];
      usedAttractions.add(attraction.name);
      const cost = attraction.cost[budgetLevel];
      places.push({
        name: attraction.name,
        type: "attraction",
        time: "20:30",
        duration: attraction.duration,
        cost,
        notes: attraction.notes,
        coordinates: attraction.coordinates,
      });
      totalActivities += cost;
    }
    
    // Hotel
    const hotelOptions = template.places.hotels.filter(h => {
      const cost = h.cost[budgetLevel];
      const guide = template.budgetGuide[budgetLevel];
      return cost >= guide.dailyMin * 0.3 && cost <= guide.dailyMax * 0.6;
    });
    const hotel = hotelOptions.length > 0 
      ? hotelOptions[Math.floor(Math.random() * hotelOptions.length)]
      : template.places.hotels[0];
    
    if (hotel) {
      const cost = hotel.cost[budgetLevel];
      places.push({
        name: hotel.name,
        type: "hotel",
        time: "21:30",
        duration: "1 night",
        cost,
        notes: hotel.notes,
        coordinates: hotel.coordinates,
      });
      totalAccommodation += cost;
    }
    
    days.push({
      theme: dayTheme.theme,
      description: dayTheme.description,
      places,
    });
  }
  
  return {
    days,
    estimatedBudget: {
      accommodation: totalAccommodation,
      food: totalFood,
      activities: totalActivities,
      transport: totalTransport,
      total: totalAccommodation + totalFood + totalActivities + totalTransport,
    },
    packingSuggestions: template.packingSuggestions,
    tips: template.tips,
  };
};

export const getBudgetEstimate = (
  destinationId: string,
  numberOfDays: number,
  budgetLevel: "budget" | "mid" | "luxury"
): { min: number; max: number; perDay: string } => {
  const template = destinationTemplates.find(d => d.id === destinationId) || destinationTemplates[0];
  const guide = template.budgetGuide[budgetLevel];
  
  return {
    min: guide.dailyMin * numberOfDays,
    max: guide.dailyMax * numberOfDays,
    perDay: guide.description,
  };
};
