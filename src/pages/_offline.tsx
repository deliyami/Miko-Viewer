import { Center, Text } from '@chakra-ui/react';
import Head from 'next/head';
import { FC } from 'react';

// 오프라인인데 캐싱되지 않은 경우 여기로 옴.
const PwaOfflinePage: FC = () => {
  return (
    <>
      <Head>
        <title>next-pwa example</title>
      </Head>
      <Center w="full" h="100vh">
        <Text>offline page</Text>
      </Center>
    </>
  );
};

export default PwaOfflinePage;
