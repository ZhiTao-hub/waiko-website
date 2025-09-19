interface ErrorLogEntry {
  timestamp: string;
  type: 'javascript' | 'network' | 'custom' | 'boundary';
  message: string;
  stack?: string;
  url?: string;
  userAgent?: string;
  additionalInfo?: any;
}

class ErrorLogger {
  private logs: ErrorLogEntry[] = [];
  private maxLogs = 100;

  log(error: Error | string, type: ErrorLogEntry['type'] = 'javascript', additionalInfo?: any) {
    const entry: ErrorLogEntry = {
      timestamp: new Date().toISOString(),
      type,
      message: typeof error === 'string' ? error : error.message,
      stack: typeof error === 'object' ? error.stack : undefined,
      url: window.location.href,
      userAgent: navigator.userAgent,
      additionalInfo
    };

    this.logs.push(entry);
    
    // Keep only the most recent logs
    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(-this.maxLogs);
    }

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error logged:', entry);
    }

    // In production, you might want to send this to an error reporting service
    // Example: this.sendToErrorService(entry);
  }

  getLogs(): ErrorLogEntry[] {
    return [...this.logs];
  }

  clearLogs(): void {
    this.logs = [];
  }

  getLogsAsString(): string {
    return JSON.stringify(this.logs, null, 2);
  }

  // Method to send errors to external service (implement as needed)
  private sendToErrorService(entry: ErrorLogEntry): void {
    // Example implementation:
    // fetch('/api/errors', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(entry)
    // }).catch(err => console.error('Failed to send error to service:', err));
  }
}

// Create singleton instance
export const errorLogger = new ErrorLogger();

// Global error handlers
window.addEventListener('error', (event) => {
  errorLogger.log(event.error || event.message, 'javascript', {
    filename: event.filename,
    lineno: event.lineno,
    colno: event.colno
  });
});

window.addEventListener('unhandledrejection', (event) => {
  errorLogger.log(event.reason, 'javascript', {
    type: 'unhandledPromiseRejection'
  });
});

export default errorLogger;