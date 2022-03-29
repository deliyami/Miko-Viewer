import { Divider, HStack, Text, VStack } from '@chakra-ui/react';
import useSocket from '@src/hooks/useSocket';
import { myRankState } from '@src/state/recoil/myRankState';
import { latestScoreState } from '@src/state/recoil/scoreState';
import { useUser } from '@src/state/swr/useUser';
import produce from 'immer';
import { FC, useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

const RankingView: FC = () => {
  const { data: user } = useUser();
  const socket = useSocket();
  const [rank, setRank] = useState(null);
  const [myRank, setMyRank] = useState(null);
  const setMyRankState = useSetRecoilState(myRankState);
  // const myRank = useRecoilValue(myRankState);
  const myScore = useRecoilValue(latestScoreState);

  const getMyRank = getMyRankState => {
    setMyRankState(
      produce(draft => {
        // 나의 Score State를 업데이트
        console.log('myRank 업데이트', draft, getMyRankState);
        draft[user.uuid] = getMyRankState;
        setMyRank(getMyRankState);
      }),
    );
  };

  useEffect(() => {
    socket.on('be-broadcast-rank', getRank => {
      console.log('show Rank ', getRank);
      setRank(getRank);
    });
    socket.on('be-update-myRank', getMyRank);
  }, []);

  return (
    <VStack width="full" backgroundColor="#202020" border="2px" borderColor="#262626" textColor="white">
      <Text fontSize="2xl">Ranking</Text>

      {rank === null ? (
        <p>nothing</p>
      ) : (
        rank.map((element, index) => {
          return (
            <HStack key={index}>
              <Text>
                {index + 1}位: {element.value}, {element.score}点
              </Text>
            </HStack>
          );
        })
      )}

      <Divider />
      <VStack>
        <Text>MyRank: {myRank}位</Text>
        <HStack>
          <Text> {user.name}</Text>
          <Text> {myScore[user.uuid]}点</Text>
        </HStack>
      </VStack>
    </VStack>
  );
};

export default RankingView;
