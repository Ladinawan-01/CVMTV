import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Calendar, User, Eye } from 'lucide-react';

interface Story {
  id: string;
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  image_url: string;
  author: string;
  published_at: string;
  views: number;
}

const CATEGORY_MAPPING: Record<string, string> = {
  'sports': 'Sports',
  'business': 'Business',
  'politics': 'Politics',
  'news': 'News',
  'entertainment': 'Entertainment'
};

const STORIES_PER_PAGE = 9;

export function CategoryPage() {
  const { category } = useParams<{ category: string }>();
  const [stories, setStories] = useState<Story[]>([]);
  const [displayedStories, setDisplayedStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentCount, setCurrentCount] = useState(STORIES_PER_PAGE);

  useEffect(() => {
    async function fetchStories() {
      if (!category) return;

      setLoading(true);
      const categoryName = CATEGORY_MAPPING[category] || category;

      const { data, error } = await supabase
        .from('stories')
        .select('*')
        .eq('category', categoryName)
        .order('published_at', { ascending: false });

      if (error) {
        console.error('Error fetching stories:', error);
      } else {
        setStories(data || []);
        setDisplayedStories((data || []).slice(0, STORIES_PER_PAGE));
        setCurrentCount(STORIES_PER_PAGE);
      }
      setLoading(false);
    }

    fetchStories();
  }, [category]);

  const loadMore = () => {
    const newCount = currentCount + STORIES_PER_PAGE;
    setDisplayedStories(stories.slice(0, newCount));
    setCurrentCount(newCount);
  };

  const hasMore = currentCount < stories.length;

  const categoryTitle = category ? CATEGORY_MAPPING[category] || category.charAt(0).toUpperCase() + category.slice(1) : '';

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center text-gray-600 dark:text-gray-400">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-6 sm:py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">{categoryTitle}</h1>
          <p className="text-gray-600 dark:text-gray-400">
            {stories.length} {stories.length === 1 ? 'story' : 'stories'} found
          </p>
        </div>

        {stories.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">No stories found in this category.</p>
          </div>
        ) : (
          <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {displayedStories.map((story) => (
                <Link
                  key={story.id}
                  to={`/story/${story.slug}`}
                  className="group bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={story.image_url}
                      alt={story.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4 sm:p-6">
                    <div className="flex items-center gap-2 mb-2 sm:mb-3">
                      <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                        {story.category}
                      </span>
                    </div>
                    <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                      {story.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                      {story.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-500">
                      <div className="flex items-center gap-1">
                        <User size={14} />
                        <span>{story.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        <span>{new Date(story.published_at).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye size={14} />
                        <span>{story.views.toLocaleString()}</span>
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
                  className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
                >
                  Load More
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
