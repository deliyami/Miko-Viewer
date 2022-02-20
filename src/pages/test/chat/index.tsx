import { Box, Container, Input, Text, VStack } from '@chakra-ui/react';
import useSocket from '@src/hooks/useSocket';
import { useUser } from '@src/state/swr/useUser';
import { useRouter } from 'next/router';
// import sockets from '@src/socket/socket';
import React, { FC, Suspense, useEffect, useRef, useState } from 'react';
// import socket from '../../socket';

const HOC: FC = ({ children }) => {
  return <Suspense fallback={<Box> 로딩 </Box>}>{children}</Suspense>;
};

// /chat?roomId=10
const Chat = ({ display = '' }) => {
  const { data: user, isValidating, isNotLogged } = useUser();
  const [msg, setMsg] = useState([]);
  const messagesEndRef = useRef(null);
  const inputRef = useRef<React.LegacyRef<HTMLInputElement>>();
  const socket = useSocket();

  const { query, isReady } = useRouter();
  const { roomId } = query;

  useEffect(() => {
    if (!isReady) return;
    const receiveMessage = ({ msg, sender }) => {
      setMsg((msgs) => [...msgs, { sender, msg }]);
    };
    socket?.on('FE-receive-message', receiveMessage);
    socket?.emit('BE-join-room', { roomId, userName: user.id });
    return () => {
      socket?.removeListener('FE-receive-message', receiveMessage);
    };
  }, [socket, isReady]);

  // Scroll to Bottom of Message List
  useEffect(() => {
    scrollToBottom();
  }, [msg]);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const sendMessage = (e) => {
    if (e.key === 'Enter') {
      const msg = e.target.value;

      if (msg) {
        socket.emit(
          'BE-send-message',
          { roomId, msg, sender: user.id },
          (err) => {
            console.log(err);
          }
        );
        inputRef.current.value = '';
      }
    }
  };

  return (
    <Container className={display ? '' : 'width0'}>
      <Text>Room ID: {roomId}</Text>
      <VStack maxHeight="50vh" overflow="scroll" p="4">
        {msg &&
          msg.map(({ sender, msg: msg }, idx) => {
            if (sender !== user.id) {
              return (
                <VStack key={idx} alignSelf="start">
                  <strong>{sender}</strong>
                  <p>{msg}</p>
                </VStack>
              );
            } else {
              return (
                <VStack key={idx} alignSelf="end">
                  <strong>{sender}</strong>
                  <p>{msg}</p>
                </VStack>
              );
            }
          })}
        <Box float="left" style={{ clear: 'both' }} ref={messagesEndRef} />
      </VStack>
      <Input
        ref={inputRef}
        onKeyUp={sendMessage}
        placeholder="Enter your message"
      />
    </Container>
  );
};

const ChatPage = () => {
  return (
    <HOC>
      <Chat />
    </HOC>
  );
};

export default ChatPage;
