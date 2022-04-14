import { DataConnectionEvent } from '@src/types/dto/DataConnectionEventType';
import { PeerDataInterface } from '@src/types/local/PeerData';

export const sendToAllPeers = (peers: PeerDataInterface[], data: DataConnectionEvent) => {
  // console.log('sent to all Peer', peers, data);
  peers.forEach(({ dataConnection }) => {
    dataConnection?.send(data);
    // console.log('sendToAllPeer', dataConnection);
  });
};
