import React, { useEffect, useState } from 'react';

interface ImagePreloaderProps {
  images: string[];
  onComplete?: () => void;
  priority?: boolean;
}

const ImagePreloader: React.FC<ImagePreloaderProps> = ({
  images,
  onComplete,
  priority = false
}) => {
  const [loadedCount, setLoadedCount] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (images.length === 0) {
      setIsComplete(true);
      onComplete?.();
      return;
    }

    let mounted = true;
    const imagePromises: Promise<void>[] = [];

    images.forEach((src, index) => {
      const promise = new Promise<void>((resolve, reject) => {
        const img = new Image();
        
        img.onload = () => {
          if (mounted) {
            setLoadedCount(prev => prev + 1);
          }
          resolve();
        };
        
        img.onerror = () => {
          console.warn(`Failed to preload image: ${src}`);
          if (mounted) {
            setLoadedCount(prev => prev + 1);
          }
          resolve(); // Still resolve to not block other images
        };

        // Set loading priority
        if (priority) {
          img.loading = 'eager';
        }
        
        img.src = src;
      });

      imagePromises.push(promise);
    });

    Promise.allSettled(imagePromises).then(() => {
      if (mounted) {
        setIsComplete(true);
        onComplete?.();
      }
    });

    return () => {
      mounted = false;
    };
  }, [images, onComplete, priority]);

  // Don't render anything - this is just for preloading
  return null;
};

export default ImagePreloader;