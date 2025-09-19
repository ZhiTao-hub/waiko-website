import { Component, ErrorInfo, ReactNode } from 'react';
import ErrorPage from '../pages/ErrorPage';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class PageErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Page Error Boundary caught an error:', error, errorInfo);
    
    this.setState({ error });
  }

  render() {
    if (this.state.hasError) {
      // Render full-screen error page without any layout
      return (
        <div className="fixed inset-0 z-[9999]">
          <ErrorPage />
        </div>
      );
    }

    return this.props.children;
  }
}

export default PageErrorBoundary;