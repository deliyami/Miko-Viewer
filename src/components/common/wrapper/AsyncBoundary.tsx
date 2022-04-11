import { Center, Spinner } from '@chakra-ui/react';
import { ComponentProps } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import SSRSuspense from './SSRSuspense';

type ErrorBoundaryProps = ComponentProps<typeof ErrorBoundary>;

function DefaultLoading() {
  return (
    <Center>
      <Spinner />
    </Center>
  );
}

function DefaultErrorFallback({ error, resetErrorBoundary }: ComponentProps<NonNullable<ErrorBoundaryProps['FallbackComponent']>>) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}
//  LINK https://github.com/bvaughn/react-error-boundary
interface Props extends Pick<ErrorBoundaryProps, 'children' | 'onReset' | 'onError' | 'resetKeys' | 'onResetKeysChange'> {
  pendingFallback?: ComponentProps<typeof SSRSuspense>['fallback'];
  rejectedFallback?: ErrorBoundaryProps['FallbackComponent'];
}

function AsyncBoundary({ pendingFallback = <DefaultLoading />, rejectedFallback = DefaultErrorFallback, children, ...errorBoundaryProps }: Props) {
  return (
    <ErrorBoundary FallbackComponent={rejectedFallback} {...errorBoundaryProps}>
      <SSRSuspense fallback={pendingFallback}>{children}</SSRSuspense>
    </ErrorBoundary>
  );
}

export default AsyncBoundary;
