import { Box, Button, Center, Flex, Heading, Text, VStack } from '@chakra-ui/react';
import ConcertList from '@src/components/home/ConcertList';
import { S3_URL } from '@src/const';
import { getDataFromLaravel } from '@src/helper/getDataFromLaravel';
import BasicLayout from '@src/layout/BasicLayout';
import { useUser } from '@src/state/swr/useUser';
import { Pagination } from '@src/types/share/common/common';
import { Concert } from '@src/types/share/Concert';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { ReactElement } from 'react';

// TIP 무조건 서버에서 실행됨, Dev모드에서는 매번 실행
export const getStaticProps: GetStaticProps<{
  data: Concert[];
}> = async context => {
  // NOTE  undefined를 구조부해 할당할려고 해서 에러 났었음.
  //  getStaticProps에 대해서는 서버 에러일때를 생각하고 에러 핸들링
  const newResult = await getDataFromLaravel<Pagination<Concert>>('/concerts', {
    per_page: 6,
  });

  return {
    props: {
      data: newResult ? newResult.data.data : [],
    },
    revalidate: 60 * 30, // 30분 마다 재생성
  };
};

const BackdropFilters = () => {
  const outerBoxStyles = {
    boxSize: 'full',
    h: '350px',
    p: '10',
    background: `url(${S3_URL + 'logo/mainPageImage.jpg'}) center/cover no-repeat `,
  };

  const innerBoxStyles = {
    textAlign: 'center',
    bg: 'orange',
    width: 'full',
    color: 'white',
    textShadow: '0 0 20px gray',
    fontWeight: 'bold',
    fontSize: '20px',
  };
  return (
    <Box as={VStack} sx={outerBoxStyles} mb={7}>
      <VStack maxW="80vh" spacing={5} my={10} p={5} backdropFilter="auto" backdropBlur="8px">
        <Heading color="white">Connect on Miko</Heading>
        <Text color="white"> Discover, stream, and share a constantly expanding mix of music from emerging and major artists around the world.</Text>
        <Link href="/login">
          <a>
            <Button sx={innerBoxStyles} _hover={{ color: 'black' }}>
              Sign up for free
            </Button>
          </a>
        </Link>
      </VStack>
    </Box>
  );
};
export default function HomePage({ data }: InferGetStaticPropsType<typeof getStaticProps>) {
  const { data: userData } = useUser();
  return (
    <>
      <Head>
        <title key="title">Miko - Homepage</title>
        <meta property="og:title" content="Miko" key="og:title" />
      </Head>
      <Flex justifyContent="center">
        <VStack align="start">
          {!userData && <BackdropFilters />}
          <Heading size="xl" fontSize="50px" my={5}>
            NEW
          </Heading>
          <Box>
            <ConcertList data={data} />
            <Center my={3}>
              <Link href={`/concerts`}>
                <a>
                  <Button mt={5}>더보기</Button>
                </a>
              </Link>
            </Center>
          </Box>
        </VStack>
      </Flex>
    </>
  );
}

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <BasicLayout>{page}</BasicLayout>;
};
