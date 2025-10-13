import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { apiClient, UserData } from '../lib/apiClient';

interface UserContextType {
  user: UserData | null;
  loading: boolean;
  error: string | null;
  fetchUserById: (userId: number) => Promise<void>;
  updateProfile: (data: UpdateProfileData) => Promise<boolean>;
  refreshUser: (userId?: number) => Promise<void>;
  clearUser: () => void;
}

interface UpdateProfileData {
  name: string;
  mobile: string;
  email: string;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize user from localStorage on mount
  useEffect(() => {
    const storedUser = apiClient.getStoredUser();
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);
 
  // Fetch user by ID
  const fetchUserById = async (userId: number) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await apiClient.getUserById(userId);
      console.log('Get User By ID API Response:', response);
      
      if (response.success && response.data) {
        // The API may return {error: false, data: UserData} structure
        const apiResponse = response.data as { data?: UserData; error?: boolean; message?: string };
        const userData = apiResponse.data || response.data as UserData;
        
        console.log('Fetched User Data:', userData);
        
        setUser(userData);
        // Update localStorage with fresh data
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('demoUser', JSON.stringify({
          email: userData.email,
          mobile: userData.mobile,
          name: userData.name,
          id: userData.id,
          isLoggedIn: true
        }));
      } else {
        setError(typeof response.error === 'string' ? response.error : 'Failed to fetch user data');
      }
    } catch (err) {
      console.error('Fetch User Error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred while fetching user data');
    } finally {
      setLoading(false);
    }
  };

  // Update user profile
  const updateProfile = async (data: UpdateProfileData): Promise<boolean> => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await apiClient.updateProfile(data);
      console.log('Update Profile API Response:', response);
      
      if (response.success && response.data) {
        // The API returns: {error: false, message: string, data: UserData}
        // So we need to access response.data.data for the actual user data
        const apiResponse = response.data as { data?: UserData; error?: boolean; message?: string };
        const updatedUserData = apiResponse.data || response.data as UserData;
        
        console.log('Updated User Data:', updatedUserData);
        
        // Update local user state
        setUser(updatedUserData);
        
        // Update localStorage with the complete updated user data
        localStorage.setItem('user', JSON.stringify(updatedUserData));
        localStorage.setItem('demoUser', JSON.stringify({
          email: updatedUserData.email,
          mobile: updatedUserData.mobile,
          name: updatedUserData.name,
          id: updatedUserData.id,
          isLoggedIn: true
        }));
        
        return true;
      } else {
        setError(typeof response.error === 'string' ? response.error : 'Failed to update profile');
        return false;
      }
    } catch (err) {
      console.error('Profile Update Error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred while updating profile');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Refresh current user data
  const refreshUser = async (userId?: number) => {
    const targetUserId = userId || user?.id;
    if (targetUserId) {
      await fetchUserById(targetUserId);
    }
  };

  // Clear user data
  const clearUser = () => {
    setUser(null);
    setError(null);
    localStorage.removeItem('user');
    localStorage.removeItem('demoUser');
    localStorage.removeItem('api_token');
  };

  const value: UserContextType = {
    user,
    loading,
    error,
    fetchUserById,
    updateProfile,
    refreshUser,
    clearUser,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
}
