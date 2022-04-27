import styles from '@src/style/css/chat.module.scss';
import { ChatMessageInterface } from '@src/types/dto/ChatMessageType';
import React, { FC } from 'react';

export const COLORS = ['#36C5F0', '#2EB67D', '#E01E5A', '#ECB22E', '#E51670', '#FF0000'];
export const DARKEN_COLORS = ['#0a6b88', '#175b3e', '#700f2c', '#815d0b', '#720b38', '#AA0000'];
const MAX_AMOUNT = 10000;

export const getColorIdxByAmount = (amount: number) => {
  return Math.floor((Math.min(MAX_AMOUNT, amount) / MAX_AMOUNT) * (COLORS.length - 1));
};

const Message: FC<{ data: ChatMessageInterface }> = ({ data: { sender, text, amount, timestamp } }) => {
  const SuperChat: FC = () => {
    const colorIdx = getColorIdxByAmount(amount as number);

    return (
      <div className={styles['super-chat']} style={{ backgroundColor: COLORS[colorIdx] }}>
        <div style={{ backgroundColor: DARKEN_COLORS[colorIdx] }}>
          <div>
            <h2>{sender}</h2>
            <h2>{amount}円</h2>
          </div>
        </div>
        <div>
          <p>{text}</p>
        </div>
      </div>
    );
  };

  const CommonChat: FC = () => {
    return (
      <div className={styles['common-chat']}>
        <p>
          <span>{sender}</span>
          {text}
        </p>
      </div>
    );
  };

  if (amount) return <SuperChat />;
  return <CommonChat />;
};

export default Message;
