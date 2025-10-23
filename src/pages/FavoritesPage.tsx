import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, Eye } from 'lucide-react';
import { apiClient } from '../lib/apiClient';
import { SkeletonImage, SkeletonText } from '../components/Skeleton';

type Story = {
  id: number;
  news_id: number;
  slug: string;
  title: string;
  category_id: number;
  category_name: string;
  image: string;
  published_date: string;
  description: string;
  total_views: number;
  total_bookmark: number;
  // ... add other required fields as needed
};

type BreakingNewsStory = {
  id: number;
  language_id: number;
  title: string;
  slug: string;
  image: string;
  content_type: string;
  content_value: string;
  description: string;
  meta_title: string;
  meta_description: string;
  meta_keyword: string;
  schema_markup: string;
  is_headline: number;
  created_at: string;
  updated_at: string;
  total_views: number;
  bookmark: number;
};

export function FavoritesPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'news' | 'breaking'>('news');
  const [favorites, setFavorites] = useState<Story[]>([]);
  const [breakingNewsFavorites, setBreakingNewsFavorites] = useState<BreakingNewsStory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('demoUser');
    if (!storedUser) {
      navigate('/login');
      return;
    }

    const loadData = async () => {
      setLoading(true);
      await Promise.all([
        fetchBookmarks(),
        fetchBreakingNewsBookmarks()
      ]);
      setLoading(false);
    };

    loadData();
  }, [navigate]);

  const fetchBookmarks = async () => {
    try {
      const response = await apiClient.getBookmarks({
        language_id: 1,
        offset: 0,
        limit: 10,
      });
      if (response.success && response.data?.data) {
        setFavorites(response.data.data as Story[]);
      } else {
        setFavorites([]);
        console.error('Failed to fetch bookmarks:', response.error);
      }
    } catch (error) {
      console.error('Error fetching bookmarks:', error);
      setFavorites([]);
    }
  };

  const fetchBreakingNewsBookmarks = async () => {
    try {
      const response = await apiClient.getBookmarkBreakingNews({
        language_id: 1,
        offset: 0,
        limit: 10,
      });
      if (response.success && response.data?.data) {
        console.log('Breaking news data structure:', response.data.data);
        setBreakingNewsFavorites(response.data.data as BreakingNewsStory[]);
      } else {
        setBreakingNewsFavorites([]);
        console.error('Failed to fetch breaking news bookmarks:', response.error);
      }
    } catch (error) {
      console.error('Error fetching breaking news bookmarks:', error);
      setBreakingNewsFavorites([]);
    }
  };

  // Use setBookmark as the API call (per LikeButton logic)
  const handleRemoveFavorite = async (news_id: number) => {
    try {
      // status: 0 to remove/unlike
      const response = await apiClient.setBookmark({
        news_id,
        status: 0,
      });
      if (response.success) {
        fetchBookmarks();
        console.log('Bookmark removed successfully');
      } else {
        console.error('Failed to remove bookmark:', response.error);
      }
    } catch (e) {
      console.error('Error removing bookmark:', e);
    }
  };

  const handleRemoveBreakingNewsFavorite = async (id: number) => {
    try {
      const response = await apiClient.setBreakingNewsBookmark({
        breaking_news_id: id,
        status: 0,
      });
      console.log('Breaking news bookmark response:', response);
      if (response.success) {
        fetchBreakingNewsBookmarks();
        console.log('Breaking news bookmark removed successfully');
      } else {
        console.error('Failed to remove breaking news bookmark:', response.error);
      }
    } catch (e) {
      console.error('Error removing breaking news bookmark:', e);
    }
  };


  const FavoriteCardSkeleton = () => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      <SkeletonImage className="h-48 w-full" />
      <div className="p-4 space-y-3">
        <SkeletonText className="h-6 w-full" />
        <SkeletonText className="h-6 w-3/4" />
        <SkeletonText className="h-4 w-full" />
        <SkeletonText className="h-4 w-5/6" />
        <div className="flex items-center gap-1 pt-2">
          <SkeletonText className="h-3 w-20" />
        </div>
      </div>
      <div className="px-4 pb-4">
        <SkeletonText className="h-8 w-40" />
      </div>
    </div>
  );

  if (loading) {
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <FavoriteCardSkeleton key={i} />
            ))}
          </div>
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
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Stories you've saved for later
          </p>
          
          {/* Tab Navigation */}
          <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg w-fit">
            <button
              onClick={() => setActiveTab('news')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'news'
                  ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              News
            </button>
            <button
              onClick={() => setActiveTab('breaking')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'breaking'
                  ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Breaking News
            </button>
          </div>
        </div>

        {activeTab === 'news' ? (
          favorites.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-12 text-center">
              <Heart className="mx-auto mb-4 text-gray-400" size={64} />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                No news favorites yet
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Start saving news stories by clicking the heart icon on any article
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
                        src={favorite.image}
                        alt={favorite.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <span className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 text-xs font-bold uppercase">
                        {favorite.category_name}
                      </span>
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-yellow-500 dark:group-hover:text-yellow-400 transition-colors line-clamp-2">
                        {favorite.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-2 line-clamp-2">
                        {/* Strip HTML tags from description */}
                        {favorite.description.replace(/<[^>]+>/g, '').slice(0, 120)}...
                      </p>
                      <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                        <Eye size={12} />
                        <span>{(favorite.total_views || 0).toLocaleString()} views</span>
                      </div>
                    </div>
                  </Link>
                  <div className="px-4 pb-4">
                    <button
                      onClick={() => handleRemoveFavorite(favorite.news_id)}
                      className="flex items-center gap-2 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 text-sm font-semibold transition-colors"
                    >
                      <Heart size={16} className="fill-current" />
                      Remove from favorites
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )
        ) : (
          breakingNewsFavorites.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-12 text-center">
              <Heart className="mx-auto mb-4 text-gray-400" size={64} />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                No breaking news favorites yet
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Start saving breaking news stories by clicking the heart icon on any breaking news article
              </p>
              <Link
                to="/"
                className="inline-block bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Explore Breaking News
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {breakingNewsFavorites.map((favorite) => (
                <div
                  key={favorite.slug}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden group"
                >
                  <Link to={`/breaking-news/${favorite.slug}`} className="block">
                    <div className="relative h-48 bg-gray-200 dark:bg-gray-700 overflow-hidden rounded-lg">
                      <img
                        src={favorite.image}
                        alt={favorite.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <span className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 text-xs font-bold uppercase">
                        BREAKING
                      </span>
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-yellow-500 dark:group-hover:text-yellow-400 transition-colors line-clamp-2">
                        {favorite.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-2 line-clamp-2">
                        {/* Strip HTML tags from description */}
                        {favorite.description.replace(/<[^>]+>/g, '').slice(0, 120)}...
                      </p>
                      <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                        <Eye size={12} />
                        <span>{(favorite.total_views || 0).toLocaleString()} views</span>
                      </div>
                    </div>
                  </Link>
                  <div className="px-4 pb-4">
                    <button
                      onClick={() => handleRemoveBreakingNewsFavorite(favorite.id)}
                      className="flex items-center gap-2 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 text-sm font-semibold transition-colors"
                    >
                      <Heart size={16} className="fill-current" />
                      Remove from favorites
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )
        )}
      </div>
    </div>
  );
}
