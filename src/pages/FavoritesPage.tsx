import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, Eye } from 'lucide-react';
import { getFavorites, getStoryBySlug, removeFavorite, Story } from '../data/stories';

export function FavoritesPage() {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string>('');

  useEffect(() => {
    const storedUser = localStorage.getItem('demoUser');
    if (!storedUser) {
      navigate('/login');
      return;
    }

    const user = JSON.parse(storedUser);
    setUserEmail(user.email);
    fetchFavorites(user.email);
  }, [navigate]);

  const fetchFavorites = (email: string) => {
    setLoading(true);

    const favoriteSlugs = getFavorites(email);
    const favoriteStories = favoriteSlugs
      .map(slug => getStoryBySlug(slug))
      .filter(story => story !== undefined) as Story[];

    setFavorites(favoriteStories);
    setLoading(false);
  };

  const handleRemoveFavorite = (slug: string) => {
    removeFavorite(userEmail, slug);
    setFavorites(favorites.filter(f => f.slug !== slug));
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
                key={favorite.slug}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden group"
              >
                <Link to={`/story/${favorite.slug}`} className="block">
                  <div className="relative h-48 bg-gray-200 dark:bg-gray-700 overflow-hidden rounded-lg">
                    <img
                      src={favorite.image_url}
                      alt={favorite.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 text-xs font-bold uppercase">
                      {favorite.category}
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-yellow-500 dark:group-hover:text-yellow-400 transition-colors line-clamp-2">
                      {favorite.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-2 line-clamp-2">
                      {favorite.excerpt}
                    </p>
                    <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                      <Eye size={12} />
                      <span>{favorite.views.toLocaleString()} views</span>
                    </div>
                  </div>
                </Link>
                <div className="px-4 pb-4">
                  <button
                    onClick={() => handleRemoveFavorite(favorite.slug)}
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
