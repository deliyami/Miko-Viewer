import { Center } from '@chakra-ui/react';
import { peerDataListState } from '@src/state/recoil/viewingState';
import { AnimatePresence, LayoutGroup } from 'framer-motion';
import { useRecoilValue } from 'recoil';
import { My3DAvatar } from './My3DAvatar';
import { Peer3DAvatar } from './Peer3DAvatart';

const RoomAvatarView = () => {
  const peerDataList = useRecoilValue(peerDataListState);
  return (
    <LayoutGroup>
      <Center gap="5" zIndex="inherit">
        <AnimatePresence>
          <My3DAvatar key="me" />
          {peerDataList.map(peer => (
            <Peer3DAvatar key={peer.id} peer={peer} />
          ))}
        </AnimatePresence>
      </Center>
    </LayoutGroup>
  );
};

export default RoomAvatarView;
