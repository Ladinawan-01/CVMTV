import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, Eye } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface FavoriteStory {
  id: string;
  story_id: string;
  created_at: string;
  stories: {
    slug: string;
    title: string;
    excerpt: string;
    image_url: string;
    category: string;
    views: number;
  };
}

export function FavoritesPage() {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState<FavoriteStory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('demoUser');
    if (!storedUser) {
      navigate('/login');
      return;
    }

    fetchFavorites();
  }, [navigate]);

  const fetchFavorites = async () => {
    const storedUser = localStorage.getItem('demoUser');
    if (!storedUser) return;

    const user = JSON.parse(storedUser);
    setLoading(true);

    const { data } = await supabase
      .from('favorites')
      .select(`
        id,
        story_id,
        created_at,
        stories:story_id (
          slug,
          title,
          excerpt,
          image_url,
          category,
          views
        )
      `)
      .eq('user_email', user.email)
      .order('created_at', { ascending: false });

    if (data) {
      const formattedData = data.map((item: any) => ({
        id: item.id,
        story_id: item.story_id,
        created_at: item.created_at,
        stories: Array.isArray(item.stories) ? item.stories[0] : item.stories
      }));
      setFavorites(formattedData);
    }
    setLoading(false);
  };

  const removeFavorite = async (favoriteId: string) => {
    await supabase.from('favorites').delete().eq('id', favoriteId);
    setFavorites(favorites.filter(f => f.id !== favoriteId));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 transition-colors">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-center text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            My Favorites
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Stories you've saved for later
          </p>
        </div>

        {favorites.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-12 text-center">
            <Heart className="mx-auto mb-4 text-gray-400" size={64} />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              No favorites yet
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Start saving stories by clicking the heart icon on any article
            </p>
            <Link
              to="/"
              className="inline-block bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Explore Stories
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((favorite) => (
              <div
                key={favorite.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden group"
              >
                <Link to={`/story/${favorite.stories.slug}`} className="block">
                  <div className="relative h-48 bg-gray-200 dark:bg-gray-700 overflow-hidden rounded-lg">
                    <img
                      src={favorite.stories.image_url}
                      alt={favorite.stories.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 text-xs font-bold uppercase">
                      {favorite.stories.category}
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-yellow-500 dark:group-hover:text-yellow-400 transition-colors line-clamp-2">
                      {favorite.stories.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-2 line-clamp-2">
                      {favorite.stories.excerpt}
                    </p>
                    <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                      <Eye size={12} />
                      <span>{favorite.stories.views.toLocaleString()} views</span>
                    </div>
                  </div>
                </Link>
                <div className="px-4 pb-4">
                  <button
                    onClick={() => removeFavorite(favorite.id)}
                    className="flex items-center gap-2 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 text-sm font-semibold transition-colors"
                  >
                    <Heart size={16} className="fill-current" />
                    Remove from favorites
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
