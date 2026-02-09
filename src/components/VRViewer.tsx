import { useState, useRef, useEffect, useCallback } from "react";
import { X, RotateCw, ZoomIn, ZoomOut, Maximize2, Minimize2, Move } from "lucide-react";
import { Button } from "@/components/ui/button";

interface VRViewerProps {
  isOpen: boolean;
  onClose: () => void;
  image: string;
  title: string;
}

const VRViewer = ({ isOpen, onClose, image, title }: VRViewerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [lon, setLon] = useState(0);
  const [lat, setLat] = useState(0);
  const [zoom, setZoom] = useState(75); // FOV
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [startLonLat, setStartLonLat] = useState({ lon: 0, lat: 0 });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const animationRef = useRef<number>();
  const imageRef = useRef<HTMLImageElement>();

  // Draw the 360° panorama with spherical projection
  const drawPanorama = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !imageRef.current) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = imageRef.current;
    const width = canvas.width;
    const height = canvas.height;

    // Convert degrees to radians
    const lonRad = (lon * Math.PI) / 180;
    const latRad = (lat * Math.PI) / 180;
    const fov = (zoom * Math.PI) / 180;

    // Clear canvas
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, width, height);

    // For each pixel in the output canvas, calculate the corresponding point in the equirectangular image
    const imgData = ctx.createImageData(width, height);
    const pixels = imgData.data;

    // Create a temporary canvas for the source image
    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = img.width;
    tempCanvas.height = img.height;
    const tempCtx = tempCanvas.getContext("2d");
    if (!tempCtx) return;
    tempCtx.drawImage(img, 0, 0);
    const srcData = tempCtx.getImageData(0, 0, img.width, img.height).data;

    const aspectRatio = width / height;
    const halfFovY = fov / 2;
    const halfFovX = Math.atan(Math.tan(halfFovY) * aspectRatio);

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        // Convert screen coordinates to angles relative to view center
        const nx = (x / width - 0.5) * 2;
        const ny = (0.5 - y / height) * 2;

        const angleX = nx * halfFovX;
        const angleY = ny * halfFovY;

        // Calculate 3D direction vector
        const cosY = Math.cos(angleY);
        let dx = Math.sin(angleX) * cosY;
        let dy = Math.sin(angleY);
        let dz = Math.cos(angleX) * cosY;

        // Rotate by latitude
        const cosLat = Math.cos(latRad);
        const sinLat = Math.sin(latRad);
        const dy2 = dy * cosLat - dz * sinLat;
        const dz2 = dy * sinLat + dz * cosLat;
        dy = dy2;
        dz = dz2;

        // Rotate by longitude
        const cosLon = Math.cos(lonRad);
        const sinLon = Math.sin(lonRad);
        const dx2 = dx * cosLon - dz * sinLon;
        const dz3 = dx * sinLon + dz * cosLon;
        dx = dx2;
        dz = dz3;

        // Convert 3D direction to equirectangular coordinates
        const srcLon = Math.atan2(dx, dz);
        const srcLat = Math.asin(Math.max(-1, Math.min(1, dy)));

        // Map to image coordinates
        const srcX = ((srcLon / Math.PI + 1) / 2) * img.width;
        const srcY = (0.5 - srcLat / Math.PI) * img.height;

        // Bilinear interpolation
        const x0 = Math.floor(srcX) % img.width;
        const y0 = Math.max(0, Math.min(img.height - 1, Math.floor(srcY)));
        const x1 = (x0 + 1) % img.width;
        const y1 = Math.min(img.height - 1, y0 + 1);

        const fx = srcX - Math.floor(srcX);
        const fy = srcY - Math.floor(srcY);

        const idx00 = (y0 * img.width + x0) * 4;
        const idx10 = (y0 * img.width + x1) * 4;
        const idx01 = (y1 * img.width + x0) * 4;
        const idx11 = (y1 * img.width + x1) * 4;

        const outIdx = (y * width + x) * 4;

        for (let c = 0; c < 3; c++) {
          const v00 = srcData[idx00 + c] || 0;
          const v10 = srcData[idx10 + c] || 0;
          const v01 = srcData[idx01 + c] || 0;
          const v11 = srcData[idx11 + c] || 0;

          pixels[outIdx + c] =
            v00 * (1 - fx) * (1 - fy) +
            v10 * fx * (1 - fy) +
            v01 * (1 - fx) * fy +
            v11 * fx * fy;
        }
        pixels[outIdx + 3] = 255;
      }
    }

    ctx.putImageData(imgData, 0, 0);
  }, [lon, lat, zoom]);

  // Load the panorama image
  useEffect(() => {
    if (!isOpen) return;

    setIsLoading(true);
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      imageRef.current = img;
      setIsLoading(false);
    };
    img.onerror = () => {
      setIsLoading(false);
    };
    img.src = image;
  }, [isOpen, image]);

  // Resize canvas to match container
  useEffect(() => {
    if (!isOpen || !containerRef.current || !canvasRef.current) return;

    const resizeCanvas = () => {
      if (canvasRef.current && containerRef.current) {
        canvasRef.current.width = containerRef.current.clientWidth;
        canvasRef.current.height = containerRef.current.clientHeight;
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, [isOpen]);

  // Animation loop
  useEffect(() => {
    if (!isOpen || isLoading) return;

    const animate = () => {
      if (autoRotate && !isDragging) {
        setLon((prev) => prev + 0.15);
      }
      drawPanorama();
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isOpen, isLoading, autoRotate, isDragging, drawPanorama]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setAutoRotate(false);
    setStartPos({ x: e.clientX, y: e.clientY });
    setStartLonLat({ lon, lat });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - startPos.x;
    const deltaY = e.clientY - startPos.y;
    setLon(startLonLat.lon - deltaX * 0.2);
    setLat(Math.max(-85, Math.min(85, startLonLat.lat + deltaY * 0.2)));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    setIsDragging(true);
    setAutoRotate(false);
    setStartPos({ x: touch.clientX, y: touch.clientY });
    setStartLonLat({ lon, lat });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const touch = e.touches[0];
    const deltaX = touch.clientX - startPos.x;
    const deltaY = touch.clientY - startPos.y;
    setLon(startLonLat.lon - deltaX * 0.2);
    setLat(Math.max(-85, Math.min(85, startLonLat.lat + deltaY * 0.2)));
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    setZoom((prev) => Math.max(30, Math.min(120, prev + e.deltaY * 0.05)));
  };

  const handleZoomIn = () => setZoom((prev) => Math.max(30, prev - 10));
  const handleZoomOut = () => setZoom((prev) => Math.min(120, prev + 10));

  const toggleFullscreen = async () => {
    if (!containerRef.current) return;

    if (!isFullscreen) {
      await containerRef.current.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      await document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div ref={containerRef} className="fixed inset-0 z-50 bg-black">
      {/* Canvas for 360° rendering */}
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseUp}
        onWheel={handleWheel}
      />

      {/* Loading indicator */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/80">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-white">Loading 360° Experience...</p>
          </div>
        </div>
      )}

      {/* Controls Header */}
      <div className="absolute top-0 left-0 right-0 z-10 p-4 bg-gradient-to-b from-black/80 to-transparent">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-display text-xl text-white font-semibold">{title}</h2>
            <div className="flex items-center gap-2 text-white/60 text-sm">
              <Move className="w-4 h-4" />
              <span>Drag to explore • Scroll to zoom</span>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-white hover:bg-white/20"
          >
            <X className="w-6 h-6" />
          </Button>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="absolute bottom-0 left-0 right-0 z-10 p-4 bg-gradient-to-t from-black/80 to-transparent">
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setAutoRotate(!autoRotate)}
            className={`gap-2 text-white hover:bg-white/20 ${autoRotate ? "bg-white/20" : ""}`}
          >
            <RotateCw className={`w-4 h-4 ${autoRotate ? "animate-spin" : ""}`} />
            Auto Rotate
          </Button>
          <div className="h-6 w-px bg-white/20" />
          <Button
            variant="ghost"
            size="icon"
            onClick={handleZoomOut}
            className="text-white hover:bg-white/20"
          >
            <ZoomOut className="w-5 h-5" />
          </Button>
          <span className="text-white text-sm w-16 text-center">
            {Math.round(120 - zoom)}% FOV
          </span>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleZoomIn}
            className="text-white hover:bg-white/20"
          >
            <ZoomIn className="w-5 h-5" />
          </Button>
          <div className="h-6 w-px bg-white/20" />
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleFullscreen}
            className="text-white hover:bg-white/20"
          >
            {isFullscreen ? (
              <Minimize2 className="w-5 h-5" />
            ) : (
              <Maximize2 className="w-5 h-5" />
            )}
          </Button>
        </div>

        {/* Compass indicator */}
        <div className="flex justify-center mt-3">
          <div className="flex items-center gap-4 px-4 py-2 rounded-full bg-black/50 backdrop-blur-sm">
            <span className="text-white/60 text-xs">
              Lon: {Math.round(lon % 360)}° • Lat: {Math.round(lat)}°
            </span>
          </div>
        </div>
      </div>

      {/* TravelLens Watermark */}
      <div className="absolute bottom-24 right-4 z-10">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm">
          <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-[10px]">TL</span>
          </div>
          <span className="text-white/80 text-xs font-medium">TravelLens 360°</span>
        </div>
      </div>
    </div>
  );
};

export default VRViewer;
