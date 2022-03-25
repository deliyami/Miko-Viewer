import { Box, Button, Flex, Heading, VStack } from '@chakra-ui/react';
import ConcertList from '@src/components/home/ConcertList';
import { getDataFromLaravel } from '@src/helper/getDataFromLaravel';
import BasicLayout from '@src/layout/BasicLayout';
import { Pagination } from '@src/types/share/common/common';
import { Concert } from '@src/types/share/Concert';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { ReactElement } from 'react';

const tabs = [
  { id: 'ranking', name: 'RANKING' },
  { id: 'new', name: 'NEW' },
];

// TIP 무조건 서버에서 실행됨, Dev모드에서는 매번 실행
export const getStaticProps: GetStaticProps<{
  data: Concert[];
}> = async context => {
  // NOTE  undefined를 구조부해 할당할려고 해서 에러 났었음.
  //  getStaticProps에 대해서는 서버 에러일때를 생각하고 에러 핸들링
  const result = await getDataFromLaravel<Pagination<Concert>>('/concerts', {
    per_page: 3,
    sort: ['-id'],
  });

  return {
    props: {
      data: result ? result.data.data : [],
    },
    revalidate: 60 * 30, // 30분 마다 재생성
  };
};

export default function HomePage({ data }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Heading size="xl" fontSize="50px" my={5}>
        RECOMMEND
      </Heading>
      <Head>
        <title key="title">Miko - Homepage</title>
        <meta property="og:title" content="Miko" key="og:title" />
      </Head>
      <Carousel data={data} />
      <Flex pt={50} width="full" justifyContent="center">
        <VStack align="start">
          {tabs.map((tab, idx) => (
            <Box mb={9} key={idx}>
              <Heading size="xl" fontSize="50px" my={5}>
                {tab.name}
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
