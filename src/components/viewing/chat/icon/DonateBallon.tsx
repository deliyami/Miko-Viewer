import DonateAnimationBox from '@src/components/viewing/chat/icon/DonateAnimationBox';
import { DonateIcon } from '@src/components/viewing/chat/icon/DonateIcon';
import { donateAccept } from '@src/state/recoil/donateState';
import { waitingDonate } from '@src/state/shareObject/shareDonateObject';
import { FC, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

type Props = { width?: number; duration?: number; delay?: number; x: number; y: number };

export const DonateBallon: FC<Props> = props => {
  const [donateApt, setDonateApt] = useRecoilState(donateAccept);
  const [isRunning, setIsRunning] = useState(false);
  const [nowDonate, setNowDonate] = useState<number>();

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
