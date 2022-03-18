import { SOCKET_URL } from '@src/const';
import { useEffect, useRef } from 'react';
import io, { Socket } from 'socket.io-client';

const useSocket = () => {
  const socket = useRef<Socket>(
    window.socket ??
      io(SOCKET_URL, {
        autoConnect: true,
        // forceNew: true,
        transports: ['websocket', 'polling'],
      })
        .on('connect', () => {
          console.log('connect 👌 ', socket.current.connected);
        })
        .on('connect_error', err => {
          console.error(err);
          setTimeout(() => socket.current.connect(), 1000);
        })
        .on('error', err => {
          console.error(err);
        })
        .on('disconnect', reason => {
          console.error('socket disconnect', reason);
        }),
  );

  window.socket = socket.current;
  useEffect(() => {
    return () => {};
  }, []);

  return socket.current;
};

export default useSocket;
