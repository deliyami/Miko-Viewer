import { Center, Text } from '@chakra-ui/react';
import { withSuspense } from './withSuspenseHOC';

const Layout = ({ children }) => {
  return (
    <>
      <main>{children}</main>
    </>
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
