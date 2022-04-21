import { Button } from '@chakra-ui/react';
import DoneAnimationBox from '@src/components/viewing/chat/icon/DoneAnimationBox';
import { DoneIcon } from '@src/components/viewing/chat/icon/DoneIcon';
import { useSocket } from '@src/hooks/dynamicHooks';
import { doneState, peerDataListState } from '@src/state/recoil';
import { DoneSendInterface } from '@src/types/share';
import { FC, useCallback, useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

type DoneList = {
  data: DoneSendInterface;
  x: number;
  y: number;
};

export const DoneBallon: FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  // const [done, setDone] = useState<DoneList[]>([]);
  const peers = useRecoilValue(peerDataListState);
  const [done, setDone] = useRecoilState(doneState);
  const socket = useSocket();

  const getBroadcastedNewDone = useCallback(
    (data: DoneSendInterface) => {
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
    },
    [socket, done, peers],
  );
  useEffect(() => {
    socket.on('be-broadcast-done-item', getBroadcastedNewDone);
    return () => {
      socket.off('be-broadcast-done-item', getBroadcastedNewDone);
    };
  }, [socket]);

  const endDone = () => {
    console.log('도네 종료');
    // setDone(before => {
    //   const after = [...before];
    //   after.shift();
    //   return after;
    // });
  };
  return (
    <>
      <div>테스트</div>
      <Button
        onClick={() => {
          console.log(done);
        }}
      >
        click
      </Button>
      {done.map((value, index) => {
        <>
          <div>tests</div>
          <DoneAnimationBox key={index} endDone={endDone} x={value.x} y={value.y} duration={1} delay={1}>
            <DoneIcon width={300} path={value.data.itemId}></DoneIcon>
          </DoneAnimationBox>
          ;
        </>;
      })}
    </>
  );
};
