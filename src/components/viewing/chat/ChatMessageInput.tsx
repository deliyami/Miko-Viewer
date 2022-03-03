import {
  Box,
  Button,
  Center,
  FormControl,
  Input,
  ScaleFade,
} from '@chakra-ui/react';
import sendToAllPeers from '@src/helper/sendToAllPeers';
import useSocket from '@src/hooks/useSocket';
import {
  chatModeState,
  isShowChatInputState,
  peerDataListState,
  roomIdState,
} from '@src/state/recoil/viewingState';
import { useUser } from '@src/state/swr/useUser';
import { ChatMessageInterface } from '@src/types/ChatMessageType';
import {
  FormEvent,
  KeyboardEventHandler,
  useCallback,
  useRef,
  useState,
} from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

const ChatMessageInput = () => {
  const socket = useSocket();
  const user = useUser();
  const [isShow, setIsShow] = useRecoilState(isShowChatInputState);
  const [chatMode, setChatMode] = useRecoilState(chatModeState);
  const inputRef = useRef<HTMLInputElement>();
  const roomId = useRecoilValue(roomIdState);
  const [newMessage, setNewMessage] = useState<string>('');
  const peers = useRecoilValue(peerDataListState);

  const sendMessage = useCallback(() => {
    const data: ChatMessageInterface = {
      sender: user.data.name,
      text: newMessage,
      timestamp: Date.now(),
    };

    sendToAllPeers(peers, { type: 'chat', data });
    if (chatMode === 'public') {
      socket.emit('fe-send-message', data, roomId);
    }

    setNewMessage('');
    inputRef.current.focus();
  }, [newMessage, user.data]);

  const onSubmitHandler = (e: FormEvent) => {
    e.preventDefault();
    if (newMessage) {
      sendMessage();
    }
  };

  const onKeyDownHandler: KeyboardEventHandler<HTMLInputElement> = (e) => {
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
        <Center bgColor="white" p="2">
          <Button
            colorScheme="facebook"
            width="12"
            onClick={() =>
              setChatMode((prev) => {
                if (prev === 'private') return 'public';
                return 'private';
              })
            }
          >
            {chatMode === 'public' ? '전체' : ' 방 '}
          </Button>
          <FormControl>
            <Input
              id="chat-input"
              zIndex={10}
              ref={inputRef}
              width="50vw"
              autoFocus
              type="text"
              name="message"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Message"
              onKeyUp={onKeyDownHandler}
            />
            <Button type="submit" onClick={onSubmitHandler}>
              보내기
            </Button>
          </FormControl>
        </Center>
      </ScaleFade>
    </Box>
  );
};

export default ChatMessageInput;
