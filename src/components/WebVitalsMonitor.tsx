import { useEffect } from 'react';
import { FEATURE_FLAGS } from '../config/performance';

interface WebVitalsMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  id: string;
}

const WebVitalsMonitor = () => {
  useEffect(() => {
    // Only run if Web Vitals monitoring is enabled
    if (!FEATURE_FLAGS.WEB_VITALS_MONITORING) return;

    // Check if we're in a browser environment
    if (typeof window === 'undefined') return;

    // Basic performance monitoring using native browser APIs
    // This avoids the web-vitals import issue during development
    const measureBasicPerformance = () => {
      try {
        // Measure paint timings
        if (window.performance && window.performance.getEntriesByType) {
          const paintEntries = window.performance.getEntriesByType('paint');
          paintEntries.forEach((entry) => {
            console.log(`Performance: ${entry.name}: ${Math.round(entry.startTime)}ms`);
          });

          // Measure navigation timing
          const navigationEntries = window.performance.getEntriesByType('navigation');
          if (navigationEntries.length > 0) {
            const nav = navigationEntries[0] as PerformanceNavigationTiming;
            console.log(`Performance: DOM Content Loaded: ${Math.round(nav.domContentLoadedEventEnd - nav.navigationStart)}ms`);
            console.log(`Performance: Load Complete: ${Math.round(nav.loadEventEnd - nav.navigationStart)}ms`);
          }
        }

        // Try to load web-vitals dynamically (only if available)
        // Using eval to prevent Vite from analyzing this import at build time
        const dynamicImport = new Function('specifier', 'return import(specifier)');
        dynamicImport('web-vitals').then((webVitals: any) => {
          const { getCLS, getFID, getFCP, getLCP, getTTFB } = webVitals;

          const sendToAnalytics = (metric: WebVitalsMetric) => {
            console.log('Web Vital:', metric);
          };

          // Measure all Web Vitals
          getCLS(sendToAnalytics);
          getFID(sendToAnalytics);
          getFCP(sendToAnalytics);
          getLCP(sendToAnalytics);
          getTTFB(sendToAnalytics);
        }).catch(() => {
          console.log('Web Vitals package not available - using basic performance monitoring');
        });
      } catch (error) {
        console.warn('Performance monitoring error:', error);
      }
    };

    // Delay measurement to ensure page is loaded
    setTimeout(measureBasicPerformance, 1000);
  }, []);

  return null; // This component doesn't render anything
};

export default WebVitalsMonitor;