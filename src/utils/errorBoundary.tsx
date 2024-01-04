import React, { ErrorInfo, MouseEventHandler, ReactNode } from 'react';
import Fallback from '../components/Fallback/Fallback';

interface ErrorBoundaryProps {
  children: ReactNode;
}
interface ErrorBoundaryState {
  hasError: boolean;
}

export default class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {}

  handleFallback: MouseEventHandler = () => {
    this.setState({
      hasError: false,
    });
  };

  render(): ReactNode {
    // eslint-disable-next-line react/destructuring-assignment
    if (this.state.hasError) {
      return <Fallback onFallback={this.handleFallback} />;
    }
    // eslint-disable-next-line react/destructuring-assignment
    return this.props.children;
  }
}
