import { ChatMessageInterface } from '@src/types/dto/ChatMessageType';
import { atom } from 'recoil';

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
