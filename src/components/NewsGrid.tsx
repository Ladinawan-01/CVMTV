import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Eye } from 'lucide-react';
import { FavoriteButton } from './FavoriteButton';
import { useAuth } from '../context/AuthContext';
import { apiClient } from '../lib/apiClient';
import { SectionGridSkeleton } from './Skeleton';

interface Story {
  id: number;
  title: string;
  slug: string;
  image: string;
  category_name: string;
  date: string;
  total_views: number;
  bookmark: number;
}

interface NewsItem {
  id: number;
  title: string;
  slug: string;
  image: string;
  date: string;
  total_views: number;
  is_headline: boolean;
  category?: {
    category_name: string;
  };
  bookmark: number;
}

export function NewsGrid() {
  const { setShowLoginModal } = useAuth();
  const [storiesByCategory, setStoriesByCategory] = useState<Record<string, Story[]>>({});
  const [categorySlugs, setCategorySlugs] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
   useEffect(() => {
    const fetchStories = async () => {
      try {
        setLoading(true);
        
        // Fetch different category sections
        const categorySlugList = ['news', 'politics-jamaica', 'business-news'];
        const results: Record<string, Story[]> = {};
        const slugs: Record<string, string> = {};

        await Promise.all(
          categorySlugList.map(async (slug) => {
            // Fetch regular news
            const response = await apiClient.getNewsByCategory({
              category_slug: slug,
              language_id: 1,
              offset: 0,
              limit: 6,
            });

            if (response.success && response.data?.data) {
              console.log(response,'response')
              const stories = response.data.data.map((news: NewsItem) => ({
                id: news.id,
                title: news.title,
                slug: news.slug,
                image: news.image,
                category_name: news.category?.category_name || 'News',
                date: news.date,
                total_views: news.total_views || 0,
                bookmark: news.bookmark || 0,
              }));

              // Use category name as key and store the slug
              const categoryName = stories[0]?.category_name || slug;
              results[categoryName] = stories;
              slugs[categoryName] = slug; // Store the actual slug for this category

            }
          })
        );

        setStoriesByCategory(results);
        setCategorySlugs(slugs);
      } catch (error) {
        console.error('Error fetching news grid:', error);
      } finally {
        setLoading(false);
      }
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

  // Get first 3 categories from API data
  const categoryKeys = Object.keys(storiesByCategory).slice(0, 3);
  const categoryConfig = categoryKeys.map(name => ({
    name,
    slug: categorySlugs[name] || name.toLowerCase(),
    color: 'text-blue-600 dark:text-blue-400',
    borderColor: 'border-blue-600 dark:border-blue-400'
  }));

  if (loading) {
    return (
      <section className="bg-gray-50 dark:bg-gray-900 py-8 sm:py-12 transition-colors overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 w-full">
            {[1, 2, 3].map((i) => (
              <SectionGridSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>
    );
  }
   return (
    <section className="bg-gray-50 dark:bg-gray-900 py-8 sm:py-12 transition-colors overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 w-full">
          {categoryConfig.map((config) => (
            <div key={config.name}>
              <Link to={`/category/${config.slug}`}>
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
                          newsId={storiesByCategory[config.name][0].id}
                          favorited={storiesByCategory[config.name][0].bookmark === 1}
                        />
                      <img
                        src={storiesByCategory[config.name][0].image}
                        alt={storiesByCategory[config.name][0].title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      </div>
                      <h4 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-yellow-500 dark:group-hover:text-yellow-400 transition-colors leading-tight">
                        {storiesByCategory[config.name][0].title}
                      </h4>
                    <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                      <span>{formatTimeAgo(storiesByCategory[config.name][0].date)}</span>
                      <div className="flex items-center gap-1">
                        <Eye size={12} />
                        <span>{storiesByCategory[config.name][0].total_views.toLocaleString()} views</span>
                      </div>
                    </div>
                    </Link>

                    {storiesByCategory[config.name].length > 1 && (
                      <div className="pt-4   dark:border-gray-600 pb-4">
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
