import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { searchStories, Story } from '../data/stories';
import { FavoriteButton } from '../components/FavoriteButton';
import { useAuth } from '../context/AuthContext';

export function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const { setShowLoginModal } = useAuth();

  useEffect(() => {
    const doSearch = () => {
      if (!query) {
        setStories([]);
        setLoading(false);
        return;
      }

      setLoading(true);

      const data = searchStories(query);
      setStories(data);

      setLoading(false);
    };

    doSearch();
  }, [query]);

  const formatDate = (dateString: string) => {
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
    <main className="bg-white dark:bg-gray-950 min-h-screen transition-colors">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Search Results
          </h1>
          {query && (
            <p className="text-gray-600 dark:text-gray-400">
              Showing results for: <span className="font-semibold">{query}</span>
            </p>
          )}
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">Searching...</p>
          </div>
        ) : stories.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">
              {query ? 'No results found. Try a different search term.' : 'Enter a search term to find stories.'}
            </p>
          </div>
        ) : (
          <>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Found {stories.length} result{stories.length !== 1 ? 's' : ''}
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {stories.map((story) => (
                <div key={story.id} className="group">
                  <Link to={`/story/${story.slug}`} className="block">
                    <div className="relative h-48 bg-gray-200 dark:bg-gray-800 overflow-hidden mb-4 rounded-lg">
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
                    <div className="mb-2">
                      <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                        {story.category}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-yellow-500 dark:group-hover:text-yellow-400 transition-colors leading-tight">
                      {story.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                      {story.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-sm">
                      <Link
                        to={`/author/${encodeURIComponent(story.author)}`}
                        className="text-gray-700 dark:text-gray-300 hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        By {story.author}
                      </Link>
                      <span className="text-gray-500 dark:text-gray-400">
                        {formatDate(story.created_at)}
                      </span>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
