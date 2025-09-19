import { useEffect } from 'react';
import { FEATURE_FLAGS } from '../config/performance';

interface PerformanceMetrics {
  fcp?: number; // First Contentful Paint
  lcp?: number; // Largest Contentful Paint
  fid?: number; // First Input Delay
  cls?: number; // Cumulative Layout Shift
}

const usePerformanceMonitor = () => {
  useEffect(() => {
    // Only run if performance monitoring is enabled
    if (!FEATURE_FLAGS.PERFORMANCE_MONITORING) return;

    const metrics: PerformanceMetrics = {};

    // Measure First Contentful Paint
    const fcpObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const fcpEntry = entries.find(entry => entry.name === 'first-contentful-paint');
      if (fcpEntry) {
        metrics.fcp = fcpEntry.startTime;
        console.log('FCP:', fcpEntry.startTime);
      }
    });

    // Measure Largest Contentful Paint
    const lcpObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1];
      if (lastEntry) {
        metrics.lcp = lastEntry.startTime;
        console.log('LCP:', lastEntry.startTime);
      }
    });

    // Measure First Input Delay
    const fidObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      entries.forEach((entry: any) => {
        if (entry.processingStart && entry.startTime) {
          metrics.fid = entry.processingStart - entry.startTime;
          console.log('FID:', metrics.fid);
        }
      });
    });

    // Measure Cumulative Layout Shift
    let clsValue = 0;
    const clsObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      entries.forEach((entry: any) => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      });
      metrics.cls = clsValue;
      console.log('CLS:', clsValue);
    });

    try {
      fcpObserver.observe({ entryTypes: ['paint'] });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      fidObserver.observe({ entryTypes: ['first-input'] });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
    } catch (error) {
      console.warn('Performance monitoring not supported:', error);
    }

    // Report metrics after page load
    const reportMetrics = () => {
      setTimeout(() => {
        console.log('Performance Metrics:', metrics);
        
        // You can send these metrics to your analytics service
        // Example: analytics.track('performance_metrics', metrics);
      }, 5000);
    };

    if (document.readyState === 'complete') {
      reportMetrics();
    } else {
      window.addEventListener('load', reportMetrics);
    }

    return () => {
      fcpObserver.disconnect();
      lcpObserver.disconnect();
      fidObserver.disconnect();
      clsObserver.disconnect();
    };
  }, []);
};

export default usePerformanceMonitor;