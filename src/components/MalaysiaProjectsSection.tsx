import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Train, Building2, MapPin, ChevronLeft, ChevronRight, Calendar, CheckCircle, BarChart3 } from 'lucide-react';

interface ProjectCategory {
  id: string;
  title: string;
  subtitle: string;
  period: string;
  color: string;
  bgColor: string;
  icon: React.ReactNode;
  description: string;
  stats: {
    segments: number;
    timeline: string;
    status: string;
  };
  keyFeatures: string[];
  packages: {
    name: string;
    segments: number;
    description: string;
  }[];
  images: string[];
  totalSegments: number;
}

const projectCategories: ProjectCategory[] = [
  {
    id: 'mrt2',
    title: 'MRT 2 - SSP Line',
    subtitle: 'Sungai Buloh-Serdang-Putrajaya Line',
    period: '2017/20',
    color: 'bg-blue-500',
    bgColor: 'from-blue-50 to-blue-100',
    icon: <Train className="w-5 h-5" />,
    description: 'Various packages including V201 Part 1 Segments, V201 V202 Segments, V204 Segments, V205 V206 Segments.',
    stats: {
      segments: 3379,
      timeline: '2019-2022',
      status: 'Completed'
    },
    keyFeatures: [
      'Advanced segmental construction',
      'High-precision manufacturing', 
      'Quality assurance protocols',
      'On-time delivery commitment'
    ],
    packages: [
      { name: 'MRT2 - V202', segments: 2423, description: 'Major package with complex urban segments' },
      { name: 'MRT2 - V204', segments: 622, description: 'High-precision engineering segments' },
      { name: 'MRT2 - V210', segments: 214, description: 'Final phase completion segments' }
    ],
    images: ['/313_files/Malaysia/M1.png', '/313_files/Malaysia/M3.png', '/313_files/Malaysia/M4.png'],
    totalSegments: 3379
  },
  {
    id: 'mrt1',
    title: 'MRT 1 - SBK Line',
    subtitle: 'Sungai Buloh-Kajang Line',
    period: '2013/15',
    color: 'bg-green-500',
    bgColor: 'from-green-50 to-green-100',
    icon: <Building2 className="w-5 h-5" />,
    description: 'Package V7 SSP Segments, Package V4 SSP Segments, Package V202 Segments and V4 Pier Segments.',
    stats: {
      segments: 810,
      timeline: '2016-2019',
      status: 'Completed'
    },
    keyFeatures: [
      'First MRT line in Malaysia',
      'Complex urban construction',
      'Innovative engineering solutions',
      'Sustainable construction practices'
    ],
    packages: [
      { name: 'MRT1 - V1', segments: 375, description: 'Initial phase construction segments' },
      { name: 'MRT1 - V4', segments: 435, description: 'Core infrastructure segments with LG manufacturing' }
    ],
    images: ['/313_files/Malaysia/M2.png', '/313_files/Malaysia/M6.png'],
    totalSegments: 810
  },
  {
    id: 'lrt2',
    title: 'LRT2 - Kelana Line',
    subtitle: 'Light Rail Transit Extension',
    period: '2011/12',
    color: 'bg-orange-500',
    bgColor: 'from-orange-50 to-orange-100',
    icon: <MapPin className="w-5 h-5" />,
    description: 'First phase development of new LRT line connecting Bandar Utama and Klang.',
    stats: {
      segments: 435,
      timeline: '2020-2024',
      status: 'In Progress'
    },
    keyFeatures: [
      'Extended connectivity network',
      'Modern transit solutions',
      'Environmental considerations',
      'Community integration focus'
    ],
    packages: [
      { name: 'LRT2 - Kelana Line', segments: 435, description: 'Design and Manufacture 4 sets of Launching Gantries' }
    ],
    images: ['/313_files/Malaysia/M5.png'],
    totalSegments: 435
  }
];

const MalaysiaProjectsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>(projectCategories[0]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Reset current index when category changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [selectedCategory.id]);

  // Auto-slide functionality
  useEffect(() => {
    if (selectedCategory.images.length <= 1) return;
    
    const timer = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === selectedCategory.images.length - 1 ? 0 : prev + 1
      );
    }, 4000); // every 4 seconds

    return () => clearInterval(timer);
  }, [selectedCategory.images.length]);

  const handlePrevImage = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? selectedCategory.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentIndex((prev) => 
      prev === selectedCategory.images.length - 1 ? 0 : prev + 1
    );
  };

  const handleCategoryChange = (category: ProjectCategory) => {
    setSelectedCategory(category);
  };

  return (
    <section className="py-16 relative overflow-hidden">
      {/* Consistent Grid Background - Malaysia Projects */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/10 via-white/95 to-accent-red/10" />
        
        {/* Consistent Grid Pattern */}
        <div className="absolute inset-0 opacity-15">
          <svg className="w-full h-full" aria-hidden="true">
            <defs>
              <pattern id="malaysia-grid-pattern" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M 50 0 L 0 0 0 50" fill="none" stroke="url(#malaysia-grid-gradient)" strokeWidth="1" />
                <circle cx="25" cy="25" r="1.5" fill="url(#malaysia-dot-gradient)" opacity="0.7" />
                <path d="M 12.5 25 L 37.5 25 M 25 12.5 L 25 37.5" stroke="url(#malaysia-cross-gradient)" strokeWidth="0.4" opacity="0.5" />
                <rect x="20" y="20" width="10" height="10" fill="none" stroke="url(#malaysia-rect-gradient)" strokeWidth="0.3" opacity="0.4" />
              </pattern>
              <linearGradient id="malaysia-grid-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#ef4444" />
              </linearGradient>
              <radialGradient id="malaysia-dot-gradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#ef4444" />
              </radialGradient>
              <linearGradient id="malaysia-cross-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#ef4444" />
              </linearGradient>
              <linearGradient id="malaysia-rect-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ef4444" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#malaysia-grid-pattern)" />
          </svg>
        </div>
        
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-br from-accent-blue/25 to-purple-500/15 blur-3xl rounded-full opacity-60" />
        <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-gradient-to-tl from-accent-red/25 to-pink-500/15 blur-3xl rounded-full opacity-50" />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
            <div className="text-center mb-8 sm:mb-10 lg:mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 px-4 heading-underline">
                  MALAYSIA PROJECTS
                </h2>
                <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-3xl mx-auto mb-4 sm:mb-6">
                  Comprehensive railway infrastructure projects across Malaysia, delivering world-class MRT and LRT systems with precision engineering and quality assurance.
                </p>
                <div className="bg-gradient-to-r from-accent-blue to-accent-red text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full inline-block font-orbitron font-bold text-xs sm:text-sm lg:text-base">
                  <span className="hidden sm:inline">TOTAL SBG ERECTED: </span>4,624 Segments | 12.567 KM
                </div>
              </motion.div>
            </div>

        {/* Category Tabs */}
        <div className="flex justify-center mb-6 sm:mb-8">
          <div className="bg-white/80 backdrop-blur-md rounded-xl sm:rounded-2xl p-1 sm:p-2 border border-gray-200 shadow-lg w-full max-w-4xl">
            <div className="flex flex-col sm:flex-row space-y-1 sm:space-y-0 sm:space-x-2">
              {projectCategories.map((category) => (
                <motion.button
                  key={category.id}
                  onClick={() => handleCategoryChange(category)}
                  className={`flex items-center justify-center sm:justify-start space-x-1 sm:space-x-2 px-3 sm:px-4 lg:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl font-orbitron font-bold transition-all duration-300 flex-1 sm:flex-none ${
                    selectedCategory.id === category.id
                      ? `${category.color} text-white shadow-lg`
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="flex-shrink-0">{category.icon}</span>
                  <span className="text-xs sm:text-sm lg:text-base truncate">{category.title}</span>
                  <span className="text-xs opacity-80 hidden sm:inline">({category.period})</span>
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        {/* Single Unified Container */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="bg-white/90 backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-2xl border border-gray-200 overflow-hidden"
          >
            {/* Content Area - Equal Height Columns */}
            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[400px] sm:min-h-[500px] lg:min-h-[600px]">
              {/* Left Side - Project Details */}
              <div className="p-4 sm:p-6 lg:p-8 flex flex-col">
                {/* Project Header */}
                <div className="mb-4 sm:mb-6">
                  <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
                    <div className={`${selectedCategory.color} text-white p-2 sm:p-3 rounded-lg sm:rounded-xl shadow-lg`}>
                      {React.cloneElement(selectedCategory.icon, { className: "w-4 h-4 sm:w-5 sm:h-5" })}
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl lg:text-2xl font-orbitron font-bold text-gray-900">
                        {selectedCategory.title}
                      </h3>
                      <p className="text-accent-blue font-medium text-sm sm:text-base">{selectedCategory.subtitle}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 leading-relaxed text-sm sm:text-base">{selectedCategory.description}</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-4 sm:mb-6">
                  <div className="bg-blue-50 p-2 sm:p-4 rounded-lg sm:rounded-xl text-center">
                    <BarChart3 className="w-4 h-4 sm:w-6 sm:h-6 text-blue-500 mx-auto mb-1 sm:mb-2" />
                    <div className="text-lg sm:text-xl lg:text-2xl font-orbitron font-bold text-gray-900">
                      {selectedCategory.stats.segments.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-600 font-medium">Segments</div>
                  </div>
                  <div className="bg-red-50 p-2 sm:p-4 rounded-lg sm:rounded-xl text-center">
                    <Calendar className="w-4 h-4 sm:w-6 sm:h-6 text-red-500 mx-auto mb-1 sm:mb-2" />
                    <div className="text-xs sm:text-sm font-bold text-gray-900">{selectedCategory.stats.timeline}</div>
                    <div className="text-xs text-gray-600 font-medium">Timeline</div>
                  </div>
                  <div className="bg-green-50 p-2 sm:p-4 rounded-lg sm:rounded-xl text-center">
                    <CheckCircle className="w-4 h-4 sm:w-6 sm:h-6 text-green-500 mx-auto mb-1 sm:mb-2" />
                    <div className="text-xs sm:text-sm font-bold text-gray-900">{selectedCategory.stats.status}</div>
                    <div className="text-xs text-gray-600 font-medium">Status</div>
                  </div>
                </div>

                {/* Key Features */}
                <div className="mb-4 sm:mb-6">
                  <h4 className="font-orbitron font-bold text-gray-900 mb-2 sm:mb-3 text-sm sm:text-base">Key Features:</h4>
                  <ul className="space-y-1 sm:space-y-2">
                    {selectedCategory.keyFeatures.map((feature, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className="flex items-start"
                      >
                        <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-accent-blue rounded-full mt-1.5 sm:mt-2 mr-2 sm:mr-3 flex-shrink-0"></span>
                        <span className="text-gray-700 text-xs sm:text-sm">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Package Details */}
                <div className="flex-1">
                  <h4 className="font-orbitron font-bold text-gray-900 mb-2 sm:mb-3 text-sm sm:text-base">Package Details:</h4>
                  <div className="space-y-2 sm:space-y-3">
                    {selectedCategory.packages.map((pkg, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className="group hover:bg-gray-50 p-2 sm:p-3 rounded-lg sm:rounded-xl transition-all duration-300 border border-transparent hover:border-gray-200"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1 gap-1 sm:gap-0">
                          <h5 className="font-bold text-gray-900 group-hover:text-accent-blue transition-colors text-xs sm:text-sm">
                            {pkg.name}
                          </h5>
                          {pkg.segments > 0 && (
                            <span className="bg-accent-blue text-white px-2 py-1 rounded-full text-xs font-bold self-start sm:self-auto">
                              {pkg.segments.toLocaleString()} segments
                            </span>
                          )}
                        </div>
                        <p className="text-gray-600 text-xs leading-relaxed">{pkg.description}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Side - Images Slideshow */}
              <div className="p-4 sm:p-6 lg:p-8 flex flex-col justify-center bg-gray-50/50">
                <div className="relative w-full h-full min-h-[300px] sm:min-h-[400px] lg:min-h-[500px] flex items-center justify-center">
                  <div className="relative w-full h-full bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={`${selectedCategory.id}-${currentIndex}`}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.5 }}
                        className="relative w-full h-full flex items-center justify-center"
                      >
                        <img
                          src={selectedCategory.images[currentIndex]}
                          alt={`${selectedCategory.title} - Image ${currentIndex + 1}`}
                          className="w-full h-full object-contain p-3 sm:p-4 lg:p-6"
                        />
                        
                        {/* Image Label Overlay */}
                        <div className="absolute bottom-3 left-3 right-3 sm:bottom-6 sm:left-6 sm:right-6">
                          <div className="bg-black/70 backdrop-blur-sm rounded-lg p-2 sm:p-3 text-white">
                            <h4 className="font-orbitron font-bold text-sm sm:text-base lg:text-lg">{selectedCategory.packages[currentIndex]?.name || selectedCategory.title}</h4>
                            <p className="text-xs sm:text-sm opacity-90">
                              {selectedCategory.packages[currentIndex]?.segments 
                                ? `${selectedCategory.packages[currentIndex].segments.toLocaleString()} segments`
                                : 'Project Documentation'
                              }
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    </AnimatePresence>

                    {/* Navigation buttons - Only show if more than 1 image */}
                    {selectedCategory.images.length > 1 && (
                      <>
                        <button
                          onClick={handlePrevImage}
                          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-700 hover:text-accent-blue p-2 sm:p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
                        >
                          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>
                        <button
                          onClick={handleNextImage}
                          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-700 hover:text-accent-blue p-2 sm:p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
                        >
                          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>
                      </>
                    )}
                  </div>

                  {/* Dots Indicator - Only show if more than 1 image */}
                  {selectedCategory.images.length > 1 && (
                    <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 flex space-x-1 sm:space-x-2">
                      {selectedCategory.images.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentIndex(idx)}
                          className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-200 ${
                            currentIndex === idx 
                              ? "bg-accent-blue scale-125 shadow-lg" 
                              : "bg-white/70 hover:bg-white"
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Summary Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 sm:mt-10 lg:mt-12 bg-gradient-to-r from-accent-blue/10 via-white to-accent-red/10 p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl border border-gray-200"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 text-center">
            <div>
              <div className="text-2xl sm:text-3xl font-orbitron font-bold text-accent-blue mb-1 sm:mb-2">3</div>
              <div className="text-gray-600 text-sm sm:text-base">Major Rail Lines</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-orbitron font-bold text-accent-red mb-1 sm:mb-2">4,624</div>
              <div className="text-gray-600 text-sm sm:text-base">Total Segments Erected</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-orbitron font-bold text-accent-blue mb-1 sm:mb-2">12.567</div>
              <div className="text-gray-600 text-sm sm:text-base">Total Kilometers</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MalaysiaProjectsSection;