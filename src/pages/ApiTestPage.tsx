import { useState } from 'react';
import { useUser } from '../context/UserContext';
import { apiClient } from '../lib/apiClient';

export function ApiTestPage() {
  const { user, loading, error, fetchUserById, updateProfile } = useUser();
  const [testUserId, setTestUserId] = useState('');
  const [updateData, setUpdateData] = useState({
    name: '',
    mobile: '',
    email: ''
  });
  const [message, setMessage] = useState('');

  const handleFetchUser = async () => {
    if (!testUserId) {
      setMessage('Please enter a user ID');
      return;
    }
    
    setMessage('Fetching user data...');
    try {
      await fetchUserById(parseInt(testUserId));
      setMessage('User data fetched successfully!');
    } catch (err) {
      setMessage(`Error: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  };

  const handleUpdateProfile = async () => {
    if (!updateData.name || !updateData.email) {
      setMessage('Please fill in name and email');
      return;
    }
    
    setMessage('Updating profile...');
    try {
      const success = await updateProfile(updateData);
      if (success) {
        setMessage('Profile updated successfully!');
      } else {
        setMessage('Failed to update profile');
      }
    } catch (err) {
      setMessage(`Error: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            API Test Page
          </h1>
          
          {message && (
            <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-blue-700">{message}</p>
            </div>
          )}

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700">Error: {error}</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Fetch User by ID */}
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Test /get_user_by_id API
              </h2>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    User ID
                  </label>
                  <input
                    type="number"
                    value={testUserId}
                    onChange={(e) => setTestUserId(e.target.value)}
                    placeholder="Enter user ID"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                </div>
                <button
                  onClick={handleFetchUser}
                  disabled={loading}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  {loading ? 'Fetching...' : 'Fetch User Data'}
                </button>
              </div>
            </div>

            {/* Update Profile */}
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Test /update_profile API
              </h2>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    value={updateData.name}
                    onChange={(e) => setUpdateData({...updateData, name: e.target.value})}
                    placeholder="Enter name"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Mobile
                  </label>
                  <input
                    type="tel"
                    value={updateData.mobile}
                    onChange={(e) => setUpdateData({...updateData, mobile: e.target.value})}
                    placeholder="Enter mobile number"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={updateData.email}
                    onChange={(e) => setUpdateData({...updateData, email: e.target.value})}
                    placeholder="Enter email"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                </div>
                <button
                  onClick={handleUpdateProfile}
                  disabled={loading}
                  className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
                >
                  {loading ? 'Updating...' : 'Update Profile'}
                </button>
              </div>
            </div>
          </div>

          {/* Current User Data Display */}
          {user && (
            <div className="mt-6 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Current User Data
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">ID</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{user.id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Name</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{user.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Email</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{user.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Mobile</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{user.mobile || 'Not set'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Status</p>
                  <p className={`font-semibold ${user.status === 1 ? 'text-green-600' : 'text-red-600'}`}>
                    {user.status === 1 ? 'Active' : 'Inactive'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Role</p>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {user.role === 1 ? 'Admin' : 'User'}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
