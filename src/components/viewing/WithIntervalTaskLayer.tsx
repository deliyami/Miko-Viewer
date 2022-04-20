import { UPDATE_USERS_SCORE_TIME } from '@src/const';
import { sendToAllPeers } from '@src/helper';
import { useSocket } from '@src/hooks/dynamicHooks';
import { latestScoreState, peerDataListState } from '@src/state/recoil';
import { addedScoreForSeconds } from '@src/state/shareObject/shareAddedScoreForSeconds';
import { roomMemberScores } from '@src/state/shareObject/shareRoomMemberScores';
import { useUser } from '@src/state/swr';
import produce from 'immer';
import { FC, ReactElement, useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

export const WithIntervalTaskLayer: FC<{ children: ReactElement }> = ({ children }) => {
  const { data: user } = useUser();
  const socket = useSocket();
  const peers = useRecoilValue(peerDataListState);

  const setLatestScoreState = useSetRecoilState(latestScoreState);

  useEffect(() => {
    const updateLatestMyScoreInterval = setInterval(() => {
      // n 초간 추가된 점수를 더한 최신 총점수를 모든 룸 Peer에게 보냅니다.
      // redis 상의 자신의 랭킹 점수를 업데이트 합니다
      const addedScore = addedScoreForSeconds.getAndReset();
      // NOTE 점수가 올랐을때만 보냄.
      if (addedScore)
        setLatestScoreState(
          produce(draft => {
            const updatedScore = (draft?.[user!.uuid] ?? 0) + addedScore;
            // DataConnection을 통해 전달 후 shareObject의 roomMemberScores를 업데이트
            sendToAllPeers(peers, { type: 'scoreUpdate', data: updatedScore });

            // redis에 자신의 점수를 업데이트
            socket.emit('fe-update-score', addedScore, updatedScore);

            // 나의 Score State를 업데이트
            draft[user!.uuid] = updatedScore;
          }),
        );
    }, 1000);

    const updateRoomMemberScoreInterval = setInterval(() => {
      //  shareObject의 roomMemberScores에서 주기적으로 실제 ScoreState로 점수를 반영함.
      setLatestScoreState(
        produce(draft => {
          Object.entries(roomMemberScores).forEach(([userId, score]) => {
            const newScore = score;
            draft[userId] = newScore;
            delete roomMemberScores[userId];
          });
        }),
      );
    }, UPDATE_USERS_SCORE_TIME);

    return () => {
      console.log('useEffect return - withIntervalTaskLayer');
      clearInterval(updateLatestMyScoreInterval);
      clearInterval(updateRoomMemberScoreInterval);
    };
  }, [peers, user?.uuid]);

  return <>{children}</>;
};
