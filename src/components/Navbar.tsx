import { AnimatePresence, motion } from 'framer-motion';
import {
    Anchor,
    BookCheck,
    Hammer,
    Home,
    Info,
    Menu,
    Phone,
    X,
} from 'lucide-react';
import React, { memo, useCallback, useLayoutEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { throttle } from '../utils/performance';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/', icon: <Home size={18} /> },
    { name: 'Projects', path: '/projects', icon: <Hammer size={18} /> },
    { name: 'Post-Tensioning', path: '/post-tensioning', icon: <Anchor size={18} /> },
    { name: 'Certificates', path: '/certificates', icon: <BookCheck size={18} /> },
    { name: 'About', path: '/about', icon: <Info size={18} /> },
    { name: 'Contact', path: '/contact', icon: <Phone size={18} /> },
  ];

  // Optimized scroll handler with throttling
  const handleScroll = useCallback(
    throttle(() => {
      setScrolled(window.scrollY > 20);
    }, 16), // ~60fps
    []
  );

  useLayoutEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ 
        y: 0,
        boxShadow: scrolled ? '0 4px 32px rgba(0,0,0,0.15)' : 'none',
        backdropFilter: scrolled ? 'blur(20px)' : 'blur(0px)',
      }}
      transition={{ 
        type: 'spring', 
        stiffness: 300, 
        damping: 30,
        backdropFilter: { duration: 0.3 }
      }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b ${scrolled ? 'border-white/30' : 'border-transparent'}`}
      style={{
        background: scrolled 
          ? 'rgba(255,255,255,0.95)' 
          : 'linear-gradient(135deg, rgba(255,255,255,0.85) 0%, rgba(239, 246, 255, 0.7) 50%, rgba(245, 243, 255, 0.7) 100%)'
      }}
    >
      {/* Background pattern for navbar */}
      <div 
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          background: `
            radial-gradient(circle at 15% 25%, #2563eb 0%, transparent 8%),
            radial-gradient(circle at 85% 75%, #ff3b3f 0%, transparent 8%),
            radial-gradient(circle at 50% 50%, #a78bfa 0%, transparent 10%),
            linear-gradient(45deg, transparent 40%, rgba(37, 99, 235, 0.05) 50%, transparent 60%),
            linear-gradient(135deg, transparent 40%, rgba(255, 59, 63, 0.05) 50%, transparent 60%)
          `,
          backgroundSize: '100% 100%, 100% 100%, 100% 100%, 30px 30px, 30px 30px'
        }}
      />
      <div className="max-w-[100vw] w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        <div
          className={`flex justify-between items-center transition-all duration-300 ${
            scrolled ? 'h-14 sm:h-16' : 'h-20 sm:h-24'
          }`}
        >
          {/* Logo and Branding */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="relative cursor-pointer">
              <Link to="/">
                <svg
                  width={scrolled ? (window.innerWidth < 640 ? 32 : 42) : (window.innerWidth < 640 ? 36 : 48)}
                  height={scrolled ? (window.innerWidth < 640 ? 32 : 42) : (window.innerWidth < 640 ? 36 : 48)}
                  viewBox="0 0 100 100"
                  className="text-accent-blue transition-all duration-300"
                >
                  <image href="/logo.png" x="0" y="0" width="100" height="100" />
                  <circle
                    cx="50"
                    cy="50"
                    r="55"
                    fill="none"
                    stroke="url(#gradient)"
                    strokeWidth="2"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#2563eb" />
                      <stop offset="50%" stopColor="#a78bfa" />
                      <stop offset="100%" stopColor="#ff3b3f" />
                    </linearGradient>
                  </defs>
                </svg>
              </Link>
            </div>
            
            <div className="flex flex-col">
              <div
                className={`font-orbitron font-bold tracking-tight whitespace-nowrap drop-shadow-md transition-all duration-300 ${
                  scrolled ? 'text-sm sm:text-lg' : 'text-base sm:text-xl'
                }`}
              >
                <span className="text-blue-900">WAIKO</span>{' '}
                <span className="text-red-500">INTERNATIONAL</span>
              </div>
              
              {/* Subtitle - removed motion animations */}
              <div
                className={`font-orbitron font-medium tracking-wider drop-shadow-sm transition-all duration-300 ${
                  scrolled ? 'text-xs opacity-70' : 'text-xs opacity-100'
                }`}
              >
                <span className="text-blue-700">Engineering</span>{' '}
                <span className="text-purple-600">Excellence</span>{' '}
                <span className="text-red-400">Guaranteed</span>
              </div>
            </div>
          </div>

          {/* Desktop Nav - Aligned to the right */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2 ml-auto">
            {navLinks.map((link) => {
              const isActive =
                location.pathname === link.path ||
                (link.path !== '/' && location.pathname.startsWith(link.path));
              return (
                <div
                  key={link.path}
                  className={`px-2 lg:px-4 py-2 rounded-lg lg:rounded-xl text-xs lg:text-sm font-bold backdrop-blur-md transition-all duration-300 ${
                    isActive
                      ? 'border border-blue-200/50 shadow-glass bg-gradient-to-r from-blue-50/80 to-purple-50/80 text-blue-900'
                      : 'text-gray-700 hover:bg-white/50 border border-transparent hover:border-white/30'
                  }`}
                >
                  <Link to={link.path} className="flex items-center gap-1 lg:gap-2">
                    {React.cloneElement(link.icon, { size: window.innerWidth >= 1024 ? 18 : 16 })}
                    <span className={scrolled ? 'text-xs' : 'text-xs lg:text-sm'}>
                      {link.name}
                    </span>
                  </Link>
                </div>
              );
            })}
          </div>

          {/* Right Icons - Mobile Menu Button */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <button
              onClick={toggleMenu}
              className="md:hidden text-gray-800 p-1.5 sm:p-2 rounded-lg hover:bg-white/50 transition-colors"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              <motion.div
                initial={false}
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                {isOpen ? <X size={20} /> : <Menu size={20} />}
              </motion.div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav with enhanced animation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ 
              opacity: 1, 
              height: 'auto',
              boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
            }}
            exit={{ 
              opacity: 0, 
              height: 0,
              transition: { duration: 0.2 }
            }}
            transition={{ 
              duration: 0.3,
              ease: "easeInOut"
            }}
            className="md:hidden bg-white/95 backdrop-blur-xl border-t border-white/30 overflow-hidden"
          >
            <div className="px-3 sm:px-4 py-2 sm:py-3 space-y-1">
              {navLinks.map((link) => {
                const isActive =
                  location.pathname === link.path ||
                  (link.path !== '/' && location.pathname.startsWith(link.path));
                return (
                  <div 
                    key={link.path} 
                    className="relative"
                  >
                    <Link
                      to={link.path}
                      className={`flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl text-sm sm:text-base font-medium transition-colors duration-200 ${
                        isActive
                          ? 'text-blue-700 bg-blue-50/80 font-bold'
                          : 'text-gray-700 hover:text-blue-600 hover:bg-white/50'
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      <div className={`flex-shrink-0 p-1.5 sm:p-2 rounded-md sm:rounded-lg ${isActive ? 'bg-blue-100' : 'bg-gray-100'}`}>
                        {React.cloneElement(link.icon, { size: 16 })}
                      </div>
                      <span className="truncate">{link.name}</span>
                      {isActive && (
                        <div
                          className="absolute inset-0 rounded-lg sm:rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 -z-10"
                        />
                      )}
                    </Link>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default memo(Navbar);