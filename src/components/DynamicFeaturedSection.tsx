import { Link } from 'react-router-dom';
import { Eye } from 'lucide-react';
import { FeaturedSection } from '../types/api';
import { FavoriteButton } from './FavoriteButton';
import { useAuth } from '../context/AuthContext';

interface DynamicFeaturedSectionProps {
  section: FeaturedSection;
}

export function DynamicFeaturedSection({ section }: DynamicFeaturedSectionProps) {
  const { setShowLoginModal } = useAuth();

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

  const stripHtml = (html: string) => {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  // Render different layouts based on style_web
  const renderContent = () => {
    switch (section.style_web) {
      case 'style_1':
        return renderStyle1();
      case 'style_2':
        return renderStyle2();
      case 'style_3':
        return renderStyle3();
      case 'style_5':
        return renderStyle5();
      default:
        return renderStyle2(); // Default to style_2
    }
  };

  // Style 1: Latest News & Trending (2 columns)
  const renderStyle1 = () => {
    const latestStories = section.news.slice(0, 4);
    const trendingStories = section.news.slice(0, 8);

    return (
      <section className="bg-white dark:bg-gray-950 py-8 sm:py-12 border-t border-gray-200 dark:border-gray-800 transition-colors overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
          {/* Advertisement Banner */}
          {section.ad_spaces.length > 0 && (
            <div className="mb-6 sm:mb-8 flex justify-center">
              <a href={section.ad_spaces[0].ad_url} target="_blank" rel="noopener noreferrer">
                <img
                  src={section.ad_spaces[0].web_ad_image || section.ad_spaces[0].ad_image}
                  alt="Advertisement"
                  className="max-w-full h-auto"
                />
              </a>
            </div>
          )}

          <div className="grid lg:grid-cols-3 gap-6 sm:gap-8 w-full">
            {/* Latest News Section */}
            <div className="lg:col-span-2">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 pb-3 border-b-2 border-gray-900 dark:border-white uppercase">
                {section.title}
              </h3>
              <div className="space-y-4 sm:space-y-6">
                {latestStories.map((story) => (
                  <Link key={story.slug} to={`/story/${story.slug}`} className="group cursor-pointer flex flex-col sm:flex-row gap-3 sm:gap-4 pb-4 sm:pb-6 border-b border-gray-200 dark:border-gray-800 last:border-b-0">
                    <div className="relative w-full sm:w-56 h-48 sm:h-36 flex-shrink-0 bg-gray-200 dark:bg-gray-800 overflow-hidden rounded-lg">
                      <FavoriteButton
                        storyId={story.slug}
                        onLoginRequired={() => setShowLoginModal(true)}
                        newsId={story.id}
                        favorited={story.bookmark === 1}
                      />
                      <img
                        src={story.image}
                        alt={story.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="flex-1">
                      <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase">
                        {story.category_name}
                      </span>
                      <h4 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mt-2 mb-2 group-hover:text-yellow-500 dark:group-hover:text-yellow-400 transition-colors">
                        {story.title}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-2 line-clamp-2">
                        {stripHtml(story.description)}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                        <span>{formatTimeAgo(story.date)}</span>
                        <div className="flex items-center gap-1">
                          <Eye size={12} />
                          <span>{story.total_views.toLocaleString()} views</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Trending Section */}
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 pb-3 border-b-2 border-gray-900 dark:border-white uppercase">
                TRENDING
              </h3>
              <div className="space-y-4">
                {trendingStories.map((story, idx) => (
                  <Link key={story.slug} to={`/story/${story.slug}`} className="group cursor-pointer flex gap-3">
                    <span className="text-2xl font-bold text-gray-300 dark:text-gray-700 flex-shrink-0">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-yellow-500 dark:group-hover:text-yellow-400 transition-colors leading-tight mb-1">
                        {story.title}
                      </h4>
                      <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                        <Eye size={12} />
                        <span>{story.total_views.toLocaleString()} views</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };

  // Style 2: Grid Layout (3 columns)
  const renderStyle2 = () => {
    return (
      <section className="bg-gray-50 dark:bg-gray-900 py-8 sm:py-12 transition-colors overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
          <div className="mb-6">
            <h3 className={`text-xl sm:text-2xl font-bold mb-4 pb-2 border-b-2 uppercase`}
              style={{ color: section.color || '#2563eb', borderColor: section.color || '#2563eb' }}>
              {section.title}
            </h3>
          </div>
          
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 w-full">
            {section.news.slice(0, 3).map((story) => (
              <div key={story.id}>
                <div className="space-y-6">
                  <Link to={`/story/${story.slug}`} className="group cursor-pointer block">
                    <div className="relative h-40 sm:h-48 bg-gray-200 dark:bg-gray-800 overflow-hidden mb-3 rounded-lg">
                      <FavoriteButton
                        storyId={story.slug}
                        onLoginRequired={() => setShowLoginModal(true)}
                        newsId={story.id}
                        favorited={story.bookmark === 1}
                      />
                      <img
                        src={story.image}
                        alt={story.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <h4 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-yellow-500 dark:group-hover:text-yellow-400 transition-colors leading-tight">
                      {story.title}
                    </h4>
                    <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                      <span>{formatTimeAgo(story.date)}</span>
                      <div className="flex items-center gap-1">
                        <Eye size={12} />
                        <span>{story.total_views.toLocaleString()} views</span>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  // Style 3: Most Viewed Articles
  const renderStyle3 = () => {
    const sortedNews = [...section.news].sort((a, b) => (b.viewcount || b.total_views) - (a.viewcount || a.total_views));
    
    return (
      <section className="bg-white dark:bg-gray-950 py-8 sm:py-12 border-t border-gray-200 dark:border-gray-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-6 uppercase"
            style={{ color: section.color || undefined }}>
            {section.title}
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedNews.slice(0, 6).map((story) => (
              <Link key={story.slug} to={`/story/${story.slug}`} className="group">
                <div className="relative h-48 bg-gray-200 dark:bg-gray-800 overflow-hidden rounded-lg mb-3">
                  <FavoriteButton
                    storyId={story.slug}
                    onLoginRequired={() => setShowLoginModal(true)}
                    newsId={story.id}
                    favorited={story.bookmark === 1}
                  />
                  <img
                    src={story.image}
                    alt={story.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h4 className="font-bold text-gray-900 dark:text-white mb-2 group-hover:text-yellow-500 transition-colors">
                  {story.title}
                </h4>
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <Eye size={14} />
                  <span>{(story.viewcount || story.total_views).toLocaleString()} views</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    );
  };

  // Style 5: Large Cards Layout
  const renderStyle5 = () => {
    return (
      <section className="py-8 sm:py-12 transition-colors"
        style={{ backgroundColor: section.color ? `${section.color}10` : undefined }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h3 className="text-xl sm:text-2xl font-bold mb-6 uppercase"
            style={{ color: section.color || undefined }}>
            {section.title}
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            {section.news.slice(0, 4).map((story) => (
              <Link key={story.slug} to={`/story/${story.slug}`} className="group">
                <div className="relative h-64 bg-gray-200 dark:bg-gray-800 overflow-hidden rounded-lg mb-4">
                  <FavoriteButton
                    storyId={story.slug}
                    onLoginRequired={() => setShowLoginModal(true)}
                    newsId={story.id}
                    favorited={story.bookmark === 1}
                  />
                  <img
                    src={story.image}
                    alt={story.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <span className="text-xs font-bold uppercase mb-2 inline-block">
                      {story.category_name}
                    </span>
                    <h4 className="text-xl font-bold mb-2 group-hover:text-yellow-400 transition-colors">
                      {story.title}
                    </h4>
                    <div className="flex items-center gap-3 text-xs">
                      <span>{formatTimeAgo(story.date)}</span>
                      <div className="flex items-center gap-1">
                        <Eye size={12} />
                        <span>{story.total_views.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    );
  };

  // Don't render if no news
  if (!section.news || section.news.length === 0) {
    return null;
  }

  return renderContent();
}

