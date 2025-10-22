import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Eye, ArrowLeft, Home, Tag } from 'lucide-react';
import { apiClient } from '../lib/apiClient';
import { StoryDetailSkeleton } from '../components/Skeleton';

interface NewsItem {
  id: number;
  title: string;
  slug: string;
  image: string;
  date: string;
  published_date: string;
  description: string;
  total_views: number;
  total_like: number;
  like: number;
  category: {
    id: number;
    category_name: string;
    slug: string;
  };
  tag: Array<{
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

export function TagPage() {
  const { tag } = useParams<{ tag: string }>();
  const [news, setNews] = useState<NewsItem[]>([]);
  const [adSpace, setAdSpace] = useState<AdSpace | null>(null);
  const [loading, setLoading] = useState(true);
  const [tagName, setTagName] = useState<string>('');

  useEffect(() => {
    const fetchNewsByTag = async () => {
      if (!tag) return;

      setLoading(true);
      window.scrollTo(0, 0);

      try {
        const response = await apiClient.getNewsByTag({
          tag_slug: tag,
          language_id: 1,
        });

        if (response.success && response.data?.data) {
          setNews(response.data.data);
          
          // Set tag name from first article if available
          if (response.data.data.length > 0 && response.data.data[0].tag?.length > 0) {
            setTagName(response.data.data[0].tag[0].tag_name);
          }

          // Set ad space if available
          if (response.data.ad_spaces) {
            setAdSpace(response.data.ad_spaces);
          }
        }
      } catch (error) {
        console.error('Error fetching news by tag:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNewsByTag();
  }, [tag]);

  if (loading) {
    return <StoryDetailSkeleton />;
  }

  if (!news || news.length === 0) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            No news found for author "{tag}"
          </h2>
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

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        
        {/* Ad Banner - Only show if available */}
        {/* {adSpace && (
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
        )} */}

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors"
              aria-label="Home"
            >
              <Home size={20} />
            </Link>
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors"
            >
              <ArrowLeft size={20} />
              <span className="font-semibold">Back to Home</span>
            </Link>
          </div>

          <div className="flex items-center gap-3 mb-4">
            <Tag size={24} className="text-blue-600 dark:text-blue-400" />
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
              Author: {tagName || tag}
            </h1>
          </div>
          
          <div className="flex items-center gap-4 mb-6">
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              {news.length} article{news.length !== 1 ? 's' : ''} found
            </p>
            <span className="text-gray-500 dark:text-gray-500">•</span>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Author slug: <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">{tag}</code>
            </p>
          </div>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {news.map((article) => (
            <article
              key={article.id}
              className="bg-white dark:bg-gray-900 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group"
            >
              <Link to={`/story/${article.slug}`} className="block">
                <div className="relative h-48 sm:h-56 overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="inline-block bg-blue-600 dark:bg-blue-700 text-white px-3 py-1 text-sm font-bold uppercase">
                      {article.tag[0].tag_name}
                    </span>
                  </div>
                </div>
                
                <div className="p-4 sm:p-6">
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-yellow-500 dark:group-hover:text-yellow-400 transition-colors line-clamp-2">
                    {article.title}
                  </h2>
                  
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                    {stripHtml(article.description)}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} />
                      <span>{formatDate(article.date)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Eye size={16} />
                      <span>{article.total_views.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>

        {/* Load More Button (if needed in future) */}
        {news.length > 0 && (
          <div className="mt-12 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              Showing {news.length} article{news.length !== 1 ? 's' : ''} for author "{tagName || tag}"
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
