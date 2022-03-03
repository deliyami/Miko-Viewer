import { ChatMessageInterface } from '@src/types/ChatMessageType';
import { User } from '@src/types/User';
import { DataConnection } from 'peerjs';
import { atom } from 'recoil';
import io from 'socket.io-client';
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

const roomIdState = atom<string>({
  key: 'roomId',
  default: '3333',
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

const mySocket = io('http://localhost:3001', {
  // autoConnect: true,
  // forceNew: true,
  transports: ['websocket', 'polling'],
})
  .on('connect', () => {
    console.log('connect 👌 ', window.sockets.connected);
  })
  .on('error', (err) => {
    console.log(err);
  });

export {
  videoStreamsState,
  peersArrayState,
  myStreamState,
  newMessageState,
  messagesState,
  roomIdState,
  chatModeState,
  peerDataListState,
  isShowChatInputState,
  mySocket,
};
