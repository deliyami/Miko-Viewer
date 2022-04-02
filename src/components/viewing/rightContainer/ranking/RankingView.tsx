import { Box, Divider, Heading, VStack } from '@chakra-ui/react';
import useSocket from '@src/hooks/useSocket';
import { latestScoreState } from '@src/state/recoil/scoreState';
import { myRankState } from '@src/state/recoil/viewing/rankState';
import { useUser } from '@src/state/swr/useUser';
import { FC, useEffect, useState } from 'react';
import { RiVipCrownLine } from 'react-icons/ri';
import { useRecoilState, useRecoilValue } from 'recoil';

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
    <VStack width="full" position="relative" backgroundColor="#202020" border="2px" borderColor="#262626" textColor="white" flexBasis="150px" overflowY="scroll">
      <Box color="yellow" fontSize="2xl" pos="absolute" left="2" top="2">
        <RiVipCrownLine />
      </Box>
      {ranks.length
        ? ranks.map((rank, index) => {
            return (
              <Heading size="sm" key={rank.value + index}>
                {index + 1}位: {rank.value} - {rank.score}点
              </Heading>
            );
          })
        : 'loading'}
      <Divider />
      <Heading size="sm">{myRank ? `MyRank: ${myRank}位 - ${latestScore[user.uuid]}  ` : 'loading'} </Heading>
    </VStack>
  );
};

export default RankingView;
