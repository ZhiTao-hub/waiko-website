import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Home, Hammer, Anchor, BookCheck, Info, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import WhatsAppButton from './WhatsAppButton';
import EmailButton from './EmailButton';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const location = useLocation();
  const [showContactButtons, setShowContactButtons] = useState(false);
  
  // Check if we're on the contact page
  const isContactPage = location.pathname === '/contact';
  
  // Scroll detection for contact page
  useEffect(() => {
    if (!isContactPage) {
      setShowContactButtons(false);
      return;
    }

    const handleScroll = () => {
      const scrollPosition = window.innerHeight + window.scrollY;
      const threshold = 40;
      const atBottom = scrollPosition >= document.body.offsetHeight - threshold;
      setShowContactButtons(atBottom);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isContactPage]);
  const navLinks = [
    { name: 'Home', path: '/', icon: <Home size={16} /> },
    { name: 'Projects', path: '/projects', icon: <Hammer size={16} /> },
    { name: 'Post-Tensioning', path: '/post-tensioning', icon: <Anchor size={16} /> },
    { name: 'Certificates', path: '/certificates', icon: <BookCheck size={16} /> },
    { name: 'About', path: '/about', icon: <Info size={16} /> },
    { name: 'Contact', path: '/contact', icon: <Phone size={16} /> },
  ];

  return (
    <footer className="relative bg-gray-100 text-gray-800 py-12 px-4 overflow-hidden">
      {/* ⚙️ Animated Gear */}
      <motion.svg
        width={40}
        height={40}
        viewBox="0 0 100 100"
        className="absolute left-8 top-4 opacity-20 text-blue-500 select-none"
        initial={{ rotate: 0, scale: 0.85 }}
        animate={{
          rotate: 360,
          scale: [1, 1.2, 1],
        }}
        transition={{
          rotate: { repeat: Infinity, duration: 12, ease: 'linear' },
          scale: { repeat: Infinity, duration: 4, ease: 'easeInOut' },
        }}
        style={{ zIndex: 0 }}
      >
        <circle cx="50" cy="50" r="32" fill="none" stroke="currentColor" strokeWidth="6" />
        <g stroke="#a78bfa" strokeWidth="4">
          {[...Array(8)].map((_, j) => (
            <line
              key={j}
              x1={50 + 38 * Math.cos((j * Math.PI) / 4)}
              y1={50 + 38 * Math.sin((j * Math.PI) / 4)}
              x2={50 + 32 * Math.cos((j * Math.PI) / 4)}
              y2={50 + 32 * Math.sin((j * Math.PI) / 4)}
              strokeLinecap="round"
            />
          ))}
        </g>
        <circle cx="50" cy="50" r="12" fill="#ff3b3f" opacity="0.3" />
      </motion.svg>

      {/* ✨ Glow Line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-blue-500 via-purple-400 to-pink-500 blur-sm opacity-40" />

      {/* 📦 Footer Content */}
      <div className="max-w-7xl mx-auto relative z-10 text-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
          {/* Contact Us */}
          <div>
            <h3 className="text-base font-bold font-orbitron mb-4 tracking-wider text-blue-600 uppercase">Contact Us</h3>
            <div className="space-y-3 text-gray-600">
              <div className="flex items-start">
                <MapPin className="mr-3 mt-1 flex-shrink-0 text-blue-500" size={18} />
                <p>Pusing, Perak, Malaysia</p>
              </div>
              <div className="flex items-center">
                <Phone className="mr-3 text-blue-500" size={18} />
                <p>+60 5-3652989</p>
              </div>
              <div className="flex items-center">
                <Mail className="mr-3 text-blue-500" size={18} />
                <p>chorkk1@gmail.com</p>
              </div>
              <div className="flex items-center">
                <Clock className="mr-3 text-blue-500" size={18} />
                <p>Mon - Sat: 8:30 AM - 5:30 PM</p>
              </div>
            </div>
          </div>
          {/* Quick Links */}
          <div className="text-left">
            <h3 className="text-base font-bold font-orbitron mb-4 tracking-wider text-blue-600 uppercase">Quick Links</h3>
            <ul className="grid grid-cols-2 gap-x-2 gap-y-3 text-gray-700 justify-items-start">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="inline-flex items-center gap-2 hover:text-accent-blue">
                    <span className="text-accent-blue">{link.icon}</span>
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {/* Location */}
          <div>
            <h3 className="text-base font-bold font-orbitron mb-4 tracking-wider text-blue-600 uppercase">Location</h3>
            <div className="space-y-4 text-gray-600">
              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-1">Headquaters (Malaysia)</h4>
                <div className="flex items-start">
                  <MapPin className="mr-3 mt-1 flex-shrink-0 text-blue-500" size={18} />
                  <p>PLOT 9559 & 9560, JALAN JOHAN 2/6, KAWASAN PERINDUSTRIAN PENGKALAN 2, 31550 PUSING, PERAK, MALAYSIA</p>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-1">Singapore Branch</h4>
                <div className="flex items-start">
                  <MapPin className="mr-3 mt-1 flex-shrink-0 text-blue-500" size={18} />
                  <p>16 ARUMUGAM ROAD, #05-07, LTC BUILDING D, 409961 SINGAPORE</p>
                </div>
              </div>
            </div>
          </div>
          
                  </div>
        <div className="text-center mt-12 pt-12 border-t border-gray-200">
          
          <p className="text-gray-500">Copyright © {currentYear} Waiko International Sdn Bhd</p>
        </div>
      </div>

      {/* Floating Contact Buttons - Contact Page Only */}
      <AnimatePresence>
        {showContactButtons && isContactPage && (
          <motion.div
            initial={{ opacity: 0, x: -100, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -100, scale: 0.8 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="fixed left-4 bottom-4 z-50 space-y-3 flex flex-col items-start"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <WhatsAppButton />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <EmailButton />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
};

export default Footer;
