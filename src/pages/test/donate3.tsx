import { Box, Button, FormLabel, Input, VStack } from '@chakra-ui/react';
import UserDonate from '@src/components/test/UserDonate';
import { useRef, useState } from 'react';

const Donate3 = () => {
  const nicknameInputRef = useRef(null);
  const coinInputRef = useRef(null);
  const contentInputRef = useRef(null);
  const [nickname, setNickname] = useState('minsu');
  const [coin, setCoin] = useState('10000');
  const [content, setContent] = useState('testtesttesttest');
  const [viewDonate, setViewDonate] = useState<number[]>([]);
  return (
    <Box>
      {viewDonate.map((value, i) => (
        /*
         * top, left, donateScale: percentage
         * delay: ms
         */
        <UserDonate top={50} left={0} delay={3000} donateScale={75} nickname={nickname} coin={coin} content={content} key={i}></UserDonate>
      ))}
      <form
        onSubmit={e => {
          e.preventDefault();
          setNickname(nicknameInputRef.current.value);
          setCoin(coinInputRef.current.value);
          setContent(contentInputRef.current.value);
          setViewDonate([0]);
          setTimeout(() => {
            setViewDonate([]);
          }, 4000);
        }}
      >
        <VStack>
          <FormLabel>사용자 이름</FormLabel>
          <Input ref={nicknameInputRef} type="text"></Input>
          <FormLabel>코인</FormLabel>
          <Input ref={coinInputRef} type="number"></Input>
          <FormLabel>내용</FormLabel>
          <Input ref={contentInputRef} type="text"></Input>
          <Button type="submit"></Button>
        </VStack>
      </form>
    </Box>
  );
};

export default Donate3;
