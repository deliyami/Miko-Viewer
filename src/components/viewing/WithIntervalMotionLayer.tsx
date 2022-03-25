import sendToAllPeers from '@src/helper/sendToAllPeers';
import useSocket from '@src/hooks/useSocket';
import { lastestMotionState } from '@src/state/recoil/motionState';
import { peerDataListState } from '@src/state/recoil/viewingState';
import { roomMemberMotions, sendMotionForFrames } from '@src/state/shareObject/shareMotionObject';
import { useUser } from '@src/state/swr/useUser';
import produce from 'immer';
import { FC, useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

export const WithIntervalMotionLayer: FC = ({ children }) => {
  const { data: user } = useUser();
  const socket = useSocket();
  const peers = useRecoilValue(peerDataListState);

  const setLatestMotionState = useSetRecoilState(lastestMotionState);

  useEffect(() => {
    const updateLatestMyMotionInterval = setInterval(() => {
      // n 초간 바뀐 모션 데이터를 모든 룸 Peer에게 보냅니다.
      const setMotion = sendMotionForFrames.getMotionObject();
      // NOTE 모션 값이 있을 때만 발송
      console.log(setMotion);
      if (setMotion && setMotion.motion)
        setLatestMotionState(
          produce(draft => {
            const updatedMotion = setMotion.motion;
            if (updatedMotion) {
              console.log('보낸다!!');
              // 여기서 onResults를 받고 모션 해석하고 shareObjectMotion에 입력 할 수 없기 때문에
              // sendToAllPeers와 recoil state만 업데이트
              sendToAllPeers(peers, { type: 'motion', data: setMotion });

              // redis에 내 모션 데이터를 넣을 필요가 없음

              // 나의 Motion State를 업데이트
              draft[user.uuid] = updatedMotion;
            }
          }),
        );
    }, 300);

    const updateRoomMemberMotionInterval = setInterval(() => {
      // shareObjectMotion의 roomMemberMotion에서 주기적으로 실제 MotionState로 점수를 반영함.
      setLatestMotionState(
        produce(draft => {
          for (const key in roomMemberMotions) {
            console.log('바뀐다!');
            const newMotion = roomMemberMotions[key];
            draft[key] = newMotion;
            delete roomMemberMotions[key];
          }
        }),
      );
    }, 300);

    return () => {
      clearInterval(updateLatestMyMotionInterval);
      clearInterval(updateRoomMemberMotionInterval);
    };
    // NOTE 또 이거 까먹어서 고생함.
  }, [peers, user.uuid, setLatestMotionState]);

  return <>{children}</>;
};
