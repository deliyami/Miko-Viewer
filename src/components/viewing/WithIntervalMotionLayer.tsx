import sendToAllPeers from '@src/helper/sendToAllPeers';
import { setBorn } from '@src/helper/setBornAvatar';
import { model } from '@src/state/recoil/modelState';
import { latestMotionState } from '@src/state/recoil/motionState';
import { peerDataListState } from '@src/state/recoil/viewingState';
import { roomMemberMotions, sendMotionForFrames } from '@src/state/shareObject/shareMotionObject';
import { useUser } from '@src/state/swr/useUser';
import produce from 'immer';
import { FC, useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

export const WithIntervalMotionLayer: FC = ({ children }) => {
  const { data: user } = useUser();
  const peers = useRecoilValue(peerDataListState);
  const modelState = useRecoilValue(model);
  sendMotionForFrames.setPeerId(user.uuid);

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
              // 여기서 onResults를 받고 모션 해석하고 shareObjectMotion에 입력 할 수 없기 때문에
              // sendToAllPeers와 recoil state만 업데이트
              sendToAllPeers(peers, { type: 'motion', data: setMotion });

              // redis에 내 모션 데이터를 넣을 필요가 없음

              // 나의 Motion State를 업데이트
              draft[user.uuid] = updatedMotion;
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
            // console.log('this is withinterval motion', key, roomMemberMotions[key]);
            const newMotion = roomMemberMotions[key];
            const userModel = modelState[key];
            if (newMotion && userModel && key !== user.uuid) {
              setBorn(userModel, key, newMotion.pose, newMotion.face);
              draft[key] = newMotion;
              delete roomMemberMotions[key];
            }
          }
        }),
      );
    }, 50);

    return () => {
      clearInterval(updateLatestMyMotionInterval);
      clearInterval(updateRoomMemberMotionInterval);
    };
  }, [peers, user.uuid]);

  return <>{children}</>;
};
