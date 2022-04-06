import { Box, Button, Center, Input, ScaleFade } from '@chakra-ui/react';
import { DoneOption } from '@src/components/viewing/chat/DoneOption';
import sendToAllPeers from '@src/helper/sendToAllPeers';
import showChatToRoom from '@src/helper/showChatToRoom';
import useSocket from '@src/hooks/useSocket';
import { chatModeState, isShowChatInputState, peerDataListState } from '@src/state/recoil/viewingState';
import { addedScoreForSeconds } from '@src/state/shareObject/shareObject';
import { useUser } from '@src/state/swr/useUser';
import { ChatMessageInterface } from '@src/types/ChatMessageType';
import { FormEvent, KeyboardEventHandler, memo, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { SuperChatOption } from './SuperChatOption';

const ChatMessageInput = memo(() => {
  const socket = useSocket();
  const user = useUser();
  const [isShow, setIsShow] = useRecoilState(isShowChatInputState);
  const [chatMode, setChatMode] = useRecoilState(chatModeState);
  const peers = useRecoilValue(peerDataListState);
  const inputRef = useRef<HTMLInputElement>();
  const [newMessage, setNewMessage] = useState<string>('');
  const [amount, setAmount] = useState<number>(0);

  const chatModeCompute = () => {
    if (amount !== 0) return 'public';
    if (chatMode === 'public') return 'public';
    return 'private';
  };

  const sendMessage = () => {
    if (!newMessage) return;
    addedScoreForSeconds.addScore(1);

    const data: ChatMessageInterface = {
      sender: user.data.name,
      text: newMessage,
      amount,
      timestamp: Date.now(),
    };

    sendToAllPeers(peers, { type: 'chat', data });
    showChatToRoom(user.data.uuid, newMessage, 5);

    if (chatModeCompute() === 'public') {
      socket.emit('fe-send-message', data);
    }

    setNewMessage('');
    setAmount(0);
    inputRef.current.focus();
  };

  const onSubmitHandler = (e: FormEvent) => {
    e.preventDefault();
    sendMessage();
  };

  const onKeyDownHandler: KeyboardEventHandler<HTMLInputElement> = e => {
    e.stopPropagation();
    if (e.key === 'Enter') {
      sendMessage();
    }
    if (e.key === 'Esc' || e.key === 'Escape') {
      setIsShow(false);
    }
  };

  return (
    <Box bottom="2" position="fixed" zIndex={100}>
      <ScaleFade in={isShow}>
        <Center bgColor="white" p="2" backgroundColor="#000000AA" border="2px" borderRadius="xl" gap="10px" px="4" py="4">
          <Button
            colorScheme="facebook"
            width="20"
            onClick={() =>
              setChatMode(prev => {
                if (prev === 'private') return 'public';
                return 'private';
              })
            }
          >
            {chatModeCompute() === 'public' ? '全体へ' : 'ルームへ'}
          </Button>
          {/* <FormControl> */}
          <Input
            id="chat-input"
            autoComplete="off"
            zIndex={10}
            ref={inputRef}
            width="50vw"
            autoFocus
            type="text"
            name="message"
            color="white"
            value={newMessage}
            onChange={e => setNewMessage(e.target.value)}
            placeholder="Message"
            onKeyUp={onKeyDownHandler}
          />
          <DoneOption />
          <SuperChatOption amount={amount} setAmount={setAmount} />
          <Button type="submit" onClick={onSubmitHandler} colorScheme={amount === 0 ? 'cyan' : 'messenger'}>
            送る
          </Button>
          {/* </FormControl> */}
        </Center>
      </ScaleFade>
    </Box>
  );
});

ChatMessageInput.displayName = 'ChatMessageInput';

export default ChatMessageInput;
