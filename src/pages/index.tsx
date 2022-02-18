import { Container, Flex, Text } from '@chakra-ui/react';
import ConcertList from '@src/components/home/ConcertList';
import MenuBar from '@src/components/home/MenuBar';
import { useUser } from '@src/state/swr/useUser';

const HomePage = (params) => {
  const { data } = useUser();
  console.log(data);
  return (
    <Container height="100vh">
      <MenuBar></MenuBar>
      <Text textStyle="h1">Event</Text>
      <Flex width="full" justifyContent="center">
        <ConcertList></ConcertList>
      </Flex>
    </Container>
  );
};

export async function getServerSideProps() {
  return {
    props: {},
  };
}

export default HomePage;
