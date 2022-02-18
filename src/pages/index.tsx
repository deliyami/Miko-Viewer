import { Box, Flex, Text } from '@chakra-ui/react';
import ConcertList from '@src/components/home/ConcertList';
import MenuBar from '@src/components/home/MenuBar';
import { useUser } from '@src/state/swr/useUser';

const HomePage = (params) => {
  const { data } = useUser();
  console.log(data);
  return (
    <Box height="100vh" width="100vw">
      <MenuBar></MenuBar>
      <Text textStyle="h1">Event</Text>
      <Flex width="full" justifyContent="center">
        <ConcertList></ConcertList>
      </Flex>
    </Box>
  );
};

export async function getServerSideProps() {
  return {
    props: {},
  };
}

export default HomePage;
