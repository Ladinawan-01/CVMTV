import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Heart, LogOut } from 'lucide-react';
import { getUserProfile } from '../data/stories';

interface UserProfile {
  username?: string;
  full_name?: string;
  profile_image_url?: string;
  name?: string;
  profile?: string;
}

export function UserAvatar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<{ email: string; name?: string; isLoggedIn: boolean } | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkUser = () => {
      const storedUser = localStorage.getItem('demoUser');
      const storedFullUser = localStorage.getItem('user');
      
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        setUser(userData);
        
        // Try to load full user data from API response
        if (storedFullUser) {
          const fullUserData = JSON.parse(storedFullUser);
          setProfile({
            name: fullUserData.name,
            full_name: fullUserData.name,
            profile_image_url: fullUserData.profile,
            profile: fullUserData.profile,
          });
        } else {
          loadProfile(userData.email);
        }
      } else {
        setUser(null);
        setProfile(null);
      }
    };

    checkUser();
    window.addEventListener('storage', checkUser);
    window.addEventListener('userLogin', checkUser);

    return () => {
      window.removeEventListener('storage', checkUser);
      window.removeEventListener('userLogin', checkUser);
    };
  }, []);

  const loadProfile = (email: string) => {
    const data = getUserProfile(email);
    if (data) {
      setProfile(data);
    }
  };

  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const handleLogout = () => {
    localStorage.removeItem('demoUser');
    localStorage.removeItem('api_token');
    localStorage.removeItem('user');
    setUser(null);
    setProfile(null);
    setIsOpen(false);
    navigate('/');
    window.dispatchEvent(new Event('userLogin'));
  };

  if (!user?.isLoggedIn) {
    return (
      <Link to="/login" className="hover:text-yellow-400 transition-colors">
        <User size={18} />
      </Link>
    );
  }

  const displayName = profile?.name || profile?.full_name || profile?.username || user?.name || 'User';
  const avatarInitial = displayName.charAt(0).toUpperCase();
  const avatarImage = profile?.profile_image_url || profile?.profile;

  return (
    <>
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          type="button"
          className="flex items-center gap-2 hover:text-yellow-400 transition-colors focus:outline-none"
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          {avatarImage ? (
            <img
              src={avatarImage}
              alt={displayName}
              className="w-8 h-8 rounded-full object-cover border-2 border-white dark:border-gray-700"
            />
          ) : (
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
              {avatarInitial}
            </div>
          )}
        </button>

        {isOpen && (
          <div
            className="fixed mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 py-2"
            style={{
              position: 'fixed',
              right: '1rem',
              top: '3.5rem',
              zIndex: 9999
            }}
          >
            <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
              <p className="text-sm font-semibold text-gray-900 dark:text-white">{displayName}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
            </div>

            <Link
              to="/profile"
              className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <User size={16} />
              Profile
            </Link>

            {/* <Link
              to="/user-profile"
              className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <User size={16} />
              User Data
            </Link>

            <Link
              to="/api-test"
              className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <User size={16} />
              API Test
            </Link> */}

            <Link
              to="/favorites"
              className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <Heart size={16} />
              Favorites
            </Link>

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        )}
      </div>
    </>
  );
}
