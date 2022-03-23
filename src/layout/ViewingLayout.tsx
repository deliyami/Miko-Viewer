import { Center, Text } from '@chakra-ui/react';
import ErrorBoundary from '@src/components/common/ErrorBoundary';
import { withSuspense } from './withSuspenseHOC';

const Layout = ({ children }) => {
  return (
    <ErrorBoundary>
      <main>{children}</main>
    </ErrorBoundary>
  );
};

const Loading = () => {
  return (
    <Center>
      <Text fontSize="6xl">Loading...</Text>
    </Center>
  );
};

export default withSuspense(Layout, Loading);
