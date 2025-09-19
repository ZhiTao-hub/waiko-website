// Global error handler for unhandled errors and promise rejections

class GlobalErrorHandler {
  private static instance: GlobalErrorHandler;
  private errorCallbacks: Array<(error: any) => void> = [];

  private constructor() {
    this.setupGlobalErrorHandlers();
  }

  public static getInstance(): GlobalErrorHandler {
    if (!GlobalErrorHandler.instance) {
      GlobalErrorHandler.instance = new GlobalErrorHandler();
    }
    return GlobalErrorHandler.instance;
  }

  private setupGlobalErrorHandlers() {
    // Handle unhandled JavaScript errors
    window.addEventListener('error', (event) => {
      console.error('Global Error Handler - Unhandled Error:', event.error);
      this.handleError({
        type: 'javascript',
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        error: event.error
      });
    });

    // Handle unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      console.error('Global Error Handler - Unhandled Promise Rejection:', event.reason);
      this.handleError({
        type: 'promise',
        reason: event.reason,
        promise: event.promise
      });
      
      // Prevent the default browser behavior (logging to console)
      event.preventDefault();
    });

    // Handle resource loading errors (images, scripts, etc.)
    window.addEventListener('error', (event) => {
      if (event.target !== window) {
        console.error('Global Error Handler - Resource Loading Error:', event.target);
        this.handleError({
          type: 'resource',
          element: event.target,
          message: 'Failed to load resource'
        });
      }
    }, true);
  }

  private handleError(errorInfo: any) {
    // Log error details
    console.error('Global Error Handler:', errorInfo);

    // Call registered error callbacks
    this.errorCallbacks.forEach(callback => {
      try {
        callback(errorInfo);
      } catch (callbackError) {
        console.error('Error in error callback:', callbackError);
      }
    });

    // In a production environment, you might want to:
    // 1. Send error to logging service
    // 2. Show user-friendly error message
    // 3. Redirect to error page for critical errors
    
    // For critical errors, redirect to error page
    if (this.isCriticalError(errorInfo)) {
      console.log('Critical error detected, redirecting to error page:', errorInfo);
      this.redirectToErrorPage();
    }
  }

  private isCriticalError(errorInfo: any): boolean {
    // Define what constitutes a critical error
    const criticalPatterns = [
      /chunk.*failed/i,
      /loading.*failed/i,
      /network.*error/i,
      /script.*error/i,
      /test.*error/i,  // For testing purposes
      /promise.*rejection/i,
      /fetch.*failed/i
    ];

    const message = errorInfo.message || errorInfo.reason?.message || errorInfo.reason || '';
    
    // Always treat test errors as critical for demonstration
    if (typeof message === 'string' && message.toLowerCase().includes('test')) {
      return true;
    }
    
    // Check for promise rejections
    if (errorInfo.type === 'promise') {
      return true;
    }
    
    return criticalPatterns.some(pattern => pattern.test(message));
  }

  private redirectToErrorPage() {
    // Only redirect if we're not already on an error page
    const currentPath = window.location.pathname;
    if (!currentPath.includes('/error') && currentPath !== '*') {
      console.log('Redirecting to error page due to critical error');
      
      // Use setTimeout to avoid potential issues with immediate navigation
      setTimeout(() => {
        // Try React Router navigation first, fallback to window.location
        if (window.history && window.history.pushState) {
          window.history.pushState(null, '', '/error');
          // Trigger a popstate event to notify React Router
          window.dispatchEvent(new PopStateEvent('popstate'));
        } else {
          window.location.href = '/error';
        }
      }, 100);
    }
  }

  public onError(callback: (error: any) => void) {
    this.errorCallbacks.push(callback);
  }

  public removeErrorCallback(callback: (error: any) => void) {
    const index = this.errorCallbacks.indexOf(callback);
    if (index > -1) {
      this.errorCallbacks.splice(index, 1);
    }
  }
}

// Initialize the global error handler
export const globalErrorHandler = GlobalErrorHandler.getInstance();

// Export for use in other parts of the application
export default globalErrorHandler;