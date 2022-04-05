import DonateAnimationBox from '@src/components/viewing/chat/icon/DonateAnimationBox';
import { DonateIcon } from '@src/components/viewing/chat/icon/DonateIcon';
import addDonateToRoom from '@src/helper/addDonateToRoom';
import useSocket from '@src/hooks/useSocket';
import { donateAccept } from '@src/state/recoil/donateState';
import { waitingDonate } from '@src/state/shareObject/shareDonateObject';
import { DoneSendInterface } from '@src/types/share/DoneItem';
import { FC, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

type Props = { width?: number; duration?: number; delay?: number; x: number; y: number };

export const DoneBallon: FC<Props> = props => {
  const [donateApt, setDonateApt] = useRecoilState(donateAccept);
  const [isRunning, setIsRunning] = useState(false);
  const [nowDonate, setNowDonate] = useState<number>();
  const socket = useSocket();

  useEffect(() => {
    const getBroadcastedNewDone = (data: DoneSendInterface) => {
      // const data: DoneSendInterface = {
      //   sender: user.data.name,
      //   itemId: index,
      //   timestamp: Date.now(),
      // };

      // showChatToRoom(user.data.uuid, newMessage, 5); // 이거보고 만들 것

      // socket.emit('fe-send-donation', data);
      addDonateToRoom(data);
      if (!donateApt) setDonateApt(e => !e);
    };
    socket.on('be-broadcast-done-item', getBroadcastedNewDone);
    return () => {
      socket.off('be-broadcast-done-item', getBroadcastedNewDone);
    };
  }, [socket]);

  const donateHandler = () => {
    if (!donateApt) return;

    const thisDonate = waitingDonate.shift();
    if (typeof thisDonate === 'undefined') {
      setDonateApt(false);
      return;
    }
    setNowDonate(thisDonate.itemId);
    setIsRunning(true);
  };
  useEffect(() => {
    donateHandler();
  }, [donateApt]);
  const retry = () => {
    setIsRunning(false);
    setNowDonate(undefined);
    setTimeout(() => {
      donateHandler();
    }, 500);
  };
  return (
    <>
      {isRunning ? (
        <DonateAnimationBox retry={retry} {...props}>
          <DonateIcon width={props.width} path={nowDonate}></DonateIcon>
        </DonateAnimationBox>
      ) : (
        <></>
      )}
    </>
  );
};
