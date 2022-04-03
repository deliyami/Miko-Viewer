import { Box, BoxProps, Center, Divider, Heading, VStack } from '@chakra-ui/react';
import useSocket from '@src/hooks/useSocket';
import { latestScoreState } from '@src/state/recoil/scoreState';
import { myRankState } from '@src/state/recoil/viewing/rankState';
import { useUser } from '@src/state/swr/useUser';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { FC, useEffect, useState } from 'react';
import { RiVipCrownLine } from 'react-icons/ri';
import { useRecoilState, useRecoilValue } from 'recoil';

const MotionBox = motion<Omit<BoxProps, 'transition'>>(Box);

const COLORS = ['#36C5F0', '#2EB67D', '#E01E5A', '#ECB22E', '#E51670', 'red'];
//
const GRADIENTS = [
  'linear(to-l, #ef32d9, #89fffd)', // 1
  'linear(to-l, #a1ffce, #faffd1)', // 2
  'linear(to-l, #fceabb, #f8b500)',
  'linear(to-l, #e0eafc, #cfdef3)',
  'linear(to-l, #eacda3, #d6ae7b)',
];

const RankingView: FC = () => {
  const { data: user } = useUser();
  const socket = useSocket();

  const [myRank, setMyRank] = useRecoilState(myRankState);
  const latestScore = useRecoilValue(latestScoreState);

  const [ranks, setRank] = useState([]);

  useEffect(() => {
    const broadcastRank = getRank => {
      setRank(getRank);
    };
    const getMyRank = (newMyRank: number) => {
      setMyRank(newMyRank);
    };

    socket.on('be-broadcast-rank', broadcastRank);
    socket.on('be-update-myRank', getMyRank);

    const updateMyRankInterval = setInterval(() => {
      socket.emit('fe-get-myRank');
    }, 1000);

    return () => {
      socket.off('be-broadcast-rank', broadcastRank);
      socket.off('be-update-myRank', getMyRank);
      clearInterval(updateMyRankInterval);
    };
  }, [socket]);

  return (
    <VStack
      width="full"
      flexShrink="0"
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
      <LayoutGroup>
        <AnimatePresence>
          {ranks.map(({ value, score }, idx) => {
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
          })}
        </AnimatePresence>
        {ranks.length === 0 && (
          <Center h="full" w="full">
            <Heading>No Data</Heading>
          </Center>
        )}
      </LayoutGroup>
      <Divider />
      <Heading size="sm">{myRank ? `MyRank: ${myRank}位 - ${latestScore[user.uuid]}  ` : 'loading'} </Heading>
    </VStack>
  );
};

export default RankingView;
