import { MessageMetadata } from '@src/types/share/TimeMetadataFormat';
import { atom } from 'recoil';

export const msgMetaDataState = atom<MessageMetadata | undefined>({
  key: 'msgMetaDataState',
  default: undefined,
});
