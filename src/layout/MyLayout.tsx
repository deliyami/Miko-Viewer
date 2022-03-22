import { Box, Center, Grid, GridItem, Text } from '@chakra-ui/react';
import Footer from '@src/components/home/Footer';
import MenuBar from '@src/components/home/MenuBar';
import NavBar from '@src/components/my/Navbar';
import { withSuspense } from './withSuspenseHOC';

const Layout = ({ children }) => {
  return (
    <Box>
      <MenuBar />
      <Grid templateRows="repeat(1, 1fr)" templateColumns="repeat(5, 1fr)" gap={4}>
        <GridItem colSpan={1} shadow="0px -2px 1px gray">
          <NavBar />
        </GridItem>
        <GridItem colSpan={4} m={4}>
          {children}
        </GridItem>
      </Grid>
      <Footer />
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
