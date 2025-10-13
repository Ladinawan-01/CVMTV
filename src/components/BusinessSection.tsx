import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Eye } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { FavoriteButton } from './FavoriteButton';
import { useAuth } from '../context/AuthContext';

interface Story {
  slug: string;
  title: string;
  excerpt: string;
  image_url: string;
  created_at: string;
  views: number;
}

export function BusinessSection() {
  const { setShowLoginModal } = useAuth();
  const [mainStory, setMainStory] = useState<Story | null>(null);
  const [sideStories, setSideStories] = useState<Story[]>([]);

  useEffect(() => {
    const fetchBusinessStories = async () => {
      const { data } = await supabase
        .from('stories')
        .select('slug, title, excerpt, image_url, created_at, views')
        .eq('category', 'Business')
        .order('created_at', { ascending: false })
        .limit(3);

      if (data && data.length > 0) {
        setMainStory(data[0]);
        setSideStories(data.slice(1, 3));
      }
    };

    fetchBusinessStories();
  }, []);

  const currentDate = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 1) return 'Just now';
    if (diffInHours === 1) return '1 hour ago';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return '1 day ago';
    return `${diffInDays} days ago`;
  };

  if (!mainStory) return null;

  return (
    <section className="py-8 sm:py-12 transition-colors overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
        <div className="mb-6 sm:mb-8 flex justify-center">
          <img
            src="/cvmtv-banner.png"
            alt="Advertisement"
            className="max-w-full h-auto"
          />
        </div>

        <Link to="/category/business">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6 sm:mb-8 pb-3 border-b-2 border-gray-900 dark:border-white hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors inline-block">
            BUSINESS NEWS
          </h2>
        </Link>

        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 w-full">
          <Link to={`/story/${mainStory.slug}`} className="group cursor-pointer">
            <div className="relative h-64 sm:h-80 lg:h-96 bg-gray-200 dark:bg-gray-800 overflow-hidden mb-4 rounded-lg">
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
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-yellow-500 dark:group-hover:text-yellow-400 transition-colors leading-tight">
              {mainStory.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-2 text-base sm:text-lg">
              {mainStory.excerpt}
            </p>
            <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
              <span>{getTimeAgo(mainStory.created_at)}</span>
              <div className="flex items-center gap-1">
                <Eye size={14} />
                <span>{mainStory.views.toLocaleString()} views</span>
              </div>
            </div>
          </Link>

          <div className="space-y-4 sm:space-y-6">
            <div className="border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
              <div className="bg-blue-700 dark:bg-blue-900 text-white px-3 sm:px-4 py-2">
                <h3 className="text-xs sm:text-sm font-bold">STOCK MARKET SUMMARY ({currentDate})</h3>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-gray-300 dark:divide-gray-600">
                <div className="px-4 py-3 text-center">
                  <div className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">JSE</div>
                  <div className="text-sm font-bold text-gray-900 dark:text-white">XXXX</div>
                </div>
                <div className="px-4 py-3 text-center">
                  <div className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">DJIA</div>
                  <div className="text-sm font-bold text-gray-900 dark:text-white">YYYY</div>
                </div>
                <div className="px-4 py-3 text-center">
                  <div className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">NASDAQ</div>
                  <div className="text-sm font-bold text-gray-900 dark:text-white">ZZZZ</div>
                </div>
                <div className="px-4 py-3 text-center">
                  <div className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">FTSE</div>
                  <div className="text-sm font-bold text-gray-900 dark:text-white">BBBB</div>
                </div>
              </div>
            </div>

            <div className="border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
              <div className="bg-blue-700 dark:bg-blue-900 text-white px-4 py-2">
                <h3 className="text-sm font-bold">CURRENCY SUMMARY ({currentDate})</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-300 dark:border-gray-600">
                      <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 dark:text-gray-400"></th>
                      <th className="px-4 py-2 text-center text-xs font-semibold text-gray-600 dark:text-gray-400">USD</th>
                      <th className="px-4 py-2 text-center text-xs font-semibold text-gray-600 dark:text-gray-400">CAD</th>
                      <th className="px-4 py-2 text-center text-xs font-semibold text-gray-600 dark:text-gray-400">POUND</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-300 dark:border-gray-600">
                      <td className="px-4 py-2 text-xs font-bold text-gray-900 dark:text-white">BUY</td>
                      <td className="px-4 py-2 text-center text-xs font-bold text-gray-900 dark:text-white">$151.08</td>
                      <td className="px-4 py-2 text-center text-xs font-bold text-gray-900 dark:text-white">$141.08</td>
                      <td className="px-4 py-2 text-center text-xs font-bold text-gray-900 dark:text-white">$175.00</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-xs font-bold text-gray-900 dark:text-white">SELL</td>
                      <td className="px-4 py-2 text-center text-xs font-bold text-gray-900 dark:text-white">$154.08</td>
                      <td className="px-4 py-2 text-center text-xs font-bold text-gray-900 dark:text-white">$144.08</td>
                      <td className="px-4 py-2 text-center text-xs font-bold text-gray-900 dark:text-white">$178.00</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {sideStories.map((story) => (
                <Link key={story.slug} to={`/story/${story.slug}`} className="group cursor-pointer">
                  <div className="relative h-32 bg-gray-200 dark:bg-gray-800 overflow-hidden mb-2 rounded-lg">
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
                  <h4 className="text-xs font-bold text-gray-900 dark:text-white mb-1 group-hover:text-yellow-500 dark:group-hover:text-yellow-400 transition-colors leading-tight">
                    {story.title}
                  </h4>
                  <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                    <span>{getTimeAgo(story.created_at)}</span>
                    <div className="flex items-center gap-1">
                      <Eye size={12} />
                      <span>{story.views.toLocaleString()}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}