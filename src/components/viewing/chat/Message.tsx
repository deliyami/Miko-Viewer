import { Avatar, Box, Flex, Heading, HStack, Tag, Text, VStack } from '@chakra-ui/react';
import { useUser } from '@src/state/swr/useUser';
import { ChatMessageInterface } from '@src/types/ChatMessageType';
import React, { FC } from 'react';

const COLORS = ['#36C5F0', '#2EB67D', '#E01E5A', '#ECB22E', '#E51670'];
const DARKEN_COLORS = ['#0a6b88', '#175b3e', '#700f2c', '#815d0b', '#720b38'];
const MAX_AMOUNT = 10000;

const Message: FC<{ data: ChatMessageInterface }> = ({ data: { sender, text, amount, timestamp } }) => {
  const {
    data: { name, avatar },
  } = useUser();

  const SuperChat: FC = () => {
    const colorIdx = Math.floor(Math.min(MAX_AMOUNT, amount) / Math.floor(MAX_AMOUNT / COLORS.length));

    return (
      <VStack bgColor={COLORS[colorIdx]} w="full" alignSelf={sender === name ? 'start' : 'end'} borderRadius="base">
        <HStack w="full" bgColor={DARKEN_COLORS[colorIdx]} px="2" py="1">
          {avatar && <Avatar size="md" src={avatar} padding="0.5" />}
          <VStack w="full" alignItems="start" justifyContent="center">
            <Heading size="md" fontWeight="600" isTruncated>
              {sender}
            </Heading>
            <Heading size="sm">{amount}円</Heading>
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
      <Flex>
        <Text flexGrow="1">
          <Tag as="span" mr="2">
            {sender}
          </Tag>
          {text}
        </Text>
      </Flex>
    );
  };

  if (amount) return <SuperChat />;
  return <CommonChat />;
};

export default Message;
