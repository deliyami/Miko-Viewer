import { Box, Center, Text } from '@chakra-ui/react';
import MenuBar from '@src/components/home/MenuBar';
import { withSuspense } from './withSuspenseHOC';

const Layout = ({ children }) => {
  return (
    <Box minH="100vh">
      <MenuBar />
      <NavBar />
      <Box ml={60} p="4" my={30} pb={20}>
        {children}
      </Box>
      {/* <Footer /> */}
    </Box>
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
