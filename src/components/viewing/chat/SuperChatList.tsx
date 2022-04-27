import { Avatar, Center, Heading, HStack, Text } from '@chakra-ui/react';
import { MotionBox } from '@src/components/common/motion/MotionChakra';
import { IMAGE_DOMAIN } from '@src/const';
import { ChatMessageInterface } from '@src/types/dto/ChatMessageType';
import { Dispatch, FC, memo, SetStateAction, useEffect } from 'react';
import { COLORS, DARKEN_COLORS, getColorIdxByAmount } from './Message';

const SuperChatItem: FC<{ message: ChatMessageInterface; setMessages: Dispatch<SetStateAction<ChatMessageInterface[]>> }> = ({
  message: { sender, text, timestamp, amount, itemId, user },
  setMessages,
}) => {
  const colorIdx = getColorIdxByAmount(amount as number);

  useEffect(() => {
    const setTimeoutID = setTimeout(() => {
      setMessages(messages => {
        const newMessages = [...messages];
        const index = newMessages.findIndex(m => m.timestamp === timestamp);
        if (index !== -1) {
          newMessages.splice(index, 1);
        }
        return newMessages;
      });
    }, (amount as number) * 10);

    return () => {
      clearTimeout(setTimeoutID);
    };
  }, []);

  return (
    <Center bgColor="red" h="12" position="relative" backgroundColor={COLORS[colorIdx]} borderRadius="full">
      <MotionBox
        position="absolute"
        backgroundColor={DARKEN_COLORS[colorIdx]}
        borderRadius="full"
        h="full"
        top="0"
        left="0"
        width="full"
        transformOrigin="left"
        animate={{ scaleX: [1, 0], transition: { duration: (amount as number) / 100 } }}
      ></MotionBox>
      <HStack zIndex="1" mr="2">
        <Avatar size="md" name={sender} mr="1" src={IMAGE_DOMAIN + user!.avatar} boxShadow=" 0px 0px 0px 2px white" />
        <Text whiteSpace="nowrap" fontSize="2xl" fontWeight="bold">
          {amount}
          🪙
        </Text>
      </HStack>
    </Center>
  );
};

const SuperChatList = memo<{ messages: ChatMessageInterface[]; setMessages: Dispatch<SetStateAction<ChatMessageInterface[]>> }>(({ messages, setMessages }) => {
  return (
    <HStack w="full" h="14" overflowX="scroll" px="1">
      {messages.map(message => (
        <SuperChatItem key={message.timestamp} message={message} setMessages={setMessages} />
      ))}
      {messages.length === 0 && (
        <Heading w="full" textAlign="center">
          SUPER CHAT...
        </Heading>
      )}
    </HStack>
  );
});

SuperChatList.displayName = 'SuperChatList';

export default SuperChatList;
