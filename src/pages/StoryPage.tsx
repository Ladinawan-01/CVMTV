import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Eye, ArrowLeft, Home, Tag , User } from 'lucide-react';
import { apiClient } from '../lib/apiClient';
import { StoryDetailSkeleton } from '../components/Skeleton';
import { LikeButton } from '../components/LikeButton';
import { useAuth } from '../context/AuthContext';

interface StoryDetail {
  id: number;
  title: string;
  slug: string;
  image: string;
  date: string;
  published_date: string;
  description: string;
  total_views: number;
  total_like: number;
  like: number; // 0 or 1 - indicates if current user liked
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

export function StoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const { setShowLoginModal } = useAuth();
  const [story, setStory] = useState<StoryDetail | null>(null);
  const [relatedStories, setRelatedStories] = useState<StoryDetail[]>([]);
  const [adSpace, setAdSpace] = useState<AdSpace | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStory = async () => {
      if (!slug) return;

      console.log('StoryPage: Fetching story for slug:', slug);
      setLoading(true);
      window.scrollTo(0, 0);

      try {
        // Fetch article by slug
        const response = await apiClient.getNewsBySlug({
          slug: slug,
          language_id: 1,
        });

        if (response.success && response.data?.data && response.data.data.length > 0) {
          const articleData = response.data.data[0];
          setStory(articleData);

          // Set ad space if available
          if (response.data.ad_spaces) {
            setAdSpace(response.data.ad_spaces);
          }

          // Fetch related articles from same category
          if (articleData.category) {
            const relatedResponse = await apiClient.getNewsByCategory({
              category_slug: articleData.category.slug,
              language_id: 1,
              offset: 0,
              limit: 4,
            });

            if (relatedResponse.success && relatedResponse.data?.data) {
              const related = relatedResponse.data.data
                .filter((s: StoryDetail) => s.slug !== slug)
                .slice(0, 3);
              setRelatedStories(related);
              
              // If no ad space from news detail, try from category
              if (!response.data.ad_spaces && relatedResponse.data.ad_spaces) {
                setAdSpace(relatedResponse.data.ad_spaces);
              }
            }
          }
        }
      } catch (error) {
        console.error('Error fetching story:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStory();
  }, [slug]);

  if (loading) {
    return <StoryDetailSkeleton />;
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
          <Link
            to={`/category/${story.category.slug}`}
            className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="font-semibold">Back to {story.category.category_name}</span>
          </Link>
        </div>
          {/* Main Content */}
            <div className="mb-6">
              <span className="inline-block bg-blue-600 dark:bg-blue-700 text-white px-3 py-1 text-sm font-bold uppercase mb-4">
                {story.category.category_name}
              </span>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                {story.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 pb-6 border-b border-gray-200 dark:border-gray-800">
              {story.tag && story.tag.length > 0 && (
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <User size={16} />
                  <span>
                    {story.tag.map((tag, idx) => (
                      <span key={tag.id}>
                        <Link
                          to={`/tag/${tag.slug}`}
                          className="inline-flex items-center    py-1   text-sm hover:text-blue-600 dark:hover:text-blue-600 transition-colors"
                        >
                          {tag.tag_name}
                        </Link>
                        {idx < story.tag.length - 1 && <span>, </span>}
                      </span>
                    ))}
                  </span>
                </div>
                 )}
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <Calendar size={16} />
                  <span>{formatDate(story.date)}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <Eye size={16} />
                  <span>{story.total_views.toLocaleString()} views</span>
                </div>
                <LikeButton
                  newsId={story.id}
                  initialLiked={story.like === 1}
                  initialLikeCount={story.total_like}
                  onLoginRequired={() => setShowLoginModal(true)}
                />
              </div>
            </div>

            <div className="relative w-full h-[250px] sm:h-[350px] md:h-[400px] lg:h-[500px] mb-6 sm:mb-8 overflow-hidden rounded-lg">
              <img
                src={story.image}
                alt={story.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Article Content */}
            <div 
              className="prose prose-lg dark:prose-invert max-w-none mb-12 dark:text-gray-300 dark:[&_a]:text-blue-400 dark:[&_strong]:text-white dark:[&_h1,&_h2,&_h3,&_h4,&_h5,&_h6]:text-white dark:[&_blockquote]:text-gray-400 dark:[&_code]:text-yellow-400 dark:[&_pre]:bg-gray-800 dark:[&_hr]:border-gray-700"
              dangerouslySetInnerHTML={{ __html: story.description }}
            />

            {/* Tags */}
            {/* {story.tag && story.tag.length > 0 && (
              <div className="border-t border-b border-gray-200 dark:border-gray-800 pt-8 pb-8">
                <div className="flex items-center gap-2">
                  <Tag size={20} className="text-gray-600 dark:text-gray-400" />
                  <h3 className="font-semibold text-gray-900 dark:text-white inline-flex items-center">
                    Tags :
                    <div className="flex flex-wrap gap-2 ml-2">
                      {story.tag.map((tag) => (
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

            {/* Related Stories */}
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
                          src={relatedStory.image}
                          alt={relatedStory.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-yellow-500 dark:group-hover:text-yellow-400 transition-colors line-clamp-2">
                        {relatedStory.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                        {stripHtml(relatedStory.description)}
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
