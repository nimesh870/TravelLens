import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Polyline, useMap } from "react-leaflet";
import { Icon, divIcon } from "leaflet";
import { TripDay } from "./types";
import "leaflet/dist/leaflet.css";

interface TripMapProps {
  days: TripDay[];
  activeDay?: string;
}

const dayColors = [
  "#FF6B6B",
  "#4ECDC4",
  "#45B7D1",
  "#96CEB4",
  "#FFEAA7",
  "#DDA0DD",
  "#98D8C8",
];

const createNumberedIcon = (number: number, color: string) => {
  return divIcon({
    className: "custom-marker",
    html: `<div style="
      background: ${color};
      color: white;
      width: 28px;
      height: 28px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: 12px;
      border: 3px solid white;
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
    ">${number}</div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
  });
};

const MapBounds = ({ days }: { days: TripDay[] }) => {
  const map = useMap();

  useEffect(() => {
    const allCoords: [number, number][] = [];
    days.forEach((day) => {
      day.places.forEach((place) => {
        if (place.coordinates) {
          allCoords.push(place.coordinates);
        }
      });
    });

    if (allCoords.length > 0) {
      const bounds = allCoords.reduce(
        (acc, coord) => ({
          minLat: Math.min(acc.minLat, coord[0]),
          maxLat: Math.max(acc.maxLat, coord[0]),
          minLng: Math.min(acc.minLng, coord[1]),
          maxLng: Math.max(acc.maxLng, coord[1]),
        }),
        { minLat: 90, maxLat: -90, minLng: 180, maxLng: -180 }
      );

      map.fitBounds([
        [bounds.minLat, bounds.minLng],
        [bounds.maxLat, bounds.maxLng],
      ], { padding: [50, 50] });
    }
  }, [days, map]);

  return null;
};

const TripMap = ({ days, activeDay }: TripMapProps) => {
  const defaultCenter: [number, number] = [27.7172, 85.324]; // Nepal center

  return (
    <div className="h-[300px] lg:h-[400px] rounded-xl overflow-hidden border border-border">
      <MapContainer
        center={defaultCenter}
        zoom={7}
        className="h-full w-full"
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapBounds days={days} />

        {days.map((day, dayIndex) => {
          const color = dayColors[dayIndex % dayColors.length];
          const coords: [number, number][] = [];

          return (
            <div key={day.id}>
              {day.places.map((place, placeIndex) => {
                if (!place.coordinates) return null;
                coords.push(place.coordinates);

                return (
                  <Marker
                    key={place.id}
                    position={place.coordinates}
                    icon={createNumberedIcon(placeIndex + 1, color)}
                  />
                );
              })}
              {coords.length > 1 && (
                <Polyline
                  positions={coords}
                  color={color}
                  weight={3}
                  opacity={0.7}
                  dashArray="5, 10"
                />
              )}
            </div>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default TripMap;
