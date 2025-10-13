import { useEffect } from 'react';
import { useUser } from '../context/UserContext';
import { UserProfile } from '../components/UserProfile';
import { Loader } from 'lucide-react';

export function UserProfilePage() {
  const { user, loading, fetchUserById } = useUser();

  useEffect(() => {
    // If we have a user ID, fetch the latest data
    if (user?.id) {
      fetchUserById(user.id);
    }
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Loader className="animate-spin h-12 w-12 text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading user profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        <UserProfile />
      </div>
    </div>
  );
}
