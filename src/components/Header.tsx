import { Menu, Search, Moon, Sun } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { UserAvatar } from './UserAvatar';

export function Header() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchExpanded, setSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : true;
  });
  const [newsHeadlines, setNewsHeadlines] = useState<Array<{ title: string; slug: string }>>([]);

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
      const { data } = await supabase
        .from('stories')
        .select('title, slug')
        .order('created_at', { ascending: false })
        .limit(10);

      if (data) {
        setNewsHeadlines(data);
      }
    };

    fetchHeadlines();
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
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 transition-colors">
      <div className="bg-blue-700 dark:bg-blue-900 text-white overflow-hidden w-full">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 sm:gap-6 flex-1 min-w-0">
            <span className="hidden md:block text-xs font-medium whitespace-nowrap flex-shrink-0">BREAKING NEWS</span>
            <div className="flex-1 min-w-0 overflow-hidden relative">
              <div className="animate-scroll whitespace-nowrap">
                {newsHeadlines.concat(newsHeadlines).map((headline, index) => (
                  <Link
                    key={index}
                    to={`/story/${headline.slug}`}
                    className="text-white hover:text-yellow-400 mx-4 sm:mx-8 transition-colors inline-block"
                  >
                    {headline.title}
                  </Link>
                ))}
              </div>
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
            <Link to="/live" className="text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors">
              CVM LIVE
            </Link>
            <Link to="/category/sports" className="text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors">
              SPORTS
            </Link>
            <Link to="/category/business" className="text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors">
              BUSINESS NEWS
            </Link>
            <Link to="/category/politics" className="text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors">
              POLITICS
            </Link>
            <Link to="/category/news" className="text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors">
              NEWS
            </Link>
            <Link to="/category/entertainment" className="text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors">
              ENTERTAINMENT
            </Link>
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
            <Link to="/category/sports" onClick={() => setMobileMenuOpen(false)} className="text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-yellow-500 dark:hover:text-yellow-400 py-2">
              SPORTS
            </Link>
            <Link to="/category/business" onClick={() => setMobileMenuOpen(false)} className="text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-yellow-500 dark:hover:text-yellow-400 py-2">
              BUSINESS NEWS
            </Link>
            <Link to="/category/politics" onClick={() => setMobileMenuOpen(false)} className="text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-yellow-500 dark:hover:text-yellow-400 py-2">
              POLITICS
            </Link>
            <Link to="/category/news" onClick={() => setMobileMenuOpen(false)} className="text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-yellow-500 dark:hover:text-yellow-400 py-2">
              NEWS
            </Link>
            <Link to="/category/entertainment" onClick={() => setMobileMenuOpen(false)} className="text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-yellow-500 dark:hover:text-yellow-400 py-2">
              ENTERTAINMENT
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
