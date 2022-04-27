import { Box, Center, Divider, Heading, VStack } from '@chakra-ui/react';
import { RiVipCrownLine } from '@react-icons/all-files/ri/RiVipCrownLine';
import { MotionBox } from '@src/components/common/motion/MotionChakra';
import { useSocket } from '@src/hooks/dynamicHooks';
import { isOnMyRankingState, isOnRankingState, latestScoreState, myRankState } from '@src/state/recoil';
import { useUser } from '@src/state/swr';
import { AnimatePresence } from 'framer-motion';
import { memo, useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

const GRADIENTS = [
  'linear(to-l, #ef32d9, #89fffd)', // 1
  'linear(to-l, #a1ffce, #faffd1)', // 2
  'linear(to-l, #fceabb, #f8b500)',
  'linear(to-l, #e0eafc, #cfdef3)',
  'linear(to-l, #eacda3, #d6ae7b)',
];

const MyRanking = memo(() => {
  const { data: user } = useUser();
  const latestScore = useRecoilValue(latestScoreState);
  const socket = useSocket();
  const isOnMyRanking = useRecoilValue(isOnMyRankingState);
  const [myRank, setMyRank] = useRecoilState(myRankState);

  useEffect(() => {
    const getMyRank = (newMyRank: number) => {
      setMyRank(newMyRank);
    };

    socket.on('be-update-myRank', getMyRank);
    let updateMyRankInterval: NodeJS.Timeout;
    if (isOnMyRanking) {
      updateMyRankInterval = setInterval(() => {
        socket.emit('fe-get-myRank');
      }, 1000);
    }

    return () => {
      socket.off('be-update-myRank', getMyRank);
      clearInterval(updateMyRankInterval);
    };
  }, [socket]);

  return <Heading size="sm">{myRank ? `MyRank: ${myRank}位 - ${latestScore[user!.uuid]}  ` : 'loading'} </Heading>;
});

MyRanking.displayName = 'MyRanking';

const RankItem = memo<{ value: string; idx: number; score: number }>(({ idx, score, value }) => {
  return (
    <MotionBox
      key={value}
      layoutId={value}
      transition={{ duration: 0.2 }}
      initial={{ y: -30 }}
      animate={{ y: 0, scale: [0.6, 1.0] }}
      exit={{ x: 100 }}
      textShadow="text-shadow: 2px 1px 0px rgba(255, 255, 255, 1);"
    >
      <Heading size="sm" bgClip="text" bgGradient={GRADIENTS[idx]} key={value + idx}>
        {idx + 1}位: {value} - {score}点
      </Heading>
    </MotionBox>
  );
});

RankItem.displayName = '';
RankItem.displayName = '';

const Top5Rank = memo(() => {
  const socket = useSocket();
  const isOnRanking = useRecoilValue(isOnRankingState);
  const [ranks, setRank] = useState([]);

  useEffect(() => {
    const broadcastRank = getRank => {
      setRank(getRank);
    };
    if (isOnRanking) {
      socket.on('be-broadcast-rank', broadcastRank);
    }
    return () => {
      socket.off('be-broadcast-rank', broadcastRank);
    };
  }, [socket, isOnRanking]);

  return (
    <>
      <AnimatePresence>
        {ranks.map(({ value, score }, idx) => (
          <RankItem key={value} score={score} idx={idx} value={value} />
        ))}
      </AnimatePresence>
      {ranks.length === 0 && (
        <Center h="full" w="full">
          <Heading>No Data</Heading>
        </Center>
      )}
    </>
  );
});

Top5Rank.displayName = 'Top5Rank';

const RankingView: FC = () => {
  return (
    <VStack
      width="full"
      flexShrink={0}
      minH="150px"
      position="relative"
      backgroundColor="#202020"
      border="2px"
      borderColor="#262626"
      textColor="white"
      flexBasis="150px"
      overflowY="scroll"
    >
      <Box color="yellow" fontSize="2xl" pos="absolute" left="2" top="2">
        <RiVipCrownLine />
      </Box>
      <Top5Rank />
      <Divider />
      <MyRanking />
    </VStack>
  );
};

export default RankingView;
