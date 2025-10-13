import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, User, Eye, ArrowLeft, Home } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Story {
  id: string;
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  image_url: string;
  author: string;
  published_at: string;
  views: number;
}

export function StoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const [story, setStory] = useState<Story | null>(null);
  const [relatedStories, setRelatedStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStory() {
      if (!slug) return;

      setLoading(true);

      const { data: storyData, error: storyError } = await supabase
        .from('stories')
        .select('*')
        .eq('slug', slug)
        .maybeSingle();

      if (storyError) {
        console.error('Error fetching story:', storyError);
        setLoading(false);
        return;
      }

      if (storyData) {
        await supabase
          .from('stories')
          .update({ views: (storyData.views || 0) + 1 })
          .eq('slug', slug);

        setStory({ ...storyData, views: (storyData.views || 0) + 1 });

        const { data: relatedData } = await supabase
          .from('stories')
          .select('*')
          .eq('category', storyData.category)
          .neq('slug', slug)
          .limit(3);

        if (relatedData) {
          setRelatedStories(relatedData);
        }
      }

      setLoading(false);
      window.scrollTo(0, 0);
    }

    fetchStory();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center">
        <div className="text-center text-gray-600 dark:text-gray-400">Loading...</div>
      </div>
    );
  }

  if (!story) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Story not found</h2>
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="flex items-center gap-4 mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors"
            aria-label="Home"
          >
            <Home size={20} />
          </Link>
          <Link
            to={`/category/${story.category.toLowerCase()}`}
            className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="font-semibold">Back to {story.category}</span>
          </Link>
        </div>

        <div className="mb-6">
          <span className="inline-block bg-blue-600 dark:bg-blue-700 text-white px-3 py-1 text-sm font-bold uppercase mb-4">
            {story.category}
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
            {story.title}
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-6">{story.excerpt}</p>

          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400 pb-6 border-b border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-2">
              <User size={16} />
              <Link
                to={`/author/${encodeURIComponent(story.author)}`}
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {story.author}
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              <span>{new Date(story.published_at).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <Eye size={16} />
              <span>{story.views.toLocaleString()} views</span>
            </div>
          </div>
        </div>

        <div className="relative w-full h-[250px] sm:h-[350px] md:h-[400px] lg:h-[500px] mb-6 sm:mb-8 overflow-hidden rounded-lg">
          <img
            src={story.image_url}
            alt={story.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
          {story.content.split('\n\n').map((paragraph, index) => (
            <p key={index} className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>

        {relatedStories.length > 0 && (
          <div className="border-t border-gray-200 dark:border-gray-800 pt-8 sm:pt-12">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">Related Stories</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              {relatedStories.map((relatedStory) => (
                <Link
                  key={relatedStory.slug}
                  to={`/story/${relatedStory.slug}`}
                  className="group"
                >
                  <div className="relative h-40 sm:h-48 bg-gray-200 dark:bg-gray-800 overflow-hidden mb-3 rounded-lg">
                    <img
                      src={relatedStory.image_url}
                      alt={relatedStory.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-yellow-500 dark:group-hover:text-yellow-400 transition-colors line-clamp-2">
                    {relatedStory.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                    {relatedStory.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
