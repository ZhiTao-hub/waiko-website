import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import PostTensioning from './pages/PostTensioning';
import Certificates from './pages/Certificates';
import Contact from './pages/Contact';
import Projects from './pages/Projects';
import BackToTopButton from './components/BackToTopButton';

// Refresh redirect component - Modified to be less aggressive
const RefreshRedirect: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    // Check if this is a page refresh
    const isRefresh = performance.navigation.type === 1;
    
    // Only redirect on refresh if we're on a non-homepage path
    // This prevents unwanted redirects while maintaining the intended functionality
    if (isRefresh && location.pathname !== '/' && location.pathname !== '/projects' && 
        location.pathname !== '/post-tensioning' && location.pathname !== '/certificates' && 
        location.pathname !== '/about' && location.pathname !== '/contact') {
      console.log('Refresh detected on unknown path', location.pathname, '- redirecting to homepage');
      window.location.href = '/';
    }
  }, [location.pathname]);

  return null;
};

const App: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  // App-level refresh detection - Modified to be less aggressive
  useEffect(() => {
    const isRefresh = performance.navigation.type === 1;
    const currentPath = window.location.pathname;
    
    console.log('App level check - Path:', currentPath, 'Is refresh:', isRefresh);
    
    // Only redirect on refresh if we're on a non-homepage path
    if (isRefresh && currentPath !== '/' && currentPath !== '/projects' && 
        currentPath !== '/post-tensioning' && currentPath !== '/certificates' && 
        currentPath !== '/about' && currentPath !== '/contact') {
      console.log('App level refresh detected on unknown path - redirecting to homepage');
      window.location.href = '/';
    }
  }, []);

  // Handle scroll progress for back to top button
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(scrollY / docHeight, 1) : 0;
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Router>
      <RefreshRedirect />
      <div className="flex flex-col min-h-screen bg-primary-light transition-colors duration-300">
        <Navbar />
        <main className="flex-grow">
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/post-tensioning" element={<PostTensioning />} />
              <Route path="/certificates" element={<Certificates />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
          <Footer />
          {/* Back to Top Button - Right, always visible on all pages */}
          <div className="fixed right-4 bottom-4 z-50">
            <BackToTopButton scrollProgress={scrollProgress} />
          </div>
        </div>
      </Router>
  );
};

export default App;