import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Eye } from 'lucide-react';
import { getStories, Story } from '../data/stories';
import { FavoriteButton } from './FavoriteButton';
import { useAuth } from '../context/AuthContext';

export function NewsGrid() {
  const { setShowLoginModal } = useAuth();
  const [storiesByCategory, setStoriesByCategory] = useState<Record<string, Story[]>>({});

  useEffect(() => {
    const fetchStories = () => {
      const categories = ['News', 'Politics', 'Business'];
      const results: Record<string, Story[]> = {};

      for (const category of categories) {
        const data = getStories({ category, limit: 6, orderBy: 'published_at' });
        results[category] = data;
      }

      setStoriesByCategory(results);
    };

    fetchStories();
  }, []);

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));

    if (diffInHours < 1) {
      const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
      return `${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''} ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`;
    }
  };

  const categoryConfig = [
    { name: 'News', color: 'text-blue-600 dark:text-blue-400', borderColor: 'border-blue-600 dark:border-blue-400' },
    { name: 'Politics', color: 'text-blue-600 dark:text-blue-400', borderColor: 'border-blue-600 dark:border-blue-400' },
    { name: 'Business', color: 'text-blue-600 dark:text-blue-400', borderColor: 'border-blue-600 dark:border-blue-400' }
  ];

  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-8 sm:py-12 transition-colors overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 w-full">
          {categoryConfig.map((config) => (
            <div key={config.name}>
              <Link to={`/category/${config.name.toLowerCase()}`}>
                <h3 className={`text-sm font-bold ${config.color} mb-4 pb-2 border-b-2 ${config.borderColor} hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors cursor-pointer`}>
                  {config.name.toUpperCase()}
                </h3>
              </Link>
              <div className="space-y-6">
                {(storiesByCategory[config.name] || []).length > 0 && (
                  <>
                    <Link to={`/story/${storiesByCategory[config.name][0].slug}`} className="group cursor-pointer block">
                      <div className="relative h-40 sm:h-48 bg-gray-200 dark:bg-gray-800 overflow-hidden mb-3 rounded-lg">
                        <FavoriteButton
                          storyId={storiesByCategory[config.name][0].slug}
                          onLoginRequired={() => setShowLoginModal(true)}
                        />
                        <img
                          src={storiesByCategory[config.name][0].image_url}
                          alt={storiesByCategory[config.name][0].title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <h4 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-yellow-500 dark:group-hover:text-yellow-400 transition-colors leading-tight">
                        {storiesByCategory[config.name][0].title}
                      </h4>
                      <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                        <span>{formatTimeAgo(storiesByCategory[config.name][0].published_at)}</span>
                        <div className="flex items-center gap-1">
                          <Eye size={12} />
                          <span>{storiesByCategory[config.name][0].views.toLocaleString()} views</span>
                        </div>
                      </div>
                    </Link>

                    {storiesByCategory[config.name].length > 1 && (
                      <div className="pt-4">
                        <ul className="space-y-3">
                          {storiesByCategory[config.name].slice(1, 6).map((story) => (
                            <li key={story.slug}>
                              <Link
                                to={`/story/${story.slug}`}
                                className="text-sm text-gray-700 dark:text-gray-300 hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors flex items-start gap-2 group"
                              >
                                <span className="text-yellow-500 dark:text-yellow-400 mt-1 group-hover:scale-110 transition-transform">•</span>
                                <span className="leading-snug">{story.title}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
