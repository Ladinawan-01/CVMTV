import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Eye } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { FavoriteButton } from './FavoriteButton';
import { useAuth } from '../context/AuthContext';

interface Story {
  id: string;
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  image_url: string;
  views: number;
  published_at: string;
}

export function FeaturedSection() {
  const { setShowLoginModal } = useAuth();
  const [latestStories, setLatestStories] = useState<Story[]>([]);
  const [trendingStories, setTrendingStories] = useState<Story[]>([]);

  useEffect(() => {
    const fetchStories = async () => {
      const { data: latest } = await supabase
        .from('stories')
        .select('*')
        .order('published_at', { ascending: false })
        .limit(4);

      const { data: trending } = await supabase
        .from('stories')
        .select('*')
        .order('views', { ascending: false })
        .limit(8);

      if (latest) setLatestStories(latest);
      if (trending) setTrendingStories(trending);
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

  return (
    <section className="bg-white dark:bg-gray-950 py-8 sm:py-12 border-t border-gray-200 dark:border-gray-800 transition-colors overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
        <div className="mb-6 sm:mb-8 flex justify-center">
          <img
            src="/cvmtv-banner.png"
            alt="Advertisement"
            className="max-w-full h-auto"
          />
        </div>
        <div className="grid lg:grid-cols-3 gap-6 sm:gap-8 w-full">
          <div className="lg:col-span-2">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 pb-3 border-b-2 border-gray-900 dark:border-white">
              LATEST NEWS
            </h3>
            <div className="space-y-4 sm:space-y-6">
              {latestStories.map((story) => (
                <Link key={story.slug} to={`/story/${story.slug}`} className="group cursor-pointer flex flex-col sm:flex-row gap-3 sm:gap-4 pb-4 sm:pb-6 border-b border-gray-200 dark:border-gray-800 last:border-b-0">
                  <div className="relative w-full sm:w-56 h-48 sm:h-36 flex-shrink-0 bg-gray-200 dark:bg-gray-800 overflow-hidden rounded-lg">
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
                  <div className="flex-1">
                    <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase">
                      {story.category}
                    </span>
                    <h4 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mt-2 mb-2 group-hover:text-yellow-500 dark:group-hover:text-yellow-400 transition-colors">
                      {story.title}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-2 line-clamp-2">
                      {story.excerpt}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                      <span>{formatTimeAgo(story.published_at)}</span>
                      <div className="flex items-center gap-1">
                        <Eye size={12} />
                        <span>{story.views.toLocaleString()} views</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 pb-3 border-b-2 border-gray-900 dark:border-white">
              TRENDING
            </h3>
            <div className="space-y-4">
              {trendingStories.map((story, idx) => (
                <Link key={story.slug} to={`/story/${story.slug}`} className="group cursor-pointer flex gap-3">
                  <span className="text-2xl font-bold text-gray-300 dark:text-gray-700 flex-shrink-0">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-yellow-500 dark:group-hover:text-yellow-400 transition-colors leading-tight mb-1">
                      {story.title}
                    </h4>
                    <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                      <Eye size={12} />
                      <span>{story.views.toLocaleString()} views</span>
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
