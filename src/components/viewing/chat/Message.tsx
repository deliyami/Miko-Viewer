import { Avatar, Box, HStack, Tag, Text, VStack } from '@chakra-ui/react';
import { useUser } from '@src/state/swr/useUser';
import { ChatMessageInterface } from '@src/types/ChatMessageType';
import React, { FC } from 'react';

const Message: FC<{ data: ChatMessageInterface }> = ({ data: { sender, text, amount } }) => {
  const {
    data: { name, avatar },
  } = useUser();

  const SuperChat: FC = () => {
    return (
      <VStack bgColor="green.500" w="full" alignSelf={sender === name ? 'start' : 'end'} borderRadius="base">
        <HStack w="full" bgColor="green.700" px="2" py="1">
          {avatar && <Avatar size="md" src={avatar} padding="0.5" />}
          <VStack w="full" alignItems="start" justifyContent="center">
            <Text>{sender}</Text>
            <Text>{amount}円</Text>
          </VStack>
        </HStack>
        <Box w="full" px="2" py="1">
          <Text fontWeight="bold">{text}</Text>
        </Box>
      </VStack>
    );
  };

  const CommonChat: FC = () => {
    return (
      <HStack alignSelf={sender === name ? 'start' : 'end'}>
        <Tag>{sender}</Tag>
        <Text>{text}</Text>
      </HStack>
    );
  };

  if (amount) return <SuperChat />;
  return <CommonChat />;
};

export default Message;
