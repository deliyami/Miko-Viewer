import { Box, Button, Flex, Heading, VStack } from '@chakra-ui/react';
import Carousel from '@src/components/home/Carousel';
import ConcertList from '@src/components/home/ConcertList';
import Footer from '@src/components/home/Footer';
import MenuBar from '@src/components/home/MenuBar';
import Link from 'next/link';

const fract = [
  { id: "ranking", name: "RANKING" },
  { id: "new", name: "NEW" },
]

const Home = ({ data }) => {
  return (
    <Box>
      <MenuBar />
      <Box my={30} pb={20}>
        <Carousel />
        <Flex pt={50} width="full" justifyContent="center">
          <VStack align="start">
            {fract.map(({ name, id }) => (
              <Box mb={9}>
                <Heading size='xl' fontSize='50px' my={5} >{name}</Heading>
                <ConcertList data={data} fract={id} />
                <Link href={`/concerts`}>
                  <a>
                    <Button mt={5}>더보기</Button>
                  </a>
                </Link>
              </Box>
            ))}
          </VStack>
        </Flex>
      </Box>
      <Footer />
    </Box >
  );
};

export default Home;

export async function getServerSideProps() {

  const data = await (await fetch(`http://localhost:8080/api/concerts?per_page=3`)).json();
  return {
    props: {
      data,
    },
  }
}