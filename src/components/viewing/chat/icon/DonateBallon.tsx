import DonateAnimationBox from '@src/components/viewing/chat/icon/DonateAnimationBox';
import { DonateIcon } from '@src/components/viewing/chat/icon/DonateIcon';
import { DonateProps } from '@src/types/DonateTypes';
import { FC } from 'react';

export const DonateBallon: FC<DonateProps> = props => {
  return (
    <DonateAnimationBox>
      <DonateIcon {...props}></DonateIcon>
    </DonateAnimationBox>
  );
};

export const DonateLazyBallon: FC<DonateProps> = props => {
  return (
    <DonateAnimationBox>
      <DonateIcon {...props}></DonateIcon>
    </DonateAnimationBox>
  );
};
