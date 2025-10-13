import { X, Maximize2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

interface FloatingVideoPlayerProps {
  isVisible: boolean;
  onClose: () => void;
}

export function FloatingVideoPlayer({ isVisible, onClose }: FloatingVideoPlayerProps) {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (!isVisible) {
      setIsClosing(true);
      const timer = setTimeout(() => {
        setIsClosing(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  if (!isVisible && !isClosing) return null;

  return (
    <div
      className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 transition-all duration-300 ${
        isVisible && !isClosing
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <div className="bg-black rounded-lg shadow-2xl overflow-hidden border-2 border-gray-700">
        <div className="relative w-[280px] h-[158px] sm:w-[400px] sm:h-[225px]">
          <iframe
            src="https://www.youtube.com/embed/live_stream?channel=UCQvJlPa_fXJT0vr7qVjBaBw&autoplay=1&mute=1"
            title="CVM Television Live Stream"
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />

          <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/80 to-transparent p-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
              <span className="text-white text-xs font-bold">CVM TV LIVE</span>
            </div>
            <div className="flex items-center gap-2">
              <Link
                to="/live"
                className="text-white hover:text-yellow-400 transition-colors p-1"
                title="Full screen"
              >
                <Maximize2 size={16} />
              </Link>
              <button
                onClick={onClose}
                className="text-white hover:text-red-400 transition-colors p-1"
                title="Close"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
