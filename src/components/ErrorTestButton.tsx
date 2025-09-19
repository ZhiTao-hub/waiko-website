import React from 'react';
import { isDevelopmentMode } from '../utils/devMode';

// This component is for testing error handling - remove in production
const ErrorTestButton: React.FC = () => {
  const triggerJSError = () => {
    throw new Error('Test JavaScript Error - This should show the error page');
  };

  const triggerPromiseError = () => {
    // Create an unhandled promise rejection
    Promise.reject(new Error('Test Promise Rejection - This should show the error page'))
      .catch(() => {
        // Don't handle it here to make it unhandled
        throw new Error('Test Promise Rejection - This should show the error page');
      });
  };

  const triggerNetworkError = () => {
    // Simulate a network error that should trigger the error page
    fetch('/nonexistent-api-endpoint-that-will-fail')
      .then(response => {
        if (!response.ok) {
          throw new Error('Test Network Error - This should show the error page');
        }
        return response.json();
      })
      .catch(error => {
        console.error('Network error caught:', error);
        // Re-throw as unhandled error to trigger global handler
        setTimeout(() => {
          throw new Error('Test Network Error - This should show the error page');
        }, 0);
      });
  };

  const triggerAsyncError = () => {
    // Trigger an async error
    setTimeout(() => {
      throw new Error('Test Async Error - This should show the error page');
    }, 100);
  };

  const triggerUnhandledPromise = () => {
    // Create a promise that rejects without being caught
    new Promise((_, reject) => {
      setTimeout(() => {
        reject(new Error('Test Unhandled Promise - This should show the error page'));
      }, 100);
    });
  };

  // Only show in development - multiple checks for security
  if (!isDevelopmentMode()) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 z-50 bg-red-100 border border-red-300 rounded-lg p-4 shadow-lg">
      <h3 className="text-sm font-bold text-red-800 mb-2">Error Testing (Dev Only)</h3>
      <div className="space-y-2">
        <button
          onClick={triggerJSError}
          className="block w-full text-xs bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
        >
          Test JS Error
        </button>
        <button
          onClick={triggerPromiseError}
          className="block w-full text-xs bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
        >
          Test Promise Error
        </button>
        <button
          onClick={triggerNetworkError}
          className="block w-full text-xs bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
        >
          Test Network Error
        </button>
        <button
          onClick={triggerAsyncError}
          className="block w-full text-xs bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
        >
          Test Async Error
        </button>
        <button
          onClick={triggerUnhandledPromise}
          className="block w-full text-xs bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
        >
          Test Unhandled Promise
        </button>
      </div>
    </div>
  );
};

export default ErrorTestButton;