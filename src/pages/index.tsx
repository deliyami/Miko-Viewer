import { Box, Button, Flex, Heading, SimpleGrid, Spacer, Text, VStack } from '@chakra-ui/react';
import ConcertList from '@src/components/home/ConcertList';
import { getDataFromLaravel } from '@src/helper/getDataFromLaravel';
import BasicLayout from '@src/layout/BasicLayout';
import { useUser } from '@src/state/swr/useUser';
import { Concert } from '@src/types/share';
import { Pagination } from '@src/types/share/common';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { FC, ReactElement } from 'react';

const BackdropFilters = () => {
  const outerBoxStyles = {
    boxSize: 'full',
    h: '350px',
    p: '10',
    backgroundImage: '/loco/mainPageImage.jpg',
    bgPosition: 'center',
    objectFit: 'cover',
    bgRepeat: 'no-repeat',
  };

  const innerBoxStyles = {
    textAlign: 'center',
    width: 'full',
    color: 'white',
    bg: 'orange',
    textShadow: '0 0 20px gray',
    fontWeight: 'bold',
    fontSize: '18px',
  };
  return (
    <Box as={VStack} sx={outerBoxStyles} mb={7}>
      <VStack maxW="80vh" spacing={5} my={10} p={5} backdropFilter="auto" backdropBlur="8px">
        <Heading color="white">Connect on Miko</Heading>
        <Text color="white"> Discover, stream, and share a constantly expanding mix of concert from emerging and major artists around the world.</Text>
        <Link href="/login">
          <a>
            <Button sx={innerBoxStyles} _hover={{ color: 'black' }} _active={{ bg: 'orange' }}>
              Sign up for free
            </Button>
          </a>
        </Link>
      </VStack>
    </Box>
  );
};

const NewList: FC<{ data: Concert[] }> = ({ data }) => {
  return (
    <Box>
      <Flex py={3} mt={3}>
        <Heading>NEW</Heading>
        <Spacer />
        <Link href={`/concerts`}>
          <a>
            <Button mr={4} mt={4}>
              더보기
            </Button>
          </a>
        </Link>
      </Flex>
      <Box minW={{ xl: '120vh' }}>
        <SimpleGrid columns={[2, null, 4]} spacing="40px">
          <ConcertList data={data} />
        </SimpleGrid>
      </Box>
    </Box>
  );
};

const TopList: FC<{ data: Concert[] }> = ({ data }) => {
  return (
    <Box>
      <Flex py={3} mt={3}>
        <Heading>Top 3</Heading>
      </Flex>
      <Box minW={{ xl: '120vh' }}>
        <SimpleGrid columns={[2, null, 3]} spacing="40px">
          <ConcertList data={data} />
        </SimpleGrid>
      </Box>
    </Box>
  );
};

// TIP 무조건 서버에서 실행됨, Dev모드에서는 매번 실행
export const getStaticProps: GetStaticProps<{
  newData: Concert[];
  topData: Concert[];
}> = async context => {
  // NOTE  undefined를 구조부해 할당할려고 해서 에러 났었음.
  //  getStaticProps에 대해서는 서버 에러일때를 생각하고 에러 핸들링
  const newResult = await getDataFromLaravel<Pagination<Concert>>('/concerts', {
    per_page: 4,
  });

  const topResult = await getDataFromLaravel<Pagination<Concert>>('/concerts', {
    sort: ['-sales_volume'],
    per_page: 3,
  });

  return {
    props: {
      newData: newResult ? newResult.data.data : [],
      topData: topResult ? topResult.data.data : [],
    },
    revalidate: 60 * 30, // 30분 마다 재생성
  };
};
export default function HomePage({ newData, topData }: InferGetStaticPropsType<typeof getStaticProps>) {
  const { data: userData } = useUser();

  console.log(newData);
  return (
    <>
      <Head>
        <title key="title">Miko - Homepage</title>
        <meta property="og:title" content="Miko" key="og:title" />
      </Head>
      <Flex justifyContent="center" align="start">
        <Box>
          {!userData && <BackdropFilters />}
          <Box>
            <NewList data={newData} />
          </Box>
          <Box>
            <TopList data={topData} />
          </Box>
        </Box>
      </Flex>
    </>
  );
}

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <BasicLayout>{page}</BasicLayout>;
};
