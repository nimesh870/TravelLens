import { X, Play } from "lucide-react";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
  title?: string;
}

const VideoModal = ({ isOpen, onClose, videoUrl, title }: VideoModalProps) => {
  // Extract YouTube video ID from various URL formats
  const getYouTubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const videoId = getYouTubeId(videoUrl);
  const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0` : "";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-[95vw] p-0 bg-black border-none overflow-hidden">
        <DialogClose className="absolute right-4 top-4 z-50 rounded-full bg-black/50 p-2 hover:bg-black/70 transition-colors">
          <X className="h-5 w-5 text-white" />
          <span className="sr-only">Close</span>
        </DialogClose>
        
        {title && (
          <div className="absolute left-4 top-4 z-50">
            <span className="text-white/80 text-sm font-medium">{title}</span>
          </div>
        )}

        <div className="aspect-video w-full">
          {embedUrl ? (
            <iframe
              src={embedUrl}
              title={title || "Video"}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-secondary">
              <p className="text-muted-foreground">Invalid video URL</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VideoModal;
