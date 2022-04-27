import { Flex, Image, Text } from '@chakra-ui/react';
import Charts from '@src/components/result/Charts';
import Ranking from '@src/components/result/Ranking';
import SNSModal from '@src/components/result/SNSModal';
import BasicLayout from '@src/layout/BasicLayout';
import { useRouter } from 'next/router';
import { ReactElement, useEffect } from 'react';

const result = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();
  const users = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const script = document.createElement('script');
    script.src = '//developers.kakao.com/sdk/js/kakao.min.js';
    script.async = true;
    // ranking();
    document.body.appendChild(script);
    if (!router.isReady) return;
    return () => {
      document.body.removeChild(script);
    };
  }, [router.isReady]);

  return (
    <Flex h="72%" flexDirection={'column'} justifyContent={'space-evenly'}>
      <Text ml={'5%'} h={'1%'} fontWeight={'bold'} fontSize={'6xl'}>
        ユーザ{router.query.user_id}の結果
      </Text>
      <Flex h={'70%'} justifyContent={'space-around'} alignItems={'center'}>
        <Flex h={'80%'} w="25%" flexDirection={'column'} justifyContent="space-between">
          <Flex justifyContent={'center'} h={'60%'} alignItems={'center'} rounded={'3%'} border={'solid'} w="60%" borderColor="teal.300">
            <Image boxSize={'full'} src="" alt="avatar or profile icon"></Image>
          </Flex>
          <Text align={'left'} fontSize={'3xl'}>
            ユーザ{router.query.user_id}information
          </Text>
          <Text align={'center'} fontSize={'2xl'}>
            ユーザ{router.query.user_id}ランキング : 2位
          </Text>
          <Text align={'center'} fontSize={'2xl'}>
            ユーザ{router.query.user_id}ランキング : 2位
          </Text>
        </Flex>
        <Flex mb={'3%'} flexDirection={'column'} alignItems={'center'} h={'100%'} borderColor={'teal.300'} justifyContent={'space-evenly'} rounded={'3%'} w="22%">
          <Text fontSize={'3xl'} fontWeight={'bold'}>
            SCORE
          </Text>
          <Charts></Charts>
          <SNSModal></SNSModal>
        </Flex>
        <Ranking users={users}></Ranking>
      </Flex>
    </Flex>
  );
};
export default result;

result.getLayout = function getLayout(page: ReactElement) {
  return <BasicLayout>{page}</BasicLayout>;
};
