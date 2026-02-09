import { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, Circle, Polyline } from "react-leaflet";
import L from "leaflet";
import { 
  MapPin, Navigation, Cloud, Thermometer, Wind, Droplets, 
  AlertTriangle, CheckCircle, XCircle, ChevronRight, X,
  Mountain, Landmark, TreePine, PawPrint
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { mapLocations, roadIssues, userLocation, MapLocation, RoadIssue } from "@/data/mapData";
import "leaflet/dist/leaflet.css";

// Fix Leaflet default marker icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

// Custom marker icons
const createCustomIcon = (color: string, type: string) => {
  const iconHtml = `
    <div style="
      background: ${color};
      width: 32px;
      height: 32px;
      border-radius: 50% 50% 50% 0;
      transform: rotate(-45deg);
      border: 2px solid white;
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      display: flex;
      align-items: center;
      justify-content: center;
    ">
      <span style="transform: rotate(45deg); font-size: 14px;">${type === "trekking" ? "🏔️" : type === "cultural" ? "🏛️" : type === "wildlife" ? "🦏" : "📍"}</span>
    </div>
  `;
  return L.divIcon({
    html: iconHtml,
    className: "custom-marker",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
};

const userIcon = L.divIcon({
  html: `
    <div style="
      width: 20px;
      height: 20px;
      background: #3B82F6;
      border: 3px solid white;
      border-radius: 50%;
      box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.3), 0 2px 8px rgba(0,0,0,0.3);
    "></div>
  `,
  className: "user-marker",
  iconSize: [20, 20],
  iconAnchor: [10, 10],
});

const roadIssueIcon = (severity: string) => L.divIcon({
  html: `
    <div style="
      width: 24px;
      height: 24px;
      background: ${severity === "high" ? "#EF4444" : severity === "medium" ? "#F59E0B" : "#3B82F6"};
      border: 2px solid white;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
    ">⚠️</div>
  `,
  className: "road-issue-marker",
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

interface LocationPanelProps {
  location: MapLocation;
  onClose: () => void;
}

const LocationPanel = ({ location, onClose }: LocationPanelProps) => {
  return (
    <div className="absolute right-0 top-0 bottom-0 w-full sm:w-96 bg-card/95 backdrop-blur-lg border-l border-border z-[1000] overflow-y-auto animate-slide-in-right">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                location.status === "open" 
                  ? "bg-green-500/20 text-green-400" 
                  : "bg-red-500/20 text-red-400"
              }`}>
                {location.status === "open" ? "Open" : "Blocked"}
              </span>
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-secondary text-muted-foreground capitalize">
                {location.type}
              </span>
            </div>
            <h3 className="font-display text-2xl font-semibold text-foreground">
              {location.name}
            </h3>
            <p className="text-sm text-muted-foreground">{location.elevation}</p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Block Reason */}
        {location.status === "blocked" && location.blockReason && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30">
            <div className="flex items-center gap-2 text-red-400 mb-2">
              <AlertTriangle className="w-5 h-5" />
              <span className="font-semibold">Access Blocked</span>
            </div>
            <p className="text-sm text-red-300">{location.blockReason}</p>
          </div>
        )}

        {/* Weather */}
        <div className="mb-6 p-4 rounded-xl bg-secondary/50">
          <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
            <Cloud className="w-4 h-4 text-primary" />
            Current Weather
          </h4>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2">
              <Thermometer className="w-4 h-4 text-muted-foreground" />
              <span className="text-foreground">{location.weather.temp}°C</span>
            </div>
            <div className="flex items-center gap-2">
              <Cloud className="w-4 h-4 text-muted-foreground" />
              <span className="text-foreground text-sm">{location.weather.condition}</span>
            </div>
            <div className="flex items-center gap-2">
              <Droplets className="w-4 h-4 text-muted-foreground" />
              <span className="text-foreground">{location.weather.humidity}%</span>
            </div>
            <div className="flex items-center gap-2">
              <Wind className="w-4 h-4 text-muted-foreground" />
              <span className="text-foreground">{location.weather.wind} km/h</span>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <p className="text-muted-foreground">{location.description}</p>
        </div>

        {/* Cultural Tips */}
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20">
            <h4 className="font-semibold text-green-400 mb-3 flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              Cultural Do's
            </h4>
            <ul className="space-y-2">
              {location.culturalTips.dos.map((tip, i) => (
                <li key={i} className="text-sm text-foreground flex items-start gap-2">
                  <span className="text-green-400 mt-1">•</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20">
            <h4 className="font-semibold text-red-400 mb-3 flex items-center gap-2">
              <XCircle className="w-4 h-4" />
              Cultural Don'ts
            </h4>
            <ul className="space-y-2">
              {location.culturalTips.donts.map((tip, i) => (
                <li key={i} className="text-sm text-foreground flex items-start gap-2">
                  <span className="text-red-400 mt-1">•</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 pt-6 border-t border-border">
          <Button className="w-full bg-primary gap-2">
            <Navigation className="w-4 h-4" />
            Get Directions
          </Button>
        </div>
      </div>
    </div>
  );
};

interface MapControlsProps {
  onLocateUser: () => void;
  filter: string;
  onFilterChange: (filter: string) => void;
}

const MapControls = ({ onLocateUser, filter, onFilterChange }: MapControlsProps) => {
  const filters = [
    { id: "all", label: "All", icon: MapPin },
    { id: "trekking", label: "Trekking", icon: Mountain },
    { id: "cultural", label: "Cultural", icon: Landmark },
    { id: "wildlife", label: "Wildlife", icon: PawPrint },
    { id: "destination", label: "Cities", icon: TreePine },
  ];

  return (
    <div className="absolute top-4 left-4 z-[1000] flex flex-col gap-2">
      <Button 
        onClick={onLocateUser}
        size="sm"
        className="bg-blue-500 hover:bg-blue-600 gap-2 shadow-lg"
      >
        <Navigation className="w-4 h-4" />
        <span className="hidden sm:inline">My Location</span>
      </Button>
      
      <div className="flex flex-wrap gap-1 bg-card/90 backdrop-blur-sm p-2 rounded-xl border border-border shadow-lg">
        {filters.map((f) => (
          <Button
            key={f.id}
            variant={filter === f.id ? "default" : "ghost"}
            size="sm"
            onClick={() => onFilterChange(f.id)}
            className={`gap-1 text-xs ${filter === f.id ? "bg-primary" : ""}`}
          >
            <f.icon className="w-3 h-3" />
            <span className="hidden sm:inline">{f.label}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

const LiveMap = () => {
  const [selectedLocation, setSelectedLocation] = useState<MapLocation | null>(null);
  const [filter, setFilter] = useState("all");
  const mapRef = useRef<L.Map | null>(null);

  const filteredLocations = filter === "all" 
    ? mapLocations 
    : mapLocations.filter(loc => loc.type === filter);

  const handleLocateUser = () => {
    if (mapRef.current) {
      mapRef.current.flyTo([userLocation.lat, userLocation.lng], 14, {
        duration: 1.5,
      });
    }
  };

  const getMarkerColor = (location: MapLocation) => {
    if (location.status === "blocked") return "#EF4444";
    switch (location.type) {
      case "trekking": return "#10B981";
      case "cultural": return "#F59E0B";
      case "wildlife": return "#8B5CF6";
      default: return "#3B82F6";
    }
  };

  return (
    <div className="relative h-[600px] rounded-2xl overflow-hidden border border-border">
      <MapContainer
        center={[27.7172, 85.3240]}
        zoom={7}
        style={{ height: "100%", width: "100%" }}
        ref={mapRef}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />

        {/* User Location */}
        <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon}>
          <Popup className="custom-popup">
            <div className="text-center">
              <span className="font-semibold">{userLocation.name}</span>
            </div>
          </Popup>
        </Marker>

        {/* User location pulse effect */}
        <Circle
          center={[userLocation.lat, userLocation.lng]}
          radius={2000}
          pathOptions={{
            color: "#3B82F6",
            fillColor: "#3B82F6",
            fillOpacity: 0.1,
            weight: 1,
          }}
        />

        {/* Destination Markers */}
        {filteredLocations.map((location) => (
          <Marker
            key={location.id}
            position={[location.lat, location.lng]}
            icon={createCustomIcon(getMarkerColor(location), location.type)}
            eventHandlers={{
              click: () => setSelectedLocation(location),
            }}
          >
            <Popup>
              <div className="text-center p-2">
                <h4 className="font-semibold text-foreground">{location.name}</h4>
                <p className="text-xs text-muted-foreground">{location.type}</p>
                <span className={`inline-block mt-2 px-2 py-0.5 rounded text-xs ${
                  location.status === "open" ? "bg-green-500/20 text-green-600" : "bg-red-500/20 text-red-600"
                }`}>
                  {location.status}
                </span>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Road Issues */}
        {roadIssues.map((issue) => (
          <Marker
            key={issue.id}
            position={[issue.lat, issue.lng]}
            icon={roadIssueIcon(issue.severity)}
          >
            <Popup>
              <div className="p-2 max-w-xs">
                <div className={`text-xs font-semibold mb-1 ${
                  issue.severity === "high" ? "text-red-600" : 
                  issue.severity === "medium" ? "text-amber-600" : "text-blue-600"
                }`}>
                  {issue.type.toUpperCase()} - {issue.severity.toUpperCase()} SEVERITY
                </div>
                <p className="text-sm">{issue.description}</p>
                {issue.expectedClearance && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Expected clearance: {issue.expectedClearance}
                  </p>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Map Controls */}
      <MapControls 
        onLocateUser={handleLocateUser} 
        filter={filter} 
        onFilterChange={setFilter}
      />

      {/* Legend */}
      <div className="absolute bottom-4 left-4 z-[1000] bg-card/90 backdrop-blur-sm p-3 rounded-xl border border-border shadow-lg">
        <div className="text-xs font-semibold text-foreground mb-2">Legend</div>
        <div className="space-y-1.5 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500 border border-white"></div>
            <span className="text-muted-foreground">Your Location</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-muted-foreground">Open</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span className="text-muted-foreground">Blocked</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-amber-500"></div>
            <span className="text-muted-foreground">Road Issue</span>
          </div>
        </div>
      </div>

      {/* Location Detail Panel */}
      {selectedLocation && (
        <LocationPanel 
          location={selectedLocation} 
          onClose={() => setSelectedLocation(null)} 
        />
      )}
    </div>
  );
};

export default LiveMap;
