import { PeerDataInterface } from "@src/state/recoil/viewingState";
import { DataConnectionEvent } from "@src/types/DataConnectionEventType";

const sendToAllPeers = (peers: PeerDataInterface[], data: DataConnectionEvent) => {
  peers.forEach(({ dataConnection }) => {
    dataConnection?.send(data);
  });
};

export default sendToAllPeers;
