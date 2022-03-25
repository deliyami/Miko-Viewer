import { useUser } from '@src/state/swr/useUser';
import Peer from 'peerjs';
import { useRef } from 'react';

type ExtendPeer = InstanceType<typeof Peer> & { open: boolean };

const useMyPeer = () => {
  const { data } = useUser();

  const myPeer = useRef<ExtendPeer>(
    (window.myPeer as ExtendPeer) ??
      (new Peer(data.uuid, {
        debug: 2,
        // host: '0.peerjs.com', // default 0.peerjs.com
        host: 'localhost', // default 0.peerjs.com
        // port: 443, // default 443
        port: 9000, // default 443
        // path: '/', // default '/'
        path: '/myapp', // default '/'
        config: {
          iceServers: [
            {
              urls: 'stun:openrelay.metered.ca:80',
            },
            {
              urls: 'turn:openrelay.metered.ca:80',
              username: 'openrelayproject',
              credential: 'openrelayproject',
            },
            {
              urls: 'turn:openrelay.metered.ca:443',
              username: 'openrelayproject',
              credential: 'openrelayproject',
            },
            {
              urls: 'turn:openrelay.metered.ca:443?transport=tcp',
              username: 'openrelayproject',
              credential: 'openrelayproject',
            },
          ],
        },
      }) as ExtendPeer),
  );

  globalThis.myPeer = myPeer.current;

  return myPeer.current;
};

export default useMyPeer;
