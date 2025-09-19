import React, { useEffect, useState } from 'react';
import { motion, MotionProps } from 'framer-motion';

interface OptimizedMotionProps extends MotionProps {
  children: React.ReactNode;
  reduceMotion?: boolean;
  threshold?: number;
}

const OptimizedMotion: React.FC<OptimizedMotionProps> = ({
  children,
  reduceMotion = false,
  threshold = 0.1,
  ...motionProps
}) => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check user's motion preferences
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // If user prefers reduced motion or we want to reduce motion, return static content
  if (prefersReducedMotion || reduceMotion) {
    return <div>{children}</div>;
  }

  // Optimize viewport settings for better performance
  const optimizedViewport = {
    once: true,
    margin: '0px 0px -100px 0px',
    amount: threshold,
    ...motionProps.viewport
  };

  return (
    <motion.div
      {...motionProps}
      viewport={optimizedViewport}
      style={{
        willChange: 'transform, opacity',
        ...motionProps.style
      }}
    >
      {children}
    </motion.div>
  );
};

export default OptimizedMotion;