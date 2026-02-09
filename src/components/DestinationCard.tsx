import { Link } from "react-router-dom";
import { MapPin, Calendar, Mountain, ThumbsUp } from "lucide-react";
import { DestinationType } from "@/data/destinations";

interface DestinationCardProps {
  id: string;
  image: string;
  name: string;
  description: string;
  region: string;
  type: DestinationType;
  bestTime: string;
  elevation: string;
  rating: number;
}

const typeStyles = {
  heritage: "badge-heritage",
  nature: "badge-nature",
  spiritual: "badge-spiritual",
};

const typeLabels = {
  heritage: "Heritage",
  nature: "Nature",
  spiritual: "Spiritual",
};

const DestinationCard = ({
  id,
  image,
  name,
  description,
  region,
  type,
  bestTime,
  elevation,
  rating,
}: DestinationCardProps) => {
  return (
    <Link
      to={`/destination/${id}`}
      className="group relative rounded-2xl overflow-hidden bg-card hover-lift cursor-pointer block"
    >
      {/* Image */}
      <div className="aspect-[3/4] relative overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 card-overlay" />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${typeStyles[type]}`}>
            {typeLabels[type]}
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-medium badge-vr">
            360° VR
          </span>
        </div>
        
        {/* Region Badge */}
        <div className="absolute top-4 right-4">
          <span className="px-3 py-1 rounded-full text-xs font-medium glass-effect text-foreground/80">
            {region}
          </span>
        </div>
        
        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <h3 className="font-display text-2xl font-semibold text-foreground mb-1">
            {name}
          </h3>
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {description}
          </p>
          
          {/* Stats */}
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>{bestTime}</span>
            </div>
            <div className="flex items-center gap-1">
              <Mountain className="w-3.5 h-3.5" />
              <span>{elevation}</span>
            </div>
            <div className="flex items-center gap-1">
              <ThumbsUp className="w-3.5 h-3.5" />
              <span>{rating}%</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Explore Button */}
      <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
        <span className="block w-full py-3 bg-primary text-primary-foreground rounded-xl font-medium text-sm text-center hover:bg-primary/90 transition-colors">
          Explore
        </span>
      </div>
    </Link>
  );
};

export default DestinationCard;
