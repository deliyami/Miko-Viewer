import { SOCKET_URL } from '@src/const';
import { useRef } from 'react';
import io, { Socket } from 'socket.io-client';

export const useSocket = () => {
  const socket = useRef<Socket>(
    window.socket ??
      io(SOCKET_URL, {
        autoConnect: true,
        // forceNew: true,
        transports: ['websocket', 'polling'],
      })
        .on('connect', () => {
          console.log('socket connect 👌 ', window.socket.connected);
        })
        .on('connect_error', err => {
          console.error('socket_connect_error', err);
          setTimeout(() => socket.current.connect(), 1000);
        })
        .on('error', err => {
          console.error('socket error', err);
        })
        .on('disconnect', reason => {
          console.error('socket disconnect', reason);
        }),
  );

  window.socket = socket.current;

  return socket.current;
};
