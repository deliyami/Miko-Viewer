import DoneAnimationBox from '@src/components/viewing/chat/icon/DoneAnimationBox';
import { DoneIcon } from '@src/components/viewing/chat/icon/DoneIcon';
import useSocket from '@src/hooks/useSocket';
import { doneAccept } from '@src/state/recoil/viewing/chat/doneState';
import { waitingDone } from '@src/state/shareObject/shareDoneObject';
import { DoneSendInterface } from '@src/types/share/DoneItem';
import { FC, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

type Props = { width?: number; duration?: number; delay?: number; x: number; y: number };

export const DoneBallon: FC<Props> = props => {
  const [doneApt, setDoneApt] = useRecoilState(doneAccept);
  const [isRunning, setIsRunning] = useState(false);
  const [nowDone, setNowDone] = useState<number>();
  const socket = useSocket();

  const getBroadcastedNewDone = (data: DoneSendInterface) => {
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
    const thisDone = waitingDone[0];
    if (typeof thisDone === 'undefined') {
      setDoneApt(false);
      return;
    }
    setNowDone(thisDone.itemId);
    setIsRunning(true);
  };
  useEffect(() => {
    if (!doneApt) {
      return;
    }
    doneHandler();
  }, [doneApt]);
  const retry = () => {
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
        <DoneAnimationBox retry={retry} {...props}>
          <DoneIcon width={props.width} path={nowDone}></DoneIcon>
        </DoneAnimationBox>
      ) : (
        <></>
      )}
    </>
  );
};
