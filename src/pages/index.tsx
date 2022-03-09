import { Box, Button, Flex, Heading, VStack } from '@chakra-ui/react';
import Carousel from '@src/components/home/Carousel';
import ConcertList from '@src/components/home/ConcertList';
import BasicLayout from '@src/layout/BasicLayout';
import { Pagination } from '@src/types/share/common/common';
import { Concert } from '@src/types/share/Concert';
import axios from 'axios';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Link from 'next/link';
import { ReactElement } from 'react';

const tab = [
  { id: 'ranking', name: 'RANKING' },
  { id: 'new', name: 'NEW' },
];

// TIP 무조건 서버에서 실행됨, Dev모드에서는 매번 실행
export const getStaticProps: GetStaticProps<{
  data: Concert[];
}> = async (context) => {
  const { data } = await axios.get<Pagination<Concert>>(
    `http://localhost:8080/api/concerts?per_page=3`
  );
  return {
    props: {
      data: data.data,
    },
    revalidate: 60 * 30, // 30분 마다 재생성
  };
};

export default function HomePage({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Carousel />
      <Flex pt={50} width="full" justifyContent="center">
        <VStack align="start">
          {tab.map(({ name }) => (
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
