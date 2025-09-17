import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';
import PageHero from '../components/PageHero';
import { Wrench, HardHat, Factory, ArrowRight, Award, Building, Users, Target, Zap, CheckCircle, TrendingUp } from 'lucide-react';

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

const specializationImages = [
  "/313_files/Spec1.jpg",
  "/313_files/Spec2.jpg",
  "/313_files/Spec3.jpg",
];

const showcaseImages = [
  { src: "/313_files/Home/Home1.jpg", to: "/projects", label: "Projects", alt: "Bridge Construction Projects" },
  { src: "/313_files/Home/Home2.png", to: "/projects", label: "Projects", alt: "Infrastructure Projects" },
  { src: "/313_files/Home/Home3.jpg", to: "/projects", label: "Projects", alt: "Civil Engineering Projects" },
  { src: "/313_files/Home/Home4.png", to: "/projects", label: "Projects", alt: "Construction Projects" },
  { src: "/313_files/Home/Home5.png", to: "/post-tensioning", label: "Post-Tensioning", alt: "Post-Tensioning Services" }
];

interface GridItemProps {
  item: {
    src: string;
    to: string;
    label: string;
  };
  area: string;
  idx: number;
}

function GridItem({ item, area, idx }: GridItemProps) {
  return (
    <motion.div
      style={{ gridArea: area }}
      className="w-full h-full"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Link to={item.to} aria-label={`View ${item.label}`} className="block w-full h-full">
        <motion.div
          className="group relative overflow-hidden rounded-xl shadow-lg bg-white flex items-center justify-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.05 * idx }}
        >
          <img
            src={item.src}
            alt={item.label}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          {/* Hover Gradient Overlay - Now also works on touch */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300" />
          {/* Hover Shine Effect - Now also works on touch */}
          <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300">
            <div className="absolute -left-1/3 top-0 h-full w-1/2 rotate-12 bg-white/30 blur-md translate-x-[-20%] group-hover:translate-x-[220%] group-active:translate-x-[220%] transition-transform duration-700 ease-out" />
          </div>
          {/* View More Label - Now also works on touch */}
          <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 text-white text-sm sm:text-base font-semibold opacity-0 group-hover:opacity-100 group-active:opacity-100 translate-y-1 group-hover:translate-y-0 group-active:translate-y-0 transition-all duration-300">
              <span>View More</span>
              <img
                src="https://cdn-icons-png.flaticon.com/512/2989/2989988.png"
                alt=""
                aria-hidden="true"
                className="w-4 h-4 object-contain"
                loading="lazy"
              />
            </span>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}

const Home: React.FC = () => {
  useEffect(() => {
    AOS.init({ 
      duration: 900, 
      once: true, 
      offset: 40,
      easing: 'ease-out-cubic',
      mirror: false,
      anchorPlacement: 'top-bottom'
    });
  }, []);

  // Memoized image click handler for better performance
  const onImageClick = React.useCallback((img: any, idx: number) => {
    console.log('Image clicked', img, idx);
  }, []);

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
              <pattern id="home-grid-pattern" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="url(#home-grid-gradient)" strokeWidth="1" />
                <circle cx="30" cy="30" r="2" fill="url(#home-dot-gradient)" opacity="0.6" />
                <path d="M 15 30 L 45 30 M 30 15 L 30 45" stroke="url(#home-cross-gradient)" strokeWidth="0.5" opacity="0.4" />
                <rect x="25" y="25" width="10" height="10" fill="none" stroke="url(#home-rect-gradient)" strokeWidth="0.3" opacity="0.4" />
              </pattern>
              <linearGradient id="home-grid-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="50%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#ef4444" />
              </linearGradient>
              <radialGradient id="home-dot-gradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#ef4444" />
              </radialGradient>
              <linearGradient id="home-cross-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#ef4444" />
              </linearGradient>
              <linearGradient id="home-rect-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ef4444" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#home-grid-pattern)" />
          </svg>
        </div>
        
        {/* Secondary Grid Pattern for Depth */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full">
            <defs>
              <pattern id="home-secondary-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#3b82f6" strokeWidth="0.3" />
                <rect x="8" y="8" width="4" height="4" fill="none" stroke="#ef4444" strokeWidth="0.2" opacity="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#home-secondary-grid)" />
          </svg>
        </div>
        
        {/* Static Animated Gradient Orbs */}
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-accent-blue/30 to-purple-500/20 rounded-full blur-3xl opacity-60" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-tl from-accent-red/30 to-pink-500/20 rounded-full blur-3xl opacity-50" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-accent-blue/20 to-accent-red/20 rounded-full blur-2xl opacity-40" />
        
        {/* Static Floating Geometric Elements */}
        <div className="absolute top-1/4 right-1/4 w-8 h-8 bg-gradient-to-r from-accent-blue/40 to-accent-red/40 rotate-45 opacity-30" />
        <div className="absolute bottom-1/3 left-1/3 w-6 h-6 bg-gradient-to-r from-accent-red/40 to-accent-blue/40 rounded-full opacity-25" />
        <div className="absolute top-2/3 left-1/5 w-4 h-16 bg-gradient-to-b from-accent-blue/30 to-transparent rounded-full opacity-20" />
      </div>
      
      {/* Content with higher z-index */}
      <div className="relative z-10">
        <PageHero
          title="WAIKO INTERNATIONAL"
          subtitle="Designer, Manufacturer of Bridge & Tunnel Equipment, Specialist Contractor for Launching & Tensa Post Tensioning"
          showButtons={false}
          show3D={true}
        />
      </div>

      <div id="content">
        {/* INTRODUCTION SECTION - Enhanced Layout */}
        <section id="introduction" className="relative overflow-hidden py-8 sm:py-12 lg:py-16" data-aos="fade-up">
          {/* Consistent Grid Background - Introduction */}
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/10 via-white/95 to-accent-red/10" />
            
            {/* Consistent Grid Pattern */}
            <div className="absolute inset-0 opacity-15">
              <svg className="w-full h-full" aria-hidden="true">
                <defs>
                  <pattern id="intro-grid-pattern" width="50" height="50" patternUnits="userSpaceOnUse">
                    <path d="M 50 0 L 0 0 0 50" fill="none" stroke="url(#intro-grid-gradient)" strokeWidth="1" />
                    <circle cx="25" cy="25" r="1.5" fill="url(#intro-dot-gradient)" opacity="0.7" />
                    <path d="M 12.5 25 L 37.5 25 M 25 12.5 L 25 37.5" stroke="url(#intro-cross-gradient)" strokeWidth="0.4" opacity="0.5" />
                    <rect x="20" y="20" width="10" height="10" fill="none" stroke="url(#intro-rect-gradient)" strokeWidth="0.3" opacity="0.4" />
                  </pattern>
                  <linearGradient id="intro-grid-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#ef4444" />
                  </linearGradient>
                  <radialGradient id="intro-dot-gradient" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#ef4444" />
                  </radialGradient>
                  <linearGradient id="intro-cross-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#ef4444" />
                  </linearGradient>
                  <linearGradient id="intro-rect-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ef4444" />
                    <stop offset="100%" stopColor="#3b82f6" />
                  </linearGradient>
                </defs>
                <rect width="100%" height="100%" fill="url(#intro-grid-pattern)" />
              </svg>
            </div>
            
            <div className="absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-br from-accent-blue/25 to-purple-500/15 blur-3xl rounded-full opacity-60" />
            <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-gradient-to-tl from-accent-red/25 to-pink-500/15 blur-3xl rounded-full opacity-50" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-8 sm:mb-10 lg:mb-12"
            >
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 heading-underline">
                WELCOME TO WAIKO INTERNATIONAL
              </h2>
              <p className="text-base sm:text-lg text-gray-700 max-w-3xl mx-auto">
                Leading specialist contractor delivering innovative engineering solutions across Southeast Asia
              </p>
            </motion.div>

            {/* Enhanced Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
              {/* Left: Company Stats */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="space-y-4 sm:space-y-6"
              >
                <div className="bg-white/90 backdrop-blur-lg p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg border border-blue-100/50">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg sm:rounded-xl flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <span className="text-sm sm:text-base lg:text-lg">Company Highlights</span>
                  </h3>
                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    {[
                      { value: '15+', label: 'Years Experience', color: 'from-blue-500 to-blue-600' },
                      { value: '500+', label: 'Projects Completed', color: 'from-green-500 to-green-600' },
                      { value: '50T', label: 'Crane Capacity', color: 'from-purple-500 to-purple-600' },
                      { value: '609K', label: 'SQFT Facility', color: 'from-orange-500 to-orange-600' }
                    ].map((stat, idx) => (
                      <div key={idx} className="text-center p-2 sm:p-3 bg-white/70 rounded-lg sm:rounded-xl border border-gray-100/30">
                        <div className={`text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                          {stat.value}
                        </div>
                        <div className="text-xs sm:text-xs lg:text-xs text-gray-600 font-medium leading-tight">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Services Overview */}
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-indigo-100/50">
                  <h4 className="font-bold text-gray-900 mb-2 sm:mb-3 flex items-center gap-2 text-sm sm:text-base">
                    <Target className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600" />
                    Core Services
                  </h4>
                  <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                    {[
                      'SBG Erections & Post-Tensioning',
                      'Launching Gantry Manufacturing',
                      'TBM Separation Plant Solutions',
                      'Structural Steel Works'
                    ].map((service, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-600 flex-shrink-0" />
                        <span className="text-gray-700">{service}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Center: Main Content */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="lg:col-span-2"
              >
                <div className="bg-white/95 backdrop-blur-lg p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl border border-purple-200/50 shadow-2xl relative overflow-hidden">
                  {/* Decorative elements */}
                  <div className="absolute -top-10 -right-10 w-24 sm:w-32 h-24 sm:h-32 bg-gradient-to-br from-blue-400/20 to-purple-400/15 blur-2xl rounded-full" />
                  <div className="absolute -bottom-10 -left-10 w-16 sm:w-24 h-16 sm:h-24 bg-gradient-to-tr from-purple-400/20 to-pink-400/15 blur-2xl rounded-full" />
                  
                  <div className="relative z-10 space-y-4 sm:space-y-6">
                    {/* Company Description */}
                    <div className="space-y-3 sm:space-y-4 text-black leading-relaxed">
                      <p className="text-sm sm:text-base lg:text-lg">
                        We are a specialist contractor delivering innovative engineering solutions across Southeast Asia. Our expertise spans <strong className="text-black">SBG erections, post-tensioning design and installation, structural steel works, and advanced formwork systems</strong>.
                      </p>
                      <p className="text-sm sm:text-base">
                        With in-house capabilities to <strong className="text-black">design and manufacture launching gantries, lifters, tunnel and bridge formwork</strong>, as well as the <strong className="text-black">manufacture and refurbishment of TBM separation plants</strong>, we provide end-to-end solutions.
                      </p>
                      <p className="text-sm sm:text-base">
                        At Waiko International, we combine precision engineering with proven experience to support complex projects—ensuring safety, efficiency, and long-term performance.
                      </p>
                    </div>

                    {/* Key Capabilities Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-4 sm:pt-6 border-t border-gray-200/50">
                      {[
                        { icon: <Building className="w-4 h-4 sm:w-5 sm:h-5" />, title: 'Infrastructure', desc: 'Railways, highways, bridges' },
                        { icon: <Factory className="w-4 h-4 sm:w-5 sm:h-5" />, title: 'Manufacturing', desc: 'Custom equipment & systems' },
                        { icon: <Users className="w-4 h-4 sm:w-5 sm:h-5" />, title: 'Engineering', desc: 'Design & technical supervision' },
                        { icon: <Award className="w-4 h-4 sm:w-5 sm:h-5" />, title: 'Quality', desc: 'ISO certified processes' }
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 bg-gray-50/50 rounded-lg sm:rounded-xl">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-md sm:rounded-lg flex items-center justify-center text-white flex-shrink-0">
                            {item.icon}
                          </div>
                          <div>
                            <h5 className="font-semibold text-gray-900 text-xs sm:text-sm">{item.title}</h5>
                            <p className="text-xs text-gray-600">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* SHOWCASE MOSAIC - Enhanced Interactive Gallery */}
        <section id="showcase" className="relative py-8 sm:py-12 lg:py-16 overflow-hidden">
          {/* Consistent Grid Background - Showcase */}
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/10 via-white/95 to-accent-red/10" />
            
            {/* Consistent Grid Pattern */}
            <div className="absolute inset-0 opacity-15">
              <svg className="w-full h-full" aria-hidden="true">
                <defs>
                  <pattern id="showcase-grid-pattern" width="50" height="50" patternUnits="userSpaceOnUse">
                    <path d="M 50 0 L 0 0 0 50" fill="none" stroke="url(#showcase-grid-gradient)" strokeWidth="1" />
                    <circle cx="25" cy="25" r="1.5" fill="url(#showcase-dot-gradient)" opacity="0.7" />
                    <path d="M 12.5 25 L 37.5 25 M 25 12.5 L 25 37.5" stroke="url(#showcase-cross-gradient)" strokeWidth="0.4" opacity="0.5" />
                    <rect x="20" y="20" width="10" height="10" fill="none" stroke="url(#showcase-rect-gradient)" strokeWidth="0.3" opacity="0.4" />
                  </pattern>
                  <linearGradient id="showcase-grid-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#ef4444" />
                  </linearGradient>
                  <radialGradient id="showcase-dot-gradient" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#ef4444" />
                  </radialGradient>
                  <linearGradient id="showcase-cross-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#ef4444" />
                  </linearGradient>
                  <linearGradient id="showcase-rect-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ef4444" />
                    <stop offset="100%" stopColor="#3b82f6" />
                  </linearGradient>
                </defs>
                <rect width="100%" height="100%" fill="url(#showcase-grid-pattern)" />
              </svg>
            </div>
            
            <div className="absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-br from-accent-blue/25 to-purple-500/15 blur-3xl rounded-full opacity-60" />
            <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-gradient-to-tl from-accent-red/25 to-pink-500/15 blur-3xl rounded-full opacity-50" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <motion.div
              className="text-center mb-8 sm:mb-10 lg:mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 heading-underline">
                AT A GLANCE
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
                Explore our recent achievements and capabilities across infrastructure projects, showcasing innovation in bridges, tunnels, and heavy civil engineering.
              </p>
            </motion.div>

            {/* Enhanced Image Gallery - Mobile Responsive */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 sm:gap-3 lg:gap-6 mb-8 sm:mb-10 lg:mb-12 max-w-full mx-auto">
              {showcaseImages.map((img, idx) => {
                const isUp = idx % 2 === 0; // Alternating pattern: up-down-up-down-up
                
                return (
                  <motion.div
                    key={idx}
                    className={`group relative ${isUp ? 'mt-0' : 'mt-3 sm:mt-0 md:mt-6 lg:mt-8'}`}
                    initial={{ opacity: 0, scale: 0.8, y: 40 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                    whileHover={{ 
                      scale: 1.05,
                      zIndex: 50,
                      rotate: idx % 2 === 0 ? 1 : -1
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link to={img.to} className="block w-full h-full">
                      <div className="relative overflow-hidden rounded-lg sm:rounded-xl lg:rounded-2xl border-2 sm:border-4 border-white shadow-xl bg-white transition-all duration-500 h-24 sm:h-32 md:h-32 lg:h-48 xl:h-52">
                        <img
                          src={img.src}
                          alt={img.alt || `Project showcase ${idx + 1}`}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 group-active:scale-110"
                          loading="lazy"
                        />
                        
                        {/* Enhanced Overlay Effects - Now also works on touch */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300" />
                        
                        {/* Project Number */}
                        <div className="absolute top-2 left-2 sm:top-3 sm:left-3 w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-sm shadow-lg">
                          {idx + 1}
                        </div>
                        
                        {/* Hover Information - Now also works on touch */}
                        <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-4 opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 group-active:translate-y-0">
                          <div className="bg-white/95 backdrop-blur-md rounded-lg sm:rounded-xl p-2 sm:p-3 text-center shadow-lg">
                            <p className="text-xs text-gray-600">Click to explore more</p>
                          </div>
                        </div>
                        
                        {/* Shine Effect - Now also works on touch */}
                        <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-500">
                          <div className="absolute -left-1/3 top-0 h-full w-1/2 rotate-12 bg-white/20 blur-md translate-x-[-100%] group-hover:translate-x-[400%] group-active:translate-x-[400%] transition-transform duration-700 ease-out" />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {/* Project Categories Overview */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6"
            >
              {[
                {
                  icon: <Building className="w-5 h-5 sm:w-6 sm:h-6" />,
                  title: 'Infrastructure Projects',
                  desc: 'Railways, highways, and bridge construction across Southeast Asia',
                  color: 'from-blue-500 to-indigo-500',
                  bgColor: 'from-blue-50 to-indigo-50'
                },
                {
                  icon: <Factory className="w-5 h-5 sm:w-6 sm:h-6" />,
                  title: 'Manufacturing Excellence',
                  desc: 'Custom equipment design and precision manufacturing solutions',
                  color: 'from-purple-500 to-pink-500',
                  bgColor: 'from-purple-50 to-pink-50'
                },
                {
                  icon: <Zap className="w-5 h-5 sm:w-6 sm:h-6" />,
                  title: 'Post-Tensioning Systems',
                  desc: 'Advanced post-tensioning technology for structural optimization',
                  color: 'from-orange-500 to-red-500',
                  bgColor: 'from-orange-50 to-red-50'
                }
              ].map((category, idx) => (
                <div key={idx} className={`p-4 sm:p-6 bg-gradient-to-br ${category.bgColor} rounded-xl sm:rounded-2xl border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300`}>
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r ${category.color} rounded-lg sm:rounded-xl flex items-center justify-center text-white mb-3 sm:mb-4`}>
                    {category.icon}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2 text-sm sm:text-base">{category.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-700">{category.desc}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* SPECIALIZATIONS SECTION - Enhanced Creative Layout */}
        <section id="specializations" className="relative overflow-hidden py-8 sm:py-12 lg:py-16" data-aos="fade-up">
          {/* Consistent Grid Background - Specializations */}
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/10 via-white/95 to-accent-red/10" />
            
            {/* Consistent Grid Pattern */}
            <div className="absolute inset-0 opacity-15">
              <svg className="w-full h-full" aria-hidden="true">
                <defs>
                  <pattern id="specializations-grid-pattern" width="50" height="50" patternUnits="userSpaceOnUse">
                    <path d="M 50 0 L 0 0 0 50" fill="none" stroke="url(#specializations-grid-gradient)" strokeWidth="1" />
                    <circle cx="25" cy="25" r="1.5" fill="url(#specializations-dot-gradient)" opacity="0.7" />
                    <path d="M 12.5 25 L 37.5 25 M 25 12.5 L 25 37.5" stroke="url(#specializations-cross-gradient)" strokeWidth="0.4" opacity="0.5" />
                    <rect x="20" y="20" width="10" height="10" fill="none" stroke="url(#specializations-rect-gradient)" strokeWidth="0.3" opacity="0.4" />
                  </pattern>
                  <linearGradient id="specializations-grid-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#ef4444" />
                  </linearGradient>
                  <radialGradient id="specializations-dot-gradient" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#ef4444" />
                  </radialGradient>
                  <linearGradient id="specializations-cross-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#ef4444" />
                  </linearGradient>
                  <linearGradient id="specializations-rect-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ef4444" />
                    <stop offset="100%" stopColor="#3b82f6" />
                  </linearGradient>
                </defs>
                <rect width="100%" height="100%" fill="url(#specializations-grid-pattern)" />
              </svg>
            </div>
            
            <div className="absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-br from-accent-blue/25 to-purple-500/15 blur-3xl rounded-full opacity-60" />
            <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-gradient-to-tl from-accent-red/25 to-pink-500/15 blur-3xl rounded-full opacity-50" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <motion.div
              className="text-center mb-8 sm:mb-10 lg:mb-12"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 heading-underline">
                OUR SPECIALIZATIONS
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-gray-700 max-w-4xl mx-auto">
                Comprehensive engineering capabilities across design, manufacturing, and specialized contracting services
              </p>
            </motion.div>

            {/* Enhanced Specializations Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-10 lg:mb-12">
              {[
                {
                  icon: <Wrench className="w-6 h-6 sm:w-7 sm:h-7" />,
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
                  icon: <HardHat className="w-6 h-6 sm:w-7 sm:h-7" />,
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
                  icon: <Factory className="w-6 h-6 sm:w-7 sm:h-7" />,
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
                  whileTap={{ scale: 0.98 }}  // Added tap effect for mobile
                  className="group"
                >
                  <div className={`relative overflow-hidden p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white/90 backdrop-blur-lg border ${card.borderColor} shadow-lg hover:shadow-2xl active:shadow-2xl transition-all duration-500 h-full`}>
                    {/* Decorative gradient blob - Now also works on touch */}
                    <div className={`absolute -top-10 -right-10 w-24 sm:w-32 h-24 sm:h-32 bg-gradient-to-br ${card.color.replace('from-', 'from-').replace('to-', 'to-').replace('-500', '-200/30').replace('-500', '-200/20')} blur-2xl rounded-full group-hover:scale-125 group-active:scale-125 transition-transform duration-500`} />

                    {/* Image */}
                    <div className="relative rounded-xl sm:rounded-2xl overflow-hidden mb-4 sm:mb-6 h-32 sm:h-40 lg:h-48">
                      <img 
                        src={card.image} 
                        alt={card.title} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 group-active:scale-110" 
                        loading="lazy" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                      
                      {/* Icon Overlay */}
                      <div className={`absolute top-3 right-3 sm:top-4 sm:right-4 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r ${card.color} rounded-lg sm:rounded-xl flex items-center justify-center text-white shadow-lg`}>
                        {card.icon}
                      </div>
                      
                      {/* Number Badge */}
                      <div className="absolute top-3 left-3 sm:top-4 sm:left-4 w-6 h-6 sm:w-8 sm:h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-xs sm:text-sm font-bold text-gray-800 shadow-lg">
                        {idx + 1}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="relative z-10">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
                        <div className={`w-1.5 sm:w-2 h-6 sm:h-8 bg-gradient-to-b ${card.color} rounded-full`} />
                        <span className="text-sm sm:text-base lg:text-lg">{card.title}</span>
                      </h3>

                      {/* Features Grid */}
                      <div className="space-y-2 sm:space-y-3">
                        {card.points.map((point, i) => (
                          <div key={i} className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 bg-gray-50/50 rounded-lg sm:rounded-xl hover:bg-gray-50/80 active:bg-gray-50/80 transition-colors duration-300">
                            <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <span className="text-xs sm:text-sm text-gray-800 leading-relaxed">{point}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Capabilities Overview */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-white"
            >
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 text-center">
                <div className="space-y-1 sm:space-y-2">
                  <Building className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400 mx-auto" />
                  <div className="text-lg sm:text-xl lg:text-2xl font-bold">Southeast Asia</div>
                  <div className="text-xs sm:text-sm text-gray-300">Regional Coverage</div>
                </div>
                <div className="space-y-1 sm:space-y-2">
                  <Building className="w-6 h-6 sm:w-8 sm:h-8 text-green-400 mx-auto" />
                  <div className="text-lg sm:text-xl lg:text-2xl font-bold">609,840 SQFT</div>
                  <div className="text-xs sm:text-sm text-gray-300">Facility Area</div>
                </div>
                <div className="space-y-1 sm:space-y-2">
                  <Wrench className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400 mx-auto" />
                  <div className="text-lg sm:text-xl lg:text-2xl font-bold">50 Ton</div>
                  <div className="text-xs sm:text-sm text-gray-300">Crane Capacity</div>
                </div>
                <div className="space-y-1 sm:space-y-2">
                  <Award className="w-6 h-6 sm:w-8 sm:h-8 text-orange-400 mx-auto" />
                  <div className="text-lg sm:text-xl lg:text-2xl font-bold">ISO Certified</div>
                  <div className="text-xs sm:text-sm text-gray-300">Quality Standards</div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* COMPANY FEATURES OVERVIEW */}
        <section id="features-overview" className="relative overflow-hidden py-8 sm:py-12 lg:py-16" data-aos="fade-up">
          {/* Consistent Grid Background - Features */}
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/10 via-white/95 to-accent-red/10" />
            
            {/* Consistent Grid Pattern */}
            <div className="absolute inset-0 opacity-15">
              <svg className="w-full h-full" aria-hidden="true">
                <defs>
                  <pattern id="features-grid-pattern" width="50" height="50" patternUnits="userSpaceOnUse">
                    <path d="M 50 0 L 0 0 0 50" fill="none" stroke="url(#features-grid-gradient)" strokeWidth="1" />
                    <circle cx="25" cy="25" r="1.5" fill="url(#features-dot-gradient)" opacity="0.7" />
                    <path d="M 12.5 25 L 37.5 25 M 25 12.5 L 25 37.5" stroke="url(#features-cross-gradient)" strokeWidth="0.4" opacity="0.5" />
                    <rect x="20" y="20" width="10" height="10" fill="none" stroke="url(#features-rect-gradient)" strokeWidth="0.3" opacity="0.4" />
                  </pattern>
                  <linearGradient id="features-grid-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#ef4444" />
                  </linearGradient>
                  <radialGradient id="features-dot-gradient" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#ef4444" />
                  </radialGradient>
                  <linearGradient id="features-cross-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#ef4444" />
                  </linearGradient>
                  <linearGradient id="features-rect-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ef4444" />
                    <stop offset="100%" stopColor="#3b82f6" />
                  </linearGradient>
                </defs>
                <rect width="100%" height="100%" fill="url(#features-grid-pattern)" />
              </svg>
            </div>
            
            <div className="absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-br from-accent-blue/25 to-purple-500/15 blur-3xl rounded-full opacity-60" />
            <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-gradient-to-tl from-accent-red/25 to-pink-500/15 blur-3xl rounded-full opacity-50" />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div className="text-center mb-8 sm:mb-10 lg:mb-12" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 heading-underline">EXPLORE OUR KEY AREAS</h2>
              <p className="text-sm sm:text-base lg:text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">Discover our core competencies with detailed insights into our capabilities, certifications, and project achievements across four specialized domains.</p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-10 lg:mb-12">
              {[
                {
                  to: '/projects', 
                  title: 'Infrastructure Projects', 
                  icon: '🏗️', 
                  color: 'blue',
                  bgGradient: 'bg-gradient-to-br from-blue-400 via-blue-500 to-indigo-600',
                  pattern: 'circles'
                }, 
                {
                  to: '/about', 
                  title: 'Company Excellence', 
                  icon: '🏢', 
                  color: 'indigo',
                  bgGradient: 'bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-500',
                  pattern: 'diagonal'
                }, 
                {
                  to: '/certificates', 
                  title: 'Quality Standards', 
                  icon: '🏆', 
                  color: 'emerald',
                  bgGradient: 'bg-gradient-to-br from-emerald-300 via-teal-400 to-cyan-500',
                  pattern: 'geometric'
                }, 
                {
                  to: '/post-tensioning', 
                  title: 'Post-Tensioning', 
                  icon: '⚡', 
                  color: 'orange',
                  bgGradient: 'bg-gradient-to-br from-orange-300 via-red-400 to-pink-500',
                  pattern: 'waves'
                }
              ].map((item, idx) => (
                <motion.div key={idx} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: idx * 0.1 }} className="group">
                  <Link to={item.to} className="block">
                    <div className={`relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 hover:scale-105 min-h-[250px] sm:min-h-[300px] lg:min-h-[350px] ${item.bgGradient} text-white`}>
                      
                      {/* Dynamic Background Patterns */}
                      {item.pattern === 'circles' && (
                        <div className="absolute inset-0">
                          <div className="absolute top-10 right-10 w-24 sm:w-32 h-24 sm:h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-700" />
                          <div className="absolute bottom-20 left-10 w-16 sm:w-24 h-16 sm:h-24 bg-white/5 rounded-full blur-xl" />
                          <div className="absolute top-1/2 left-1/3 w-12 sm:w-16 h-12 sm:h-16 bg-white/8 rounded-full blur-lg group-hover:scale-110 transition-transform duration-500" />
                        </div>
                      )}
                      
                      {item.pattern === 'diagonal' && (
                        <div className="absolute inset-0">
                          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
                          <div className="absolute top-0 right-0 w-full h-full transform rotate-12 opacity-20">
                            <div className="absolute top-10 w-full h-0.5 bg-white/20 transform -rotate-45" />
                            <div className="absolute top-20 w-full h-0.5 bg-white/15 transform -rotate-45" />
                            <div className="absolute top-32 w-full h-0.5 bg-white/10 transform -rotate-45" />
                          </div>
                        </div>
                      )}
                      
                      {item.pattern === 'geometric' && (
                        <div className="absolute inset-0">
                          <div className="absolute top-16 right-16 w-16 sm:w-20 h-16 sm:h-20 bg-white/10 transform rotate-45 rounded-lg blur-md group-hover:rotate-90 transition-transform duration-700" />
                          <div className="absolute bottom-16 left-16 w-12 sm:w-16 h-12 sm:h-16 bg-white/8 transform rotate-12 rounded-lg blur-lg" />
                          <div className="absolute top-1/3 left-1/2 w-8 sm:w-12 h-8 sm:h-12 bg-white/6 transform -rotate-45 rounded-lg blur-xl group-hover:scale-125 transition-transform duration-500" />
                        </div>
                      )}
                      
                      {item.pattern === 'waves' && (
                        <div className="absolute inset-0">
                          <div className="absolute inset-0 bg-gradient-to-t from-white/8 to-transparent" />
                          <svg className="absolute bottom-0 w-full h-24 sm:h-32 opacity-20" viewBox="0 0 400 100" preserveAspectRatio="none">
                            <path d="M0,50 Q100,10 200,50 T400,50 L400,100 L0,100 Z" fill="white" fillOpacity="0.1" />
                            <path d="M0,60 Q100,20 200,60 T400,60 L400,100 L0,100 Z" fill="white" fillOpacity="0.05" />
                          </svg>
                        </div>
                      )}
                      
                      {/* Transparent White Overlay */}
                      <div className="absolute inset-0 bg-white/20 backdrop-blur-[1px]" />
                      
                      <div className="relative z-10 p-6 sm:p-8 h-full flex flex-col items-center justify-center text-center">
                        {/* Centered Icon */}
                        <div className="flex-1 flex items-center justify-center mb-6 sm:mb-8">
                          <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-3xl sm:text-4xl lg:text-5xl font-bold shadow-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 mb-4 sm:mb-6 border border-white/30">
                            <span className="transform group-hover:scale-105 transition-transform duration-300">{item.icon}</span>
                          </div>
                        </div>
                        
                        {/* Title */}
                        <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white group-hover:text-black mb-6 sm:mb-8 group-hover:scale-105 transition-all duration-300 drop-shadow-lg">{item.title}</h3>
                        
                        {/* Explore More Button */}
                        <div className="mt-auto w-full flex justify-center">
                          <div className="relative">
                            <div className="absolute inset-0 bg-white/20 rounded-xl sm:rounded-2xl blur-sm group-hover:blur-none transition-all duration-300" />
                            <div className="relative bg-white/15 backdrop-blur-md hover:bg-white/25 border-2 border-white/40 hover:border-white/60 py-2 px-4 sm:py-3 sm:px-6 rounded-xl sm:rounded-2xl transition-all duration-300 group-hover:scale-110 shadow-lg">
                              <div className="flex items-center justify-center gap-2 sm:gap-3 font-bold text-sm sm:text-base lg:text-lg text-white group-hover:text-black">
                                <span className="group-hover:translate-x-1 transition-all duration-300 drop-shadow-md">Explore More</span>
                                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white/25 rounded-full flex items-center justify-center group-hover:rotate-90 transition-all duration-500 shadow-md">
                                  <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:text-black transition-colors duration-300" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Enhanced Hover Glow Effect */}
                      <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-white/0 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CALL TO ACTION SECTION - New Optimized Section */}
        <section id="cta" className="relative overflow-hidden py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute -top-40 -left-40 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
                x: [-50, 50, -50],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute -bottom-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.4, 0.7, 0.4],
                y: [-30, 30, -30],
              }}
              transition={{
                duration: 18,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
              {/* Left: Content */}
              <motion.div
                initial={{ opacity: 0, x: -60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-white"
              >
                <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent">
                  Ready to Start Your Next Project?
                </h2>
                <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-gray-300 mb-6 sm:mb-8 leading-relaxed">
                  Partner with Waiko International for innovative engineering solutions. From design to delivery, we ensure excellence in every project phase.
                </p>
                
                {/* Key Benefits */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
                  {[
                    { icon: <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />, text: 'Expert Engineering Team' },
                    { icon: <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />, text: '15+ Years Experience' },
                    { icon: <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />, text: 'ISO Certified Quality' },
                    { icon: <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />, text: '24/7 Project Support' }
                  ].map((benefit, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.2 + idx * 0.1 }}
                      className="flex items-center gap-2 sm:gap-3"
                    >
                      <div className="text-green-400">{benefit.icon}</div>
                      <span className="text-gray-200 text-sm sm:text-base">{benefit.text}</span>
                    </motion.div>
                  ))}
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      to="/contact"
                      className="inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-xl sm:rounded-2xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl group text-sm sm:text-base"
                    >
                      <span className="mr-2 sm:mr-3">Get Started Today</span>
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </motion.div>
                  
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      to="/projects"
                      className="inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 border-2 border-white/30 text-white font-bold rounded-xl sm:rounded-2xl hover:bg-white/10 hover:border-white/50 transition-all duration-300 group text-sm sm:text-base"
                    >
                      <span className="mr-2 sm:mr-3">View Our Work</span>
                      <Building className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:scale-110" />
                    </Link>
                  </motion.div>
                </div>
              </motion.div>

              {/* Right: Stats Cards */}
              <motion.div
                initial={{ opacity: 0, x: 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="grid grid-cols-2 gap-3 sm:gap-4 lg:gap-6"
              >
                {[
                  { value: '500+', label: 'Projects Completed', icon: <Building className="w-6 h-6 sm:w-8 sm:h-8" />, color: 'from-blue-400 to-blue-600' },
                  { value: '15+', label: 'Years of Excellence', icon: <Award className="w-6 h-6 sm:w-8 sm:h-8" />, color: 'from-purple-400 to-purple-600' },
                  { value: '100%', label: 'Client Satisfaction', icon: <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8" />, color: 'from-green-400 to-green-600' },
                  { value: '24/7', label: 'Support Available', icon: <Target className="w-6 h-6 sm:w-8 sm:h-8" />, color: 'from-orange-400 to-orange-600' }
                ].map((stat, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.5 + idx * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 text-center group hover:bg-white/15 transition-all duration-300"
                  >
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-gradient-to-r ${stat.color} rounded-lg sm:rounded-xl flex items-center justify-center text-white mx-auto mb-2 sm:mb-3 lg:mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      {stat.icon}
                    </div>
                    <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-1 sm:mb-2">{stat.value}</div>
                    <div className="text-xs sm:text-sm text-gray-300 font-medium">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;