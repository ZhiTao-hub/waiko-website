import React, { Suspense, useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Stars, OrbitControls } from '@react-three/drei';
import { Home as HomeIcon, Hammer, Anchor, BookCheck, Info, Phone } from 'lucide-react';

// Realistic Engineering 3D models for launching gantry and tunnel
function LaunchingGantry() {
  return (
    <group>
      {/* Main launching beam with realistic structure */}
      <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[4, 0.4, 0.4]} />
        <meshBasicMaterial color="#1e40af" />
      </mesh>
      {/* I-beam cross section details */}
      <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[3.8, 0.1, 0.6]} />
        <meshBasicMaterial color="#3b82f6" />
      </mesh>
      {/* Vertical support columns with realistic structure */}
      <mesh position={[-1.5, -1, 0]}>
        <boxGeometry args={[0.3, 2.5, 0.3]} />
        <meshBasicMaterial color="#1e40af" />
      </mesh>
      <mesh position={[1.5, -1, 0]}>
        <boxGeometry args={[0.3, 2.5, 0.3]} />
        <meshBasicMaterial color="#1e40af" />
      </mesh>
      {/* Cross bracing for stability */}
      <mesh position={[-1.5, -0.3, 0]} rotation={[0, 0, Math.PI / 6]}>
        <boxGeometry args={[0.1, 1.2, 0.1]} />
        <meshBasicMaterial color="#3b82f6" />
      </mesh>
      <mesh position={[1.5, -0.3, 0]} rotation={[0, 0, -Math.PI / 6]}>
        <boxGeometry args={[0.1, 1.2, 0.1]} />
        <meshBasicMaterial color="#3b82f6" />
      </mesh>
      {/* Hydraulic lifting cylinders with realistic details */}
      <mesh position={[0, -0.8, 0.6]}>
        <cylinderGeometry args={[0.12, 0.12, 1, 8]} />
        <meshBasicMaterial color="#dc2626" />
      </mesh>
      <mesh position={[0, -0.8, -0.6]}>
        <cylinderGeometry args={[0.12, 0.12, 1, 8]} />
        <meshBasicMaterial color="#dc2626" />
      </mesh>
      {/* Hydraulic cylinder end caps */}
      <mesh position={[0, -0.8, 0.6]}>
        <cylinderGeometry args={[0.15, 0.15, 0.05, 8]} />
        <meshBasicMaterial color="#991b1b" />
      </mesh>
      <mesh position={[0, -0.8, -0.6]}>
        <cylinderGeometry args={[0.15, 0.15, 0.05, 8]} />
        <meshBasicMaterial color="#991b1b" />
      </mesh>
      {/* Hydraulic hoses */}
      <mesh position={[0.3, -0.8, 0.6]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.03, 0.03, 0.8, 6]} />
        <meshBasicMaterial color="#1f2937" />
      </mesh>
      <mesh position={[-0.3, -0.8, -0.6]} rotation={[0, 0, -Math.PI / 2]}>
        <cylinderGeometry args={[0.03, 0.03, 0.8, 6]} />
        <meshBasicMaterial color="#1f2937" />
      </mesh>
      {/* Control panel box */}
      <mesh position={[0, -1.2, 0]}>
        <boxGeometry args={[0.8, 0.4, 0.6]} />
        <meshBasicMaterial color="#374151" />
      </mesh>
      {/* Control panel buttons */}
      <mesh position={[0, -1.2, 0.35]}>
        <cylinderGeometry args={[0.05, 0.05, 0.02, 6]} />
        <meshBasicMaterial color="#dc2626" />
      </mesh>
      <mesh position={[0.2, -1.2, 0.35]}>
        <cylinderGeometry args={[0.05, 0.05, 0.02, 6]} />
        <meshBasicMaterial color="#059669" />
      </mesh>
    </group>
  );
}

// --- Below component added for context loss handling ---
function ThreeDHeroScene() {
  const canvasWrapperRef = useRef<HTMLDivElement>(null);
  const [contextLost, setContextLost] = useState(false);

  useEffect(() => {
    const wrapper = canvasWrapperRef.current;
    if (!wrapper) return;
    const canvas = wrapper.querySelector('canvas');
    if (!canvas) return;
    const handleContextLost = (e: Event) => {
      e.preventDefault();
      setContextLost(true);
    };
    canvas.addEventListener('webglcontextlost', handleContextLost as EventListener, false);
    return () => {
      canvas.removeEventListener('webglcontextlost', handleContextLost as EventListener);
    };
  }, [canvasWrapperRef.current]);

  return (
    <motion.div
      ref={canvasWrapperRef}
      className="absolute inset-0 w-full h-full z-0"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, delay: 0.5 }}
    >
      {contextLost ? (
        <div style={{color:'#1f2937',textAlign:'center',padding:'2rem',fontSize:'1.25rem',background:'rgba(255,255,255,0.95)',border:'1px solid rgba(0,0,0,0.08)',borderRadius:'1rem',margin:'2rem'}}>
          3D view unavailable: WebGL context lost.<br/>Please reload the page or try a different browser.
        </div>
      ) : (
        <Canvas 
          camera={{ position: [0, 0, 5], fov: 50 }} 
          shadows={false}
          gl={{ 
            antialias: false, 
            powerPreference: "high-performance",
            stencil: false,
            depth: false
          }}
          dpr={[1, 2]}
          performance={{ min: 0.5 }}
        >
          <Suspense fallback={null}>
            <Stars radius={8} depth={30} count={800} factor={3} fade speed={0.5} />
            <EngineeringScene />
            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
            {/* Optimized lighting - reduced complexity */}
            <ambientLight intensity={0.6} />
            <directionalLight position={[3, 3, 3]} intensity={0.8} color="#3b82f6" />
          </Suspense>
        </Canvas>
      )}
    </motion.div>
  );
}

function TunnelBoringMachine() {
  return (
    <group>
      {/* Main TBM body */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[1.5, 1.5, 2, 16]} />
        <meshBasicMaterial color="#374151" />
      </mesh>
      
      {/* TBM cutting head with realistic teeth */}
      <mesh position={[0, 0, 1.1]}>
        <cylinderGeometry args={[1.6, 1.6, 0.2, 16]} />
        <meshBasicMaterial color="#1f2937" />
      </mesh>
      
      {/* Cutting teeth around the head */}
      {Array.from({ length: 12 }, (_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        const radius = 1.4;
        return (
          <mesh key={i} position={[Math.cos(angle) * radius, Math.sin(angle) * radius, 1.2]}>
            <boxGeometry args={[0.1, 0.1, 0.3]} />
            <meshBasicMaterial color="#dc2626" />
          </mesh>
        );
      })}
      
      {/* TBM support structure */}
      <mesh position={[0, 0, -1.5]}>
        <cylinderGeometry args={[0.8, 0.8, 1, 8]} />
        <meshBasicMaterial color="#4b5563" />
      </mesh>
      
      {/* TBM hydraulic rams for steering */}
      <mesh position={[0.8, 0, -0.5]} rotation={[0, Math.PI / 2, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 0.8, 6]} />
        <meshBasicMaterial color="#dc2626" />
      </mesh>
      <mesh position={[-0.8, 0, -0.5]} rotation={[0, -Math.PI / 2, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 0.8, 6]} />
        <meshBasicMaterial color="#dc2626" />
      </mesh>
      
      {/* TBM conveyor system */}
      <mesh position={[0, 0, -2.5]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 1.5, 8]} />
        <meshBasicMaterial color="#6b7280" />
      </mesh>
    </group>
  );
}

function TunnelLining() {
  return (
    <group>
      {/* Tunnel lining segments */}
      {Array.from({ length: 6 }, (_, i) => {
        const angle = (i / 6) * Math.PI * 2;
        const radius = 1.8;
        return (
          <mesh key={i} position={[Math.cos(angle) * radius, Math.sin(angle) * radius, 0]}>
            <boxGeometry args={[0.8, 0.3, 0.8]} />
            <meshBasicMaterial color="#6b7280" />
          </mesh>
        );
      })}
      
      {/* Tunnel ring support */}
      <mesh>
        <torusGeometry args={[1.8, 0.2, 8, 16]} />
        <meshBasicMaterial color="#374151" wireframe />
      </mesh>
      
      {/* Rock bolts for tunnel support */}
      {Array.from({ length: 8 }, (_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const radius = 2.2;
        return (
          <mesh key={i} position={[Math.cos(angle) * radius, Math.sin(angle) * radius, 0]} rotation={[0, 0, angle]}>
            <cylinderGeometry args={[0.02, 0.02, 0.8, 4]} />
            <meshBasicMaterial color="#1f2937" />
          </mesh>
        );
      })}
    </group>
  );
}

function EngineeringScene() {
  return (
    <group scale={1}>
      {/* Realistic Launching Gantry */}
      <LaunchingGantry />
      
      {/* Tunnel Boring Machine */}
      <mesh position={[3, 0, 0]}>
        <TunnelBoringMachine />
      </mesh>
      
      {/* Tunnel Lining Section */}
      <mesh position={[6, 0, 0]}>
        <TunnelLining />
      </mesh>
      
      {/* Concrete segments for launching */}
      <mesh position={[-3, 0, 0]}>
        <boxGeometry args={[1.5, 0.8, 0.8]} />
        <meshBasicMaterial color="#9ca3af" />
      </mesh>
      <mesh position={[-4.5, 0, 0]}>
        <boxGeometry args={[1.5, 0.8, 0.8]} />
        <meshBasicMaterial color="#9ca3af" />
      </mesh>
      
      {/* Steel reinforcement bars */}
      <mesh position={[-3, 0.2, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.02, 0.02, 1.2, 4]} />
        <meshBasicMaterial color="#1f2937" />
      </mesh>
      <mesh position={[-4.5, 0.2, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.02, 0.02, 1.2, 4]} />
        <meshBasicMaterial color="#1f2937" />
      </mesh>
      
      {/* Construction equipment - crane arm */}
      <mesh position={[0, 2, 1]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[2, 0.2, 0.2]} />
        <meshBasicMaterial color="#1e40af" />
      </mesh>
      <mesh position={[0, 2, 1]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[0.2, 0.2, 2]} />
        <meshBasicMaterial color="#1e40af" />
      </mesh>
      
      {/* Crane hook */}
      <mesh position={[1.2, 1.2, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 0.3, 6]} />
        <meshBasicMaterial color="#dc2626" />
      </mesh>
    </group>
  );
}

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


interface PageHeroProps {
  title: string;
  subtitle?: string;
  showButtons?: boolean;
  show3D?: boolean;
  icon?: React.ReactNode;
}

const PageHero: React.FC<PageHeroProps> = ({ title, subtitle, showButtons = false, show3D = false, icon }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Simulate loading time for entrance effect
    const timer = setTimeout(() => {
      setIsLoaded(true);
      setTimeout(() => setShowContent(true), 500);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const location = useLocation();
  const pathname = location.pathname.toLowerCase();
  const derivedIcon = (() => {
    if (pathname.startsWith('/projects')) return <Hammer className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 text-accent-blue" />;
    if (pathname.startsWith('/post-tensioning')) return <Anchor className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 text-accent-blue" />;
    if (pathname.startsWith('/certificates')) return <BookCheck className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 text-accent-blue" />;
    if (pathname.startsWith('/about')) return <Info className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 text-accent-blue" />;
    if (pathname.startsWith('/contact')) return <Phone className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 text-accent-blue" />;
    return <HomeIcon className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 text-accent-blue" />;
  })();
  const heroIcon = icon ?? derivedIcon;

  // Check if we're on the about page
  const isAboutPage = pathname.startsWith('/about');

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-blue-50 to-purple-50 px-4 sm:px-6 lg:px-8">
      {/* Consistent background elements for all pages */}
      <div className="pointer-events-none absolute -top-24 -left-24 w-[20rem] sm:w-[28rem] h-[20rem] sm:h-[28rem] bg-accent-blue/10 blur-3xl rounded-full" />
      <div className="pointer-events-none absolute -bottom-32 -right-24 w-[24rem] sm:w-[36rem] h-[24rem] sm:h-[36rem] bg-accent-red/10 blur-3xl rounded-full" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[20rem] sm:w-[30rem] h-[20rem] sm:h-[30rem] bg-purple-400/5 blur-3xl rounded-full" />
      
      {/* Loading Animation */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            className="absolute inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-white via-blue-50 to-purple-50 px-4"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-center">
              {/* Rubber band logo animation (stretch/compress with overshoot) */}
              <motion.div className="relative mx-auto mb-4 sm:mb-6">
                <motion.img
                  src="/logo.png"
                  alt="Waiko International logo"
                  className="w-20 h-20 sm:w-28 sm:h-28 mx-auto drop-shadow"
                  animate={{
                    scaleX: [1, 1.25, 0.75, 1.15, 0.95, 1],
                    scaleY: [1, 0.75, 1.25, 0.85, 1.05, 1]
                  }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut", times: [0, 0.2, 0.4, 0.6, 0.8, 1] }}
                />
              </motion.div>
              
              <motion.h2
                className="text-xl sm:text-2xl font-bold mb-2 inline-flex flex-col items-center rotate-180 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <span>Waiko</span>
                <span>International</span>
              </motion.h2>
              <motion.p
                className="text-gray-600 text-sm sm:text-base"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                Initializing Website...
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3D Engineering Scene - Only show if show3D is true */}
      {show3D && (
        <ThreeDHeroScene />
      )}
      
      {/* Glassmorphism Overlay */}
      <AnimatePresence>
        {showContent && (
          <motion.div
            className="relative z-10 max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl bg-white/80 backdrop-blur-xl border border-accent-blue/20 text-center"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
        {heroIcon && (
          <div className="flex justify-center mb-3 sm:mb-4 animate-fade-in">
            {heroIcon}
          </div>
        )}
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-extrabold tracking-tight mb-3 sm:mb-4 bg-gradient-to-r from-accent-blue via-primary-dark to-accent-red bg-clip-text text-transparent">
          {title}
        </h1>
        <div className="mx-auto h-1 w-16 sm:w-20 lg:w-24 rounded-full bg-gradient-to-r from-accent-blue to-accent-red mb-4 sm:mb-6"></div>
        {subtitle && (
          <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl mb-6 sm:mb-8 max-w-3xl mx-auto text-gray-800 px-2 sm:px-4 leading-relaxed relative">
            {subtitle}
          </p>
        )}
        {showButtons && (
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 px-2 sm:px-4">
            <motion.div 
              whileHover={{ scale: 1.12, y: -4, rotateY: 5 }} 
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <button 
                onClick={() => {
                  window.scrollTo({
                    top: 0,
                    behavior: 'auto'
                  });
                }}
                className="btn-glass bg-accent-blue hover:bg-accent-red text-white w-full sm:w-auto"
              >
                Explore Content
              </button>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.12, y: -4, rotateY: -5 }} 
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <Link to="/contact" className="btn-glass bg-white/80 text-accent-blue border border-accent-blue/30 w-full sm:w-auto">
                Contact Us
              </Link>
            </motion.div>
          </div>
        )}
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Animated Glow */}
      <motion.div 
        className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[80vw] sm:w-[60vw] h-32 sm:h-48 bg-gradient-to-r from-accent-blue/15 via-white/0 to-accent-red/15 blur-3xl opacity-60 rounded-full z-0"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 0.5, scale: 1 }}
        transition={{ duration: 1.5, delay: 1.2 }}
      />
      
      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 2 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: 2.5 }}
        >
        <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-accent-blue/50 rounded-full flex justify-center">
          <div className="w-1 h-2 sm:h-3 bg-accent-blue/50 rounded-full mt-1.5 sm:mt-2 animate-pulse"></div>
        </div>
        </motion.div>
      </motion.div>





    </section>
  );
};

export default PageHero;
