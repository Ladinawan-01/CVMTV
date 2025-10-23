import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { apiClient } from '../lib/apiClient';

interface BreakingNewsLikeButtonProps {
  newsId: number;
  initialLiked: boolean;
  onLoginRequired: () => void;
}

export function BreakingNewsLikeButton({ newsId, initialLiked, onLoginRequired }: BreakingNewsLikeButtonProps) {
  const [liked, setLiked] = useState(initialLiked);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    setLiked(initialLiked);
  }, [initialLiked]);

  const handleLike = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Check if user is logged in
    if (!apiClient.isAuthenticated()) {
      onLoginRequired();
      return;
    }

    if (isProcessing) return;

    setIsProcessing(true);

    try {
      const response = await apiClient.setBreakingNewsBookmark({
        breaking_news_id: newsId,
        status: liked ? 0 : 1, // Toggle: 1 to like, 0 to unlike
      });

      if (response.success) {
        // Toggle like state
        const newLiked = !liked;
        setLiked(newLiked);
      } else {
        console.error('Failed to update like:', response.error);
      }
    } catch (error) {
      console.error('Error updating like:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <button
      onClick={handleLike}
      disabled={isProcessing}
      className={`p-2 rounded-lg transition-all duration-200 ${
        liked
          ? 'bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400'
          : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
      } ${isProcessing ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}`}
      aria-label={liked ? 'Unlike this article' : 'Like this article'}
    >
      <Heart
        size={20}
        className={`transition-all ${liked ? 'fill-current' : ''}`}
      />
    </button>
  );
}
