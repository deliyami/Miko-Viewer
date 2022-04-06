import { Box, Center, Text } from '@chakra-ui/react';
import Footer from '@src/components/home/Footer';
import MenuBar from '@src/components/home/MenuBar';
import { withSuspense } from './withSuspenseHOC';

const Layout = ({ children }) => {
  return (
    <>
      <Box minH="100vh">
        <MenuBar />
        <Box ml={{ base: 0, md: 60 }} mt="10" p="4" paddingBottom="100px">
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
