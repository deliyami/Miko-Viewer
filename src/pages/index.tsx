import { Box, Button, Flex, Heading, SimpleGrid, Spacer, Spinner, Text, VStack } from '@chakra-ui/react';
import AsyncBoundary from '@src/components/common/wrapper/AsyncBoundary';
import ConcertList from '@src/components/home/ConcertList';
import MainRanking from '@src/components/home/MainRanking';
import { getDataFromLaravel } from '@src/helper/getDataFromLaravel';
import BasicLayout from '@src/layout/BasicLayout';
import { useUser } from '@src/state/swr/useUser';
import { Concert } from '@src/types/share';
import { Pagination } from '@src/types/share/common';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { FC, ReactElement } from 'react';

type Data = {
  newData: Concert[];
  topData: Concert[];
  soonData: Concert[];
  kpopData: Concert[];
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
const SoonStartList: FC<{ data: Concert[] }> = ({ data }) => {
  return (
    <Box>
      <Flex py={3} mt={3}>
        <Heading>Concert Begins</Heading>
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
const KpopList: FC<{ data: Concert[] }> = ({ data }) => {
  return (
    <Box>
      <Flex py={3} mt={3}>
        <Heading>K-POP</Heading>
        <Spacer />
        <Link href={`/concerts?category_id=2&page=1`}>
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
const TopList: FC<{ data: Concert[] }> = ({ data: concerts }) => {
  console.log(concerts);

  return (
    <Box>
      <Flex py={3} mt={3}>
        <Heading>Top 3</Heading>
      </Flex>
      <Box minW={{ xl: '120vh' }}>
        <AsyncBoundary pendingFallback={<Spinner thickness="3px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />}>
          <MainRanking data={concerts} />
        </AsyncBoundary>
      </Box>
    </Box>
  );
};

// TIP 무조건 서버에서 실행됨, Dev모드에서는 매번 실행
export const getStaticProps: GetStaticProps<Data> = async context => {
  // NOTE  undefined를 구조부해 할당할려고 해서 에러 났었음.
  //  getStaticProps에 대해서는 서버 에러일때를 생각하고 에러 핸들링
  const newResult = await getDataFromLaravel<Pagination<Concert>>('/concerts', {
    perPage: 4,
  });

  const topResult = await getDataFromLaravel<Pagination<Concert>>('/concerts', {
    sort: ['-sales_volume'],
    perPage: 3,
  });

  const soonResult = await getDataFromLaravel<Pagination<Concert>>('/concerts', {
    sort: ['-all_concert_start_date'],
    perPage: 4,
  });

  const kpopResult = await getDataFromLaravel<Pagination<Concert>>('/concerts', {
    filter: [['category_id', 2]],
    perPage: 4,
  });

  return {
    props: {
      newData: newResult ? newResult.data.data : [],
      topData: topResult ? topResult.data.data : [],
      soonData: soonResult ? soonResult.data.data : [],
      kpopData: kpopResult ? kpopResult.data.data : [],
    },
    revalidate: 60 * 10, // 10분 마다 재생성
  };
};

const LoginLeadBox = () => {
  const { data: userData } = useUser();
  const outerBoxStyles = {
    boxSize: 'full',
    h: '400px',
    p: '10',
    backgroundImage: '/logo/mainPageImage.jpg',
    bgPosition: 'bottom',
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
  if (userData) return <></>;

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

export default function HomePage({ newData, topData, soonData, kpopData }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title key="title">Miko - Homepage</title>
        <meta property="og:title" content="Miko" key="og:title" />
      </Head>
      <Flex justifyContent="center" align="start" p={3}>
        <Box>
          <AsyncBoundary pendingFallback={<></>}>
            <LoginLeadBox />
          </AsyncBoundary>
          <TopList data={topData} />
          <NewList data={newData} />
          <SoonStartList data={soonData} />
          <KpopList data={kpopData} />
        </Box>
      </Flex>
    </>
  );
}

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <BasicLayout>{page}</BasicLayout>;
};
