import { ChatMessageInterface } from '@src/types/ChatMessageType';
import { User } from '@src/types/share/User';
import { DataConnection, MediaConnection } from 'peerjs';
import { atom } from 'recoil';

export const peersArrayState = atom<string[]>({
  key: 'peersArray',
  default: [],
});

export const myStreamState = atom<MediaStream>({
  key: 'myStream',
  default: undefined,
});

export const newMessageState = atom<string>({
  key: 'newMessage',
  default: '',
});

export const messagesState = atom<ChatMessageInterface[]>({
  key: 'messages',
  default: [],
});

type ChatMode = 'public' | 'private';

export const chatModeState = atom<ChatMode>({
  key: 'chatMode',
  default: 'public',
});

export const isShowChatInputState = atom<boolean>({
  key: 'isShowChatInput',
  default: true,
});

export type PickUserData = Pick<User, 'id' | 'avatar' | 'email' | 'name'>;

export type PeerDataInterface = {
  id: string;
  dataConnection?: DataConnection;
  mediaConnection?: MediaConnection;
  mediaStream?: MediaStream;
  data?: PickUserData;
};

export const peerDataListState = atom<PeerDataInterface[]>({
  key: 'peerDataList',
  default: [],
});

export const isReadyIvsState = atom({
  key: 'ivsScriptLoadedState',
  default: false,
});
