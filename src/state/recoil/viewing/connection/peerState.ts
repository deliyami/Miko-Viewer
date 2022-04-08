import { User } from '@src/types/share';
import { DataConnection, MediaConnection } from 'peerjs';
import { atom } from 'recoil';

export type PickUserData = Pick<User, 'id' | 'avatar' | 'email' | 'name'>;

export type PeerDataInterface = {
  id: string;
  dataConnection?: DataConnection;
  mediaConnection?: MediaConnection;
  mediaStream?: MediaStream;
  data?: PickUserData;
};

export const peersArrayState = atom<string[]>({
  key: 'peersArray',
  default: [],
});

export const peerDataListState = atom<PeerDataInterface[]>({
  key: 'peerDataList',
  default: [],
});
