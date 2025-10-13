import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Eye } from 'lucide-react';
import { getStories, Story } from '../data/stories';
import { FavoriteButton } from './FavoriteButton';
import { useAuth } from '../context/AuthContext';

export function SportsSection() {
  const { setShowLoginModal } = useAuth();
  const [mainStory, setMainStory] = useState<Story | null>(null);
  const [sideStories, setSideStories] = useState<Story[]>([]);

  useEffect(() => {
    const fetchSportsStories = () => {
      const data = getStories({ category: 'Sports', limit: 7, orderBy: 'published_at' });

      if (data && data.length > 0) {
        setMainStory(data[0]);
        setSideStories(data.slice(1));
      }
    };

    fetchSportsStories();
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

  if (!mainStory) return null;

  return (
    <section className="py-12 transition-colors overflow-hidden border-t-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
        <div className="mb-8 flex justify-center">
          <img
            src="/cvmtv-banner.png"
            alt="Advertisement"
            className="max-w-full h-auto"
          />
        </div>

        <Link to="/category/sports">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 pb-3 border-b-2 border-gray-900 dark:border-white hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors inline-block">
            SPORTS
          </h2>
        </Link>

        <div className="grid lg:grid-cols-3 gap-6 sm:gap-8 w-full">
          <Link to={`/story/${mainStory.slug}`} className="group cursor-pointer">
            <div className="relative h-96 bg-gray-200 dark:bg-gray-800 overflow-hidden mb-4 rounded-lg">
              <FavoriteButton
                storyId={mainStory.slug}
                onLoginRequired={() => setShowLoginModal(true)}
              />
              <img
                src={mainStory.image_url}
                alt={mainStory.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-yellow-500 dark:group-hover:text-yellow-400 transition-colors leading-tight">
              {mainStory.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-2 text-lg">
              {mainStory.excerpt}
            </p>
            <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
              <span>{formatTimeAgo(mainStory.published_at)}</span>
              <div className="flex items-center gap-1">
                <Eye size={14} />
                <span>{mainStory.views.toLocaleString()} views</span>
              </div>
            </div>
          </Link>

          <div className="grid grid-cols-1 gap-5">
            {sideStories.slice(0, 3).map((story) => (
              <Link key={story.slug} to={`/story/${story.slug}`} className="group cursor-pointer">
                <div className="relative h-40 bg-gray-200 dark:bg-gray-800 overflow-hidden mb-1 rounded-lg">
                  <FavoriteButton
                    storyId={story.slug}
                    onLoginRequired={() => setShowLoginModal(true)}
                  />
                  <img
                    src={story.image_url}
                    alt={story.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-2 group-hover:text-yellow-500 dark:group-hover:text-yellow-400 transition-colors leading-tight">
                  {story.title}
                </h4>
                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                  <span>{formatTimeAgo(story.published_at)}</span>
                  <div className="flex items-center gap-1">
                    <Eye size={12} />
                    <span>{story.views.toLocaleString()}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="w-full">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4">Sport News Headlines</h3>
            <ul className="space-y-3 sm:space-y-4 w-full">
              {sideStories.slice(2).map((story) => (
                <li key={story.slug} className="text-gray-900 dark:text-white flex items-start sm:items-center gap-2">
                  <span className="flex-shrink-0 mt-1 sm:mt-0">•</span>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 flex-1 min-w-0">
                    <Link
                      to={`/story/${story.slug}`}
                      className="hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors font-medium line-clamp-2 sm:line-clamp-1 sm:truncate flex-1 min-w-0 text-sm sm:text-base"
                    >
                      {story.title}
                    </Link>
                    <span className="text-xs text-gray-500 dark:text-gray-400 flex-shrink-0 whitespace-nowrap">{formatTimeAgo(story.published_at)}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
