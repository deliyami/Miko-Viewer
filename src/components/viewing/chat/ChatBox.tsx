import { Box, Text, VStack } from '@chakra-ui/react';
import { messagesState } from '@src/state/recoil/viewingState';
import { useRecoilValue } from 'recoil';
import Message from './Message';

const ChatBox = () => {
  const messages = useRecoilValue(messagesState);

  return (
    <VStack backgroundColor="red.100" height="80vh" width="20vw">
      <Text>채팅</Text>
      <Text>{messages.length > 0 ? '0' : '10'}</Text>
      <Box>
        {messages.length > 0
          ? messages.map((data, idx) => {
              return <Message key={idx} data={data} />;
            })
          : 'Chat is empty'}
      </Box>
    </VStack>
  );
};

export default ChatBox;
