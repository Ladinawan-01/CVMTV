import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Eye, ArrowLeft, Home, User } from 'lucide-react';
import { apiClient } from '../lib/apiClient';
import { StoryDetailSkeleton } from '../components/Skeleton';
import { BreakingNewsLikeButton } from '../components/BreakingNewsLikeButton';
import { useAuth } from '../context/AuthContext';

interface BreakingNewsDetail {
  id: number;
  title: string;
  slug: string;
  image: string;
  date: string;
  published_date: string;
  description: string;
  total_views: number;
  total_like: number;
  total_bookmark: number;
  bookmark: number;
  like: number;
  is_headline: boolean;
  category?: {
    id: number;
    category_name: string;
    slug: string;
  };
  tag?: Array<{
    id: number;
    tag_name: string;
    slug: string;
  }>;
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

export function BreakingNewsPage() {
  const { slug } = useParams<{ slug: string }>();
  const { setShowLoginModal } = useAuth();
  const [breakingNews, setBreakingNews] = useState<BreakingNewsDetail | null>(null);
  const [relatedNews, setRelatedNews] = useState<BreakingNewsDetail[]>([]);
  const [adSpace, setAdSpace] = useState<AdSpace | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBreakingNews = async () => {
      if (!slug) return;

      console.log('BreakingNewsPage: Fetching breaking news for slug:', slug);
      setLoading(true);
      window.scrollTo(0, 0);

      try {
        // Fetch breaking news by slug
        const response = await apiClient.getBreakingNews({
          slug: slug,
          language_id: 1,
          offset: 0,
          limit: 10,
        });

        console.log('Breaking News API Response:', response);

        if (response.success && response.data?.data && response.data.data.length > 0) {
          const newsData = response.data.data[0];
          console.log('Breaking News Data:', newsData);
          console.log('Category:', newsData.category);
          setBreakingNews(newsData);

          // Set ad space if available
          if (response.data.ad_spaces) {
            setAdSpace(response.data.ad_spaces);
          }

          // Fetch related breaking news (other breaking news items)
          const relatedResponse = await apiClient.getBreakingNews({
            language_id: 1,
            offset: 0,
            limit: 6,
          });

          if (relatedResponse.success && relatedResponse.data?.data) {
            // Filter out current news
            const related = relatedResponse.data.data.filter(
              (item: BreakingNewsDetail) => item.id !== newsData.id
            );
            setRelatedNews(related.slice(0, 3));
          }
        } else {
          console.log('Breaking news not found');
          setBreakingNews(null);
        }
      } catch (error) {
        console.error('Error fetching breaking news:', error);
        setBreakingNews(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBreakingNews();
  }, [slug]);

  useEffect(() => {
    if (breakingNews) {
      const fetchViewCount = async () => {
        const apiToken = localStorage.getItem('api_token');
        if (!apiToken) {
          // Don't hit the API if api_token is not present
          return;
        }
        const response = await apiClient.userBreakingNewsViewCount(breakingNews.id);
        if (response.success) {
          console.log('BreakingNewsPage: View count updated successfully');
        } else {
          console.error('BreakingNewsPage: Error updating view count:', response.error);
        }
      };
      fetchViewCount();
    }
  }, [breakingNews]);

  const stripHtml = (html: string) => {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return <StoryDetailSkeleton />;
  }

  if (!breakingNews) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Breaking News not found</h2>
          <Link
            to="/"
            className="text-blue-600 dark:text-blue-400 hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors"
          >
            Return to homepage
          </Link>
        </div>
      </div>
    );
  }

  return (
    <article className="bg-white dark:bg-gray-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">

        {/* Ad Banner - Only show if available */}
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
                className="max-w-full h-auto rounded-lg"
              />
            </a>
          </div>
        )}

        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors"
              aria-label="Home"
            >
              <Home size={20} />
            </Link>
            {breakingNews.category ? (
              <Link
                to={`/category/${breakingNews.category.slug}`}
                className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors"
              >
                <ArrowLeft size={20} />
                <span className="font-semibold">Back to {breakingNews.category.category_name}</span>
              </Link>
            ) : (
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors"
              >
                <ArrowLeft size={20} />
                <span className="font-semibold">Back to Home</span>
              </Link>
            )}
          </div>

          {/* Main Content */}
          <div className="mb-6">
            {/* Breaking News Badge with Category */}
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-block bg-red-600 text-white px-3 py-1 text-xs font-bold uppercase animate-pulse">
                🔴 BREAKING
              </span>
              {breakingNews.category && (
                <span className="inline-block bg-blue-600 dark:bg-blue-700 text-white px-3 py-1 text-sm font-bold uppercase">
                  {breakingNews.category.category_name}
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
              {breakingNews.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 pb-6 border-b border-gray-200 dark:border-gray-800">
            {breakingNews.tag && breakingNews.tag.length > 0 && (
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <User size={16} />
                  <span>
                    {breakingNews.tag.map((tag, idx) => (
                      <span key={tag.id}>
                        <Link
                          to={`/tag/${tag.slug}`}
                          className="inline-flex items-center    py-1   text-sm hover:text-blue-600 dark:hover:text-blue-600 transition-colors"
                        >
                          {tag.tag_name}
                        </Link>
                        {idx < (breakingNews.tag?.length || 0) - 1 && <span>, </span>}
                      </span>
                    ))}
                  </span>
                </div>
                 )}
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <Calendar size={16} />
                <span>{formatDate(breakingNews.date)}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <Eye size={16} /> 
                <span>{breakingNews.total_views.toLocaleString()} views</span>
              </div>
              <BreakingNewsLikeButton
                newsId={breakingNews.id}
                initialLiked={breakingNews.bookmark === 1}
                onLoginRequired={() => setShowLoginModal(true)}
              />
            </div>
          </div>

          <div className="relative w-full h-[250px] sm:h-[350px] md:h-[400px] lg:h-[500px] mb-6 sm:mb-8 overflow-hidden rounded-lg">
            <img
              src={breakingNews.image}
              alt={breakingNews.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Article Content */}
          <div 
            className="prose prose-lg dark:prose-invert max-w-none mb-12 dark:text-gray-300 dark:[&_a]:text-blue-400 dark:[&_strong]:text-white dark:[&_h1,&_h2,&_h3,&_h4,&_h5,&_h6]:text-white dark:[&_blockquote]:text-gray-400 dark:[&_code]:text-yellow-400 dark:[&_pre]:bg-gray-800 dark:[&_hr]:border-gray-700"
            dangerouslySetInnerHTML={{ __html: breakingNews.description }}
          />

          {/* Tags */}
          {/* {breakingNews.tag && breakingNews.tag.length > 0 && (
            <div className="border-t border-b border-gray-200 dark:border-gray-800 pt-8 pb-8">
              <div className="flex items-center gap-2">
                <Tag size={20} className="text-gray-600 dark:text-gray-400" />
                <h3 className="font-semibold text-gray-900 dark:text-white inline-flex items-center">
                  Tags :
                  <div className="flex flex-wrap gap-2 ml-2">
                    {breakingNews.tag.map((tag) => (
                      <Link
                        key={tag.id}
                        to={`/tag/${tag.slug}`}
                        className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors"
                      >
                        {tag.tag_name}
                      </Link>
                    ))}
                  </div>
                </h3>
              </div>
            </div>
          )} */}

          {/* Related Breaking News */}
          {relatedNews.length > 0 && (
            <div className="border-t border-gray-200 dark:border-gray-800 pt-8 sm:pt-12">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">More Breaking News</h2>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                {relatedNews.map((news) => (
                  <Link
                    key={news.id}
                    to={`/breaking/${news.slug}`}
                    className="group"
                  >
                    <div className="relative h-40 sm:h-48 bg-gray-200 dark:bg-gray-800 overflow-hidden mb-3 rounded-lg">
                      <img
                        src={news.image}
                        alt={news.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-yellow-500 dark:group-hover:text-yellow-400 transition-colors line-clamp-2">
                      {news.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                      {stripHtml(news.description)}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
