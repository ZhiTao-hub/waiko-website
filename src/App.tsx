import React, { Suspense, lazy, useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Routes, useLocation } from 'react-router-dom';
import FullScreenLoader from './components/FullScreenLoader';
import GlobalErrorBoundary from './components/GlobalErrorBoundary';
import PageErrorBoundary from './components/PageErrorBoundary';
import usePerformanceMonitor from './hooks/usePerformanceMonitor';
// Initialize global error handler
import BackToTopButton from './components/BackToTopButton';
import ErrorTestButton from './components/ErrorTestButton';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import './utils/globalErrorHandler';

// Lazy load all pages for better performance
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const PostTensioning = lazy(() => import('./pages/PostTensioning'));
const Certificates = lazy(() => import('./pages/Certificates'));
const Contact = lazy(() => import('./pages/Contact'));
const Projects = lazy(() => import('./pages/Projects'));
const ErrorPage = lazy(() => import('./pages/ErrorPage'));

// Simple loading component for route transitions
const PageLoader: React.FC = () => (
  <div className="flex items-center justify-center min-h-[50vh]">
    <div className="text-center">
      <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-accent-blue mb-2"></div>
      <p className="text-gray-600 text-sm">Loading...</p>
    </div>
  </div>
);

// Optimized refresh redirect component - now handles 404 errors
const RefreshRedirect: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    // Valid routes - removed automatic redirect to allow 404 handling
    const validRoutes = ['/', '/projects', '/post-tensioning', '/certificates', '/about', '/contact', '/error'];

    // Log invalid routes for debugging but don't redirect automatically
    if (!validRoutes.includes(location.pathname)) {
      console.log('Invalid route accessed:', location.pathname);
    }
  }, [location.pathname]);

  return null;
};

// Main Layout component with navbar and footer
interface MainLayoutProps {
  children: React.ReactNode;
  scrollProgress: number;
  isInitialLoading: boolean;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, scrollProgress, isInitialLoading }) => {
  return (
    <div className={`flex flex-col min-h-screen bg-primary-light transition-all duration-500 ${isInitialLoading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}>
      <PageErrorBoundary>
        <Navbar />
      </PageErrorBoundary>
      <main className="flex-grow">
        {children}
      </main>
      <PageErrorBoundary>
        <Footer />
      </PageErrorBoundary>
      {/* Back to Top Button - Right, always visible on all pages */}
      <div className="fixed right-4 bottom-4 z-50">
        <PageErrorBoundary>
          <BackToTopButton scrollProgress={scrollProgress} />
        </PageErrorBoundary>
      </div>
      {/* Error Test Button - Development Only */}
      <ErrorTestButton />
    </div>
  );
};

const App: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  // Monitor performance metrics
  usePerformanceMonitor();

  // Handle initial loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 3000); // 3秒的loading時間

    return () => clearTimeout(timer);
  }, []);

  // Optimized scroll progress tracking with throttling
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const docHeight = document.documentElement.scrollHeight - window.innerHeight;
          const progress = docHeight > 0 ? Math.min(scrollY / docHeight, 1) : 0;
          setScrollProgress(progress);
          ticking = false;
        });
        ticking = true;
      }
    };

    // Use passive listener for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);



  return (
    <GlobalErrorBoundary>
      <Router>
        <RefreshRedirect />
        {/* WebVitalsMonitor temporarily disabled until web-vitals package is installed */}
        {/* <WebVitalsMonitor /> */}

        {/* Full Screen Loader */}
        <FullScreenLoader isLoading={isInitialLoading} />

        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* Error page routes - Full screen without navbar/footer */}
            <Route path="/error" element={<ErrorPage />} />
            <Route path="*" element={<ErrorPage />} />

            {/* Normal pages with layout */}
            <Route path="/" element={
              <MainLayout
                scrollProgress={scrollProgress}
                isInitialLoading={isInitialLoading}
              >
                <PageErrorBoundary><Home /></PageErrorBoundary>
              </MainLayout>
            } />
            <Route path="/about" element={
              <MainLayout
                scrollProgress={scrollProgress}
                isInitialLoading={isInitialLoading}
              >
                <PageErrorBoundary><About /></PageErrorBoundary>
              </MainLayout>
            } />
            <Route path="/projects" element={
              <MainLayout
                scrollProgress={scrollProgress}
                isInitialLoading={isInitialLoading}
              >
                <PageErrorBoundary><Projects /></PageErrorBoundary>
              </MainLayout>
            } />
            <Route path="/post-tensioning" element={
              <MainLayout
                scrollProgress={scrollProgress}
                isInitialLoading={isInitialLoading}
              >
                <PageErrorBoundary><PostTensioning /></PageErrorBoundary>
              </MainLayout>
            } />
            <Route path="/certificates" element={
              <MainLayout
                scrollProgress={scrollProgress}
                isInitialLoading={isInitialLoading}
              >
                <PageErrorBoundary><Certificates /></PageErrorBoundary>
              </MainLayout>
            } />
            <Route path="/contact" element={
              <MainLayout
                scrollProgress={scrollProgress}
                isInitialLoading={isInitialLoading}
              >
                <PageErrorBoundary><Contact /></PageErrorBoundary>
              </MainLayout>
            } />
          </Routes>
        </Suspense>
      </Router>
    </GlobalErrorBoundary>
  );
};

export default App;