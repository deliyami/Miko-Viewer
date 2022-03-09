import { Box, Button, Flex, Heading, VStack } from '@chakra-ui/react';
import Carousel from '@src/components/home/Carousel';
import ConcertList from '@src/components/home/ConcertList';
import BasicLayout from '@src/layout/BasicLayout';
import { Pagination } from '@src/types/share/common/common';
import { Concert } from '@src/types/share/Concert';
import axios from 'axios';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Link from 'next/link';
import { ReactElement } from 'react';

const fract = [
  { id: 'ranking', name: 'RANKING' },
  { id: 'new', name: 'NEW' },
];

export const getServerSideProps: GetServerSideProps<{
  data: Concert[];
}> = async (ctx) => {
  const { data } = await axios.get<Pagination<Concert>>(
    `http://localhost:8080/api/concerts?per_page=3`
  );
  return {
    props: {
      data: data.data,
    },
  };
};

export default function HomePage({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
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
    </>
  );
}

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <BasicLayout>{page}</BasicLayout>;
};
