import DonateButton from '@src/components/test/DonateButton';
import UserDonate from '@src/components/test/UserDonate';
import { useState } from 'react';

const DonatePage = () => {
  const [nickname, setNickname] = useState<string>('');
  const [coin, setCoin] = useState<string | number>('');
  const [content, setContent] = useState<string>('');
  const [viewDonate, setViewDonate] = useState<number[]>([]);

  const donateFunction = (newNickname: string, newCoin: string | number, newContent: string) => {
    setTimeout(() => {
      setViewDonate([]);
    }, 100000);
    console.log('nickname', nickname);
    console.log('coin', coin);
    console.log('content', content);
    setNickname(newNickname);
    setCoin(newCoin);
    setContent(newContent);
    setViewDonate([0]);
  };
  return (
    <>
      {viewDonate.map((_, i) => {
        return <UserDonate key={i} nickname={nickname} coin={coin} content={content} donateScale={75} delay={100000} top={10} left={10}></UserDonate>;
      })}
      <DonateButton DonateFunction={donateFunction}></DonateButton>;
    </>
  );
};

export default DonatePage;
