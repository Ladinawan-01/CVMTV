import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Eye } from 'lucide-react';
import { FavoriteButton } from './FavoriteButton';
import { useAuth } from '../context/AuthContext';
import { apiClient } from '../lib/apiClient';
import { FeaturedStorySkeleton, TrendingStorySkeleton } from './Skeleton';
import { FeaturedSection as FeaturedSectionType, NewsArticle } from '../types/api';

interface Story {
  id: number;
  title: string;
  slug: string;
  image: string;
  category_name: string;
  description: string;
  date: string;
  total_views: number;
}

interface AdSpace {
  id: number;
  language_id: number;
  category_id: number | null;
  ad_space: string | null;
  ad_featured_section_id: number;
  ad_image: string;
  web_ad_image: string;
  ad_url: string;
  date: string;
  status: number;
  created_at: string;
  updated_at: string;
}

export function FeaturedSection() {
  const { setShowLoginModal } = useAuth();
  const [latestStories, setLatestStories] = useState<Story[]>([]);
  const [trendingStories, setTrendingStories] = useState<Story[]>([]);
  const [adSpace, setAdSpace] = useState<AdSpace | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        setLoading(true);
        const response = await apiClient.getFeaturedSections({
          language_id: 1,
          offset: 0,
          limit: 9,
        });

        if (response.success && response.data?.data) {
          // Find "Lead Stories" section or use first section
          const leadSection = response.data.data.find((s: FeaturedSectionType) => 
            s.slug === 'lead-stories' || s.title.toLowerCase().includes('lead')
          ) || response.data.data[0];

          if (leadSection && leadSection.news) {
            const stories = leadSection.news.map((news: NewsArticle) => ({
              id: news.id,
              title: news.title,
              slug: news.slug,
              image: news.image,
              category_name: news.category_name,
              description: news.description,
              date: news.date,
              total_views: news.total_views || 0,
            }));

            setLatestStories(stories.slice(0, 4));
            setTrendingStories(stories.slice(0, 8));

            // Set ad space if available
            if (leadSection.ad_spaces && leadSection.ad_spaces.length > 0) {
              setAdSpace(leadSection.ad_spaces[0]);
            }
          }
        }
      } catch (error) {
        console.error('Error fetching featured stories:', error);
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

  const stripHtml = (html: string) => {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  if (loading) {
    return (
      <section className="bg-white dark:bg-gray-950 py-8 sm:py-12 border-t border-gray-200 dark:border-gray-800 transition-colors overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
          <div className="mb-6 sm:mb-8 flex justify-center">
            <div className="w-full max-w-3xl h-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          </div>
          <div className="grid lg:grid-cols-3 gap-6 sm:gap-8 w-full">
            <div className="lg:col-span-2">
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-48 mb-6 animate-pulse" />
              <div className="space-y-6">
                {[1, 2, 3, 4].map((i) => (
                  <FeaturedStorySkeleton key={i} />
                ))}
              </div>
            </div>
            <div>
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-6 animate-pulse" />
              <div className="space-y-4">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <TrendingStorySkeleton key={i} index={i - 1} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white dark:bg-gray-950 py-8 sm:py-12 border-t border-gray-200 dark:border-gray-800 transition-colors overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
        {adSpace && (
          <div className="mb-6 sm:mb-8 flex justify-center">
            <a 
              href={adSpace.ad_url || '#'} 
              target={adSpace.ad_url ? '_blank' : '_self'}
              rel={adSpace.ad_url ? 'noopener noreferrer' : undefined}
              className="cursor-pointer hover:opacity-90 transition-opacity"
            >
              <img
                src={adSpace.web_ad_image || adSpace.ad_image}
                alt="Advertisement"
                className="max-w-full h-auto"
              />
            </a>
          </div>
        )}
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
                      src={story.image}
                      alt={story.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex-1">
                    <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase">
                      {story.category_name}
                    </span>
                      <h4 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mt-2 mb-2 group-hover:text-yellow-500 dark:group-hover:text-yellow-400 transition-colors">
                        {story.title}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-2 line-clamp-2">
                        {stripHtml(story.description)}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                        <span>{formatTimeAgo(story.date)}</span>
                        <div className="flex items-center gap-1">
                          <Eye size={12} />
                          <span>{story.total_views.toLocaleString()} views</span>
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
                        <span>{story.total_views.toLocaleString()} views</span>
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
