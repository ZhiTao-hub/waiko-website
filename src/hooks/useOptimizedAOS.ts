import 'aos/dist/aos.css'; // Import CSS at build time for better performance
import { useEffect } from 'react';

interface AOSOptions {
  duration?: number;
  delay?: number;
  once?: boolean;
  offset?: number;
  disable?: boolean | string;
}

const useOptimizedAOS = (options: AOSOptions = {}) => {
  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Check if device has limited resources
    const isLowEndDevice = navigator.hardwareConcurrency <= 2 ||
      (navigator as any).deviceMemory <= 2 ||
      (navigator as any).connection?.effectiveType === 'slow-2g' ||
      (navigator as any).connection?.effectiveType === '2g';

    // Skip AOS on low-end devices or if user prefers reduced motion
    if (prefersReducedMotion || isLowEndDevice) {
      return;
    }

    // Dynamically import AOS JavaScript only
    import('aos').then((AOS) => {
      AOS.default.init({
        duration: options.duration || 600,
        delay: options.delay || 0,
        once: options.once !== false,
        offset: options.offset || 50,
        disable: options.disable || false,
        // Performance optimizations
        debounceDelay: 50,
        throttleDelay: 99,
        // Reduce animations on mobile
        disableMutationObserver: true,
      });
    }).catch((error) => {
      console.warn('Failed to load AOS:', error);
    });

    return () => {
      // Cleanup AOS if it was loaded
      if ((window as any).AOS) {
        (window as any).AOS.refresh();
      }
    };
  }, [options.duration, options.delay, options.once, options.offset, options.disable]);
};

export default useOptimizedAOS;