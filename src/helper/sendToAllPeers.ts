import { PeerDataInterface } from '@src/state/recoil/viewing/connection/peerState';
import { DataConnectionEvent } from '@src/types/DataConnectionEventType';

const sendToAllPeers = (peers: PeerDataInterface[], data: DataConnectionEvent) => {
  // console.log('sent to all Peer', peers, data);
  peers.forEach(({ dataConnection }) => {
    dataConnection?.send(data);
    // console.log('sendToAllPeer', dataConnection);
  });
};

export default sendToAllPeers;
