import { useUser } from '@src/state/swr/useUser';
import Peer from 'peerjs';
const usePeer = () => {
  const { data } = useUser();
  console.log('여기는 usePeer 오버', data.uuid);
  const myPeer = new Peer(data.uuid, {
    debug: 2,
    // host: 'localhost',
    // path: '/myapp',
    // port: 9000,
  });

  return myPeer;
};

export default usePeer;
