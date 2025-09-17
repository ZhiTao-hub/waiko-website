import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';
import PageHero from '../components/PageHero';
import { Building2, MapPin, Factory, Award, HardHat, Wrench, CheckCircle } from 'lucide-react';
import { keyPoints } from '../data/aboutPageData';

const fadeInUp = {
  hidden: { opacity: 0, y: 80, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 1.4
    }
  },
};

// Helper functions for mind map positioning
const getInitialPosition = (index: number) => {
  const positions = [
    { x: -100, y: -100 },  // Top-left starts further out
    { x: 100, y: -100 },   // Top-right starts further out
    { x: -100, y: 100 },   // Bottom-left starts further out
    { x: 100, y: 100 }     // Bottom-right starts further out
  ];
  return positions[index];
};

const getConnectionLineClasses = (index: number) => {
  const lines = [
    'top-1/2 left-full w-20 h-0.5 bg-gradient-to-r from-blue-400 to-transparent transform rotate-45',  // Top-left to center
    'top-1/2 right-full w-20 h-0.5 bg-gradient-to-l from-indigo-400 to-transparent transform -rotate-45', // Top-right to center
    'bottom-1/2 left-full w-20 h-0.5 bg-gradient-to-r from-purple-400 to-transparent transform -rotate-45', // Bottom-left to center
    'bottom-1/2 right-full w-20 h-0.5 bg-gradient-to-l from-cyan-400 to-transparent transform rotate-45'   // Bottom-right to center
  ];
  return lines[index];
};

const About: React.FC = () => {
  useEffect(() => {
    AOS.init({ duration: 900, once: true, offset: 40 });

    // Add class to body for about page specific styling
    document.body.classList.add('about-page');

    // Cleanup function to remove the class when component unmounts
    return () => {
      document.body.classList.remove('about-page');
    };
  }, []);

  const specializationImages = [
    "/313_files/Spec1.jpg",
    "/313_files/Spec2.jpg",
    "/313_files/Spec3.jpg",
  ];

  return (
    <div className="relative">
      {/* Enhanced Background with Blue & Red Gradients */}
      <div className="fixed inset-0 -z-50 bg-gradient-to-br from-accent-blue/20 via-white to-accent-red/20"></div>

      {/* Enhanced Animated Background Elements */}
      <div className="fixed inset-0 -z-40">
        {/* Enhanced Grid Pattern with Blue & Red */}
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full">
            <defs>
              <pattern id="main-grid-pattern" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="url(#grid-gradient)" strokeWidth="1" />
                <circle cx="30" cy="30" r="2" fill="url(#dot-gradient)" opacity="0.6" />
                <path d="M 15 30 L 45 30 M 30 15 L 30 45" stroke="url(#cross-gradient)" strokeWidth="0.5" opacity="0.4" />
              </pattern>
              <linearGradient id="grid-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="50%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#ef4444" />
              </linearGradient>
              <radialGradient id="dot-gradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#ef4444" />
              </radialGradient>
              <linearGradient id="cross-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#ef4444" />
              </linearGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#main-grid-pattern)" />
          </svg>
        </div>

        {/* Secondary Grid Pattern for Depth */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full">
            <defs>
              <pattern id="secondary-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#3b82f6" strokeWidth="0.3" />
                <rect x="8" y="8" width="4" height="4" fill="none" stroke="#ef4444" strokeWidth="0.2" opacity="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#secondary-grid)" />
          </svg>
        </div>

        {/* Enhanced Animated Gradient Orbs */}
        <motion.div
          className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-accent-blue/30 to-purple-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, 150, 0],
            y: [0, 80, 0],
            scale: [1, 1.3, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-tl from-accent-red/30 to-pink-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, -120, 0],
            y: [0, -60, 0],
            scale: [1, 1.4, 1],
            rotate: [0, -180, -360],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-accent-blue/20 to-accent-red/20 rounded-full blur-2xl"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.6, 0.3],
            rotate: [0, 360, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Floating Geometric Elements */}
        <motion.div
          className="absolute top-1/4 right-1/4 w-8 h-8 bg-gradient-to-r from-accent-blue/40 to-accent-red/40 rotate-45"
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            rotate: [45, 405, 45],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/3 left-1/3 w-6 h-6 bg-gradient-to-r from-accent-red/40 to-accent-blue/40 rounded-full"
          animate={{
            y: [15, -15, 15],
            x: [8, -8, 8],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-2/3 left-1/5 w-4 h-16 bg-gradient-to-b from-accent-blue/30 to-transparent rounded-full"
          animate={{
            scaleY: [1, 1.5, 1],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Content with higher z-index */}
      <div className="relative z-10">
        <PageHero
          title="ABOUT US"
          subtitle="One Stop Specialist Engineering, Equipment Manufacturer and Construction Company"
          icon={<Building2 className="text-accent-blue" size={72} />}
        />
      </div>

      {/* Introduction Section - Mind Map */}
      <section className="py-20 relative overflow-hidden" data-aos="fade-up">
        {/* Consistent Grid Background - Mind Map */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/10 via-white/95 to-accent-red/10" />

          {/* Consistent Grid Pattern with Locate Us */}
          <div className="absolute inset-0 opacity-15">
            <svg className="w-full h-full" aria-hidden="true">
              <defs>
                <pattern id="mindmap-grid-pattern" width="50" height="50" patternUnits="userSpaceOnUse">
                  <path d="M 50 0 L 0 0 0 50" fill="none" stroke="url(#mindmap-grid-gradient)" strokeWidth="1" />
                  <circle cx="25" cy="25" r="1.5" fill="url(#mindmap-dot-gradient)" opacity="0.7" />
                  <path d="M 12.5 25 L 37.5 25 M 25 12.5 L 25 37.5" stroke="url(#mindmap-cross-gradient)" strokeWidth="0.4" opacity="0.5" />
                  <rect x="20" y="20" width="10" height="10" fill="none" stroke="url(#mindmap-rect-gradient)" strokeWidth="0.3" opacity="0.4" />
                </pattern>
                <linearGradient id="mindmap-grid-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#ef4444" />
                </linearGradient>
                <radialGradient id="mindmap-dot-gradient" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#ef4444" />
                </radialGradient>
                <linearGradient id="mindmap-cross-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#ef4444" />
                </linearGradient>
                <linearGradient id="mindmap-rect-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ef4444" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
              </defs>
              <rect width="100%" height="100%" fill="url(#mindmap-grid-pattern)" />
            </svg>
          </div>

          <motion.div className="absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-br from-accent-blue/25 to-purple-500/15 blur-3xl rounded-full" animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.7, 0.4], x: [-30, 30, -30], rotate: [0, 180, 360] }} transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }} />
          <motion.div className="absolute -bottom-32 -right-32 w-80 h-80 bg-gradient-to-tl from-accent-red/25 to-pink-500/15 blur-3xl rounded-full" animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 0.8, 0.5], y: [-20, 20, -20], rotate: [0, -180, -360] }} transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }} />
        </div>

        <motion.div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* Mind Map Layout - Central Title with 4 Containers Around It */}
          <motion.div
            className="relative min-h-[900px] lg:min-h-[900px] w-full"
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >

            {/* Desktop Layout - 4 Corners Around Center */}
            <div className="hidden lg:block absolute inset-0">
              <div className="relative w-full h-full max-w-7xl mx-auto">
                <div className="relative w-full h-full">
                  {keyPoints.map((point, index) => {
                    // Calculate positions around the center circle with better spacing
                    const positions = [
                      { top: '10%', left: '8%' },      // Top-left
                      { top: '10%', right: '8%' },     // Top-right
                      { bottom: '10%', left: '8%' },   // Bottom-left
                      { bottom: '10%', right: '8%' }   // Bottom-right
                    ];

                    const position = positions[index];

                    return (
                      <motion.div
                        key={index}
                        className="absolute w-72 group"
                        style={position}
                        initial={{
                          opacity: 0,
                          scale: 0.5,
                          rotateY: -15,
                          ...getInitialPosition(index)
                        }}
                        whileInView={{
                          opacity: 1,
                          scale: 1,
                          x: 0,
                          y: 0,
                          rotateY: 0
                        }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 1.2,
                          delay: 0.3 + index * 0.15,
                          ease: "easeOut",
                          type: "spring",
                          stiffness: 100
                        }}
                        whileHover={{
                          scale: 1.08,
                          y: -15,
                          rotateY: 2,
                          transition: { duration: 0.3, ease: "easeOut" }
                        }}
                      >
                        {/* Connection Line to Center */}
                        <div className={`absolute ${getConnectionLineClasses(index)} opacity-30 group-hover:opacity-60 transition-opacity duration-300`} />

                        {/* Premium Container Design */}
                        <motion.div
                          className="relative overflow-hidden p-6 rounded-3xl bg-white/95 backdrop-blur-lg border border-white/60 shadow-xl hover:shadow-2xl transition-all duration-500 group-hover:bg-white/98"
                          whileHover={{
                            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                            backgroundColor: "rgba(255, 255, 255, 0.98)",
                            borderColor: "rgba(255, 255, 255, 0.8)"
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          {/* Simple decorative corner frames */}
                          <div className="absolute inset-0 pointer-events-none">
                            <div className="absolute top-3 left-3 w-5 h-0.5 bg-gradient-to-r from-blue-500 to-transparent rounded-full opacity-70" />
                            <div className="absolute top-3 left-3 w-0.5 h-5 bg-gradient-to-b from-blue-500 to-transparent rounded-full opacity-70" />
                            <div className="absolute top-3 right-3 w-5 h-0.5 bg-gradient-to-l from-blue-500 to-transparent rounded-full opacity-70" />
                            <div className="absolute top-3 right-3 w-0.5 h-5 bg-gradient-to-b from-blue-500 to-transparent rounded-full opacity-70" />
                            <div className="absolute bottom-3 left-3 w-5 h-0.5 bg-gradient-to-r from-blue-500 to-transparent rounded-full opacity-70" />
                            <div className="absolute bottom-3 left-3 w-0.5 h-5 bg-gradient-to-t from-blue-500 to-transparent rounded-full opacity-70" />
                            <div className="absolute bottom-3 right-3 w-5 h-0.5 bg-gradient-to-l from-blue-500 to-transparent rounded-full opacity-70" />
                            <div className="absolute bottom-3 right-3 w-0.5 h-5 bg-gradient-to-t from-blue-500 to-transparent rounded-full opacity-70" />

                            {/* Quality indicator */}
                            <div className="absolute top-2 right-2 w-3 h-3 bg-gradient-to-br from-green-400 to-green-500 rounded-full opacity-80" />
                          </div>

                          {/* Simple decorative background accents */}
                          <div className="pointer-events-none absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-br from-blue-400/10 to-purple-400/5 rounded-full blur-xl opacity-60" />
                          <div className="pointer-events-none absolute -bottom-8 -left-8 w-28 h-28 bg-gradient-to-tl from-purple-400/10 to-blue-400/5 rounded-full blur-xl opacity-50" />

                          {/* Content */}
                          <div className="relative z-10">
                            {/* Icon Container */}
                            <motion.div
                              className="flex justify-center mb-4"
                              whileHover={{ scale: 1.1 }}
                              transition={{ duration: 0.3 }}
                            >
                              <div className="relative">
                                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                                  <point.icon className="w-8 h-8 text-white" />
                                </div>
                              </div>
                            </motion.div>

                            {/* Text Content */}
                            <motion.div
                              className="text-center"
                              initial={{ opacity: 0, y: 20 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                            >
                              <motion.h3
                                className="text-lg font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300"
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.2 }}
                              >
                                {point.title}
                              </motion.h3>
                              <motion.p
                                className="text-gray-700 text-sm leading-relaxed"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.6 + index * 0.1 }}
                              >
                                {point.description}
                              </motion.p>
                            </motion.div>
                          </div>

                          {/* Subtle inner border */}
                          <motion.div
                            className="absolute inset-2 rounded-2xl border border-blue-200/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.3 }}
                          />
                        </motion.div>
                      </motion.div>
                    );
                  })}

                  {/* Central Mind Map Title - Positioned in True Geometric Center */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
                      whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 1.5,
                        delay: 1.2,
                        ease: "easeOut",
                        type: "spring",
                        stiffness: 80
                      }}
                      whileHover={{
                        scale: 1.05,
                        rotateY: [0, 5, -5, 0],
                        transition: { duration: 0.8 }
                      }}
                      className="z-30 flex items-center justify-center"
                    >
                      <div className="relative flex items-center justify-center">
                        <div className="w-96 h-96 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl">
                          <div className="w-80 h-80 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-full flex items-center justify-center border-8 border-blue-500">
                            <div className="text-center px-10">
                              <h1 className="text-3xl font-bold text-blue-600 leading-tight mb-2">
                                WAIKO
                              </h1>
                              <h1 className="text-2xl font-bold text-blue-600 leading-tight">
                                INTERNATIONAL
                              </h1>
                              <div className="w-20 h-1 bg-blue-500 mx-auto mt-4 rounded-full" />
                            </div>
                          </div>
                        </div>


                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Layout - Enhanced Circular Flow Design */}
            <div className="lg:hidden space-y-12">
              {/* Central Title First on Mobile */}
              <div className="flex justify-center mb-12">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
                  whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 1.5,
                    delay: 0.3,
                    ease: "easeOut",
                    type: "spring",
                    stiffness: 80
                  }}
                  whileHover={{
                    scale: 1.05,
                    rotateY: [0, 5, -5, 0],
                    transition: { duration: 0.8 }
                  }}
                  className="z-30 flex items-center justify-center"
                >
                  <div className="relative flex items-center justify-center">
                    <div className="w-72 h-72 sm:w-80 sm:h-80 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl">
                      <div className="w-64 h-64 sm:w-72 sm:h-72 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-full flex items-center justify-center border-6 border-blue-500">
                        <div className="text-center px-6 sm:px-8">
                          <h1 className="text-xl sm:text-2xl font-bold text-blue-600 leading-tight mb-2">
                            WAIKO
                          </h1>
                          <h1 className="text-lg sm:text-xl font-bold text-blue-600 leading-tight">
                            INTERNATIONAL
                          </h1>
                          <div className="w-16 h-1 bg-blue-500 mx-auto mt-3 rounded-full" />
                        </div>
                      </div>
                    </div>


                  </div>
                </motion.div>
              </div>

              {/* Enhanced Mobile Cards - Circular Flow Layout */}
              <div className="relative px-4">
                {/* Connection Lines for Mobile */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <svg className="w-full h-full max-w-md max-h-md" viewBox="0 0 300 400">
                    <defs>
                      <linearGradient id="mobile-connection-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                        <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="#ef4444" stopOpacity="0.3" />
                      </linearGradient>
                    </defs>
                    {/* Curved connection lines */}
                    <path d="M 150 50 Q 75 150 150 200 Q 225 150 150 50" fill="none" stroke="url(#mobile-connection-gradient)" strokeWidth="2" opacity="0.4" />
                    <path d="M 150 200 Q 75 300 150 350 Q 225 300 150 200" fill="none" stroke="url(#mobile-connection-gradient)" strokeWidth="2" opacity="0.4" />
                    <path d="M 50 150 Q 150 100 250 150 Q 150 200 50 150" fill="none" stroke="url(#mobile-connection-gradient)" strokeWidth="1.5" opacity="0.3" />
                  </svg>
                </div>

                {/* Cards in Circular Flow Pattern */}
                <div className="space-y-8">
                  {keyPoints.map((point, index) => {
                    // Create a flowing pattern: top-left, top-right, bottom-left, bottom-right
                    const positions = [
                      'justify-start',     // Card 1: Left
                      'justify-end',       // Card 2: Right  
                      'justify-start',     // Card 3: Left
                      'justify-end'        // Card 4: Right
                    ];

                    const cardColors = [
                      'from-blue-500/10 to-indigo-500/5',
                      'from-purple-500/10 to-pink-500/5',
                      'from-emerald-500/10 to-teal-500/5',
                      'from-orange-500/10 to-red-500/5'
                    ];

                    const iconColors = [
                      'from-blue-500 to-indigo-600',
                      'from-purple-500 to-pink-600',
                      'from-emerald-500 to-teal-600',
                      'from-orange-500 to-red-600'
                    ];

                    return (
                      <motion.div
                        key={`mobile-flow-${index}`}
                        className={`flex ${positions[index]} relative`}
                        initial={{
                          opacity: 0,
                          scale: 0.7,
                          x: index % 2 === 0 ? -60 : 60,
                          y: 30
                        }}
                        whileInView={{
                          opacity: 1,
                          scale: 1,
                          x: 0,
                          y: 0
                        }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 1.0,
                          delay: 0.4 + index * 0.2,
                          ease: "easeOut",
                          type: "spring",
                          stiffness: 120
                        }}
                      >
                        {/* Connection Dot */}
                        <motion.div
                          className={`absolute ${index % 2 === 0 ? '-right-2' : '-left-2'} top-1/2 -translate-y-1/2 w-4 h-4 bg-gradient-to-r ${iconColors[index]} rounded-full shadow-lg z-10`}
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: 0.6 + index * 0.2 }}
                          animate={{
                            boxShadow: [
                              "0 0 0 0 rgba(59, 130, 246, 0.4)",
                              "0 0 0 8px rgba(59, 130, 246, 0)",
                              "0 0 0 0 rgba(59, 130, 246, 0.4)"
                            ]
                          }}
                        />

                        <motion.div
                          className="group w-72 sm:w-80"
                          whileHover={{
                            scale: 1.03,
                            y: -5,
                            transition: { duration: 0.3, ease: "easeOut" }
                          }}
                        >
                          {/* Enhanced Container Design */}
                          <motion.div
                            className={`relative overflow-hidden p-5 sm:p-6 rounded-2xl bg-gradient-to-br ${cardColors[index]} backdrop-blur-lg border border-white/40 shadow-xl hover:shadow-2xl transition-all duration-500 group-hover:border-white/60`}
                            whileHover={{
                              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
                              backgroundColor: "rgba(255, 255, 255, 0.95)",
                            }}
                            transition={{ duration: 0.3 }}
                          >
                            {/* Flowing decorative elements */}
                            <div className="absolute inset-0 pointer-events-none">
                              {/* Animated corner accents */}
                              <motion.div
                                className={`absolute top-3 ${index % 2 === 0 ? 'left-3' : 'right-3'} w-6 h-0.5 bg-gradient-to-r ${iconColors[index]} rounded-full opacity-60`}
                                animate={{ scaleX: [1, 1.5, 1] }}
                                transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                              />
                              <motion.div
                                className={`absolute top-3 ${index % 2 === 0 ? 'left-3' : 'right-3'} w-0.5 h-6 bg-gradient-to-b ${iconColors[index]} rounded-full opacity-60`}
                                animate={{ scaleY: [1, 1.5, 1] }}
                                transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 + 0.5 }}
                              />

                              {/* Floating quality indicator */}
                              <motion.div
                                className={`absolute top-2 ${index % 2 === 0 ? 'right-2' : 'left-2'} w-3 h-3 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full opacity-70`}
                                animate={{
                                  scale: [1, 1.2, 1],
                                  opacity: [0.7, 1, 0.7]
                                }}
                                transition={{ duration: 3, repeat: Infinity, delay: index * 0.3 }}
                              />
                            </div>

                            {/* Enhanced background glow */}
                            <motion.div
                              className={`pointer-events-none absolute -top-8 ${index % 2 === 0 ? '-left-8' : '-right-8'} w-24 h-24 rounded-full bg-gradient-to-br ${iconColors[index].replace('to-', 'to-').replace('-600', '/20').replace('-500', '/15')} blur-xl group-hover:scale-125 group-hover:opacity-80 transition-all duration-500`}
                            />

                            {/* Content Layout */}
                            <div className={`relative z-10 flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} items-center gap-4`}>
                              {/* Icon Container */}
                              <motion.div
                                className="flex-shrink-0"
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                transition={{ duration: 0.3 }}
                              >
                                <motion.div
                                  className={`w-16 h-16 bg-gradient-to-br ${iconColors[index]} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300`}
                                  whileHover={{
                                    rotate: [0, -5, 5, 0],
                                    transition: { duration: 0.5 }
                                  }}
                                >
                                  <motion.div
                                    whileHover={{ scale: 1.2, rotate: 360 }}
                                    transition={{ duration: 0.6 }}
                                  >
                                    <point.icon className="w-8 h-8 text-white" />
                                  </motion.div>
                                </motion.div>
                              </motion.div>

                              {/* Text Content */}
                              <motion.div
                                className={`flex-1 ${index % 2 === 0 ? 'text-left' : 'text-right'}`}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                              >
                                <motion.h3
                                  className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300"
                                  whileHover={{ scale: 1.02 }}
                                  transition={{ duration: 0.2 }}
                                >
                                  {point.title}
                                </motion.h3>
                                <motion.p
                                  className="text-gray-700 text-sm leading-relaxed"
                                  initial={{ opacity: 0 }}
                                  whileInView={{ opacity: 1 }}
                                  viewport={{ once: true }}
                                  transition={{ duration: 0.8, delay: 0.7 + index * 0.1 }}
                                >
                                  {point.description}
                                </motion.p>
                              </motion.div>
                            </div>

                            {/* Subtle flowing border */}
                            <motion.div
                              className="absolute inset-2 rounded-xl border border-blue-200/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                              animate={{
                                borderColor: [
                                  "rgba(59, 130, 246, 0.2)",
                                  "rgba(147, 51, 234, 0.2)",
                                  "rgba(239, 68, 68, 0.2)",
                                  "rgba(59, 130, 246, 0.2)"
                                ]
                              }}
                              transition={{ duration: 4, repeat: Infinity }}
                            />
                          </motion.div>
                        </motion.div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Main Content */}
      <div id="content">
        {/* WHERE OUR PLACES - Combined Malaysia and Singapore Locations */}
        <section className="py-20 relative overflow-hidden" data-aos="fade-up">
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/10 via-white/95 to-accent-red/10" />

            {/* Enhanced Grid Pattern with Blue & Red Theme */}
            <div className="absolute inset-0 opacity-15">
              <svg className="w-full h-full" aria-hidden="true">
                <defs>
                  <pattern id="location-grid-pattern" width="50" height="50" patternUnits="userSpaceOnUse">
                    <path d="M 50 0 L 0 0 0 50" fill="none" stroke="url(#location-grid-gradient)" strokeWidth="1" />
                    <circle cx="25" cy="25" r="1.5" fill="url(#location-dot-gradient)" opacity="0.7" />
                    <path d="M 12.5 25 L 37.5 25 M 25 12.5 L 25 37.5" stroke="url(#location-cross-gradient)" strokeWidth="0.4" opacity="0.5" />
                    <rect x="20" y="20" width="10" height="10" fill="none" stroke="url(#location-rect-gradient)" strokeWidth="0.3" opacity="0.4" />
                  </pattern>
                  <linearGradient id="location-grid-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#ef4444" />
                  </linearGradient>
                  <radialGradient id="location-dot-gradient" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#ef4444" />
                  </radialGradient>
                  <linearGradient id="location-cross-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#ef4444" />
                  </linearGradient>
                  <linearGradient id="location-rect-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ef4444" />
                    <stop offset="100%" stopColor="#3b82f6" />
                  </linearGradient>
                </defs>
                <rect width="100%" height="100%" fill="url(#location-grid-pattern)" />
              </svg>
            </div>

            <motion.div className="absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-br from-accent-blue/25 to-purple-500/15 blur-3xl rounded-full" animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.7, 0.4], x: [-30, 30, -30], rotate: [0, 180, 360] }} transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }} />
            <motion.div className="absolute -bottom-32 -right-32 w-80 h-80 bg-gradient-to-tl from-accent-red/25 to-pink-500/15 blur-3xl rounded-full" animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 0.8, 0.5], y: [-20, 20, -20], rotate: [0, -180, -360] }} transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }} />
          </div>

          <motion.div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1, ease: "easeOut" }}>
            {/* Section Header */}
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 heading-underline">
                LOCATE US
              </h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                Our strategic locations across Southeast Asia
              </p>
            </motion.div>

            {/* Optimized Malaysia and Singapore Location Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
              {/* Malaysia Office - Enhanced Layout */}
              <motion.div
                className="relative overflow-hidden rounded-3xl shadow-2xl group"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2 }}
                whileHover={{ scale: 1.02, y: -8, transition: { duration: 0.4 } }}
              >
                <div className="relative bg-gradient-to-br from-white/95 via-emerald-50/30 to-teal-50/40 border-2 border-emerald-200/50 rounded-2xl sm:rounded-3xl w-full overflow-hidden backdrop-blur-sm h-full flex flex-col">
                  {/* Enhanced Corner Decorations */}
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-3 sm:top-4 left-3 sm:left-4 w-6 sm:w-8 h-0.5 bg-gradient-to-r from-emerald-500 to-transparent rounded-full opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute top-3 sm:top-4 left-3 sm:left-4 w-0.5 h-6 sm:h-8 bg-gradient-to-b from-emerald-500 to-transparent rounded-full opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute top-3 sm:top-4 right-3 sm:right-4 w-6 sm:w-8 h-0.5 bg-gradient-to-l from-teal-500 to-transparent rounded-full opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute top-3 sm:top-4 right-3 sm:right-4 w-0.5 h-6 sm:h-8 bg-gradient-to-b from-teal-500 to-transparent rounded-full opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 w-6 sm:w-8 h-0.5 bg-gradient-to-r from-green-500 to-transparent rounded-full opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 w-0.5 h-6 sm:h-8 bg-gradient-to-t from-green-500 to-transparent rounded-full opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 w-6 sm:w-8 h-0.5 bg-gradient-to-l from-blue-500 to-transparent rounded-full opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 w-0.5 h-6 sm:h-8 bg-gradient-to-t from-blue-500 to-transparent rounded-full opacity-70 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Country Flag Badge */}
                    <div className="absolute top-2 sm:top-3 right-2 sm:right-3 w-3 sm:w-4 h-3 sm:h-4 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full opacity-80 group-hover:scale-125 transition-all duration-300 shadow-lg" />
                  </div>

                  {/* Optimized Map Section - Better Proportions */}
                  <div className="relative h-48 sm:h-64 lg:h-72 w-full rounded-t-2xl sm:rounded-t-3xl overflow-hidden">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3977.4551039336616!2d101.04282761075874!3d4.511687543247788!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cae8e6fc7e0c5d%3A0x94e36532e0e235d2!2sWaiko%20International%20Sdn%20Bhd!5e0!3m2!1sen!2smy!4v1757043345210!5m2!1sen!2smy"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="transition-all duration-500 group-hover:brightness-110"
                    />

                    {/* Map Overlay Badge */}
                    <div className="absolute top-3 sm:top-4 left-3 sm:left-4 bg-white/90 backdrop-blur-sm rounded-full px-2 sm:px-3 py-1 sm:py-1.5 shadow-lg">
                      <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        Malaysia HQ
                      </span>
                    </div>
                  </div>

                  {/* Enhanced Details Section - Better Spacing */}
                  <div className="flex-1 p-4 sm:p-6 space-y-3 sm:space-y-4">
                    {/* Header */}
                    <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                      <div className="w-8 sm:w-10 h-8 sm:h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg">
                        <MapPin className="w-4 sm:w-5 h-4 sm:h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-base sm:text-lg font-bold text-gray-900 font-orbitron">MALAYSIA HEADQUARTERS</h3>
                        <p className="text-xs text-emerald-600 font-medium">Primary Operations Center</p>
                      </div>
                    </div>

                    {/* Optimized Information Grid */}
                    <div className="space-y-2 sm:space-y-3">
                      <motion.div
                        className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg sm:rounded-xl bg-emerald-50/50 hover:bg-emerald-50/80 transition-colors duration-300"
                        whileHover={{ x: 4 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Award className="w-3 sm:w-4 h-3 sm:h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                        <div className="text-xs sm:text-sm">
                          <span className="font-semibold text-gray-900">CIDB Registration:</span>
                          <span className="text-gray-700 ml-1">Grade G7</span>
                        </div>
                      </motion.div>

                      <motion.div
                        className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg sm:rounded-xl bg-teal-50/50 hover:bg-teal-50/80 transition-colors duration-300"
                        whileHover={{ x: 4 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Award className="w-3 sm:w-4 h-3 sm:h-4 text-teal-600 mt-0.5 flex-shrink-0" />
                        <div className="text-xs sm:text-sm">
                          <span className="font-semibold text-gray-900">Certifications:</span>
                          <p className="text-gray-700 mt-1 leading-relaxed">ISO 9001:2015 / OHSAS 18001:2007 / ISO ENV 14001:2015 / ISO 45001:2018</p>
                        </div>
                      </motion.div>

                      <motion.div
                        className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg sm:rounded-xl bg-green-50/50 hover:bg-green-50/80 transition-colors duration-300"
                        whileHover={{ x: 4 }}
                        transition={{ duration: 0.2 }}
                      >
                        <MapPin className="w-3 sm:w-4 h-3 sm:h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <div className="text-xs sm:text-sm">
                          <span className="font-semibold text-gray-900">Address:</span>
                          <p className="text-gray-700 mt-1 leading-relaxed">PLOT 9559 & 9560, JALAN JOHAN 2/6, PENGKALAN 2, 31550 PERAK, MALAYSIA</p>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Singapore Branch - Enhanced Layout */}
              <motion.div
                className="relative overflow-hidden rounded-3xl shadow-2xl group"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.4 }}
                whileHover={{ scale: 1.02, y: -8, transition: { duration: 0.4 } }}
              >
                <div className="relative bg-gradient-to-br from-white/95 via-red-50/30 to-orange-50/40 border-2 border-red-200/50 rounded-2xl sm:rounded-3xl w-full overflow-hidden backdrop-blur-sm h-full flex flex-col">
                  {/* Enhanced Corner Decorations */}
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-3 sm:top-4 left-3 sm:left-4 w-6 sm:w-8 h-0.5 bg-gradient-to-r from-red-500 to-transparent rounded-full opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute top-3 sm:top-4 left-3 sm:left-4 w-0.5 h-6 sm:h-8 bg-gradient-to-b from-red-500 to-transparent rounded-full opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute top-3 sm:top-4 right-3 sm:right-4 w-6 sm:w-8 h-0.5 bg-gradient-to-l from-orange-500 to-transparent rounded-full opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute top-3 sm:top-4 right-3 sm:right-4 w-0.5 h-6 sm:h-8 bg-gradient-to-b from-orange-500 to-transparent rounded-full opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 w-6 sm:w-8 h-0.5 bg-gradient-to-r from-rose-500 to-transparent rounded-full opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 w-0.5 h-6 sm:h-8 bg-gradient-to-t from-rose-500 to-transparent rounded-full opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 w-6 sm:w-8 h-0.5 bg-gradient-to-l from-pink-500 to-transparent rounded-full opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 w-0.5 h-6 sm:h-8 bg-gradient-to-t from-pink-500 to-transparent rounded-full opacity-70 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Country Flag Badge */}
                    <div className="absolute top-2 sm:top-3 right-2 sm:right-3 w-3 sm:w-4 h-3 sm:h-4 bg-gradient-to-br from-red-400 to-orange-500 rounded-full opacity-80 group-hover:scale-125 transition-all duration-300 shadow-lg" />
                  </div>

                  {/* Optimized Map Section - Better Proportions */}
                  <div className="relative h-48 sm:h-64 lg:h-72 w-full rounded-t-2xl sm:rounded-t-3xl overflow-hidden">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d249.29693264925507!2d103.89130698783855!3d1.325360234558038!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da19db788641cf%3A0x42ec07625822aa77!2sLTC%20Building%20D!5e0!3m2!1sen!2smy!4v1757043462542!5m2!1sen!2smy"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="transition-all duration-500 group-hover:brightness-110"
                    />

                    {/* Map Overlay Badge */}
                    <div className="absolute top-3 sm:top-4 left-3 sm:left-4 bg-white/90 backdrop-blur-sm rounded-full px-2 sm:px-3 py-1 sm:py-1.5 shadow-lg">
                      <span className="text-xs font-semibold text-red-600 flex items-center gap-1">
                        <Building2 className="w-3 h-3" />
                        Singapore Branch
                      </span>
                    </div>
                  </div>

                  {/* Enhanced Details Section - Better Spacing */}
                  <div className="flex-1 p-4 sm:p-6 space-y-3 sm:space-y-4">
                    {/* Header */}
                    <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                      <div className="w-8 sm:w-10 h-8 sm:h-10 bg-gradient-to-br from-red-500 to-orange-600 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg">
                        <Building2 className="w-4 sm:w-5 h-4 sm:h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-base sm:text-lg font-bold text-gray-900 font-orbitron">SINGAPORE BRANCH</h3>
                        <p className="text-xs text-red-600 font-medium">Regional Operations</p>
                      </div>
                    </div>

                    {/* Optimized Information Grid */}
                    <div className="space-y-2 sm:space-y-3">
                      <motion.div
                        className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg sm:rounded-xl bg-red-50/50 hover:bg-red-50/80 transition-colors duration-300"
                        whileHover={{ x: 4 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Award className="w-3 sm:w-4 h-3 sm:h-4 text-red-600 mt-0.5 flex-shrink-0" />
                        <div className="text-xs sm:text-sm">
                          <span className="font-semibold text-gray-900">Company:</span>
                          <p className="text-gray-700 mt-1">WAIKO INTERNATIONAL SDN. BHD. (Singapore Branch)</p>
                          <p className="text-gray-700 mt-1"><span className="font-semibold">UEN:</span> T22FC0059E</p>
                        </div>
                      </motion.div>

                      <motion.div
                        className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg sm:rounded-xl bg-orange-50/50 hover:bg-orange-50/80 transition-colors duration-300"
                        whileHover={{ x: 4 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Award className="w-3 sm:w-4 h-3 sm:h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                        <div className="text-xs sm:text-sm">
                          <span className="font-semibold text-gray-900">BCA Registration:</span>
                          <p className="text-gray-700 mt-1 leading-relaxed">SPECIALIST BUILDER LICENSE – IN SITU POST TENSIONING SB(PT)</p>
                        </div>
                      </motion.div>

                      <motion.div
                        className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg sm:rounded-xl bg-rose-50/50 hover:bg-rose-50/80 transition-colors duration-300"
                        whileHover={{ x: 4 }}
                        transition={{ duration: 0.2 }}
                      >
                        <MapPin className="w-3 sm:w-4 h-3 sm:h-4 text-rose-600 mt-0.5 flex-shrink-0" />
                        <div className="text-xs sm:text-sm">
                          <span className="font-semibold text-gray-900">Address:</span>
                          <p className="text-gray-700 mt-1 leading-relaxed">16 ARUMUGAM ROAD, #05-07, LTC BUILDING D, SINGAPORE 409961</p>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>


        {/* SPECIALIZATIONS SECTION - Simple Background */}
        <section id="specializations" className="relative overflow-hidden py-16" data-aos="fade-up">
          {/* Consistent Grid Background - Specializations */}
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/10 via-white/95 to-accent-red/10" />

            {/* Consistent Grid Pattern with Locate Us */}
            <div className="absolute inset-0 opacity-15">
              <svg className="w-full h-full" aria-hidden="true">
                <defs>
                  <pattern id="specialization-grid-pattern" width="50" height="50" patternUnits="userSpaceOnUse">
                    <path d="M 50 0 L 0 0 0 50" fill="none" stroke="url(#spec-grid-gradient)" strokeWidth="1" />
                    <circle cx="25" cy="25" r="1.5" fill="url(#spec-dot-gradient)" opacity="0.7" />
                    <path d="M 12.5 25 L 37.5 25 M 25 12.5 L 25 37.5" stroke="url(#spec-cross-gradient)" strokeWidth="0.4" opacity="0.5" />
                    <rect x="20" y="20" width="10" height="10" fill="none" stroke="url(#spec-rect-gradient)" strokeWidth="0.3" opacity="0.4" />
                  </pattern>
                  <linearGradient id="spec-grid-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#ef4444" />
                  </linearGradient>
                  <radialGradient id="spec-dot-gradient" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#ef4444" />
                  </radialGradient>
                  <linearGradient id="spec-cross-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#ef4444" />
                  </linearGradient>
                  <linearGradient id="spec-rect-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ef4444" />
                    <stop offset="100%" stopColor="#3b82f6" />
                  </linearGradient>
                </defs>
                <rect width="100%" height="100%" fill="url(#specialization-grid-pattern)" />
              </svg>
            </div>

            <motion.div className="absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-br from-accent-blue/25 to-purple-500/15 blur-3xl rounded-full" animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.7, 0.4], x: [-30, 30, -30], rotate: [0, 180, 360] }} transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }} />
            <motion.div className="absolute -bottom-32 -right-32 w-80 h-80 bg-gradient-to-tl from-accent-red/25 to-pink-500/15 blur-3xl rounded-full" animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 0.8, 0.5], y: [-20, 20, -20], rotate: [0, -180, -360] }} transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }} />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
            {/* Header */}
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 heading-underline">
                OUR SPECIALIZATIONS
              </h2>
              <p className="text-lg text-gray-700 max-w-4xl mx-auto">
                Comprehensive engineering capabilities across design, manufacturing, and specialized contracting services
              </p>
            </motion.div>

            {/* Specializations Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
              {[
                {
                  icon: <Wrench className="w-7 h-7" />,
                  title: 'Design & Manufacturing',
                  image: specializationImages[0],
                  points: [
                    'Design and Manufacture Launching Gantry & Lifter',
                    'Design and Manufacture Tunnel & Bridge Formwork',
                    'Manufacture and Refurbishment of Separation Plant for TBM',
                    'Structural Steel Works'
                  ],
                  color: 'from-blue-500 to-indigo-500',
                  bgColor: 'from-blue-50 to-indigo-50',
                  borderColor: 'border-blue-200/40'
                },
                {
                  icon: <HardHat className="w-7 h-7" />,
                  title: 'Facilities',
                  image: specializationImages[1],
                  points: [
                    'WAIKO WORKSHOP, IPOH',
                    'Land Area 609,840 SQFT, Built Up 60%',
                    'WAIKO FACTORY with Overhead 50TON Crane x 2 Units',
                    'Crane Height 13.2m'
                  ],
                  color: 'from-purple-500 to-pink-500',
                  bgColor: 'from-purple-50 to-pink-50',
                  borderColor: 'border-purple-200/40'
                },
                {
                  icon: <Factory className="w-7 h-7" />,
                  title: 'Contracting Services',
                  image: specializationImages[2],
                  points: [
                    'Specialist Contractor for SBG Erections',
                    'Design and Installer of Tensa Post Tensioning',
                    'Railway Infrastructure Construction',
                    'Highway Road Infrastructures'
                  ],
                  color: 'from-orange-500 to-red-500',
                  bgColor: 'from-orange-50 to-red-50',
                  borderColor: 'border-orange-200/40'
                }
              ].map((card, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: idx * 0.2 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="group"
                >
                  <div className={`relative overflow-hidden p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white/90 backdrop-blur-lg border ${card.borderColor} shadow-lg hover:shadow-2xl transition-all duration-500 h-full`}>
                    {/* Decorative gradient blob */}
                    <div className={`absolute -top-8 sm:-top-10 -right-8 sm:-right-10 w-24 sm:w-32 h-24 sm:h-32 bg-gradient-to-br ${card.color.replace('from-', 'from-').replace('to-', 'to-').replace('-500', '-200/30').replace('-500', '-200/20')} blur-2xl rounded-full group-hover:scale-125 transition-transform duration-500`} />

                    {/* Image */}
                    <div className="relative rounded-xl sm:rounded-2xl overflow-hidden mb-4 sm:mb-6 h-40 sm:h-48">
                      <img
                        src={card.image}
                        alt={card.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

                      {/* Icon Overlay */}
                      <div className={`absolute top-3 sm:top-4 right-3 sm:right-4 w-10 sm:w-12 h-10 sm:h-12 bg-gradient-to-r ${card.color} rounded-lg sm:rounded-xl flex items-center justify-center text-white shadow-lg`}>
                        {React.cloneElement(card.icon, { className: "w-5 h-5 sm:w-7 sm:h-7" })}
                      </div>

                      {/* Number Badge */}
                      <div className="absolute top-3 sm:top-4 left-3 sm:left-4 w-7 sm:w-8 h-7 sm:h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-xs sm:text-sm font-bold text-gray-800 shadow-lg">
                        {idx + 1}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="relative z-10">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
                        <div className={`w-1.5 sm:w-2 h-6 sm:h-8 bg-gradient-to-b ${card.color} rounded-full`} />
                        {card.title}
                      </h3>

                      {/* Points List */}
                      <ul className="space-y-1.5 sm:space-y-2">
                        {card.points.map((point, pointIdx) => (
                          <motion.li
                            key={pointIdx}
                            className="flex items-start text-gray-700 text-xs sm:text-sm"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 * pointIdx }}
                          >
                            <CheckCircle className="w-3 sm:w-4 h-3 sm:h-4 text-emerald-500 mr-1.5 sm:mr-2 mt-0.5 flex-shrink-0" />
                            {point}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;