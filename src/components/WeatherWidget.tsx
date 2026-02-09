import { Cloud, Droplets, Wind, Thermometer, ChevronDown, ChevronUp, Lightbulb, Backpack, CalendarCheck, Activity } from "lucide-react";
import { useState } from "react";
import { useWeather } from "@/hooks/useWeather";
import { getWeatherRecommendation } from "@/lib/weatherRecommendations";
import { cn } from "@/lib/utils";

interface WeatherWidgetProps {
  destinationId: string;
  compact?: boolean;
}

const WeatherWidget = ({ destinationId, compact = false }: WeatherWidgetProps) => {
  const { weather, loading, error } = useWeather(destinationId);
  const [showForecast, setShowForecast] = useState(false);
  const [showRecommendation, setShowRecommendation] = useState(true);

  if (loading) {
    return (
      <div className={cn(
        "bg-card rounded-2xl border border-border p-4 animate-pulse",
        compact && "rounded-xl p-3"
      )}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-secondary" />
          <div className="space-y-2 flex-1">
            <div className="h-4 bg-secondary rounded w-20" />
            <div className="h-3 bg-secondary rounded w-28" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !weather) {
    return null;
  }

  if (compact) {
    const rec = getWeatherRecommendation(weather, destinationId);
    return (
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-card/80 backdrop-blur-sm border border-border text-sm">
        <span className="text-lg">{weather.icon}</span>
        <span className="font-semibold text-foreground">{weather.temperature}°C</span>
        <span className={cn("text-xs font-medium", rec.color)}>{rec.label}</span>
      </div>
    );
  }

  const rec = getWeatherRecommendation(weather, destinationId);

  const formatDay = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { weekday: "short" });
  };

  return (
    <div className="bg-card rounded-2xl border border-border overflow-hidden">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Cloud className="w-5 h-5 text-primary" />
          <h3 className="font-display text-lg font-semibold text-foreground">
            Current Weather
          </h3>
          <span className="text-xs text-muted-foreground ml-auto">Live</span>
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        </div>

        {/* Current */}
        <div className="flex items-center gap-4 mb-4">
          <span className="text-5xl">{weather.icon}</span>
          <div>
            <div className="text-3xl font-bold text-foreground">{weather.temperature}°C</div>
            <div className="text-sm text-muted-foreground">{weather.condition}</div>
          </div>
        </div>

        {/* Details */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Thermometer className="w-4 h-4 text-primary" />
            <div>
              <div className="text-foreground font-medium">{weather.feelsLike}°C</div>
              <div className="text-xs">Feels like</div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Droplets className="w-4 h-4 text-blue-500" />
            <div>
              <div className="text-foreground font-medium">{weather.humidity}%</div>
              <div className="text-xs">Humidity</div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Wind className="w-4 h-4 text-muted-foreground" />
            <div>
              <div className="text-foreground font-medium">{weather.windSpeed} km/h</div>
              <div className="text-xs">Wind</div>
            </div>
          </div>
        </div>

        {/* 5-Day Forecast Toggle */}
        {weather.daily && (
          <>
            <button
              onClick={() => setShowForecast(!showForecast)}
              className="w-full flex items-center justify-between py-2 text-sm text-primary hover:text-primary/80 transition-colors border-t border-border pt-3"
            >
              <span>5-Day Forecast</span>
              {showForecast ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {showForecast && (
              <div className="space-y-2 mt-2">
                {weather.daily.dates.map((date, i) => {
                  const code = weather.daily!.weatherCodes[i];
                  const dayIcon = code <= 3 ? "☀️" : code <= 55 ? "🌧️" : code <= 75 ? "🌨️" : "⛈️";
                  return (
                    <div key={date} className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground w-12">{formatDay(date)}</span>
                      <span className="text-lg">{dayIcon}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-foreground font-medium">{weather.daily!.maxTemp[i]}°</span>
                        <span className="text-muted-foreground">{weather.daily!.minTemp[i]}°</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>

      {/* Travel Recommendation Section */}
      <div className={cn("border-t border-border", rec.bgColor)}>
        <button
          onClick={() => setShowRecommendation(!showRecommendation)}
          className="w-full flex items-center justify-between p-4 hover:bg-secondary/20 transition-colors"
        >
          <div className="flex items-center gap-2">
            <Lightbulb className={cn("w-5 h-5", rec.color)} />
            <div className="text-left">
              <div className={cn("text-sm font-semibold", rec.color)}>{rec.label}</div>
              <div className="text-xs text-muted-foreground">Travel recommendation</div>
            </div>
          </div>
          {showRecommendation ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
        </button>

        {showRecommendation && (
          <div className="px-4 pb-4 space-y-4">
            {/* Summary */}
            <p className="text-sm text-foreground leading-relaxed">{rec.summary}</p>

            {/* Best Months */}
            <div className="flex items-center gap-2 text-sm">
              <CalendarCheck className="w-4 h-4 text-primary flex-shrink-0" />
              <span className="text-muted-foreground">Best months:</span>
              <span className="font-medium text-foreground">{rec.bestMonths}</span>
            </div>

            {/* Suggested Activities */}
            <div>
              <div className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                <Activity className="w-4 h-4 text-primary" />
                Suggested Activities
              </div>
              <div className="flex flex-wrap gap-1.5">
                {rec.activities.map((activity) => (
                  <span
                    key={activity}
                    className="px-2.5 py-1 rounded-full text-xs font-medium bg-secondary text-foreground"
                  >
                    {activity}
                  </span>
                ))}
              </div>
            </div>

            {/* Tips */}
            <div>
              <div className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                <Lightbulb className="w-4 h-4 text-primary" />
                Weather Tips
              </div>
              <ul className="space-y-1">
                {rec.tips.map((tip, i) => (
                  <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>

            {/* Packing Suggestions */}
            <div>
              <div className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                <Backpack className="w-4 h-4 text-primary" />
                Pack These
              </div>
              <div className="flex flex-wrap gap-1.5">
                {rec.packingTips.map((item) => (
                  <span
                    key={item}
                    className="px-2.5 py-1 rounded-full text-xs bg-primary/10 text-primary font-medium"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherWidget;
