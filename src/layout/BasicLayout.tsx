import { Box, Center, Text } from '@chakra-ui/react';
import AsyncBoundary from '@src/components/common/wrapper/AsyncBoundary';
import Footer from '@src/components/home/Footer';
import MenuBar from '@src/components/home/MenuBar';

const Loading = () => {
  return (
    <Center>
      <Text fontSize="6xl">Loading...</Text>
    </Center>
  );
};

//  NOTE <Loading/>이 아닌 Loading으로 경고
const Layout = ({ children }) => {
  return (
    <AsyncBoundary pendingFallback={<Loading />}>
      <Box minH="100vh">
        <MenuBar />
        <Box ml={{ base: 0, md: 60 }} mt="10" p="4" paddingBottom="100px">
          {children}
        </Box>
      </Box>
      <Footer />
    </AsyncBoundary>
  );
};

export default Layout;
