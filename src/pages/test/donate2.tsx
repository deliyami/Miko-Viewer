import { Box, Button, FormLabel, Input, Text, VStack } from "@chakra-ui/react";
import UserDonate from "@src/components/test/UserDonate2";
import { useRouter } from "next/router";
import { useRef, useState } from "react";

const donate2 = second => {
  const router = useRouter();
  const nicknameInputRef = useRef(null);
  const coinInputRef = useRef(null);
  const contentInputRef = useRef(null);
  const [nickname, setNickname] = useState("chulsu");
  const [coin, setCoin] = useState("10000");
  const [content, setContent] = useState(
    "테스트입니다테스트입니다테스트입니다테스트입니다테스트입니다테스트입니다테스트입니다테스트입니다테스트입니다테스트입니다테스트입니다테스트입니다테스트입니다테스트입니다테스트입니다테스트입니다테스트입니다테스트입니다테스트입니다테스트입니다",
  );
  return (
    <Box>
      <style>{`
        p {
          background-color:yellow
        }
      `}</style>
      {router.asPath}
      <Text>donate</Text>
      <UserDonate nickname={nickname} coin={coin} content={content}></UserDonate>
      <form
        onSubmit={e => {
          e.preventDefault();
          setNickname(nicknameInputRef.current.value);
          setCoin(coinInputRef.current.value);
          setContent(contentInputRef.current.value);
        }}
      >
        <VStack>
          <FormLabel>사용자 이름</FormLabel>
          <Input ref={nicknameInputRef}></Input>
          <FormLabel>코인</FormLabel>
          <Input ref={coinInputRef}></Input>
          <FormLabel>내용</FormLabel>
          <Input ref={contentInputRef}></Input>
          <Button type="submit"></Button>
        </VStack>
      </form>
    </Box>
  );
};

export default donate2;
