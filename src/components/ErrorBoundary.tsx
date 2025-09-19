import { Component, ErrorInfo, ReactNode } from 'react';
import ErrorPage from '../pages/ErrorPage';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error using our error logger
    errorLogger.log(error, 'boundary', {
      componentStack: errorInfo.componentStack,
      errorBoundary: true
    });
    
    // Update state with error details
    this.setState({
      error,
      errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      // Render custom error page
      return (
        <ErrorPage
          errorCode="500"
          errorMessage="Something Went Wrong"
          errorDetails="An unexpected error occurred. Our team has been notified and is working to fix this issue."
        />
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;