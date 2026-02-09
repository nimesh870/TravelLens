import { WeatherData } from "@/hooks/useWeather";

export interface WeatherRecommendation {
  verdict: "ideal" | "good" | "fair" | "poor";
  label: string;
  color: string;
  bgColor: string;
  summary: string;
  tips: string[];
  activities: string[];
  bestMonths: string;
  packingTips: string[];
}

// Destination-specific context for smarter recommendations
const destinationContext: Record<string, {
  idealTempRange: [number, number];
  type: "trekking" | "cultural" | "wildlife" | "spiritual";
  altitudeRisk: boolean;
  monsoonSensitive: boolean;
  bestMonths: string;
}> = {
  kathmandu: { idealTempRange: [15, 30], type: "cultural", altitudeRisk: false, monsoonSensitive: true, bestMonths: "Oct–Dec, Mar–May" },
  pokhara: { idealTempRange: [15, 28], type: "trekking", altitudeRisk: false, monsoonSensitive: true, bestMonths: "Sep–Nov, Mar–May" },
  lumbini: { idealTempRange: [18, 32], type: "spiritual", altitudeRisk: false, monsoonSensitive: true, bestMonths: "Oct–Mar" },
  chitwan: { idealTempRange: [18, 32], type: "wildlife", altitudeRisk: false, monsoonSensitive: true, bestMonths: "Oct–Mar" },
  swayambhu: { idealTempRange: [15, 30], type: "cultural", altitudeRisk: false, monsoonSensitive: true, bestMonths: "Oct–Dec, Mar–May" },
  everest: { idealTempRange: [-5, 15], type: "trekking", altitudeRisk: true, monsoonSensitive: true, bestMonths: "Mar–May, Sep–Nov" },
};

function scoreWeather(weather: WeatherData, destId: string): number {
  const ctx = destinationContext[destId];
  if (!ctx) return 50;

  let score = 100;

  // Temperature scoring
  const [idealMin, idealMax] = ctx.idealTempRange;
  if (weather.temperature >= idealMin && weather.temperature <= idealMax) {
    score += 0; // perfect
  } else {
    const diff = weather.temperature < idealMin
      ? idealMin - weather.temperature
      : weather.temperature - idealMax;
    score -= Math.min(diff * 3, 40);
  }

  // Precipitation penalty
  if (weather.precipitation > 0) score -= 15;
  if (weather.precipitation > 5) score -= 15;

  // Bad weather codes
  if (weather.weatherCode >= 61) score -= 20; // rain
  if (weather.weatherCode >= 95) score -= 20; // storms

  // Wind penalty for trekking
  if (ctx.type === "trekking" && weather.windSpeed > 30) score -= 15;

  // Humidity discomfort
  if (weather.humidity > 85) score -= 10;

  return Math.max(0, Math.min(100, score));
}

function getForecastTrend(weather: WeatherData): "improving" | "stable" | "worsening" {
  if (!weather.daily) return "stable";
  const codes = weather.daily.weatherCodes;
  const firstHalf = codes.slice(0, 2).reduce((a, b) => a + b, 0) / 2;
  const secondHalf = codes.slice(2).reduce((a, b) => a + b, 0) / Math.max(1, codes.length - 2);
  if (secondHalf < firstHalf - 5) return "improving";
  if (secondHalf > firstHalf + 5) return "worsening";
  return "stable";
}

export function getWeatherRecommendation(weather: WeatherData, destinationId: string): WeatherRecommendation {
  const ctx = destinationContext[destinationId] || destinationContext.kathmandu;
  const score = scoreWeather(weather, destinationId);
  const trend = getForecastTrend(weather);

  // Determine verdict
  let verdict: WeatherRecommendation["verdict"];
  let label: string;
  let color: string;
  let bgColor: string;

  if (score >= 80) {
    verdict = "ideal";
    label = "Ideal Conditions";
    color = "text-green-600 dark:text-green-400";
    bgColor = "bg-green-500/10 border-green-500/20";
  } else if (score >= 60) {
    verdict = "good";
    label = "Good Conditions";
    color = "text-blue-600 dark:text-blue-400";
    bgColor = "bg-blue-500/10 border-blue-500/20";
  } else if (score >= 40) {
    verdict = "fair";
    label = "Fair Conditions";
    color = "text-amber-600 dark:text-amber-400";
    bgColor = "bg-amber-500/10 border-amber-500/20";
  } else {
    verdict = "poor";
    label = "Challenging Conditions";
    color = "text-red-600 dark:text-red-400";
    bgColor = "bg-red-500/10 border-red-500/20";
  }

  // Build summary
  let summary = "";
  if (verdict === "ideal") {
    summary = `Perfect weather for visiting right now! ${trend === "stable" ? "Conditions look stable ahead." : trend === "improving" ? "Even better days ahead." : "Enjoy it now — conditions may change soon."}`;
  } else if (verdict === "good") {
    summary = `Good conditions for your visit. ${trend === "improving" ? "Forecast shows improvement ahead!" : "Pack layers and be prepared for some variability."}`;
  } else if (verdict === "fair") {
    summary = `Manageable but not ideal. ${weather.precipitation > 0 ? "Rain gear is essential." : "Temperatures are outside the comfort zone."} ${trend === "improving" ? "Better days are coming!" : "Consider adjusting plans."}`;
  } else {
    summary = `Conditions are challenging right now. ${weather.weatherCode >= 95 ? "Storms are active — stay safe." : weather.weatherCode >= 61 ? "Heavy rain expected." : "Extreme temperatures detected."} ${trend === "improving" ? "Relief is on the way." : "Consider postponing outdoor activities."}`;
  }

  // Activity suggestions
  const activities: string[] = [];
  if (ctx.type === "trekking") {
    if (verdict === "ideal" || verdict === "good") {
      activities.push("Trekking & hiking", "Mountain viewpoints", "Outdoor photography");
    } else {
      activities.push("Tea house rest day", "Cultural village visits", "Equipment check");
    }
  } else if (ctx.type === "cultural") {
    if (verdict === "ideal" || verdict === "good") {
      activities.push("Temple & monument visits", "Walking tours", "Street food exploration");
    } else {
      activities.push("Museum visits", "Indoor cultural shows", "Cooking classes");
    }
  } else if (ctx.type === "wildlife") {
    if (verdict === "ideal" || verdict === "good") {
      activities.push("Jungle safari", "Bird watching", "Canoe rides");
    } else {
      activities.push("Elephant breeding center", "Tharu cultural show", "Nature documentary screenings");
    }
  } else {
    if (verdict === "ideal" || verdict === "good") {
      activities.push("Temple meditation", "Monastery visits", "Peaceful garden walks");
    } else {
      activities.push("Indoor meditation", "Museum exploration", "Prayer hall visits");
    }
  }

  // Tips
  const tips: string[] = [];
  if (weather.temperature > 30) tips.push("Stay hydrated — carry at least 2L of water");
  if (weather.temperature < 5) tips.push("Wear multiple warm layers and protect extremities");
  if (weather.humidity > 80) tips.push("High humidity — wear moisture-wicking fabrics");
  if (weather.windSpeed > 25) tips.push("Strong winds — secure loose items and hat");
  if (weather.precipitation > 0) tips.push("Carry waterproof jacket and shoe covers");
  if (weather.weatherCode >= 95) tips.push("⚠️ Thunderstorms — avoid open areas and ridges");
  if (ctx.altitudeRisk && weather.temperature < 0) tips.push("Altitude + cold risk — watch for frostbite signs");
  if (tips.length === 0) tips.push("Great conditions — enjoy your adventure!");

  // Packing
  const packingTips: string[] = [];
  if (weather.temperature < 10) packingTips.push("Thermal base layers", "Insulated jacket", "Warm hat & gloves");
  else if (weather.temperature < 20) packingTips.push("Light fleece or sweater", "Wind-resistant jacket");
  else packingTips.push("Breathable clothing", "Sun hat", "Sunscreen SPF 50+");
  if (weather.precipitation > 0 || weather.weatherCode >= 51) packingTips.push("Rain jacket", "Waterproof bag cover");
  if (weather.humidity > 75) packingTips.push("Quick-dry towel", "Anti-chafe products");

  return {
    verdict,
    label,
    color,
    bgColor,
    summary,
    tips,
    activities,
    bestMonths: ctx.bestMonths,
    packingTips,
  };
}
