import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { AdBanner } from './components/AdBanner';
import { LoginModal } from './components/LoginModal';
import { QuickActionsMenu } from './components/QuickActionsMenu';
import { HomePage } from './pages/HomePage';
import { StoryPage } from './pages/StoryPage';
import { CategoryPage } from './pages/CategoryPage';
import { TagPage } from './pages/TagPage';
import { AuthorPage } from './pages/AuthorPage';
import { LiveBroadcastPage } from './pages/LiveBroadcastPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { ProfilePage } from './pages/ProfilePage';
import { UserProfilePage } from './pages/UserProfilePage';
import { ApiTestPage } from './pages/ApiTestPage';
import { ApiDebugPage } from './pages/ApiDebugPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { SearchResultsPage } from './pages/SearchResultsPage';
import { AuthProvider, useAuth } from './context/AuthContext';
import { UserProvider } from './context/UserContext';

function AppContent() {
  const location = useLocation();
  const { showLoginModal, setShowLoginModal } = useAuth();
  const noHeaderFooterPaths = ['/login', '/register'];
  const showHeaderFooter = !noHeaderFooterPaths.includes(location.pathname);
  const noBannerPaths = ['/', '/about', '/contact', '/privacy', '/terms', '/login', '/register'];
  const showBanner = !noBannerPaths.includes(location.pathname);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors relative">
      {showHeaderFooter && <Header />}
      <main>
        {showBanner && <AdBanner />}
        <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
        <QuickActionsMenu />
        <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/story/:slug" element={<StoryPage />} />
        <Route path="/category/:category" element={<CategoryPage />} />
        <Route path="/tag/:tag" element={<TagPage />} />
        <Route path="/author/:author" element={<AuthorPage />} />
        <Route path="/live" element={<LiveBroadcastPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/user-profile" element={<UserProfilePage />} />
        <Route path="/api-test" element={<ApiTestPage />} />
        <Route path="/api-debug" element={<ApiDebugPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/search" element={<SearchResultsPage />} />
      </Routes>
      </main>
      {showHeaderFooter && <Footer />}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <UserProvider>
          <AppContent />
        </UserProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
