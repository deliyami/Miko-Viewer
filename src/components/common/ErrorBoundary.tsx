import { Button, Center, Heading, HStack } from '@chakra-ui/react';
import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <Center width="full" height="full" flexDir="column">
          <Heading>error!</Heading>
          <HStack>
            <Button onClick={() => this.setState({ hasError: false })}> Retry </Button>
            <Button onClick={() => window.location.reload()}>Refresh </Button>
          </HStack>
        </Center>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
