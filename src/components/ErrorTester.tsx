import React from 'react';
import { useErrorHandler } from '../hooks/useErrorHandler';
import { isDevelopmentMode } from '../utils/devMode';

// This component is for testing error handling - remove in production
const ErrorTester: React.FC = () => {
  const { handleError, handle404, handle500, handleNetworkError } = useErrorHandler();

  const triggerJSError = () => {
    throw new Error('Test JavaScript Error');
  };

  const triggerCustomError = () => {
    handleError({
      code: 'CUSTOM',
      message: 'Custom Test Error',
      details: 'This is a custom error triggered for testing purposes.'
    });
  };

  // Only show in development - multiple checks for security
  if (!isDevelopmentMode()) {
    return null;
  }

  return (
    <div className="fixed bottom-20 right-4 z-50 bg-red-100 border border-red-300 rounded-lg p-4 shadow-lg">
      <h3 className="text-sm font-bold text-red-800 mb-2">Error Testing (Dev Only)</h3>
      <div className="space-y-2">
        <button
          onClick={handle404}
          className="block w-full text-xs bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
        >
          Test 404
        </button>
        <button
          onClick={handle500}
          className="block w-full text-xs bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
        >
          Test 500
        </button>
        <button
          onClick={handleNetworkError}
          className="block w-full text-xs bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
        >
          Test Network
        </button>
        <button
          onClick={triggerCustomError}
          className="block w-full text-xs bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
        >
          Test Custom
        </button>
        <button
          onClick={triggerJSError}
          className="block w-full text-xs bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
        >
          Test JS Error
        </button>
      </div>
    </div>
  );
};

export default ErrorTester;