import { Menu, Search, Moon, Sun } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAvatar } from './UserAvatar';
import { apiClient } from '../lib/apiClient';

interface Category {
  id: number;
  category_name: string;
  slug: string;
  row_order: number;
}

interface BreakingNews {
  id: number;
  title: string;
  slug: string;
  image?: string;
  date?: string;
  description?: string;
}

interface NewsApiItem {
  id: number;
  title: string;
  slug: string;
  image: string;
  date: string;
  description: string;
  total_views: number;
  is_headline: boolean;
}

export function Header() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchExpanded, setSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : true;
  });
  const [newsHeadlines, setNewsHeadlines] = useState<BreakingNews[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  useEffect(() => {
    const fetchHeadlines = async () => {
      try {
        // Fetch breaking news from API
        const response = await apiClient.getBreakingNews({
          language_id: 1,
          offset: 0,
          limit: 15,
        });

        if (response.success && response.data?.data) {
          const headlines = response.data.data.map((news: NewsApiItem) => ({
            id: news.id,
            title: news.title,
            slug: news.slug,
          }));
          setNewsHeadlines(headlines);
        }
      } catch (error) {
        console.error('Error fetching breaking news:', error);
      }
    };

    fetchHeadlines();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await apiClient.getCategories({
          language_id: 1,
          offset: 0,
          limit: 15,
        });

        if (response.success && response.data?.data) {
          // Sort by row_order
          const sortedCategories = response.data.data.sort((a: Category, b: Category) => 
            a.row_order - b.row_order
          );
          setCategories(sortedCategories);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchExpanded(false);
      setSearchQuery('');
    }
  };

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 transition-colors">
      <div className="bg-blue-700 dark:bg-blue-900 text-white overflow-hidden w-full fixed top-0 left-0 right-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 sm:gap-6 flex-1 min-w-0">
            <span className="hidden md:block text-xs font-medium whitespace-nowrap flex-shrink-0">BREAKING NEWS</span>
            <div className="flex-1 min-w-0 overflow-hidden relative">
              {newsHeadlines.length > 0 ? (
                <div className="animate-scroll whitespace-nowrap">
                  {newsHeadlines.concat(newsHeadlines).map((headline, index) => (
                    <Link
                      key={`${headline.id}-${index}`}
                      to={`/story/${headline.slug}`}
                      className="text-white hover:text-yellow-400 mx-4 sm:mx-8 transition-colors inline-block"
                    >
                      {headline.title}
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-white/70 text-xs animate-pulse">
                  Loading breaking news...
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
            <button
              onClick={toggleDarkMode}
              className="hover:text-yellow-400 transition-colors pl-2 sm:pl-4"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun size={16} className="sm:w-[18px] sm:h-[18px]" /> : <Moon size={16} className="sm:w-[18px] sm:h-[18px]" />}
            </button>
            <UserAvatar />
          </div>
        </div>
      </div>

      <div className="pt-[44px]"></div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between py-4 gap-2">
          <div className={`flex items-center gap-2 sm:gap-8 min-w-0 transition-all duration-300 ${
            searchExpanded ? 'sm:flex hidden' : 'flex'
          }`}>
            <button
              className="lg:hidden flex-shrink-0 text-gray-900 dark:text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu size={24} />
            </button>

            <Link to="/" className="flex items-center min-w-0">
              <img src="/cvmtv-logo.png" alt="CVM Television" className="h-10 sm:h-12" />
            </Link>
          </div>

          <nav className="hidden lg:flex items-center gap-6 flex-1 justify-center">
            <Link to="/" className="text-sm font-semibold text-gray-900 dark:text-white hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors">
              HOME
            </Link>
            <Link to="https://now.cvmtv.com/" className="text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors">
              CVM LIVE
            </Link>
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/category/${category.slug}`}
                className="text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors"
              >
                {category.category_name.toUpperCase()}
              </Link>
            ))}
          </nav>

          <form onSubmit={handleSearch} className="flex items-center gap-2 flex-shrink-0 flex-1 sm:flex-initial justify-end">
            <input
              type="text"
              placeholder="Search stories, authors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`transition-all duration-300 ease-in-out bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                searchExpanded ? 'flex-1 sm:w-64 sm:flex-initial opacity-100' : 'w-0 opacity-0'
              }`}
              onFocus={() => setSearchExpanded(true)}
              onBlur={(e) => {
                if (!e.relatedTarget || !e.relatedTarget.classList.contains('search-button')) {
                  setTimeout(() => setSearchExpanded(false), 200);
                }
              }}
            />
            <button
              type="button"
              onClick={() => setSearchExpanded(!searchExpanded)}
              className="search-button p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors text-gray-900 dark:text-white flex-shrink-0"
            >
              <Search size={20} />
            </button>
          </form>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
          <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-3">
            <Link to="/" onClick={() => setMobileMenuOpen(false)} className="text-sm font-semibold text-gray-900 dark:text-white hover:text-yellow-500 dark:hover:text-yellow-400 py-2">
              HOME
            </Link>
            <Link to="/live" onClick={() => setMobileMenuOpen(false)} className="text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-yellow-500 dark:hover:text-yellow-400 py-2">
              CVM LIVE
            </Link>
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/category/${category.slug}`}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-yellow-500 dark:hover:text-yellow-400 py-2"
              >
                {category.category_name.toUpperCase()}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
