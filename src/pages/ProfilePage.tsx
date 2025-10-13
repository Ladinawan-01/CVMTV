import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Save, X, Lock, AtSign } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { ImageUpload } from '../components/ImageUpload';

interface UserProfile {
  email: string;
  username: string;
  full_name: string;
  profile_image_url: string;
  bio: string;
}

export function ProfilePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState<{ email: string; isLoggedIn: boolean } | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [editedProfile, setEditedProfile] = useState<UserProfile>({
    email: '',
    username: '',
    full_name: '',
    profile_image_url: '',
    bio: ''
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    const storedUser = localStorage.getItem('demoUser');
    if (!storedUser) {
      navigate('/login');
      return;
    }
    const userData = JSON.parse(storedUser);
    setUser(userData);
    loadProfile(userData.email);
  }, [navigate]);

  const loadProfile = async (email: string) => {
    setLoading(true);
    const { data } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('email', email)
      .maybeSingle();

    if (data) {
      setProfile(data);
      setEditedProfile(data);
    } else {
      const defaultProfile = {
        email,
        username: '',
        full_name: '',
        profile_image_url: '',
        bio: ''
      };
      setProfile(defaultProfile);
      setEditedProfile(defaultProfile);
    }
    setLoading(false);
  };

  const handleSaveProfile = async () => {
    if (!user) return;

    if (editedProfile.username && editedProfile.username.length < 3) {
      alert('Username must be at least 3 characters');
      return;
    }

    if (editedProfile.email !== user.email) {
      const emailExists = localStorage.getItem(`password_${editedProfile.email}`);
      if (emailExists) {
        alert('This email is already registered');
        return;
      }
    }

    setSaving(true);
    try {
      const { data: existingProfile } = await supabase
        .from('user_profiles')
        .select('id')
        .eq('email', user.email)
        .maybeSingle();

      if (existingProfile) {
        const { error } = await supabase
          .from('user_profiles')
          .update({
            email: editedProfile.email,
            username: editedProfile.username,
            full_name: editedProfile.full_name,
            profile_image_url: editedProfile.profile_image_url,
            bio: editedProfile.bio,
            updated_at: new Date().toISOString()
          })
          .eq('email', user.email);

        if (error) {
          alert('Failed to update profile: ' + error.message);
          return;
        }
      } else {
        const { error } = await supabase
          .from('user_profiles')
          .insert({
            email: editedProfile.email,
            username: editedProfile.username,
            full_name: editedProfile.full_name,
            profile_image_url: editedProfile.profile_image_url,
            bio: editedProfile.bio
          });

        if (error) {
          alert('Failed to create profile: ' + error.message);
          return;
        }
      }

      if (editedProfile.email !== user.email) {
        const oldPassword = localStorage.getItem(`password_${user.email}`);
        if (oldPassword) {
          localStorage.setItem(`password_${editedProfile.email}`, oldPassword);
          localStorage.removeItem(`password_${user.email}`);
        }

        const updatedUser = { ...user, email: editedProfile.email };
        localStorage.setItem('demoUser', JSON.stringify(updatedUser));
        setUser(updatedUser);
      }

      setProfile(editedProfile);
      setIsEditing(false);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('Failed to save profile');
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async () => {
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
    setEditedProfile(profile || {
      email: user?.email || '',
      username: '',
      full_name: '',
      profile_image_url: '',
      bio: ''
    });
    setIsEditing(false);
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-gray-600 dark:text-gray-400">Loading...</div>
      </div>
    );
  }

  const displayName = profile?.full_name || profile?.username || 'User';
  const initials = displayName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-6 sm:py-12 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6 md:p-8">
          <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 mb-6 sm:mb-8">
            <div className="relative">
              {profile?.profile_image_url ? (
                <img
                  src={profile.profile_image_url}
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
                  value={editedProfile.full_name}
                  onChange={(e) => setEditedProfile({ ...editedProfile, full_name: e.target.value })}
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

          {isEditing && (
            <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <ImageUpload
                currentImage={editedProfile.profile_image_url}
                onImageChange={(imageData) => setEditedProfile({ ...editedProfile, profile_image_url: imageData })}
              />
            </div>
          )}

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
                  <p className="font-semibold text-gray-900 dark:text-white">{profile?.email}</p>
                )}
              </div>

              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <AtSign className="text-gray-600 dark:text-gray-400" size={20} />
                  <p className="text-sm text-gray-600 dark:text-gray-400">Username</p>
                </div>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedProfile.username}
                    onChange={(e) => setEditedProfile({ ...editedProfile, username: e.target.value })}
                    placeholder="Choose a username"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                ) : (
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {profile?.username || 'Not set'}
                  </p>
                )}
              </div>

              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <User className="text-gray-600 dark:text-gray-400" size={20} />
                  <p className="text-sm text-gray-600 dark:text-gray-400">Bio</p>
                </div>
                {isEditing ? (
                  <textarea
                    value={editedProfile.bio}
                    onChange={(e) => setEditedProfile({ ...editedProfile, bio: e.target.value })}
                    placeholder="Tell us about yourself..."
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                ) : (
                  <p className="text-gray-900 dark:text-white">
                    {profile?.bio || 'No bio added yet'}
                  </p>
                )}
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
