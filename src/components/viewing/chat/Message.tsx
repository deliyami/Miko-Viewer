import { HStack, Tag, Text } from '@chakra-ui/react';
import { useUser } from '@src/state/swr/useUser';
import { ChatMessageInterface } from '@src/types/ChatMessageType';
import React from 'react';

const Message: React.FC<{ data: ChatMessageInterface }> = ({
  data: { sender, text, timestamp },
}) => {
  const {
    data: { name },
  } = useUser();

  return (
    <HStack alignSelf={sender === name ? 'start' : 'end'}>
      <Tag>{sender}</Tag>
      <Text>{text}</Text>
    </HStack>
  );
};

export default Message;
