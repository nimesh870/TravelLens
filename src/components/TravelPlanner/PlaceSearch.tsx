import { useState, useMemo } from "react";
import { Search, Plus, MapPin, UtensilsCrossed, Building2, Car, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { destinationTemplates, PlaceTemplate } from "@/data/tripTemplates";
import { cn } from "@/lib/utils";

interface PlaceSearchProps {
  destinationId: string;
  budgetLevel: "budget" | "mid" | "luxury";
  onAddPlace: (place: {
    name: string;
    type: "attraction" | "restaurant" | "hotel" | "transport";
    duration: string;
    cost: number;
    notes: string;
    coordinates: [number, number];
  }) => void;
  onClose: () => void;
}

const typeIcons = {
  attraction: MapPin,
  restaurant: UtensilsCrossed,
  hotel: Building2,
  transport: Car,
};

const typeColors = {
  attraction: "text-blue-500 bg-blue-500/10",
  restaurant: "text-orange-500 bg-orange-500/10",
  hotel: "text-purple-500 bg-purple-500/10",
  transport: "text-green-500 bg-green-500/10",
};

const PlaceSearch = ({ destinationId, budgetLevel, onAddPlace, onClose }: PlaceSearchProps) => {
  const [query, setQuery] = useState("");
  const [filterType, setFilterType] = useState<"all" | "attraction" | "restaurant" | "hotel" | "transport">("all");

  const allPlaces = useMemo(() => {
    const template = destinationTemplates.find((d) => d.id === destinationId);
    if (!template) return [];

    const places: (PlaceTemplate & { placeType: string })[] = [
      ...template.places.attractions.map((p) => ({ ...p, placeType: "attraction" })),
      ...template.places.restaurants.map((p) => ({ ...p, placeType: "restaurant" })),
      ...template.places.hotels.map((p) => ({ ...p, placeType: "hotel" })),
      ...template.places.transport.map((p) => ({ ...p, placeType: "transport" })),
    ];

    return places;
  }, [destinationId]);

  const filtered = useMemo(() => {
    return allPlaces.filter((place) => {
      const matchesQuery =
        !query ||
        place.name.toLowerCase().includes(query.toLowerCase()) ||
        place.notes.toLowerCase().includes(query.toLowerCase()) ||
        (place.category && place.category.toLowerCase().includes(query.toLowerCase()));
      const matchesType = filterType === "all" || place.type === filterType;
      return matchesQuery && matchesType;
    });
  }, [allPlaces, query, filterType]);

  const handleAdd = (place: PlaceTemplate) => {
    onAddPlace({
      name: place.name,
      type: place.type,
      duration: place.duration,
      cost: place.cost[budgetLevel],
      notes: place.notes,
      coordinates: place.coordinates,
    });
  };

  return (
    <div className="bg-card rounded-xl border border-border p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-semibold text-foreground">Search Places</h4>
        <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
          <X className="w-4 h-4" />
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search attractions, restaurants, hotels..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-9"
          autoFocus
        />
      </div>

      <div className="flex gap-1.5 flex-wrap">
        {(["all", "attraction", "restaurant", "hotel", "transport"] as const).map((type) => (
          <button
            key={type}
            onClick={() => setFilterType(type)}
            className={cn(
              "px-3 py-1 rounded-full text-xs font-medium transition-colors",
              filterType === type
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-muted-foreground hover:text-foreground"
            )}
          >
            {type === "all" ? "All" : type.charAt(0).toUpperCase() + type.slice(1) + "s"}
          </button>
        ))}
      </div>

      <div className="max-h-64 overflow-y-auto space-y-1.5">
        {filtered.length === 0 ? (
          <p className="text-center text-sm text-muted-foreground py-6">No places found</p>
        ) : (
          filtered.map((place, i) => {
            const Icon = typeIcons[place.type];
            const colors = typeColors[place.type];
            return (
              <div
                key={`${place.name}-${i}`}
                className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-secondary/50 transition-colors group"
              >
                <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0", colors)}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-foreground truncate">{place.name}</div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{place.duration}</span>
                    <span>•</span>
                    <span>${place.cost[budgetLevel]}</span>
                    {place.category && (
                      <>
                        <span>•</span>
                        <span>{place.category}</span>
                      </>
                    )}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => handleAdd(place)}
                >
                  <Plus className="w-4 h-4 text-primary" />
                </Button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default PlaceSearch;
