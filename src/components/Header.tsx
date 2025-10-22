import { Menu, Search, Moon, Sun, ArrowRight } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { UserAvatar } from './UserAvatar';
import { apiClient } from '../lib/apiClient';
import { Link, useNavigate } from 'react-router-dom';

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

interface SearchResult {
  id: number;
  title: string;
  slug: string;
  image: string;
  date: string;
  description: string;
  total_views: number;
  category: {
    id: number;
    category_name: string;
    slug: string;
  };
}

export function Header() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchExpanded, setSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const searchDropdownRef = useRef<HTMLDivElement>(null);
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
      setShowSearchDropdown(false);
    }
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    console.log('Header: Search input changed:', value);
    setSearchQuery(value);
    setShowSearchDropdown(value.trim().length > 0);
    
    // Search for results when user types
    if (value.trim().length > 0) {
      console.log('Header: Triggering search for:', value.trim());
      searchNews(value.trim());
    } else {
      setSearchResults([]);
    }
  };

  const searchNews = async (query: string) => {
    console.log('Header: Starting search for:', query);
    setSearchLoading(true);
    setSearchError(null);
    
    try {
      const searchUrl = `https://cvmapi.cvmtv.com/api/get_news?offset=0&limit=5&id=&get_user_news=&search=${encodeURIComponent(query)}&language_id=1&category_id=&category_slug=&subcategory_id=&subcategory_slug=&slug=&tag_id=`;
      console.log('Header: Fetching from:', searchUrl);
      
      const response = await fetch(searchUrl, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });

      console.log('Header: Search API Response Status:', response.status);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Header: Search API Data:', data);

      // Handle the response - adjust based on actual API response structure
      if (data && Array.isArray(data)) {
        setSearchResults(data);
        console.log('Header: Found results:', data.length);
      } else if (data?.data && Array.isArray(data.data)) {
        setSearchResults(data.data);
        console.log('Header: Found results:', data.data.length);
      } else if (data?.results && Array.isArray(data.results)) {
        setSearchResults(data.results);
        console.log('Header: Found results:', data.results.length);
      } else {
        setSearchResults([]);
        console.log('Header: No results found');
      }
    } catch (err) {
      console.error('Header: Search error:', err);
      setSearchError('Failed to search news');
      setSearchResults([]);
    } finally {
      setSearchLoading(false);
    }
  };

  const handleSearchFocus = () => {
    setSearchExpanded(true);
    if (searchQuery.trim().length > 0) {
      setShowSearchDropdown(true);
    }
  };

  const handleSearchBlur = (e: React.FocusEvent) => {
    if (!e.relatedTarget || !e.relatedTarget.classList.contains('search-button')) {
      setTimeout(() => {
        setSearchExpanded(false);
        setShowSearchDropdown(false);
      }, 200);
    }
  };

  const handleResultClick = () => {
    console.log('Search result clicked, closing dropdown');
    setSearchExpanded(false);
    setSearchQuery('');
    setShowSearchDropdown(false);
  };

  const handleSearchResultClick = (result: SearchResult) => {
    console.log('Search result clicked:', result.title);
    console.log('Navigating to:', `/story/${result.slug}`);
    
    // Navigate immediately
    navigate(`/story/${result.slug}`);
    
    // Close dropdown after navigation
    setShowSearchDropdown(false);
    setSearchExpanded(false);
    setSearchQuery('');
  };

  // Handle click outside search dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchDropdownRef.current && !searchDropdownRef.current.contains(event.target as Node)) {
        // Don't close if clicking on search result buttons
        const target = event.target as HTMLElement;
        if (!target.closest('button[type="button"]') && !target.closest('.search-result-button')) {
          setTimeout(() => {
            setShowSearchDropdown(false);
          }, 200);
        }
      }
    };

    if (showSearchDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showSearchDropdown]);

  const stripHtml = (html: string) => {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
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
                      to={`/breaking/${headline.slug}`}
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

          <div className="relative flex items-center gap-2 flex-shrink-0 flex-1 sm:flex-initial justify-end">
            <form onSubmit={handleSearch} className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Search stories, authors..."
                value={searchQuery}
                onChange={handleSearchInputChange}
                onFocus={handleSearchFocus}
                onBlur={handleSearchBlur}
                className={`transition-all duration-300 ease-in-out bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  searchExpanded ? 'flex-1 sm:w-64 sm:flex-initial opacity-100' : 'w-0 opacity-0'
                }`}
              />
              <button
                type="button"
                onClick={() => setSearchExpanded(!searchExpanded)}
                className="search-button p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors text-gray-900 dark:text-white flex-shrink-0"
              >
                <Search size={20} />
              </button>
            </form>
            
            { searchExpanded && (
              <div
                ref={searchDropdownRef}
                className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-2xl z-50 max-h-[300px] overflow-y-auto w-full min-w-[400px] max-w-[600px]"
              >
                {searchLoading ? (
                  <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                    <div className="flex flex-col items-center justify-center gap-3">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                      <span className="text-sm font-medium">Searching for "{searchQuery}"...</span>
                    </div>
                  </div>
                ) : searchError ? (
                  <div className="p-8 text-center text-red-500">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
                        <span className="text-red-600 dark:text-red-400 text-xl">!</span>
                      </div>
                      <p className="font-medium">{searchError}</p>
                    </div>
                  </div>
                ) : searchResults.length === 0 ? (
                  <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                        <Search size={24} className="opacity-50" />
                      </div>
                      <p className="font-medium">No results found for "{searchQuery}"</p>
                      <p className="text-xs">Try a different search term</p>
                    </div>
                  </div>
                ) : (
                  <div className="py-1">
                    <div className="px-6 py-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-b border-gray-200 dark:border-gray-700">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-bold text-blue-700 dark:text-blue-300 uppercase tracking-wide">
                          Search Results ({searchResults.length})
                        </h3>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          Click to view article
                        </div>
                      </div>
                    </div>
                    <div className='p-4'>
                    {searchResults.map((result) => (
                      <Link
                        key={result.id}
                        to={`/story/${result.slug}`}
                        className="w-full text-left p-6 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 dark:hover:from-blue-900/10 dark:hover:to-indigo-900/10 transition-all duration-300 border-b border-gray-100 dark:border-gray-800 last:border-b-0 group cursor-pointer hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 search-result-button"
                         
                      >
                        <div className="flex gap-4">
                          <div className="flex-shrink-0 w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-xl overflow-hidden shadow-md">
                            <img
                              src={result.image}
                              alt={result.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 cursor-pointer"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-base font-bold text-gray-900 dark:text-white line-clamp-2 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight">
                              {result.title}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3 leading-relaxed">
                              {stripHtml(result.description)}
                            </p>
                            <div className="flex items-center justify-between">
                            
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-gray-400 dark:text-gray-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                  View Article
                                </span>
                                <ArrowRight size={16} className="text-gray-400 dark:text-gray-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors group-hover:translate-x-1" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                    {searchResults.length > 0 && (
                      <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-900/20 border-t border-gray-200 dark:border-gray-700">
                        <Link
                          to={`/search?search=${encodeURIComponent(searchQuery)}`}
                          onClick={handleResultClick}
                          className="block text-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-bold py-2 px-4 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-all duration-300"
                        >
                          View all {searchResults.length} results for "{searchQuery}" →
                        </Link>
                      </div>
                    )}
                    </div>
                  </div>
                )}
              </div>
              )}
          </div>
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
