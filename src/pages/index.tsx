import { Box, Button, Flex, Heading, VStack } from '@chakra-ui/react';
import Carousel from '@src/components/home/Carousel';
import ConcertList from '@src/components/home/ConcertList';
import Footer from '@src/components/home/Footer';
import MenuBar from '@src/components/home/MenuBar';
import { Pagination } from '@src/types/share/common/common';
import { Concert } from '@src/types/share/Concert';
import axios from 'axios';
import Link from 'next/link';
import { FC } from 'react';

const fract = [
  { id: 'ranking', name: 'RANKING' },
  { id: 'new', name: 'NEW' },
];

const Home: FC<{ data: Concert[] }> = ({ data }) => {
  return (
    <Box>
      <MenuBar />
      <Box my={30} pb={20}>
        <Carousel />
        <Flex pt={50} width="full" justifyContent="center">
          <VStack align="start">
            {fract.map(({ name }) => (
              <Box mb={9}>
                <Heading size="xl" fontSize="50px" my={5}>
                  {name}
                </Heading>
                <ConcertList data={data} />
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
    </Box>
  );
};

export async function getServerSideProps() {
  const { data } = await axios.get<Pagination<Concert>>(
    `http://localhost:8080/api/concerts?per_page=3`
  );
  return {
    props: {
      data: data.data,
    },
  };
}

export default Home;
