import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { isFavorited, addFavorite, removeFavorite } from '../data/stories';

interface FavoriteButtonProps {
  storyId: string;
  onLoginRequired: () => void;
}

export function FavoriteButton({ storyId, onLoginRequired }: FavoriteButtonProps) {
  const [favorited, setFavorited] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    checkFavoriteStatus();
    window.addEventListener('userLogin', checkFavoriteStatus);
    return () => window.removeEventListener('userLogin', checkFavoriteStatus);
  }, [storyId]);

  const checkFavoriteStatus = () => {
    const storedUser = localStorage.getItem('demoUser');
    if (!storedUser) {
      setFavorited(false);
      return;
    }

    const user = JSON.parse(storedUser);
    setFavorited(isFavorited(user.email, storyId));
  };

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const storedUser = localStorage.getItem('demoUser');
    if (!storedUser) {
      onLoginRequired();
      return;
    }

    setLoading(true);
    const user = JSON.parse(storedUser);

    try {
      if (favorited) {
        removeFavorite(user.email, storyId);
        setFavorited(false);
      } else {
        addFavorite(user.email, storyId);
        setFavorited(true);
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
      aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
    >
      <Heart
        size={20}
        className={favorited ? 'fill-red-500 text-red-500' : 'text-gray-600 dark:text-gray-400'}
      />
    </button>
  );
}
