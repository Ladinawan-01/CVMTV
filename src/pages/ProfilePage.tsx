import { useEffect, useState } from 'react';
import { User, Mail, Save, X, Lock, Loader, Phone } from 'lucide-react';
import { useUser } from '../context/UserContext';

export function ProfilePage() {
  const { user, loading, error, updateProfile, refreshUser } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editedProfile, setEditedProfile] = useState({
    name: '',
    email: '',
    mobile: ''
  });
  console.log(user,'user')
  console.log('Mobile value:', user?.mobile)
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Initialize form data when user data changes
  useEffect(() => {
    if (user) {
      setEditedProfile({
        name: user.name || '',
        email: user.email || '',
        mobile: user.mobile || ''
      });
    }
  }, [user]);

  // // Redirect to login if no user
  // useEffect(() => {
  //   if (!loading && !user) {
  //     navigate('/login');
  //   }
  // }, [user, loading, navigate]);
  
  const handleSaveProfile = async () => {
    if (!user) return;

    if (!editedProfile.name.trim()) {
      alert('Name is required');
      return;
    }

    if (!editedProfile.email.trim()) {
      alert('Email is required');
      return;
    }

    setSaving(true);
    try {
      console.log('Saving profile with data:', editedProfile);
      const success = await updateProfile(editedProfile);
      
      if (success) {
        setIsEditing(false);
        alert('Profile updated successfully!');
        console.log('Profile update successful');
        // No need to call refreshUser - updateProfile already updates the user data
        // The UI will automatically re-render with the updated user data from context
      } else {
        alert('Failed to update profile. Please try again.');
      }
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('An error occurred while updating profile');
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = () => {
    if (!user) return;

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      alert('New password must be at least 6 characters');
      return;
    }

    const storedPassword = localStorage.getItem(`password_${user.email}`);
    if (storedPassword !== passwordData.currentPassword) {
      alert('Current password is incorrect');
      return;
    }

    localStorage.setItem(`password_${user.email}`, passwordData.newPassword);

    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    setIsChangingPassword(false);
    alert('Password changed successfully!');
  };

  const cancelEdit = () => {
    if (user) {
      setEditedProfile({
        name: user.name || '',
        email: user.email || '',
        mobile: user.mobile || ''
      });
    }
    setIsEditing(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Loader className="animate-spin h-12 w-12 text-blue-600 mx-auto mb-4" />
          <div className="text-gray-600 dark:text-gray-400">Loading profile...</div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-600 dark:text-gray-400">No user data available</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 mb-4">Error: {error}</div>
          <button 
            onClick={() => refreshUser(user?.id)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const displayName = user.name || 'User';
  const initials = displayName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-6 sm:py-12 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6 md:p-8">
          <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 mb-6 sm:mb-8">
            <div className="relative">
              {user.profile ? (
                <img
                  src={user.profile}
                  alt={displayName}
                  className="w-24 h-24 rounded-full object-cover border-2 border-gray-300 dark:border-gray-600"
                />
              ) : (
                <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                  {initials}
                </div>
              )}
            </div>
            <div className="flex-1">
              {isEditing ? (
                <input
                  type="text"
                  value={editedProfile.name}
                  onChange={(e) => setEditedProfile({ ...editedProfile, name: e.target.value })}
                  placeholder="Full Name"
                  className="text-3xl font-bold text-gray-900 dark:text-white mb-2 bg-gray-50 dark:bg-gray-700 px-3 py-1 rounded w-full"
                />
              ) : (
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {displayName}
                </h1>
              )}
              <p className="text-gray-600 dark:text-gray-400">
                Member since {new Date().toLocaleDateString()}
              </p>
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                >
                  Edit Profile
                </button>
              ) : (
                <>
                  <button
                    onClick={handleSaveProfile}
                    disabled={saving}
                    className="flex-1 sm:flex-none px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <Save size={16} />
                    {saving ? 'Saving...' : 'Save'}
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="flex-1 sm:flex-none px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-semibold flex items-center justify-center gap-2"
                  >
                    <X size={16} />
                    Cancel
                  </button>
                </>
              )}
            </div>
          </div>


          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Account Information
            </h2>

            <div className="space-y-4">
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <Mail className="text-gray-600 dark:text-gray-400" size={20} />
                  <p className="text-sm text-gray-600 dark:text-gray-400">Email</p>
                </div>
                {isEditing ? (
                  <input
                    type="email"
                    value={editedProfile.email}
                    onChange={(e) => setEditedProfile({ ...editedProfile, email: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                ) : (
                  <p className="font-semibold text-gray-900 dark:text-white">{user.email}</p>
                )}
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <User className="text-gray-600 dark:text-gray-400" size={20} />
                  <p className="text-sm text-gray-600 dark:text-gray-400">Name</p>
                </div>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedProfile.name}
                    onChange={(e) => setEditedProfile({ ...editedProfile, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                ) : (
                  <p className="font-semibold text-gray-900 dark:text-white">{user.name}</p>
                )}
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <Phone className="text-gray-600 dark:text-gray-400" size={20} />
                  <p className="text-sm text-gray-600 dark:text-gray-400">Mobile</p>
                </div>
                {isEditing ? (
                  <input
                    type="tel"
                    value={editedProfile.mobile}
                    onChange={(e) => setEditedProfile({ ...editedProfile, mobile: e.target.value })}
                    placeholder="Enter mobile number"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                ) : (
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {user.mobile || 'Not set'}
                  </p>
                )}
              </div>

             

              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <User className="text-gray-600 dark:text-gray-400" size={20} />
                  <p className="text-sm text-gray-600 dark:text-gray-400">Status</p>
                </div>
                <p className={`font-semibold ${
                  user.status === 1 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {user.status === 1 ? 'Active' : 'Inactive'}
                </p>
              </div>
 
            </div>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Security
              </h2>
              {!isChangingPassword && (
                <button
                  onClick={() => setIsChangingPassword(true)}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-semibold flex items-center gap-2"
                >
                  <Lock size={16} />
                  Change Password
                </button>
              )}
            </div>

            {isChangingPassword && (
              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Current Password
                    </label>
                    <input
                      type="password"
                      value={passwordData.currentPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      New Password
                    </label>
                    <input
                      type="password"
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={handleChangePassword}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
                    >
                      Update Password
                    </button>
                    <button
                      onClick={() => {
                        setIsChangingPassword(false);
                        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
                      }}
                      className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-semibold"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
