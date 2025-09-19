# Error Handling System

This document describes the comprehensive error handling system implemented in the Waiko International website.

## Components

### 1. ErrorPage (`src/pages/ErrorPage.tsx`)
A beautiful, branded error page that displays different types of errors with:
- Animated error icons and loading states
- Company branding and logo
- Action buttons (Go Home, Go Back, Refresh)
- Contact support link
- Responsive design

### 2. ErrorBoundary (`src/components/ErrorBoundary.tsx`)
React Error Boundary that catches JavaScript errors in the component tree:
- Catches unhandled React component errors
- Logs errors using the error logger
- Displays the ErrorPage for caught errors
- Prevents the entire app from crashing

### 3. useErrorHandler Hook (`src/hooks/useErrorHandler.ts`)
Custom hook for programmatic error handling:
- `handleError(error)` - Handle custom errors
- `handle404()` - Handle 404 Not Found errors
- `handle500()` - Handle server errors
- `handleNetworkError()` - Handle network connectivity issues

### 4. Error Logger (`src/utils/errorLogger.ts`)
Centralized error logging system:
- Logs all errors with timestamps and context
- Captures browser information and stack traces
- Global error handlers for unhandled errors
- Ready for integration with external error reporting services

### 5. ErrorTester (`src/components/ErrorTester.tsx`)
Development-only component for testing error scenarios:
- Test different error types
- Only visible in development mode
- Helps verify error handling works correctly

## Error Types Handled

### 1. 404 - Page Not Found
- Triggered when user visits non-existent routes
- Automatic catch-all route in React Router
- Custom 404 error page with navigation options

### 2. 500 - Server Errors
- JavaScript runtime errors
- Component rendering errors
- Network request failures

### 3. Network Errors
- Connection timeouts
- API failures
- Offline scenarios

### 4. Custom Errors
- Application-specific errors
- Business logic errors
- Validation errors

## Usage Examples

### Using the Error Handler Hook
```typescript
import { useErrorHandler } from '../hooks/useErrorHandler';

const MyComponent = () => {
  const { handleError, handle404, handleNetworkError } = useErrorHandler();

  const handleApiCall = async () => {
    try {
      const response = await fetch('/api/data');
      if (!response.ok) {
        if (response.status === 404) {
          handle404();
        } else {
          handleError({
            code: response.status.toString(),
            message: 'API Error',
            details: `Failed to fetch data: ${response.statusText}`
          });
        }
      }
    } catch (error) {
      handleNetworkError();
    }
  };

  return <button onClick={handleApiCall}>Fetch Data</button>;
};
```

### Manual Error Navigation
```typescript
import { useNavigate } from 'react-router-dom';

const navigate = useNavigate();

// Navigate to error page with custom error info
navigate('/error', {
  state: {
    errorCode: 'CUSTOM',
    errorMessage: 'Custom Error',
    errorDetails: 'Something specific went wrong.'
  }
});
```

## Error Logging

All errors are automatically logged with:
- Timestamp
- Error type and message
- Stack trace (if available)
- Current URL
- User agent information
- Additional context

### Accessing Error Logs
```typescript
import { errorLogger } from '../utils/errorLogger';

// Get all logs
const logs = errorLogger.getLogs();

// Get logs as JSON string
const logsString = errorLogger.getLogsAsString();

// Clear logs
errorLogger.clearLogs();
```

## Routes

- `/error` - General error page
- `/*` - Catch-all route for 404 errors
- All other invalid routes automatically redirect to 404

## Features

### Error Page Features
- ✅ Animated error display
- ✅ Company branding
- ✅ Multiple action buttons
- ✅ Responsive design
- ✅ Accessibility support
- ✅ Contact support integration

### Error Boundary Features
- ✅ Catches React component errors
- ✅ Prevents app crashes
- ✅ Automatic error logging
- ✅ Graceful fallback UI

### Error Logger Features
- ✅ Centralized error collection
- ✅ Automatic global error handling
- ✅ Rich error context
- ✅ Development debugging
- ✅ Production-ready logging

## Development Testing

In development mode, use the ErrorTester component to test different error scenarios:

1. **Test 404** - Simulates page not found
2. **Test 500** - Simulates server error
3. **Test Network** - Simulates network failure
4. **Test Custom** - Simulates custom application error
5. **Test JS Error** - Triggers JavaScript runtime error

## Production Considerations

### Remove Development Tools
Before deploying to production:
- ErrorTester component automatically hides in production
- Consider removing console.log statements
- Set up external error reporting service

### External Error Reporting
The error logger is ready for integration with services like:
- Sentry
- LogRocket
- Bugsnag
- Custom error reporting APIs

### Performance
- Error boundary has minimal performance impact
- Error logging is lightweight
- Error page loads quickly with optimized assets

## Browser Support

The error handling system works with:
- ✅ Modern browsers (Chrome, Firefox, Safari, Edge)
- ✅ Mobile browsers
- ✅ Older browsers with graceful degradation

## Accessibility

Error pages include:
- ✅ Proper ARIA labels
- ✅ Keyboard navigation
- ✅ Screen reader support
- ✅ High contrast support
- ✅ Focus management