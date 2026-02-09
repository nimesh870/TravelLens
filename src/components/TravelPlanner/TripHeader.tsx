import { useState } from "react";
import { Calendar, MapPin, Users, Share2, Edit2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trip } from "./types";

interface TripHeaderProps {
  trip: Trip;
  onUpdate: (updates: Partial<Trip>) => void;
  onShare: () => void;
}

const TripHeader = ({ trip, onUpdate, onShare }: TripHeaderProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(trip.name);

  const handleSaveName = () => {
    onUpdate({ name: editName });
    setIsEditing(false);
  };

  const formatDateRange = () => {
    if (!trip.startDate || !trip.endDate) return "Set dates";
    const start = new Date(trip.startDate).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
    const end = new Date(trip.endDate).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    return `${start} - ${end}`;
  };

  const getDayCount = () => {
    if (!trip.startDate || !trip.endDate) return 0;
    const start = new Date(trip.startDate);
    const end = new Date(trip.endDate);
    return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  };

  return (
    <div className="bg-gradient-to-r from-primary/20 via-primary/10 to-transparent rounded-2xl p-6 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex-1">
          {isEditing ? (
            <div className="flex items-center gap-2">
              <Input
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="text-2xl font-display font-bold bg-background/50 border-primary/30"
                autoFocus
              />
              <Button size="icon" variant="ghost" onClick={handleSaveName}>
                <Check className="w-5 h-5 text-primary" />
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <h2 className="font-display text-2xl font-bold text-foreground">
                {trip.name || "Untitled Trip"}
              </h2>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setIsEditing(true)}
                className="opacity-60 hover:opacity-100"
              >
                <Edit2 className="w-4 h-4" />
              </Button>
            </div>
          )}

          <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-primary" />
              <span>{trip.destination || "Select destination"}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-primary" />
              <span>{formatDateRange()}</span>
            </div>
            {getDayCount() > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-primary/20 text-primary text-xs font-medium">
                {getDayCount()} days
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex -space-x-2">
            {trip.collaborators.slice(0, 3).map((_, i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-full bg-secondary border-2 border-background flex items-center justify-center text-xs font-medium"
              >
                {String.fromCharCode(65 + i)}
              </div>
            ))}
            {trip.collaborators.length > 3 && (
              <div className="w-8 h-8 rounded-full bg-primary/20 border-2 border-background flex items-center justify-center text-xs font-medium text-primary">
                +{trip.collaborators.length - 3}
              </div>
            )}
          </div>
          <Button variant="outline" size="sm" onClick={onShare} className="gap-1.5">
            <Share2 className="w-4 h-4" />
            Share
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TripHeader;
