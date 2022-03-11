import { ChatMessageInterface } from '@src/types/ChatMessageType';
import { User } from '@src/types/share/User';
import { DataConnection } from 'peerjs';
import { atom } from 'recoil';
const videoStreamsState = atom<MediaStream[]>({
  key: 'videoStreams',
  default: [],
});

const peersArrayState = atom<string[]>({
  key: 'peersArray',
  default: [],
});

const myStreamState = atom<MediaStream>({
  key: 'myStream',
  default: undefined,
});

const newMessageState = atom<string>({
  key: 'newMessage',
  default: '',
});

const messagesState = atom<ChatMessageInterface[]>({
  key: 'messages',
  default: [],
});

type ChatMode = 'public' | 'private';

const chatModeState = atom<ChatMode>({
  key: 'chatMode',
  default: 'public',
});

const isShowChatInputState = atom<boolean>({
  key: 'isShowChatInput',
  default: true,
});
export type PeerDataInterface = {
  id: string;
  dataConnection?: DataConnection;
  mediaStream?: MediaStream;
  data?: Pick<User, 'id' | 'avatar' | 'email' | 'name'>;
};

const peerDataListState = atom<PeerDataInterface[]>({
  key: 'peerDataList',
  default: [],
});

export {
  videoStreamsState,
  peersArrayState,
  myStreamState,
  newMessageState,
  messagesState,
  chatModeState,
  peerDataListState,
  isShowChatInputState,
};
