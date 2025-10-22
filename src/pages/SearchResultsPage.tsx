import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Calendar, Eye, ArrowLeft, Home } from 'lucide-react';
import { apiClient } from '../lib/apiClient';
import { StoryDetailSkeleton } from '../components/Skeleton';
import { LikeButton } from '../components/LikeButton';
import { useAuth } from '../context/AuthContext';

interface SearchResult {
  id: number;
  title: string;
  slug: string;
  image: string;
  date: string;
  description: string;
  total_views: number;
  total_like: number;
  total_bookmark: number;
  bookmark: number;
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

export function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(true);
  const { setShowLoginModal } = useAuth();

  useEffect(() => {
    const doSearch = async () => {
      if (!query) {
        setResults([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      window.scrollTo(0, 0);

      try {
        const response = await apiClient.searchNews({
          q: query,
          language_id: 1,
          limit: 20,
        });

        if (response.success && response.data?.data) {
          setResults(response.data.data);
        } else {
          setResults([]);
        }
      } catch (error) {
        console.error('Search error:', error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    doSearch();
  }, [query]);

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

  return (
    <main className="bg-white dark:bg-gray-950 min-h-screen transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
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

          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Search Results
          </h1>
          
          {query && (
            <div className="flex items-center gap-4 mb-6">
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                {results.length} result{results.length !== 1 ? 's' : ''} found for
              </p>
              <span className="text-gray-500 dark:text-gray-500">•</span>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Query: <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">{query}</code>
              </p>
            </div>
          )}
        </div>

        {results.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              No results found
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {query ? `No results found for "${query}". Try a different search term.` : 'Enter a search term to find stories.'}
            </p>
            <Link
              to="/"
              className="text-blue-600 dark:text-blue-400 hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors"
            >
              Return to homepage
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {results.map((article) => (
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
                        {article.category.category_name}
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
                    
                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                      <div className="flex items-center gap-2">
                        <Calendar size={16} />
                        <span>{formatDate(article.date)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Eye size={16} />
                        <span>{article.total_views.toLocaleString()}</span>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                      <LikeButton
                        newsId={article.id}
                        initialLiked={article.bookmark === 1}
                        initialLikeCount={article.total_bookmark}
                        onLoginRequired={() => setShowLoginModal(true)}
                      />
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
