import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { LiveVideoThumbnail } from './LiveVideoThumbnail';
import { FavoriteButton } from './FavoriteButton';
import { useAuth } from '../context/AuthContext';
import { apiClient } from '../lib/apiClient';

interface BreakingNews {
  id: number;
  title: string;
  slug: string;
  image: string;
  description: string;
  date: string;
  total_views: number;
  is_headline: boolean;
  created_at: string;
}

interface HeadlineNews {
  id: number;
  title: string;
  slug: string;
  date: string;
  is_headline: boolean;
  created_at: string;
}

interface NewsItem {
  id: number;
  title: string;
  slug: string;
  date: string;
  is_headline: boolean;
  created_at: string;
}

interface AdSpace {
  id: number;
  language_id: number;
  category_id: number | null;
  ad_space: string;
  ad_featured_section_id: number;
  ad_image: string;
  web_ad_image: string;
  ad_url: string;
  date: string;
  status: number;
  created_at: string;
  updated_at: string;
}

export function HeroSection() {
  const { setShowLoginModal } = useAuth();
  const [breakingNews, setBreakingNews] = useState<BreakingNews[]>([]);
  const [headlineNews, setHeadlineNews] = useState<HeadlineNews[]>([]);
  const [adSpace, setAdSpace] = useState<AdSpace | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        setLoading(true);

        // Fetch breaking news
        const breakingResponse = await apiClient.getBreakingNews({
          language_id: 1,
          offset: 0,
          limit: 4,
        });

        let fetchedBreakingNews: BreakingNews[] = [];
        if (breakingResponse.success && breakingResponse.data?.data) {
          fetchedBreakingNews = breakingResponse.data.data;
          setBreakingNews(fetchedBreakingNews);
          
          // Set ad space if available
          if (breakingResponse.data.ad_spaces) {
            setAdSpace(breakingResponse.data.ad_spaces);
          }
        }

        // Fetch headline news using getHeadlineCategory
        const headlineResponse = await apiClient.getBreakingNewsHeadlines({
          language_id: 1,
          offset: 0,
          limit: 20,
        });

        if (headlineResponse.success && headlineResponse.data?.data) {
          // Filter only articles where is_headline is true
          const newsHeadlines = headlineResponse.data.data
            .filter((news: NewsItem) => news.is_headline === true)
            .map((news: NewsItem) => ({
              id: news.id,
              title: news.title,
              slug: news.slug,
              date: news.date,
              is_headline: news.is_headline,
              created_at: news.created_at,
            }));

          // Also add breaking news items with is_headline=true
          const breakingHeadlines = fetchedBreakingNews
            .filter((news) => news.is_headline === true)
            .map((news) => ({
              id: news.id,
              title: news.title,
              slug: news.slug,
              date: news.date,
              created_at: news.created_at,
              is_headline: news.is_headline,
            }));

          // Combine and deduplicate, then take first 8
          const allHeadlines = [...breakingHeadlines, ...newsHeadlines];
          const uniqueHeadlines = allHeadlines.filter(
            (headline, index, self) =>
              index === self.findIndex((h) => h.id === headline.id)
          ).slice(0, 8);
          
          setHeadlineNews(uniqueHeadlines);
        }
      } catch (error) {
        console.error('Error fetching hero section data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHeroData();
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
  const formatHandlineTimeAgo = (dateString: string) => {
    console.log(dateString,'dateString')
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));

    if (diffInHours < 1) {
      const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
      return `${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''} ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
    } else if (diffInHours < 24 * 7) {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`;
    } else if (diffInHours < 24 * 30) {
      const diffInWeeks = Math.floor(diffInHours / (24 * 7));
      return `${diffInWeeks} week${diffInWeeks !== 1 ? 's' : ''} ago`;
    } else if (diffInHours < 24 * 365) {
      const diffInMonths = Math.floor(diffInHours / (24 * 30));
      return `${diffInMonths} month${diffInMonths !== 1 ? 's' : ''} ago`;
    } else {
      const diffInYears = Math.floor(diffInHours / (24 * 365));
      if (isNaN(diffInYears)) {
        return 'NaN years ago';
      }
      return `${diffInYears} year${diffInYears !== 1 ? 's' : ''} ago`;
    }
  };

  const stripHtml = (html: string) => {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  return (
    <section className="bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 transition-colors overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 w-full">
        <div className="mb-6 sm:mb-8 grid lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="lg:col-span-2">
            {!loading && adSpace ? (
              <a 
                href={adSpace.ad_url || '#'} 
                target={adSpace.ad_url ? '_blank' : '_self'}
                rel={adSpace.ad_url ? 'noopener noreferrer' : undefined}
                className="rounded-lg overflow-hidden flex items-center justify-center bg-gray-100 dark:bg-gray-800 cursor-pointer hover:opacity-90 transition-opacity"
              >
                <img
                  src={adSpace.web_ad_image || adSpace.ad_image}
                  alt="Advertisement"
                  className="w-full h-auto"
                />
              </a>
            ) : (
              <div className="rounded-lg overflow-hidden flex items-center justify-center bg-gray-200 dark:bg-gray-700 h-[200px] animate-pulse" />
            )}
          </div>
          <div className="lg:col-span-1">
            <LiveVideoThumbnail />
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-4 sm:gap-6 w-full overflow-hidden">
          {/* Main Breaking News */}
          {!loading && breakingNews[0] ? (
            <Link to={`/story/${breakingNews[0].slug}`} className="relative group cursor-pointer block w-full">
            <div className="relative h-[300px] sm:h-[350px] lg:h-[500px] bg-gray-900 overflow-hidden rounded-lg w-full">
              <FavoriteButton
                  storyId={breakingNews[0].slug}
                onLoginRequired={() => setShowLoginModal(true)}
              />
              <img
                  src={breakingNews[0].image}
                  alt={breakingNews[0].title}
                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute top-4 left-4">
                <span className="bg-red-600 dark:bg-red-700 text-white px-3 py-1 text-xs font-bold uppercase">
                  Breaking
                </span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 sm:mb-3 leading-tight">
                    {breakingNews[0].title}
                </h2>
                  <p className="text-gray-200 text-xs sm:text-sm mb-2 hidden sm:block line-clamp-2">
                    {stripHtml(breakingNews[0].description)}
                  </p>
                  <span className="text-xs text-gray-300">{formatTimeAgo(breakingNews[0].created_at)}</span>
                </div>
              </div>
            </Link>
          ) : (
            loading && (
              <div className="relative h-[300px] sm:h-[350px] lg:h-[500px] bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse w-full" />
            )
          )}

          {/* Side Breaking News */}
          <div className="space-y-4 w-full min-w-0">
            {!loading && breakingNews.slice(1, 4).map((news) => (
              <Link key={news.slug} to={`/story/${news.slug}`} className="relative group cursor-pointer block w-full">
              <div className="relative h-[155px] bg-gray-900 overflow-hidden rounded-lg w-full">
                <FavoriteButton
                    storyId={news.slug}
                  onLoginRequired={() => setShowLoginModal(true)}
                />
                <img
                    src={news.image}
                    alt={news.title}
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                    <h3 className="text-sm sm:text-base font-bold mb-1 leading-tight line-clamp-2">
                      {news.title}
                  </h3>
                    <span className="text-xs text-gray-300">{formatTimeAgo(news.created_at)}</span>
                </div>
              </div>
            </Link>
            ))}
            {loading && [1, 2, 3].map((i) => (
              <div key={i} className="h-[155px] bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse w-full" />
            ))}
          </div>

          {/* Headline News Section */}
          <div className="space-y-6 w-full min-w-0">
            <div className="w-full">
              <div className="border-b-2 border-blue-600 dark:border-blue-400 pb-2 mb-4">
                <h2 className="text-sm font-bold text-blue-600 dark:text-blue-400 uppercase">Live on CVM TV</h2>
              </div>
              <ul className="space-y-2 w-full">
                <li className="text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="flex-shrink-0">•</span>
                  <div className="flex justify-between items-center flex-1 min-w-0">
                    <span className="font-medium text-sm sm:text-base">Morning Live</span>
                    <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 flex-shrink-0 ml-2">6:00 AM</span>
                  </div>
                </li>
                <li className="text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="flex-shrink-0">•</span>
                  <div className="flex justify-between items-center flex-1 min-w-0">
                    <span className="font-medium text-sm sm:text-base">Prime Time News</span>
                    <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 flex-shrink-0 ml-2">7:00 PM</span>
                  </div>
                </li>
                <li className="text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="flex-shrink-0">•</span>
                  <div className="flex justify-between items-center flex-1 min-w-0">
                    <span className="font-medium text-sm sm:text-base">Sports Tonight</span>
                    <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 flex-shrink-0 ml-2">10:00 PM</span>
                  </div>
                </li>
              </ul>
            </div>

            <div className="w-full">
              {headlineNews.length > 0 && (
              <div className="border-b-2 border-blue-600 dark:border-blue-400 pb-2 mb-4">
                <h2 className="text-sm font-bold text-blue-600 dark:text-blue-400 uppercase">Headline BREAKING NEWS</h2>
              </div>
              )}
              <ul className="space-y-3 sm:space-y-4 w-full">
                {!loading && headlineNews.map((news) => (
                  <li key={news.id} className="text-gray-900 dark:text-white flex items-start sm:items-center gap-2">
                  <span className="flex-shrink-0 mt-1 sm:mt-0">•</span>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 flex-1 min-w-0">
                    <Link
                        to={`/story/${news.slug}`}
                      className="hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors font-medium line-clamp-2 sm:line-clamp-1 sm:truncate flex-1 min-w-0 text-sm sm:text-base"
                    >
                        {news.title}
                    </Link>
                      <span className="text-xs text-gray-500 dark:text-gray-400 flex-shrink-0 whitespace-nowrap">
                        {formatHandlineTimeAgo(news.created_at)}
                      </span>
                  </div>
                </li>
                ))}
                {loading && [1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="flex-shrink-0">•</span>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full animate-pulse" />
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-20 animate-pulse" />
                  </div>
                </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
