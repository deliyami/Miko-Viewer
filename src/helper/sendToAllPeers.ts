import { PeerDataInterface } from '@src/state/recoil/viewingState';

const sendToAllPeers = (peers: PeerDataInterface[], data: any) => {
  peers.forEach(({ dataConnection }) => {
    dataConnection?.send(data);
  });
};

export default sendToAllPeers;
