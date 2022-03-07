import { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';

const useSocket = () => {
  const [socket, setSocket] = useState<Socket | undefined>(window.sockets);
  useEffect(() => {
    if (window.sockets == undefined) {
      window.sockets = io('http://localhost:3002', {
        // autoConnect: true,
        // forceNew: true,
        transports: ['websocket', 'polling'],
      })
        .on('connect', () => {
          console.log('connect 👌 ', window.sockets.connected);
        })
        .on('error', (err) => {
          console.error(err);
        });
    }
    setSocket(window.sockets);
  }, []);

  return socket;
};

export default useSocket;
