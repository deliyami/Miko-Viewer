import DoneAnimationBox from '@src/components/viewing/chat/icon/DoneAnimationBox';
import { DoneIcon } from '@src/components/viewing/chat/icon/DoneIcon';
import { useSocket } from '@src/hooks/dynamicHooks';
import { doneState } from '@src/state/recoil';
import { DoneSendInterface } from '@src/types/share';
import { FC, useEffect } from 'react';
import { useRecoilState } from 'recoil';

export const DoneBallon: FC = () => {
  const [done, setDone] = useRecoilState(doneState);
  const socket = useSocket();

  const getBroadcastedNewDone = (data: DoneSendInterface) => {
    console.log('도네 받았다');
    setDone(before => {
      // const x = Math.random() * 600;
      // const y = Math.random() * 600;
      console.log('변경', before);
      const x = 0;
      const y = 0;
      const after = [...before, { data, x, y }];
      return after;
    });
  };
  useEffect(() => {
    socket.on('be-broadcast-done-item', getBroadcastedNewDone);
    return () => {
      socket.off('be-broadcast-done-item', getBroadcastedNewDone);
    };
  }, [socket]);

  const endDone = () => {
    console.log('도네 종료');
    setDone(before => {
      const after = [...before];
      after.shift();
      return after;
    });
  };
  return (
    <>
      {done.map((value, index) => {
        return (
          <DoneAnimationBox key={index} endDone={endDone} x={value.x} y={value.y} duration={1} delay={1}>
            <DoneIcon width={300} path={value.data.itemId}></DoneIcon>
          </DoneAnimationBox>
        );
      })}
    </>
  );
};
