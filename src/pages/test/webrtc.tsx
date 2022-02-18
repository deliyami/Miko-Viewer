import { Box, Container, Input, Text, VStack } from '@chakra-ui/react';
import useSocket from '@src/hooks/useSocket';
import { useUser } from '@src/state/swr/useUser';
import { useRouter } from 'next/router';
// import sockets from '@src/socket/socket';
import React, { useEffect, useRef, useState } from 'react';
// import socket from '../../socket';

const Chat = ({ display = '' }) => {
  //   const currentUser = sessionStorage.getItem('user');
  const { data: currentUser } = useUser();

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
    socket?.emit('BE-join-room', { roomId, userName: currentUser.id });
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
          { roomId, msg, sender: currentUser.id },
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
      <Text>Group Chat Room</Text>
      <Box>
        <VStack>
          {msg &&
            msg.map(({ sender, msg }, idx) => {
              if (sender !== currentUser.id) {
                return (
                  <VStack key={idx}>
                    <strong>{sender}</strong>
                    <p>{msg}</p>
                  </VStack>
                );
              } else {
                return (
                  <VStack key={idx}>
                    <strong>{sender}</strong>
                    <p>{msg}</p>
                  </VStack>
                );
              }
            })}
          <div style={{ float: 'left', clear: 'both' }} ref={messagesEndRef} />
        </VStack>
      </Box>
      <Input
        ref={inputRef}
        onKeyUp={sendMessage}
        placeholder="Enter your message"
      />
    </Container>
  );
};

export default Chat;
