import { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import { User, Mail, Phone, Save, Edit, X, Loader } from 'lucide-react';

export function UserProfile() {
  const { user, loading, error, updateProfile, refreshUser } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: ''
  });
  const [updateLoading, setUpdateLoading] = useState(false);
  const [updateMessage, setUpdateMessage] = useState('');

  // Initialize form data when user data changes
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        mobile: user.mobile || '',
        email: user.email || ''
      });
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    setUpdateLoading(true);
    setUpdateMessage('');
    
    try {
      const success = await updateProfile(formData);
      
      if (success) {
        setUpdateMessage('Profile updated successfully!');
        setIsEditing(false);
        // Refresh user data to get latest from server
        await refreshUser();
      } else {
        setUpdateMessage('Failed to update profile. Please try again.');
      }
    } catch (err) {
      setUpdateMessage('An error occurred while updating profile.');
    } finally {
      setUpdateLoading(false);
    }
  };

  const handleCancel = () => {
    if (user) {
      setFormData({
        name: user.name || '',
        mobile: user.mobile || '',
        email: user.email || ''
      });
    }
    setIsEditing(false);
    setUpdateMessage('');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader className="animate-spin h-8 w-8 text-blue-600" />
        <span className="ml-2 text-gray-600">Loading user data...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-600">Error: {error}</p>
        <button 
          onClick={refreshUser}
          className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center p-8">
        <p className="text-gray-600">No user data available</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          User Profile
        </h2>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Edit size={16} />
            Edit Profile
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              disabled={updateLoading}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
            >
              {updateLoading ? (
                <Loader className="animate-spin h-4 w-4" />
              ) : (
                <Save size={16} />
              )}
              {updateLoading ? 'Saving...' : 'Save'}
            </button>
            <button
              onClick={handleCancel}
              className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              <X size={16} />
              Cancel
            </button>
          </div>
        )}
      </div>

      {updateMessage && (
        <div className={`mb-4 p-3 rounded-lg ${
          updateMessage.includes('successfully') 
            ? 'bg-green-50 text-green-700 border border-green-200' 
            : 'bg-red-50 text-red-700 border border-red-200'
        }`}>
          {updateMessage}
        </div>
      )}

      <div className="space-y-6">
        {/* Name Field */}
        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="flex items-center gap-3 mb-2">
            <User className="text-gray-600 dark:text-gray-400" size={20} />
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Full Name
            </label>
          </div>
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              placeholder="Enter your full name"
            />
          ) : (
            <p className="font-semibold text-gray-900 dark:text-white">
              {user.name || 'Not provided'}
            </p>
          )}
        </div>

        {/* Email Field */}
        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="flex items-center gap-3 mb-2">
            <Mail className="text-gray-600 dark:text-gray-400" size={20} />
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Email Address
            </label>
          </div>
          {isEditing ? (
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              placeholder="Enter your email"
            />
          ) : (
            <p className="font-semibold text-gray-900 dark:text-white">
              {user.email || 'Not provided'}
            </p>
          )}
        </div>

        {/* Mobile Field */}
        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="flex items-center gap-3 mb-2">
            <Phone className="text-gray-600 dark:text-gray-400" size={20} />
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Mobile Number
            </label>
          </div>
          {isEditing ? (
            <input
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              placeholder="Enter your mobile number"
            />
          ) : (
            <p className="font-semibold text-gray-900 dark:text-white">
              {user.mobile || 'Not provided'}
            </p>
          )}
        </div>

        {/* Additional User Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 block">
              User ID
            </label>
            <p className="text-gray-900 dark:text-white font-mono text-sm">
              {user.id}
            </p>
          </div>
          
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 block">
              Status
            </label>
            <p className={`font-semibold ${
              user.status === 1 ? 'text-green-600' : 'text-red-600'
            }`}>
              {user.status === 1 ? 'Active' : 'Inactive'}
            </p>
          </div>
          
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 block">
              Role
            </label>
            <p className="text-gray-900 dark:text-white">
              {user.role === 1 ? 'Admin' : 'User'}
            </p>
          </div>
          
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 block">
              Member Since
            </label>
            <p className="text-gray-900 dark:text-white">
              {new Date(user.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
