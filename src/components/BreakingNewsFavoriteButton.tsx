import { useState } from 'react';
import { Heart } from 'lucide-react';
import { apiClient } from '../lib/apiClient';

interface BreakingNewsFavoriteButtonProps {
  newsId: number;
  storyId: string;
  onLoginRequired: () => void;
  favorited: boolean;
}

export function BreakingNewsFavoriteButton({ newsId, storyId, onLoginRequired, favorited }: BreakingNewsFavoriteButtonProps) {
  const [isFavorited, setIsFavorited] = useState(favorited);
  const [loading, setLoading] = useState(false);
 

  const toggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const storedUser = localStorage.getItem('demoUser');
    if (!storedUser) {
      onLoginRequired();
      return;
    }

    setLoading(true);

    try {
      const response = await apiClient.setBreakingNewsBookmark({
        breaking_news_id: newsId,
        status: isFavorited ? 0 : 1,
      });

      if (response.success) {
        setIsFavorited((prev) => !prev);
      } else {
        console.error('Failed to update favorite:', response.message ?? response.error);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={toggleFavorite}
      disabled={loading}
      className="absolute top-2 right-2 z-10 p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:scale-110 transition-transform disabled:opacity-50"
      aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
    >
      <Heart
        size={20}
        className={isFavorited ? 'fill-red-500 text-red-500' : 'text-gray-600 dark:text-gray-400'}
      />
    </button>
  );
}
