import { PeerDataInterface } from '@src/state/recoil/viewingState';
import { DataConnectionEvent } from '@src/types/DataConnectionEventType';

const sendToAllPeers = (peers: PeerDataInterface[], data: DataConnectionEvent) => {
  console.log('sent to all Peer', peers, data);
  peers.forEach(({ dataConnection }) => {
    dataConnection?.send(data);
    console.log('sendTopper', dataConnection);
  });
};

export default sendToAllPeers;
