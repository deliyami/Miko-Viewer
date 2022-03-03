import { Box, Button, Input } from '@chakra-ui/react';
import useSocket from '@src/hooks/useSocket';
import { roomIdState } from '@src/state/recoil/viewingState';
import { useUser } from '@src/state/swr/useUser';
import { FormEvent, useState } from 'react';
import { useRecoilValue } from 'recoil';

const ChatMessageInput = () => {
  const socket = useSocket();
  const user = useUser();

  const roomId = useRecoilValue(roomIdState);
  const [newMessage, setNewMessage] = useState<string>('');

  const formHandler = (e: FormEvent) => {
    e.preventDefault();
    console.log(e);
    if (newMessage) {
      socket.emit(
        'new message',
        {
          sender: user.data.email,
          receivedMessage: newMessage,
        },
        roomId
      );
    }
  };

  return (
    <Box className="input-area">
      <form onSubmit={formHandler}>
        <Input
          type="text"
          name="message"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Message"
        />
        <Button type="submit">제출</Button>
      </form>
    </Box>
  );
};

export default ChatMessageInput;
