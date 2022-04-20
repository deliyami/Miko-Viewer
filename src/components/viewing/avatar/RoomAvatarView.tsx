import { Center } from '@chakra-ui/react';
import { myAvatarReplicateNumState, peerDataListState } from '@src/state/recoil';
import { AnimatePresence, LayoutGroup } from 'framer-motion';
import { useRecoilValue } from 'recoil';
import { My3DAvatar } from './My3DAvatar';
import { Peer3DAvatar } from './Peer3DAvatar';

const RoomAvatarView = () => {
  const peerDataList = useRecoilValue(peerDataListState);
  const myAvatarReplicateNum = useRecoilValue(myAvatarReplicateNumState);

  return (
    <LayoutGroup>
      <Center gap="5" zIndex="inherit">
        <AnimatePresence>
          <My3DAvatar key="me" />
          {new Array(myAvatarReplicateNum).fill(0).map((_, idx) => (
            <My3DAvatar key={'me' + idx} />
          ))}
          {peerDataList.map(peer => (
            <Peer3DAvatar key={peer.id} peer={peer} />
          ))}
        </AnimatePresence>
      </Center>
    </LayoutGroup>
  );
};

export default RoomAvatarView;
