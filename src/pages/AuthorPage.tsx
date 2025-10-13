import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { User, Calendar, Eye } from 'lucide-react';
import { getStories, Story } from '../data/stories';

export function AuthorPage() {
  const { author } = useParams<{ author: string }>();
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    function fetchAuthorStories() {
      if (!author) return;

      setLoading(true);

      const decodedAuthor = decodeURIComponent(author);

      const data = getStories({ author: decodedAuthor, orderBy: 'published_at' });
      setStories(data || []);

      setLoading(false);
    }

    fetchAuthorStories();
  }, [author]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center">
        <div className="text-center text-gray-600 dark:text-gray-400">Loading...</div>
      </div>
    );
  }

  const authorName = author ? decodeURIComponent(author) : 'Unknown Author';

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors">
      <div className="py-16 transition-colors">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-4 rounded-full border-2 border-gray-300 dark:border-gray-700">
              <User className="text-gray-900 dark:text-white" size={32} />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">{authorName}</h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 mt-2">
                {stories.length} {stories.length === 1 ? 'Story' : 'Stories'} Published
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {stories.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400 text-lg">No stories found by this author.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {stories.map((story) => (
              <Link
                key={story.id}
                to={`/story/${story.slug}`}
                className="group bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={story.image_url}
                    alt={story.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-blue-600 dark:bg-blue-700 text-white px-3 py-1 text-xs font-bold uppercase">
                      {story.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-yellow-500 dark:group-hover:text-yellow-400 transition-colors">
                    {story.title}
                  </h2>

                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                    {story.excerpt}
                  </p>

                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 pt-4 border-t border-gray-200 dark:border-gray-700">
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
        )}
      </div>
    </div>
  );
}
