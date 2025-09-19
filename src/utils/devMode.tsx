// Development mode utilities
import React from 'react';

/**
 * Check if the application is running in development mode
 * This function checks multiple conditions to ensure test components
 * are only visible during development
 */
export const isDevelopmentMode = (): boolean => {
  // Check NODE_ENV
  if (import.meta.env.MODE === 'production') {
    return false;
  }

  // Check if we're in development
  if (import.meta.env.MODE === 'development') {
    return true;
  }

  // Check for Vite dev mode
  if (import.meta.env.DEV) {
    return true;
  }

  // Check for localhost or development domains
  const hostname = window.location.hostname;
  const isDev = hostname === 'localhost' || 
                hostname === '127.0.0.1' || 
                hostname.includes('dev') ||
                hostname.includes('staging') ||
                window.location.port !== '';

  return isDev;
};

/**
 * Component wrapper for development-only components
 */
export const DevOnly: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  if (!isDevelopmentMode()) {
    return null;
  }
  
  return <>{children}</>;
};

export default isDevelopmentMode;