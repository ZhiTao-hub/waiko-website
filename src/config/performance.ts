// Environment-specific performance configuration

export const PERFORMANCE_CONFIG = {
  // Development settings
  development: {
    enablePerformanceMonitoring: false,
    enableWebVitals: false,
    enableAOS: true,
    imageQuality: 90,
    animationDuration: 600,
    enableDebugLogs: true
  },
  
  // Production settings
  production: {
    enablePerformanceMonitoring: true,
    enableWebVitals: true,
    enableAOS: true,
    imageQuality: 85,
    animationDuration: 400,
    enableDebugLogs: false
  },
  
  // Test settings
  test: {
    enablePerformanceMonitoring: false,
    enableWebVitals: false,
    enableAOS: false,
    imageQuality: 70,
    animationDuration: 0,
    enableDebugLogs: false
  }
};

// Get current environment config
export const getCurrentConfig = () => {
  // Use a simple check instead of process.env for better compatibility
  const isDev = typeof window !== 'undefined' && window.location.hostname === 'localhost';
  const env = isDev ? 'development' : 'production';
  return PERFORMANCE_CONFIG[env as keyof typeof PERFORMANCE_CONFIG] || PERFORMANCE_CONFIG.development;
};

// Performance feature flags
export const FEATURE_FLAGS = {
  LAZY_LOADING: true,
  CODE_SPLITTING: true,
  IMAGE_OPTIMIZATION: true,
  ANIMATION_OPTIMIZATION: true,
  BUNDLE_SPLITTING: true,
  PRELOAD_CRITICAL_RESOURCES: true,
  WEB_VITALS_MONITORING: getCurrentConfig().enableWebVitals,
  PERFORMANCE_MONITORING: getCurrentConfig().enablePerformanceMonitoring
};

// Device capability detection
export const DEVICE_CAPABILITIES = {
  LOW_END_THRESHOLD: {
    CPU_CORES: 2,
    MEMORY_GB: 2,
    NETWORK_SPEED: '2g'
  },
  
  PERFORMANCE_BUDGETS: {
    BUNDLE_SIZE_MB: 1.5,
    IMAGE_SIZE_KB: 500,
    ANIMATION_COUNT: 5,
    CONCURRENT_REQUESTS: 6
  }
};

export default getCurrentConfig();