import { useUser } from '@src/state/swr/useUser';
import Peer from 'peerjs';
import { useRef } from 'react';
const useMyPeer = () => {
  const { data } = useUser();
  const myPeer = useRef(
    window.myPeer ??
      new Peer(data.uuid, {
        debug: 2,
        // host: 'localhost',
        // path: '/myapp',
        // port: 9000,
      })
  );

  globalThis.myPeer = myPeer.current;

  return myPeer.current;
};

export default useMyPeer;
