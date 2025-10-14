import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Eye } from 'lucide-react';
import { FavoriteButton } from './FavoriteButton';
import { useAuth } from '../context/AuthContext';
import { apiClient } from '../lib/apiClient';
import { MainStorySkeleton, SmallCardSkeleton } from './Skeleton';

interface Story {
  id: number;
  title: string;
  slug: string;
  image: string;
  category_name: string;
  description: string;
  date: string;
  total_views: number;
  is_headline: boolean;
}

interface NewsItem {
  id: number;
  title: string;
  slug: string;
  image: string;
  description: string;
  date: string;
  total_views: number;
  is_headline: boolean;
  category?: {
    category_name: string;
  };
}

export function SportsSection() {
  const { setShowLoginModal } = useAuth();
  const [mainStory, setMainStory] = useState<Story | null>(null);
  const [sideStories, setSideStories] = useState<Story[]>([]);
  const [headlineStories, setHeadlineStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSportsStories = async () => {
      try {
        setLoading(true);
        
        // Fetch regular sports news
        const response = await apiClient.getNewsByCategory({
          category_slug: 'sports',
          language_id: 1,
          offset: 0,
          limit: 4,
        });

        if (response.success && response.data?.data) {
          const stories = response.data.data.map((news: NewsItem) => ({
            id: news.id,
            title: news.title,
            slug: news.slug,
            image: news.image,
            category_name: news.category?.category_name || 'Sports',
            description: news.description,
            date: news.date,
            total_views: news.total_views || 0,
            is_headline: news.is_headline || false,
          }));

          setMainStory(stories[0]);
          setSideStories(stories.slice(1, 4));
        }

        // Fetch headline sports news
        const headlineResponse = await apiClient.getHeadlineCategory({
          category_slug: 'sports',
          language_id: 1,
          offset: 0,
          limit: 10,
        });

        if (headlineResponse.success && headlineResponse.data?.data) {
          const headlines = headlineResponse.data.data
            .filter((news: NewsItem) => news.is_headline === true)
            .map((news: NewsItem) => ({
              id: news.id,
              title: news.title,
              slug: news.slug,
              image: news.image,
              category_name: news.category?.category_name || 'Sports',
              description: news.description,
              date: news.date,
              total_views: news.total_views || 0,
              is_headline: true,
            }));

          setHeadlineStories(headlines);
        }
      } catch (error) {
        console.error('Error fetching sports stories:', error);
      } finally {
        setLoading(false);
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

  if (loading) {
    return (
      <section className="bg-green-50 dark:bg-green-950 py-8 sm:py-12 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-6 animate-pulse" />
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <MainStorySkeleton />
            </div>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <SmallCardSkeleton key={i} />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

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
                src={mainStory.image}
                alt={mainStory.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-yellow-500 dark:group-hover:text-yellow-400 transition-colors leading-tight">
              {mainStory.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-2 text-lg">
              {mainStory.description.replace(/<[^>]*>/g, '').substring(0, 150)}...
            </p>
            <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
              <span>{formatTimeAgo(mainStory.date)}</span>
              <div className="flex items-center gap-1">
                <Eye size={14} />
                <span>{mainStory.total_views.toLocaleString()} views</span>
              </div>
            </div>
          </Link>

          <div className="grid grid-cols-1 gap-5">
            {sideStories.map((story) => (
              <Link key={story.slug} to={`/story/${story.slug}`} className="group cursor-pointer">
                <div className="relative h-40 bg-gray-200 dark:bg-gray-800 overflow-hidden mb-1 rounded-lg">
                  <FavoriteButton
                    storyId={story.slug}
                    onLoginRequired={() => setShowLoginModal(true)}
                  />
                  <img
                    src={story.image}
                    alt={story.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-2 group-hover:text-yellow-500 dark:group-hover:text-yellow-400 transition-colors leading-tight">
                  {story.title}
                </h4>
                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                  <span>{formatTimeAgo(story.date)}</span>
                  <div className="flex items-center gap-1">
                    <Eye size={12} />
                    <span>{story.total_views.toLocaleString()}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {headlineStories.length > 0 && (
            <div className="w-full">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4">Sport News Headlines</h3>
              <ul className="space-y-3 sm:space-y-4 w-full">
                {headlineStories.map((story) => (
                  <li key={story.slug} className="text-gray-900 dark:text-white flex items-start sm:items-center gap-2">
                    <span className="flex-shrink-0 mt-1 sm:mt-0">•</span>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 flex-1 min-w-0">
                      <Link
                        to={`/story/${story.slug}`}
                        className="hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors font-medium line-clamp-2 sm:line-clamp-1 sm:truncate flex-1 min-w-0 text-sm sm:text-base"
                      >
                        {story.title}
                      </Link>
                      <span className="text-xs text-gray-500 dark:text-gray-400 flex-shrink-0 whitespace-nowrap">{formatTimeAgo(story.date)}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
