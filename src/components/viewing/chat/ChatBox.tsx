import { Box, Text, VStack } from '@chakra-ui/react';
import { messagesState } from '@src/state/recoil/viewingState';
import { useEffect, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import Message from './Message';

const ChatBox = () => {
  const messages = useRecoilValue(messagesState);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'start',
    });
  };

  return (
    <VStack backgroundColor="red.100" height="80vh" width="20vw">
      <Text>채팅</Text>
      <VStack maxHeight="75vh" overflow="scroll" p="4">
        {messages.length > 0
          ? messages.map((data, idx) => {
              return <Message key={idx} data={data} />;
            })
          : 'Chat is empty'}
        <Box
          float="left"
          id="end-of-chatbox"
          style={{ clear: 'both' }}
          ref={messagesEndRef}
        />
      </VStack>
    </VStack>
  );
};

export default ChatBox;
