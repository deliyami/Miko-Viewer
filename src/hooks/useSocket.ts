import { useEffect, useRef } from 'react';
import io, { Socket } from 'socket.io-client';

const useSocket = () => {
  const socket = useRef<Socket>(
    window.socket ??
      io('http://localhost:3002', {
        autoConnect: true,
        // forceNew: true,
        transports: ['websocket', 'polling'],
      })
  );
  useEffect(() => {
    // if (window.sockets == undefined) {
    //   window.sockets = io('http://localhost:3002', {
    //     // autoConnect: true,
    //     // forceNew: true,
    //     transports: ['websocket', 'polling'],
    //   })
    //     .on('connect', () => {
    //       console.log('connect 👌 ', window.sockets.connected);
    //     })
    //     .on('error', (err) => {
    //       console.error(err);
    //     });
    // }

    window.socket = socket.current;

    if (!socket.current.hasListeners('conncet')) {
      socket.current
        .on('connect', () => {
          console.log('connect 👌 ', socket.current.connected);
        })
        .on('error', (err) => {
          console.error(err);
        });
    }

    return () => {
      socket.current.off('conncet');
      socket.current.off('error');
    };
    // setSocket(window.sockets);
  }, []);

  return socket.current;
};

export default useSocket;
