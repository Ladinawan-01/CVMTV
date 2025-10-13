import { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
  showLoginModal: boolean;
  setShowLoginModal: (show: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <AuthContext.Provider value={{ showLoginModal, setShowLoginModal }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
