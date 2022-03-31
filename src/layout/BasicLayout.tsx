import { Box, Center, Text } from '@chakra-ui/react';
import Footer from '@src/components/home/Footer';
import MenuBar from '@src/components/home/MenuBar';
import { withSuspense } from './withSuspenseHOC';

const Layout = ({ children }) => {
  return (
    <>
      <Box minH="85vh">
        <MenuBar />
        <Box ml={60} p="4" my={30} h="auto" minH="100%" paddingBottom="100px">
          {children}
        </Box>
      </Box>
      <Footer />
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
