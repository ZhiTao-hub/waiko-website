// Performance utilities and configurations

export const PERFORMANCE_CONFIG = {
  // Image optimization
  IMAGE_QUALITY: 85,
  LAZY_LOAD_THRESHOLD: 0.1,
  
  // Animation optimization
  ANIMATION_DURATION: {
    FAST: 200,
    NORMAL: 400,
    SLOW: 600
  },
  
  // Debounce/throttle delays
  SCROLL_THROTTLE: 16, // ~60fps
  RESIZE_DEBOUNCE: 250,
  SEARCH_DEBOUNCE: 300,
  
  // Intersection Observer options
  INTERSECTION_OPTIONS: {
    rootMargin: '50px 0px',
    threshold: 0.1
  }
};

// Check if device has limited resources
export const isLowEndDevice = (): boolean => {
  // Check hardware concurrency (CPU cores)
  if (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2) {
    return true;
  }
  
  // Check device memory (if available)
  if ((navigator as any).deviceMemory && (navigator as any).deviceMemory <= 2) {
    return true;
  }
  
  // Check network connection
  if ((navigator as any).connection) {
    const connection = (navigator as any).connection;
    if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
      return true;
    }
  }
  
  return false;
};

// Check if user prefers reduced motion
export const prefersReducedMotion = (): boolean => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Throttle function for performance
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: number | null = null;
  let lastExecTime = 0;
  
  return (...args: Parameters<T>) => {
    const currentTime = Date.now();
    
    if (currentTime - lastExecTime > delay) {
      func(...args);
      lastExecTime = currentTime;
    } else {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => {
        func(...args);
        lastExecTime = Date.now();
      }, delay - (currentTime - lastExecTime));
    }
  };
};

// Debounce function for performance
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: number;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => func(...args), delay);
  };
};

// Preload critical images
export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
};

// Preload critical resources
export const preloadCriticalResources = async (imageSources: string[]) => {
  const promises = imageSources.map(src => preloadImage(src));
  
  try {
    await Promise.allSettled(promises);
  } catch (error) {
    console.warn('Some images failed to preload:', error);
  }
};