// 안씀 지워야 함

import { sendToAllPeers } from '@src/helper';
import { setBone } from '@src/helper/dynamic/setBoneAvatar';
import { latestMotionState, peerDataListState } from '@src/state/recoil';
import { modelListObject } from '@src/state/shareObject';
import { roomMemberMotions, sendMotionForFrames } from '@src/state/shareObject/shareMotionObject';
import { useUser } from '@src/state/swr';
import produce from 'immer';
import { FC, ReactElement, useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

export const WithIntervalMotionLayer: FC<{ children: ReactElement }> = ({ children }) => {
  const { data: user } = useUser();
  const peers = useRecoilValue(peerDataListState);
  sendMotionForFrames.setPeerId(user!.uuid);

  const setLatestMotionState = useSetRecoilState(latestMotionState);

  useEffect(() => {
    const updateLatestMyMotionInterval = setInterval(() => {
      // n 초간 바뀐 모션 데이터를 모든 룸 Peer에게 보냅니다.
      const setMotion = sendMotionForFrames.getMotionObject();
      // NOTE 모션 값이 있을 때만 발송
      if (setMotion && setMotion.motion)
        setLatestMotionState(
          produce(draft => {
            const updatedMotion = setMotion.motion;
            if (updatedMotion) {
              // sendToAllPeers와 recoil state만 업데이트
              sendToAllPeers(peers, { type: 'motion', data: setMotion });

              draft[user!.uuid] = updatedMotion;
            }
          }),
        );
    }, 100);

    const updateRoomMemberMotionInterval = setInterval(() => {
      // shareObjectMotion의 roomMemberMotion에서 주기적으로 실제 MotionState로 모션을 반영함.
      setLatestMotionState(
        produce(draft => {
          /* eslint-disable */
          for (const key in roomMemberMotions) {
            const newMotion = roomMemberMotions[key];
            const userModel = modelListObject[key];
            if (newMotion && userModel && key !== user!.uuid) {
              setBone(userModel, key, newMotion.pose, newMotion.face);
              draft[key] = newMotion;
              delete roomMemberMotions[key];
            }
          }
        }),
      );
    }, 60);

    return () => {
      clearInterval(updateLatestMyMotionInterval);
      clearInterval(updateRoomMemberMotionInterval);
    };
  }, [peers, user.uuid]);

  return <>{children}</>;
};
