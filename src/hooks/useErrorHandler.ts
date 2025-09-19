import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

interface ErrorInfo {
  code?: string;
  message?: string;
  details?: string;
}

export const useErrorHandler = () => {
  const navigate = useNavigate();

  const handleError = useCallback((error: ErrorInfo) => {
    // Log error for debugging
    console.error('Error handled:', error);

    // Navigate to error page with error information
    navigate('/error', { 
      state: { 
        errorCode: error.code || '500',
        errorMessage: error.message || 'An unexpected error occurred',
        errorDetails: error.details || 'Please try again later or contact support if the problem persists.'
      }
    });
  }, [navigate]);

  const handle404 = useCallback(() => {
    handleError({
      code: '404',
      message: 'Page Not Found',
      details: 'The page you\'re looking for doesn\'t exist or has been moved.'
    });
  }, [handleError]);

  const handle500 = useCallback(() => {
    handleError({
      code: '500',
      message: 'Internal Server Error',
      details: 'Something went wrong on our end. Our team has been notified.'
    });
  }, [handleError]);

  const handleNetworkError = useCallback(() => {
    handleError({
      code: 'NETWORK',
      message: 'Network Error',
      details: 'Please check your internet connection and try again.'
    });
  }, [handleError]);

  return {
    handleError,
    handle404,
    handle500,
    handleNetworkError
  };
};

export default useErrorHandler;