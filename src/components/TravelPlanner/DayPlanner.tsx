import { useState } from "react";
import { 
  GripVertical, Plus, Trash2, Clock, MapPin, 
  UtensilsCrossed, Building2, Car, ChevronDown, ChevronUp, Search
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TripDay, TripPlace } from "./types";
import { cn } from "@/lib/utils";

interface DayPlannerProps {
  day: TripDay;
  dayNumber: number;
  color: string;
  onUpdatePlace: (placeId: string, updates: Partial<TripPlace>) => void;
  onAddPlace: () => void;
  onSearchPlace: () => void;
  onRemovePlace: (placeId: string) => void;
  onReorderPlaces: (startIndex: number, endIndex: number) => void;
}

const placeTypeIcons = {
  attraction: MapPin,
  restaurant: UtensilsCrossed,
  hotel: Building2,
  transport: Car,
};

const placeTypeLabels = {
  attraction: "Attraction",
  restaurant: "Restaurant",
  hotel: "Hotel",
  transport: "Transport",
};

const DayPlanner = ({
  day,
  dayNumber,
  color,
  onUpdatePlace,
  onAddPlace,
  onSearchPlace,
  onRemovePlace,
  onReorderPlaces,
}: DayPlannerProps) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex !== null && draggedIndex !== index) {
      onReorderPlaces(draggedIndex, index);
      setDraggedIndex(index);
    }
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-white"
            style={{ backgroundColor: color }}
          >
            {dayNumber}
          </div>
          <div className="text-left">
            <div className="font-semibold text-foreground">Day {dayNumber}</div>
            <div className="text-sm text-muted-foreground">{formatDate(day.date)}</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            {day.places.length} {day.places.length === 1 ? "place" : "places"}
          </span>
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-muted-foreground" />
          ) : (
            <ChevronDown className="w-5 h-5 text-muted-foreground" />
          )}
        </div>
      </button>

      {isExpanded && (
        <div className="p-4 pt-0 space-y-3">
          {day.places.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <MapPin className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>No places added yet</p>
              <p className="text-sm">Add attractions, restaurants, or hotels</p>
            </div>
          ) : (
            <div className="space-y-2">
              {day.places.map((place, index) => {
                const Icon = placeTypeIcons[place.type];
                return (
                  <div
                    key={place.id}
                    draggable
                    onDragStart={() => handleDragStart(index)}
                    onDragOver={(e) => handleDragOver(e, index)}
                    onDragEnd={handleDragEnd}
                    className={cn(
                      "group flex items-start gap-3 p-3 rounded-lg bg-secondary/50 border border-transparent hover:border-border cursor-move transition-all",
                      draggedIndex === index && "opacity-50 border-primary"
                    )}
                  >
                    <GripVertical className="w-4 h-4 text-muted-foreground mt-1 opacity-50 group-hover:opacity-100" />
                    
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${color}20` }}
                    >
                      <Icon className="w-4 h-4" style={{ color }} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <Input
                        value={place.name}
                        onChange={(e) => onUpdatePlace(place.id, { name: e.target.value })}
                        placeholder="Place name"
                        className="font-medium bg-transparent border-0 p-0 h-auto focus-visible:ring-0"
                      />
                      <div className="flex flex-wrap items-center gap-3 mt-1 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <Input
                            value={place.time || ""}
                            onChange={(e) => onUpdatePlace(place.id, { time: e.target.value })}
                            placeholder="Time"
                            className="w-16 bg-transparent border-0 p-0 h-auto text-xs focus-visible:ring-0"
                          />
                        </span>
                        {place.duration && (
                          <span className="text-muted-foreground">
                            ({place.duration})
                          </span>
                        )}
                        <span className="px-1.5 py-0.5 rounded bg-secondary text-muted-foreground">
                          {placeTypeLabels[place.type]}
                        </span>
                        {place.cost !== undefined && place.cost > 0 && (
                          <span className="text-primary font-medium">
                            ${place.cost}
                          </span>
                        )}
                      </div>
                      {place.notes && (
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                          {place.notes}
                        </p>
                      )}
                    </div>

                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onRemovePlace(place.id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8"
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                );
              })}
            </div>
          )}

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onSearchPlace}
              className="flex-1 gap-2 border-dashed"
            >
              <Search className="w-4 h-4" />
              Search Places
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onAddPlace}
              className="gap-2 border-dashed"
            >
              <Plus className="w-4 h-4" />
              Add Custom
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DayPlanner;
