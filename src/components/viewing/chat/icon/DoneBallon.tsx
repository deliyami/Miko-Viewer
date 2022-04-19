import DoneAnimationBox from '@src/components/viewing/chat/icon/DoneAnimationBox';
import { DoneIcon } from '@src/components/viewing/chat/icon/DoneIcon';
import { useSocket } from '@src/hooks/dynamicHooks';
import { doneAccept } from '@src/state/recoil';
import { waitingDone } from '@src/state/shareObject/shareDoneObject';
import { DoneSendInterface } from '@src/types/share';
import { FC, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

type Props = { width?: number; duration?: number; delay?: number; x: number; y: number };

export const DoneBallon: FC<Props> = props => {
  const [doneApt, setDoneApt] = useRecoilState(doneAccept);
  const [isRunning, setIsRunning] = useState(false);
  const [nowDone, setNowDone] = useState<number>();
  const socket = useSocket();

  const getBroadcastedNewDone = (data: DoneSendInterface) => {
    console.log('도네 받았다', waitingDone.length, waitingDone);
    waitingDone[waitingDone.length] = data;
    setDoneApt(e => {
      if (!e) {
        return true;
      }
      return e;
    });
  };
  useEffect(() => {
    socket.on('be-broadcast-done-item', getBroadcastedNewDone);
    return () => {
      socket.off('be-broadcast-done-item', getBroadcastedNewDone);
    };
  }, [socket]);

  const doneHandler = () => {
    console.log('2실행');
    const thisDone = waitingDone[0];
    if (typeof thisDone === 'undefined') {
      setDoneApt(false);
      return;
    }
    setNowDone(thisDone.itemId);
    setIsRunning(true);
  };
  useEffect(() => {
    console.log('1실행');
    if (!doneApt) {
      return;
    }
    doneHandler();
  }, [doneApt]);
  const retry = () => {
    console.log('first');
    setIsRunning(false);
    setNowDone(undefined);
    waitingDone.shift();
    setTimeout(() => {
      doneHandler();
    }, 500);
  };
  return (
    <>
      {isRunning ? (
        <DoneAnimationBox retry={retry} x={200} y={-100} duration={1} delay={1}>
          <DoneIcon width={300} path={nowDone}></DoneIcon>
        </DoneAnimationBox>
      ) : (
        <></>
      )}
    </>
  );
};
