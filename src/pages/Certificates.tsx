import React, { useEffect, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import PageHero from "../components/PageHero";
import { Award } from "lucide-react";

// ===== MAIN CERTIFICATES GALLERY =====
const images: string[] = [
  "/313_files/Cert/Cert.png",
  "/313_files/Cert/Cert1.png",
  "/313_files/Cert/Cert2.png",
  "/313_files/Cert/Cert3.png",
  "/313_files/Cert/Cert4.png",
  "/313_files/Cert/Cert5.png",
  "/313_files/Cert/Cert6.png",
  "/313_files/Cert/Cert7.png",
];

// ===== POST-TENSIONING CERTIFICATES =====
type Certificate = { img: string; title: string; text: string };
type CertificateGroup = { group: Certificate[] };
type CertificationItem = Certificate | CertificateGroup;

const certifications: CertificationItem[] = [
  { img: "PT_Cert1.png", title: "ISO 9001:2015", text: "Quality management systems" },
  { img: "PT_Cert2.jpg", title: "ISO 14001:2015", text: "Environmental management systems" },
  { img: "PT_Cert3.png", title: "ISO 45001:2018", text: "Occupational health and safety" },

  // Grouped pairs
  {
    group: [
      { img: "PT_Cert4.png", title: "ETA 08/0012", text: "Multi-strand PT system" },
      { img: "PT_Cert7.png", title: "", text: "" },
    ],
  },
  {
    group: [
      { img: "PT_Cert5.png", title: "ETA 15/0023", text: "PTSE slab, 1MT single strand, CU single strand coupler PT systems" },
      { img: "PT_Cert8.png", title: "", text: "" },
    ],
  },
  {
    group: [
      { img: "PT_Cert6.png", title: "ETA 11/0017", text: "1C15 monostrand PT System" },
      { img: "PT_Cert9.jpg", title: "" , text: ""},
    ],
  },
];

const Certificates: React.FC = () => {
  // State declarations for missing variables
  const [isPaused, setIsPaused] = useState(false);
  const [certModalOpen, setCertModalOpen] = useState(false);
  const [certModalSrc, setCertModalSrc] = useState("");
  const [certModalTitle, setCertModalTitle] = useState("");
  const [zoom, setZoom] = useState(1);
  const [touchStart, setTouchStart] = useState<{x: number, y: number} | null>(null);
  const [touchEnd, setTouchEnd] = useState<{x: number, y: number} | null>(null);
  
  // Animation configurations
  const backgroundAnimationConfig = {
    duration: 12,
    repeat: Infinity,
    ease: "easeInOut" as const
  };
  
  const particleAnimationConfig = {
    duration: 8,
    repeat: Infinity,
    ease: "easeInOut" as const
  };

  useEffect(() => {
    AOS.init({ duration: 900, once: true, offset: 40 });
  }, []);

  // Check if device is mobile for performance optimization
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  
  // Reduce animation complexity on mobile
  useEffect(() => {
    if (isMobile) {
      // Reduce animation complexity on mobile for better performance
      const reducedMotionStyle = document.createElement('style');
      reducedMotionStyle.innerHTML = `
        @media (max-width: 768px) {
          .reduced-motion-mobile {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `;
      document.head.appendChild(reducedMotionStyle);
      return () => {
        if (document.head.contains(reducedMotionStyle)) {
          document.head.removeChild(reducedMotionStyle);
        }
      };
    }
  }, [isMobile]);

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    });
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distanceX = touchStart.x - touchEnd.x;
    const distanceY = touchStart.y - touchEnd.y;
    const isLeftSwipe = distanceX > 50;
    const isRightSwipe = distanceX < -50;
    
    // Handle swipe gestures if needed
    if (Math.abs(distanceX) > Math.abs(distanceY)) {
      if (isLeftSwipe) {
        // Left swipe action
        console.log('Left swipe detected');
      } else if (isRightSwipe) {
        // Right swipe action
        console.log('Right swipe detected');
      }
    }
  };

  // Function to open certificate modal
  const openCert = (src: string, title: string) => {
    setCertModalSrc(src);
    setCertModalTitle(title);
    setCertModalOpen(true);
    setZoom(1);
  };

  // Function to close certificate modal
  const closeCert = () => {
    setCertModalOpen(false);
    setCertModalSrc("");
    setCertModalTitle("");
    setZoom(1);
  };

  return (
    <div className="relative">
      {/* Mobile-specific styles */}
      <style>
        {`
          @media (max-width: 768px) {
            .certificate-card {
              min-height: 280px;
            }
            
            .certificate-image {
              max-width: 160px !important;
              max-height: 160px !important;
            }
            
            .touch-interactive {
              -webkit-tap-highlight-color: transparent;
              -webkit-touch-callout: none;
              -webkit-user-select: none;
              user-select: none;
            }
            
            .group:active .group-hover\\:opacity-100 {
              opacity: 1 !important;
            }
            
            .group:active .group-hover\\:scale-110 {
              transform: scale(1.1) !important;
            }
            
            .certificate-modal-content {
              max-width: 95vw;
              max-height: 80vh;
            }
            
            .certificate-modal-image {
              max-width: 85vw !important;
              max-height: 70vh !important;
            }
            
            /* Responsive font sizing for mobile */
            .text-4xl {
              font-size: 2.5rem;
            }
            
            .text-3xl {
              font-size: 2rem;
            }
            
            .text-xl {
              font-size: 1.25rem;
            }
            
            .text-lg {
              font-size: 1.125rem;
            }
            
            .leading-relaxed {
              line-height: 1.5;
            }
            
            /* Ensure all hover effects work on touch devices */
            .group:hover .group-hover\\:opacity-100,
            .group:active .group-hover\\:opacity-100 {
              opacity: 1;
            }

            .group:hover .group-hover\\:translate-y-0,
            .group:active .group-hover\\:translate-y-0 {
              transform: translateY(0);
            }

            .group:hover .group-hover\\:scale-110,
            .group:active .group-hover\\:scale-110 {
              transform: scale(1.1);
            }
            
            .group:hover .group-hover\\:scale-105,
            .group:active .group-hover\\:scale-105 {
              transform: scale(1.05);
            }
            
            .group:hover .group-hover\\:-translate-y-2,
            .group:active .group-hover\\:-translate-y-2 {
              transform: translateY(-0.5rem);
            }
            
            .group:hover .group-hover\\:shadow-2xl,
            .group:active .group-hover\\:shadow-2xl {
              box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
            }
            
            .group:hover .group-hover\\:shadow-xl,
            .group:active .group-hover\\:shadow-xl {
              box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
            }
            
            .group:hover .group-hover\\:border-blue-300\\/80,
            .group:active .group-hover\\:border-blue-300\\/80 {
              border-color: rgba(147, 197, 253, 0.8);
            }
            
            .group:hover .group-hover\\:border-indigo-300\\/70,
            .group:active .group-hover\\:border-indigo-300\\/70 {
              border-color: rgba(165, 180, 252, 0.7);
            }
          }
          
          @media (max-width: 480px) {
            .certificate-card {
              min-height: 250px;
              padding: 1rem !important;
            }
            
            .certificate-image {
              max-width: 140px !important;
              max-height: 140px !important;
            }
            
            .certificate-modal-content {
              max-width: 98vw;
              max-height: 75vh;
            }
            
            .certificate-modal-image {
              max-width: 80vw !important;
              max-height: 65vh !important;
            }
            
            /* Further responsive font sizing for small mobile */
            .text-4xl {
              font-size: 2rem;
            }
            
            .text-3xl {
              font-size: 1.75rem;
            }
            
            .text-xl {
              font-size: 1.125rem;
            }
            
            .text-lg {
              font-size: 1rem;
            }
            
            .leading-relaxed {
              line-height: 1.4;
            }
            
            .mb-12 {
              margin-bottom: 2rem;
            }
            
            .mb-16 {
              margin-bottom: 2.5rem;
            }
            
            /* Reduce motion on very small screens */
            * {
              transition-duration: 0.15s !important;
            }
          }
        `}
      </style>
      <PageHero
        title="CERTIFICATES & LICENSES"
        subtitle="Our commitment to quality, safety, and compliance is demonstrated through our certifications"
        icon={<Award className="text-accent-blue" size={72} />}
      />

      {/* ===== MAIN CERTIFICATES GALLERY ===== */}
      <section className="py-16 section-bg-primary relative overflow-hidden" data-aos="fade-up">
        {/* Enhanced Background Design */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          {/* Primary gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/70 to-indigo-50/80" />
          
          <motion.div
            className="absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-br from-blue-300/25 to-indigo-400/20 blur-3xl rounded-full"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.4, 0.7, 0.4],
              x: [-30, 30, -30],
            }}
            transition={backgroundAnimationConfig}
          />
          <motion.div
            className="absolute -bottom-40 -right-40 w-80 h-80 bg-gradient-to-tl from-purple-300/25 to-pink-300/20 blur-3xl rounded-full"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.5, 0.8, 0.5],
              x: [25, -25, 25],
            }}
            transition={backgroundAnimationConfig}
          />
          
          {/* Additional accent orbs */}
          <motion.div
            className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-br from-cyan-200/20 to-blue-300/15 blur-2xl rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
              y: [-20, 20, -20],
            }}
            transition={particleAnimationConfig}
          />
          
          {/* Enhanced grid pattern */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.08]" aria-hidden="true">
            <defs>
              <pattern id="cert-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" className="text-blue-400" strokeWidth="1" />
                <circle cx="20" cy="20" r="1.5" fill="currentColor" className="text-indigo-300" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#cert-grid)" />
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Add the keyframes style */}
          <style>
            {`@keyframes marqueeX {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }`}
          </style>
          {/* Enhanced Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-12 text-center"
          >
            <h2 className="text-4xl font-bold text-gray-900 heading-underline mb-4">
              Quality Certificates
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Click any certificate to view full screen. Hover to pause scrolling and explore our commitment to excellence.
            </p>
            
          </motion.div>

          {/* Enhanced Auto-scrolling marquee */}
          <div className="relative overflow-hidden mb-16 rounded-3xl bg-white/70 backdrop-blur-md border border-white/50 shadow-2xl p-6">
            {/* Container decorative frame effects */}
            <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-indigo-500/20 rounded-[2rem] blur-xl opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
            
            {/* Outer decorative border */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 rounded-[1.8rem] p-[2px] opacity-30">
              <div className="bg-white/80 backdrop-blur-sm rounded-[1.7rem] w-full h-full" />
            </div>
            
            {/* Corner ornaments */}
            <div className="absolute -top-3 -left-3 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
              <div className="w-4 h-4 border-2 border-white rounded-full" />
            </div>
            <div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-bl from-blue-400 to-indigo-500 rounded-full flex items-center justify-center shadow-lg">
              <div className="w-3 h-3 bg-white rounded-full" />
            </div>
            <div className="absolute -bottom-3 -left-3 w-8 h-8 bg-gradient-to-tr from-purple-400 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
              <div className="w-2 h-2 bg-white rounded-full" />
            </div>
            <div className="absolute -bottom-3 -right-3 w-8 h-8 bg-gradient-to-tl from-cyan-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
              <div className="w-3 h-3 border border-white rounded-full" />
            </div>
            
            {/* Side decorative elements */}
            <motion.div 
              className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-16 bg-gradient-to-b from-blue-500 to-purple-500 rounded-r-full shadow-lg"
              animate={{ height: [64, 80, 64] }}
              transition={isMobile ? { duration: 4, repeat: Infinity, ease: "easeInOut" } : { duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div 
              className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-20 bg-gradient-to-b from-purple-500 to-pink-500 rounded-l-full shadow-lg"
              animate={{ height: [80, 64, 80] }}
              transition={isMobile ? { duration: 4, repeat: Infinity, ease: "easeInOut" } : { duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            
            {/* Top decorative strip */}
            <div className="absolute -top-1 left-8 right-8 h-2 bg-gradient-to-r from-transparent via-blue-400/50 to-transparent rounded-full" />
            <div className="absolute -bottom-1 left-8 right-8 h-2 bg-gradient-to-r from-transparent via-purple-400/50 to-transparent rounded-full" />
            
            {/* Floating decorative particles */}
            <motion.div 
              className="absolute top-4 left-12 w-2 h-2 bg-yellow-400 rounded-full opacity-70"
              animate={{ 
                y: [0, -10, 0],
                opacity: [0.7, 1, 0.7],
                scale: [1, 1.2, 1]
              }}
              transition={isMobile ? { duration: 3, repeat: Infinity, ease: "easeInOut" } : { duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div 
              className="absolute top-8 right-16 w-1.5 h-1.5 bg-blue-400 rounded-full opacity-60"
              animate={{ 
                y: [0, -15, 0],
                x: [0, 5, 0],
                opacity: [0.6, 1, 0.6]
              }}
              transition={isMobile ? { duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 } : { duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            />
            <motion.div 
              className="absolute bottom-6 left-20 w-1 h-1 bg-purple-400 rounded-full opacity-80"
              animate={{ 
                x: [0, 10, 0],
                opacity: [0.8, 1, 0.8],
                scale: [1, 1.5, 1]
              }}
              transition={isMobile ? { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 } : { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            />
            
            <div className="absolute inset-0 bg-gradient-to-r from-blue-50/40 via-white/30 to-indigo-50/40" />
            <div
              className="flex items-center gap-8 w-[200%] relative z-10"
              style={{
                animation: "marqueeX 45s linear infinite",
                WebkitAnimationPlayState: isPaused ? "paused" : "running",
                animationPlayState: isPaused ? "paused" : "running",
              }}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              onTouchStart={(e) => {
                setIsPaused(true);
                handleTouchStart(e);
              }}
              onTouchMove={handleTouchMove}
              onTouchEnd={(e) => {
                setIsPaused(false);
                handleTouchEnd();
              }}
            >
              {[...images, ...images].map((src, idx) => (
                <motion.button
                  key={`${src}-${idx}`}
                  onClick={() => openCert(src, `Certificate ${idx % images.length + 1}`)}
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="group relative flex-shrink-0 rounded-2xl p-4 bg-white/80 backdrop-blur-sm border border-white/60 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center touch-interactive"
                  onTouchStart={(e) => e.stopPropagation()}
                  onTouchEnd={(e) => e.stopPropagation()}
                >
                  {/* Elegant Frame Design */}
                  <div className="absolute inset-0 pointer-events-none">
                    {/* Outer frame border */}
                    <div className="absolute inset-2 border-2 border-slate-200/60 rounded-xl group-hover:border-blue-300/80 transition-all duration-300" />
                    
                    {/* Corner accent lines */}
                    <div className="absolute top-3 left-3 w-4 h-0.5 bg-gradient-to-r from-blue-500 to-transparent rounded-full" />
                    <div className="absolute top-3 left-3 w-0.5 h-4 bg-gradient-to-b from-blue-500 to-transparent rounded-full" />
                    
                    <div className="absolute top-3 right-3 w-4 h-0.5 bg-gradient-to-l from-indigo-500 to-transparent rounded-full" />
                    <div className="absolute top-3 right-3 w-0.5 h-4 bg-gradient-to-b from-indigo-500 to-transparent rounded-full" />
                    
                    <div className="absolute bottom-3 left-3 w-4 h-0.5 bg-gradient-to-r from-purple-500 to-transparent rounded-full" />
                    <div className="absolute bottom-3 left-3 w-0.5 h-4 bg-gradient-to-t from-purple-500 to-transparent rounded-full" />
                    
                    <div className="absolute bottom-3 right-3 w-4 h-0.5 bg-gradient-to-l from-cyan-500 to-transparent rounded-full" />
                    <div className="absolute bottom-3 right-3 w-0.5 h-4 bg-gradient-to-t from-cyan-500 to-transparent rounded-full" />
                  </div>
                  
                  {/* Certificate quality indicator */}
                  <div className="absolute top-1 right-1 w-3 h-3 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full opacity-80 group-hover:scale-125 transition-all duration-300" />
                  
                  <img
                    src={src}
                    alt={`Certificate ${idx % images.length + 1}`}
                    className="object-contain transition duration-300 rounded-xl max-w-full max-h-full relative z-10 certificate-image"
                    style={{ maxWidth: '250px', maxHeight: '300px' }}
                    loading="lazy"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-500/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white/90 backdrop-blur-md rounded-full px-4 py-2 text-sm font-semibold text-gray-800 shadow-lg">
                      Click to view
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        {/* Main gallery now uses the global cert modal via openCert */}
      </section>

      {/* ===== POST-TENSIONING CERTIFICATES ===== */}
      <section className="py-16 section-bg-primary relative overflow-hidden" data-aos="fade-up">
        {/* Enhanced Background decorative elements */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          {/* Secondary gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/80 via-purple-50/60 to-slate-50" />
          
          <motion.div
            className="absolute -top-24 -left-24 w-96 h-96 bg-gradient-to-br from-indigo-400/30 to-blue-400/25 blur-3xl rounded-full"
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.4, 0.8, 0.4],
              rotate: [0, 180, 360],
            }}
            transition={backgroundAnimationConfig}
          />
          <motion.div
            className="absolute -bottom-32 -right-32 w-80 h-80 bg-gradient-to-tl from-purple-400/30 to-pink-400/25 blur-3xl rounded-full"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.5, 0.9, 0.5],
              y: [-30, 30, -30],
            }}
            transition={backgroundAnimationConfig}
          />
          
          {/* Central accent */}
          <motion.div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-blue-300/25 to-purple-300/25 blur-2xl rounded-full"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.4, 0.7, 0.4],
              rotate: [0, -90, 0],
            }}
            transition={backgroundAnimationConfig}
          />
          
          {/* Additional flowing orbs */}
          <motion.div
            className="absolute top-1/3 right-1/5 w-48 h-48 bg-gradient-to-br from-teal-300/20 to-cyan-300/15 blur-xl rounded-full"
            animate={{
              x: [0, 50, 0],
              y: [0, -30, 0],
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={particleAnimationConfig}
          />
          
          {/* Enhanced grid pattern */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.1]" aria-hidden="true">
            <defs>
              <pattern id="post-grid" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M 50 0 L 0 0 0 50" fill="none" stroke="currentColor" className="text-indigo-400" strokeWidth="1" />
                <circle cx="25" cy="25" r="1.5" fill="currentColor" className="text-purple-400" />
                <circle cx="12.5" cy="37.5" r="0.8" fill="currentColor" className="text-blue-300" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#post-grid)" />
          </svg>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Enhanced Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-12 text-center"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4 relative heading-underline">
              Post-Tensioning Certificates
            </h2>
            <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
              Recognized accreditations that highlight our post-tensioning expertise and commitment to international standards.
            </p>
          </motion.div>

          {/* Enhanced Grid Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 stagger-layout">
            <style>
              {`.stagger-layout > *:nth-child(even) {
                transform: translateY(20px);
              }
              .stagger-layout > *:nth-child(3n) {
                transform: translateY(-10px);
              }`}
            </style>
            {certifications.map((item, i) =>
              "group" in item ? (
                // === ENHANCED GROUPED CERTIFICATE BOX ===
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="group"
                >
                  <div className="relative overflow-hidden p-6 rounded-3xl bg-white/95 backdrop-blur-lg border border-indigo-200/60 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 min-h-[350px] flex flex-col hover:bg-white/98 certificate-card touch-interactive">
                    {/* Elegant Certificate Frame */}
                    <div className="absolute inset-0 pointer-events-none">
                      {/* Main frame border */}
                      <div className="absolute inset-3 border-2 border-indigo-200/40 rounded-2xl group-hover:border-indigo-300/70 transition-all duration-300" />
                      
                      {/* Corner accent lines */}
                      <div className="absolute top-4 left-4 w-5 h-0.5 bg-gradient-to-r from-indigo-500 to-transparent rounded-full" />
                      <div className="absolute top-4 left-4 w-0.5 h-5 bg-gradient-to-b from-indigo-500 to-transparent rounded-full" />
                      
                      <div className="absolute top-4 right-4 w-5 h-0.5 bg-gradient-to-l from-purple-500 to-transparent rounded-full" />
                      <div className="absolute top-4 right-4 w-0.5 h-5 bg-gradient-to-b from-purple-500 to-transparent rounded-full" />
                      
                      <div className="absolute bottom-4 left-4 w-5 h-0.5 bg-gradient-to-r from-blue-500 to-transparent rounded-full" />
                      <div className="absolute bottom-4 left-4 w-0.5 h-5 bg-gradient-to-t from-blue-500 to-transparent rounded-full" />
                      
                      <div className="absolute bottom-4 right-4 w-5 h-0.5 bg-gradient-to-l from-cyan-500 to-transparent rounded-full" />
                      <div className="absolute bottom-4 right-4 w-0.5 h-5 bg-gradient-to-t from-cyan-500 to-transparent rounded-full" />
                      
                      {/* Quality indicator */}
                      <div className="absolute top-2 right-2 w-3 h-3 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full opacity-80" />
                    </div>
                    {/* Enhanced decorative background accents */}
                    <div className="pointer-events-none absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br from-indigo-500/25 to-purple-500/20 blur-2xl group-hover:scale-125 group-hover:opacity-80 transition-all duration-500" />
                    <div className="pointer-events-none absolute -bottom-12 -left-12 w-36 h-36 rounded-full bg-gradient-to-tr from-blue-500/25 to-indigo-500/20 blur-2xl group-hover:opacity-70 transition-opacity duration-500" />
                    
                    {/* Subtle pattern overlay */}
                    <svg className="pointer-events-none absolute inset-0 opacity-[0.03]" aria-hidden="true">
                      <defs>
                        <pattern id={`cert-grid-group-${i}`} width="20" height="20" patternUnits="userSpaceOnUse">
                          <circle cx="10" cy="10" r="1" fill="currentColor" className="text-indigo-400" />
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill={`url(#cert-grid-group-${i})`} />
                    </svg>
                    
                    <div className="flex-1 relative z-10">
                      {/* Header with badge */}
                      <div className="mb-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-indigo-100/90 to-purple-100/90 text-indigo-700 border border-indigo-300/70 shadow-md backdrop-blur-sm">
                          <Award className="w-3 h-3 mr-1" />
                          Certification Group
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 items-center">
                        {/* Left: Title */}
                        <div>
                          <h4 className="font-bold text-xl text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors duration-300 font-sans">
                            {item.group.find((cert) => cert.title && cert.title.trim().length > 0)?.title || ""}
                          </h4>
                        </div>
                        {/* Right: Images */}
                        <div className="flex gap-3 justify-center md:justify-end items-center">
                          {item.group.map((cert, j) => {
                            return (
                              <motion.div
                                key={j}
                                className="flex items-center justify-center max-w-[95vw] max-h-[95vh]"
                                whileHover={{ scale: 1.1, rotateY: 5 }}
                                transition={{ duration: 0.3 }}
                              >
                                <button
                                  type="button"
                                  onClick={() => openCert(`/313_files/Cert/${cert.img}`, cert.title)}
                                  className="bg-white/50 backdrop-blur-sm rounded-2xl p-3 border border-white/60 shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center relative touch-interactive"
                                  aria-label={`Open ${cert.title}`}
                                >
                                  {/* Image frame for grouped certificates */}
                                  <div className="absolute inset-0 pointer-events-none">
                                    <div className="absolute inset-1 border border-blue-200/50 rounded-xl" />
                                    <div className="absolute top-1 left-1 w-3 h-0.5 bg-gradient-to-r from-blue-400 to-transparent rounded-full" />
                                    <div className="absolute top-1 left-1 w-0.5 h-3 bg-gradient-to-b from-blue-400 to-transparent rounded-full" />
                                    <div className="absolute top-1 right-1 w-3 h-0.5 bg-gradient-to-l from-indigo-400 to-transparent rounded-full" />
                                    <div className="absolute top-1 right-1 w-0.5 h-3 bg-gradient-to-b from-indigo-400 to-transparent rounded-full" />
                                  </div>
                                  <img
                                    src={`/313_files/Cert/${cert.img}`}
                                    alt={cert.title}
                                    className="object-contain rounded-xl max-w-full max-h-full relative z-10 certificate-image"
                                    style={{ maxWidth: '200px', maxHeight: '200px' }}
                                  />
                                </button>
                              </motion.div>
                            );
                          })}
                        </div>
                      </div>
                      
                      {/* Enhanced separator */}
                      <div className="mt-4 mb-3 border-t border-gradient-to-r from-indigo-200/60 via-purple-200/60 to-indigo-200/60" />
                      
                      {item.group.some((c) => c.text && c.text.trim().length > 0) && (
                        <div className="bg-gradient-to-r from-indigo-50/90 to-purple-50/90 rounded-xl p-3 border border-indigo-200/50 backdrop-blur-sm">
                          <p className="text-gray-700 text-sm leading-relaxed">
                            {item.group
                              .filter((c) => c.text && c.text.trim().length > 0)
                              .map((c) => c.text)
                              .join(" • ")}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ) : (
                // === ENHANCED SINGLE CERTIFICATE BOX ===
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="group"
                >
                  <div className="relative overflow-hidden p-6 rounded-3xl bg-white/95 backdrop-blur-lg border border-blue-200/60 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 min-h-[320px] flex flex-col hover:bg-white/98 certificate-card touch-interactive">
                    {/* Elegant Certificate Frame */}
                    <div className="absolute inset-0 pointer-events-none">
                      {/* Main frame border */}
                      <div className="absolute inset-3 border-2 border-blue-200/40 rounded-2xl group-hover:border-blue-300/70 transition-all duration-300" />
                      
                      {/* Corner accent lines */}
                      <div className="absolute top-4 left-4 w-5 h-0.5 bg-gradient-to-r from-blue-500 to-transparent rounded-full" />
                      <div className="absolute top-4 left-4 w-0.5 h-5 bg-gradient-to-b from-blue-500 to-transparent rounded-full" />
                      
                      <div className="absolute top-4 right-4 w-5 h-0.5 bg-gradient-to-l from-indigo-500 to-transparent rounded-full" />
                      <div className="absolute top-4 right-4 w-0.5 h-5 bg-gradient-to-b from-indigo-500 to-transparent rounded-full" />
                      
                      <div className="absolute bottom-4 left-4 w-5 h-0.5 bg-gradient-to-r from-cyan-500 to-transparent rounded-full" />
                      <div className="absolute bottom-4 left-4 w-0.5 h-5 bg-gradient-to-t from-cyan-500 to-transparent rounded-full" />
                      
                      <div className="absolute bottom-4 right-4 w-5 h-0.5 bg-gradient-to-l from-purple-500 to-transparent rounded-full" />
                      <div className="absolute bottom-4 right-4 w-0.5 h-5 bg-gradient-to-t from-purple-500 to-transparent rounded-full" />
                      
                      {/* Quality indicator */}
                      <div className="absolute top-2 right-2 w-3 h-3 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full opacity-80" />
                    </div>
                    {/* Enhanced decorative background accents */}
                    <div className="pointer-events-none absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br from-blue-500/25 to-indigo-500/20 blur-2xl group-hover:scale-125 group-hover:opacity-80 transition-all duration-500" />
                    <div className="pointer-events-none absolute -bottom-12 -left-12 w-36 h-36 rounded-full bg-gradient-to-tr from-indigo-500/25 to-purple-500/20 blur-2xl group-hover:opacity-70 transition-opacity duration-500" />
                    
                    {/* Subtle pattern overlay */}
                    <svg className="pointer-events-none absolute inset-0 opacity-[0.03]" aria-hidden="true">
                      <defs>
                        <pattern id={`cert-grid-single-${i}`} width="20" height="20" patternUnits="userSpaceOnUse">
                          <circle cx="10" cy="10" r="1" fill="currentColor" className="text-blue-400" />
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill={`url(#cert-grid-single-${i})`} />
                    </svg>
                    
                    <div className="flex-1 relative z-10">
                      {/* Header with badge */}
                      <div className="mb-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-blue-100/90 to-indigo-100/90 text-blue-700 border border-blue-300/70 shadow-md backdrop-blur-sm">
                          <Award className="w-3 h-3 mr-1" />
                          ISO Certification
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 items-center">
                        {/* Left: Title */}
                        <div>
                          <h4 className="font-bold text-xl text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300 font-sans">{item.title}</h4>
                        </div>
                        {/* Right: Image */}
                        <div className="flex justify-center md:justify-end items-center">
                          <motion.div
                            className="flex items-center justify-center max-w-[95vw] max-h-[95vh]"
                            whileHover={{ scale: 1.1, rotateY: 5 }}
                            transition={{ duration: 0.3 }}
                          >
                            <button
                              type="button"
                              onClick={() => openCert(`/313_files/Cert/${item.img}`, item.title)}
                              className="bg-white/50 backdrop-blur-sm rounded-2xl p-3 border border-white/60 shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center relative"
                              aria-label={`Open ${item.title}`}
                              onTouchStart={(e) => e.stopPropagation()}
                              onTouchEnd={(e) => {
                                e.stopPropagation();
                                openCert(`/313_files/Cert/${item.img}`, item.title);
                              }}
                            >
                              {/* Image frame for single certificates */}
                              <div className="absolute inset-0 pointer-events-none">
                                <div className="absolute inset-1 border border-blue-200/50 rounded-xl" />
                                <div className="absolute top-1 left-1 w-3 h-0.5 bg-gradient-to-r from-blue-400 to-transparent rounded-full" />
                                <div className="absolute top-1 left-1 w-0.5 h-3 bg-gradient-to-b from-blue-400 to-transparent rounded-full" />
                                <div className="absolute bottom-1 right-1 w-3 h-0.5 bg-gradient-to-l from-indigo-400 to-transparent rounded-full" />
                                <div className="absolute bottom-1 right-1 w-0.5 h-3 bg-gradient-to-t from-indigo-400 to-transparent rounded-full" />
                              </div>
                              <img
                                src={`/313_files/Cert/${item.img}`}
                                alt={item.title}
                                className="object-contain rounded-xl max-w-full max-h-full relative z-10 certificate-image"
                                style={{ maxWidth: '200px', maxHeight: '200px' }}
                              />
                            </button>
                          </motion.div>
                        </div>
                      </div>
                      
                      {/* Enhanced separator */}
                      <div className="mt-4 mb-3 border-t border-gradient-to-r from-blue-200/60 via-indigo-200/60 to-blue-200/60" />
                      
                      {item.text && item.text.trim().length > 0 && (
                        <div className="bg-gradient-to-r from-blue-50/90 to-indigo-50/90 rounded-xl p-3 border border-blue-200/50 backdrop-blur-sm">
                          <p className="text-gray-700 text-sm leading-relaxed">{item.text}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )
            )}
          </div>
        </div>
      </section>

      {/* Enhanced Modal for card images */}
      {certModalOpen && createPortal(
        (
          <AnimatePresence>
            <motion.div
              key="cert-overlay"
              className="fixed inset-0 z-[2147403647] backdrop-blur-xl bg-gradient-to-br from-black/60 via-blue-900/20 to-purple-900/20 touch-interactive"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeCert}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={(e) => {
                handleTouchEnd();
                closeCert();
              }}
            >
              {/* Enhanced close button */}
              <button
                onClick={(e) => { e.stopPropagation(); closeCert(); }}
                className="absolute top-6 right-6 w-12 h-12 rounded-full bg-black/80 text-white flex items-center justify-center hover:bg-black hover:scale-110 transition-all duration-300 shadow-2xl border border-white/20 touch-interactive"
                aria-label="Close"
              >
                <span className="text-xl font-light">×</span>
              </button>

              {/* Centered content with enhanced styling */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                {certModalTitle && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 text-white font-semibold text-lg text-center bg-black/60 backdrop-blur-md rounded-2xl px-6 py-3 border border-white/20 shadow-2xl"
                  >
                    {certModalTitle}
                  </motion.div>
                )}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="relative max-w-[95vw] max-h-[85vh] flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-3xl p-4 border border-white/20 shadow-2xl"
                >
                  {certModalSrc && (
                    <img
                      src={certModalSrc}
                      alt="Certificate"
                      className="object-contain shadow-2xl rounded-2xl touch-interactive certificate-modal-image"
                      style={{ transform: `scale(${zoom})`, maxWidth: '90vw', maxHeight: '80vh' }}
                      onClick={(e) => e.stopPropagation()}
                      onTouchStart={(e) => {
                        e.stopPropagation();
                        handleTouchStart(e);
                      }}
                      onTouchMove={(e) => {
                        e.stopPropagation();
                        handleTouchMove(e);
                      }}
                      onTouchEnd={(e) => {
                        e.stopPropagation();
                        handleTouchEnd();
                      }}
                    />
                  )}
                </motion.div>
                {/* Enhanced Controls */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 flex items-center gap-4 bg-black/80 backdrop-blur-md text-white rounded-2xl px-6 py-3 text-sm border border-white/20 shadow-2xl"
                >
                  <button
                    onClick={(e) => { e.stopPropagation(); setZoom((z) => Math.max(0.5, z - 0.1)); }}
                    className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-all duration-200 hover:scale-110 touch-interactive"
                    aria-label="Zoom out"
                  >
                    −
                  </button>
                  <span className="w-16 text-center select-none font-medium">{Math.round(zoom*100)}%</span>
                  <button
                    onClick={(e) => { e.stopPropagation(); setZoom((z) => Math.min(3, z + 0.1)); }}
                    className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-all duration-200 hover:scale-110 touch-interactive"
                    aria-label="Zoom in"
                  >
                    +
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        ), document.body
      )}

    </div>
  );
};

export default Certificates;