import { PeerDataInterface } from '@src/state/recoil';
import { DataConnectionEvent } from '@src/types/DataConnectionEventType';

export const sendToAllPeers = (peers: PeerDataInterface[], data: DataConnectionEvent) => {
  // console.log('sent to all Peer', peers, data);
  peers.forEach(({ dataConnection }) => {
    dataConnection?.send(data);
    // console.log('sendToAllPeer', dataConnection);
  });
};
