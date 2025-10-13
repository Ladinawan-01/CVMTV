import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Home, Radio, TrendingUp, Briefcase, Landmark, Newspaper, Film } from 'lucide-react';

export function QuickActionsMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Radio, label: 'CVM Live', path: '/live' },
    { icon: TrendingUp, label: 'Sports', path: '/category/sports' },
    { icon: Briefcase, label: 'Business News', path: '/category/business' },
    { icon: Landmark, label: 'Politics', path: '/category/politics' },
    { icon: Newspaper, label: 'News', path: '/category/news' },
    { icon: Film, label: 'Entertainment', path: '/category/entertainment' },
  ];

  return (
    <>
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-green-600 hover:bg-green-700 text-white rounded-full p-3 sm:p-4 shadow-lg transition-all duration-300 transform hover:scale-110"
          aria-label="Quick Actions Menu"
        >
          {isOpen ? <X size={20} className="sm:w-6 sm:h-6" /> : <Menu size={20} className="sm:w-6 sm:h-6" />}
        </button>
      </div>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-30 z-40 transition-opacity"
            onClick={() => setIsOpen(false)}
          />

          <div className="fixed bottom-20 right-4 sm:bottom-24 sm:right-6 z-50 bg-white dark:bg-gray-900 rounded-lg shadow-xl overflow-hidden w-56 sm:w-64 animate-in slide-in-from-bottom-4">
            <div className="p-2.5 sm:p-3 bg-green-600 text-white font-semibold text-sm sm:text-base">
              Quick Actions
            </div>
            <nav className="py-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 px-3 py-2.5 sm:px-4 sm:py-3 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <Icon size={18} className="sm:w-5 sm:h-5 text-green-600 flex-shrink-0" />
                    <span className="text-sm sm:text-base text-gray-900 dark:text-white">{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </>
      )}
    </>
  );
}
