import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp } from 'lucide-react';

interface BackToTopButtonProps {
  scrollProgress?: number;
}

const CIRCLE_SIZE = 56;
const STROKE = 4;
const RADIUS = (CIRCLE_SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const BackToTopButton: React.FC<BackToTopButtonProps> = ({ scrollProgress = 0 }) => {
  const [showButton, setShowButton] = useState(false);

  const progressColor = '#2563eb';
  const glowColor = '#3b82f633'; // Transparent pulse
  const baseBg = 'bg-white';
  const hoverBg = 'hover:bg-gray-100';
  const iconColor = 'text-gray-900';

  useEffect(() => {
    const handleScroll = () => setShowButton(window.scrollY > 150);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {showButton && (
        <motion.div
          key="backToTopWrapper"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: [0, -4, 0] }}
          exit={{ opacity: 0, y: 40 }}
          transition={{
            opacity: { duration: 0.4 },
            y: { repeat: Infinity, duration: 3, ease: 'easeInOut' },
          }}
          className="fixed bottom-6 right-6 z-50"
        >
          {/* Glow ring effect */}
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            style={{
              backgroundColor: glowColor,
              filter: 'blur(12px)',
              zIndex: 0,
            }}
          />

          {/* Main Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.94 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className={`w-14 h-14 ${baseBg} ${hoverBg} border border-gray-300 shadow-2xl rounded-full flex items-center justify-center group relative overflow-hidden`}
            title="Back to top"
            style={{ outline: 'none', border: 'none', zIndex: 10 }}
          >
            {/* Progress Ring */}
            <svg
              width={CIRCLE_SIZE}
              height={CIRCLE_SIZE}
              className="absolute top-0 left-0 z-0"
              style={{ pointerEvents: 'none' }}
            >
              <motion.circle
                cx={CIRCLE_SIZE / 2}
                cy={CIRCLE_SIZE / 2}
                r={RADIUS}
                fill="none"
                stroke={progressColor}
                strokeWidth={STROKE}
                strokeDasharray={CIRCUMFERENCE}
                strokeDashoffset={CIRCUMFERENCE * (1 - scrollProgress)}
                strokeLinecap="round"
                initial={{ strokeDashoffset: CIRCUMFERENCE }}
                animate={{ strokeDashoffset: CIRCUMFERENCE * (1 - scrollProgress) }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                style={{ opacity: 0.9 }}
              />
            </svg>

            {/* Chevron Icon */}
            <ChevronUp
              className={`w-6 h-6 relative z-10 group-hover:-translate-y-1 transition-transform duration-300 ease-out ${iconColor}`}
            />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BackToTopButton;
