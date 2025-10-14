import { Play, Signal } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';

interface LiveVideoThumbnailProps {
  onVisibilityChange?: (isVisible: boolean) => void;
}

export function LiveVideoThumbnail({ onVisibilityChange }: LiveVideoThumbnailProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        onVisibilityChange?.(entry.isIntersecting);
      },
      {
        threshold: 0.3,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [onVisibilityChange]);

  return (
    <div ref={containerRef} className="relative group cursor-pointer flex gap-4 pb-4 border-b border-gray-200 dark:border-gray-800">
      <Link to="https://now.cvmtv.com/" className="contents">
        <div className="relative w-48 h-32 flex-shrink-0 bg-black overflow-hidden">
          <img
            src="https://images.pexels.com/photos/3765132/pexels-photo-3765132.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="CVM TV Live"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

          <div className="absolute top-2 left-2 flex items-center gap-1 bg-red-600 text-white px-2 py-1 rounded animate-pulse">
            <Signal size={12} />
            <span className="text-xs font-bold uppercase">Live</span>
          </div>

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white/90 rounded-full p-3 group-hover:bg-white group-hover:scale-110 transition-all">
              <Play size={24} className="text-red-600 fill-red-600" />
            </div>
          </div>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-red-600 dark:text-red-400 uppercase">Live Now</span>
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-1 mb-2 line-clamp-2 group-hover:text-yellow-500 dark:group-hover:text-yellow-400 transition-colors">
            CVM Television Live Broadcast
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-1">
            Watch Jamaica's trusted source for news and entertainment
          </p>
        </div>
      </Link>
    </div>
  );
}
