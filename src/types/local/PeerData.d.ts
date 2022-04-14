export type PeerDataInterface = {
  id: string;
  dataConnection?: DataConnection;
  mediaConnection?: MediaConnection;
  mediaStream?: MediaStream;
  data?: PickUserData;
};
