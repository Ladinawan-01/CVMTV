import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Eye } from 'lucide-react';
import { apiClient } from '../lib/apiClient';
import { CategoryPageSkeleton } from '../components/Skeleton';

interface NewsItem {
  id: number;
  title: string;
  slug: string;
  image: string;
  date: string;
  published_date: string;
  description: string;
  total_views: number;
  category: {
    id: number;
    category_name: string;
    slug: string;
  };
}

const STORIES_PER_PAGE = 20;

export function CategoryPage() {
  const { category } = useParams<{ category: string }>();
  const [stories, setStories] = useState<NewsItem[]>([]);
  const [categoryInfo, setCategoryInfo] = useState<{ name: string; total: number }>({ name: '', total: 0 });
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchStories = async () => {
      if (!category) return;

      setLoading(true);
      setOffset(0);
      setStories([]);
      
      try {
        const response = await apiClient.getNewsByCategory({
          category_slug: category,
          language_id: 1,
          offset: 0,
          limit: STORIES_PER_PAGE,
        });

        if (response.success && response.data?.data) {
          const newsData = response.data.data;
          setStories(newsData);
          setCategoryInfo({
            name: newsData[0]?.category?.category_name || category,
            total: response.data.total || 0,
          });
          setHasMore(newsData.length === STORIES_PER_PAGE && response.data.total > STORIES_PER_PAGE);
        }
      } catch (error) {
        console.error('Error fetching category news:', error);
        setStories([]);
        setCategoryInfo({ name: category, total: 0 });
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, [category]);

  const loadMore = async () => {
    if (!category || loadingMore) return;

    setLoadingMore(true);
    const newOffset = offset + STORIES_PER_PAGE;

    try {
      const response = await apiClient.getNewsByCategory({
        category_slug: category,
        language_id: 1,
        offset: newOffset,
        limit: STORIES_PER_PAGE,
      });

      if (response.success && response.data?.data) {
        const newStories = response.data.data;
        setStories([...stories, ...newStories]);
        setOffset(newOffset);
        setHasMore(newStories.length === STORIES_PER_PAGE && stories.length + newStories.length < response.data.total);
      }
    } catch (error) {
      console.error('Error loading more stories:', error);
    } finally {
      setLoadingMore(false);
    }
  };

  const stripHtml = (html: string) => {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 py-6 sm:py-12 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-6 sm:mb-8">
            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-48 mb-2 animate-pulse" />
            <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-32 animate-pulse" />
          </div>
          <CategoryPageSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-6 sm:py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            {categoryInfo.name || (category ? category.charAt(0).toUpperCase() + category.slice(1) : '')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {categoryInfo.total} {categoryInfo.total === 1 ? 'story' : 'stories'} found
          </p>
        </div>

        {stories.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">No stories found in this category.</p>
          </div>
        ) : (
          <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {stories.map((story) => (
                <Link
                  key={story.id}
                  to={`/story/${story.slug}`}
                  className="group bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={story.image}
                      alt={story.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4 sm:p-6">
                    <div className="flex items-center gap-2 mb-2 sm:mb-3">
                      <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                        {story.category.category_name}
                      </span>
                    </div>
                    <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                      {story.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                      {stripHtml(story.description)}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        <span>{formatDate(story.date)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye size={14} />
                        <span>{story.total_views.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {hasMore && (
              <div className="mt-8 text-center">
                <button
                  onClick={loadMore}
                  disabled={loadingMore}
                  className="px-8 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg disabled:cursor-not-allowed"
                >
                  {loadingMore ? 'Loading...' : 'Load More'}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
