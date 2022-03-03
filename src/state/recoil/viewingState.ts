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

const userNamesState = atom<string[]>({
  key: 'userNames',
  default: [],
});

const newMessageState = atom<string>({
  key: 'newMessage',
  default: '',
});

interface MessageInterface {
  sender: string;
  receivedMessage: string;
}

const messagesState = atom<MessageInterface[]>({
  key: 'messages',
  default: [],
});

const roomIdState = atom<string>({
  key: 'roomId',
  default: '3333',
});

const startSharingState = atom<Boolean>({
  key: 'startSharing',
  default: false,
});
const startSharingButtonDisabledState = atom<Boolean>({
  key: 'startSharingButtonDisabled',
  default: false,
});
const screenStreamIDState = atom<string>({
  key: 'screenStreamID',
  default: '',
});

const screenStreamState = atom<MediaStream>({
  key: 'screenStream',
  default: undefined,
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
  userNamesState,
  newMessageState,
  messagesState,
  roomIdState,
  startSharingState,
  startSharingButtonDisabledState,
  screenStreamIDState,
  screenStreamState,
  chatModeState,
  isShowChatInputState,
  mySocket,
};
