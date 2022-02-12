import { Box, Flex, Text } from '@chakra-ui/react';
import ConcertList from '@src/components/home/ConcertList';
import MenuBar from '@src/components/home/MenuBar';

const Home = (params) => {
  return (
    <Box>
      <MenuBar></MenuBar>
      <Text textStyle="h1">Event</Text>
      <Flex width="full" justifyContent="center">
        <ConcertList></ConcertList>
      </Flex>
    </Box>
  );
};

export default Home;
