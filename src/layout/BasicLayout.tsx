import { Box, Center, Flex, Text } from '@chakra-ui/react';
import Footer from '@src/components/home/Footer';
import MenuBar from '@src/components/home/MenuBar';
import { withSuspense } from './withSuspenseHOC';

const Layout = ({ children }) => {
  return (
    <Flex h={"100vh"} flexDirection={"column"} justifyContent="space-between">
      <MenuBar />
      <Box p={"2%"}>
        {children}
      </Box>
      <Footer />
    </Flex>
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
