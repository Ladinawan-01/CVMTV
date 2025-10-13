import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface FavoriteButtonProps {
  storyId: string;
  onLoginRequired: () => void;
}

export function FavoriteButton({ storyId, onLoginRequired }: FavoriteButtonProps) {
  const [isFavorited, setIsFavorited] = useState(false);
  const [loading, setLoading] = useState(false);
  const [actualStoryId, setActualStoryId] = useState<string | null>(null);

  useEffect(() => {
    getStoryId();
  }, [storyId]);

  useEffect(() => {
    if (actualStoryId) {
      checkFavoriteStatus();
      window.addEventListener('userLogin', checkFavoriteStatus);
      return () => window.removeEventListener('userLogin', checkFavoriteStatus);
    }
  }, [actualStoryId]);

  const getStoryId = async () => {
    const { data } = await supabase
      .from('stories')
      .select('id')
      .eq('slug', storyId)
      .maybeSingle();

    if (data) {
      setActualStoryId(data.id);
    }
  };

  const checkFavoriteStatus = async () => {
    if (!actualStoryId) return;

    const storedUser = localStorage.getItem('demoUser');
    if (!storedUser) {
      setIsFavorited(false);
      return;
    }

    const user = JSON.parse(storedUser);
    const { data } = await supabase
      .from('favorites')
      .select('id')
      .eq('user_email', user.email)
      .eq('story_id', actualStoryId)
      .maybeSingle();

    setIsFavorited(!!data);
  };

  const toggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!actualStoryId) {
      alert('Story not found in database');
      return;
    }

    const storedUser = localStorage.getItem('demoUser');
    if (!storedUser) {
      onLoginRequired();
      return;
    }

    setLoading(true);
    const user = JSON.parse(storedUser);

    try {
      if (isFavorited) {
        const { error } = await supabase
          .from('favorites')
          .delete()
          .eq('user_email', user.email)
          .eq('story_id', actualStoryId);

        if (error) {
          console.error('Error removing favorite:', error);
          alert('Failed to remove favorite: ' + error.message);
        } else {
          setIsFavorited(false);
        }
      } else {
        const { error } = await supabase
          .from('favorites')
          .insert({ user_email: user.email, story_id: actualStoryId });

        if (error) {
          console.error('Error adding favorite:', error);
          alert('Failed to add favorite: ' + error.message);
        } else {
          setIsFavorited(true);
        }
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
