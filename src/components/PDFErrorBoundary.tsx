'use client';

import React from 'react';
import { AlertCircle } from 'lucide-react';

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class PDFErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('PDF Error Boundary caught error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex flex-col items-center justify-center w-full h-full min-h-[200px] bg-gray-50 p-6">
          <AlertCircle size={48} className="text-orange-500 mb-3" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Something went wrong</h3>
          <p className="text-sm text-gray-600 text-center max-w-md">
            The PDF viewer encountered an error. Please try refreshing the page.
          </p>
          {this.state.error && (
            <details className="mt-4 text-xs text-gray-500">
              <summary className="cursor-pointer hover:text-gray-700">Error details</summary>
              <pre className="mt-2 p-2 bg-gray-100 rounded overflow-auto max-w-md">
                {this.state.error.message}
              </pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}
