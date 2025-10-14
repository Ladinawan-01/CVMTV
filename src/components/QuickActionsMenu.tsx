import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Home, Radio, Newspaper } from 'lucide-react';
import { apiClient } from '../lib/apiClient';

interface Category {
  id: number;
  category_name: string;
  slug: string;
  row_order: number;
}

export function QuickActionsMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
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
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const staticMenuItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Radio, label: 'CVM Live', path: 'https://now.cvmtv.com/' }
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

          <div className="fixed bottom-20 right-4 sm:bottom-24 sm:right-6 z-50 bg-white dark:bg-gray-900 rounded-lg shadow-xl overflow-hidden w-56 sm:w-64 animate-in slide-in-from-bottom-4 max-h-[80vh] overflow-y-auto">
            <div className="p-2.5 sm:p-3 bg-green-600 text-white font-semibold text-sm sm:text-base sticky top-0 z-10">
              Quick Actions
            </div>
            <nav className="py-2">
              {/* Static Menu Items */}
              {staticMenuItems.map((item) => {
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

              {/* Divider */}
              {!loading && categories.length > 0 && (
                <div className="border-t border-gray-200 dark:border-gray-700 my-2" />
              )}

              {/* Dynamic Category Items from API */}
              {loading ? (
                // Loading skeleton
                <div className="px-3 py-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex items-center gap-3 py-2.5">
                      <div className="w-5 h-5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                      <div className="flex-1 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                    </div>
                  ))}
                </div>
              ) : (
                categories.map((category) => (
                  <Link
                    key={category.id}
                    to={`/category/${category.slug}`}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 px-3 py-2.5 sm:px-4 sm:py-3 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <Newspaper size={18} className="sm:w-5 sm:h-5 text-green-600 flex-shrink-0" />
                    <span className="text-sm sm:text-base text-gray-900 dark:text-white">{category.category_name}</span>
                  </Link>
                ))
              )}
            </nav>
          </div>
        </>
      )}
    </>
  );
}
