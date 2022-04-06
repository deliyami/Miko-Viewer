import { Center } from '@chakra-ui/react';
import { MotionBox } from '@src/components/common/motion/MotionChakra';
import { peerDataListState } from '@src/state/recoil/viewingState';
import { AnimatePresence, LayoutGroup } from 'framer-motion';
import { FC } from 'react';
import { useRecoilValue } from 'recoil';
import { My3DAvatar } from './My3DAvatar';
import { Peer3DAvatar } from './Peer3DAvatart';

const AvatarEnterEffect: FC<{ layoutId: string }> = ({ children, layoutId }) => {
  return (
    <MotionBox layoutId={layoutId} animate={{ scale: [0, 1], opacity: [0, 1], transition: { duration: 0.3 } }} exit={{ opacity: [1, 0], y: [0, 300] }}>
      {children}
    </MotionBox>
  );
};

const RoomAvatarView = () => {
  const peerDataList = useRecoilValue(peerDataListState);
  return (
    <LayoutGroup>
      <Center gap="5" zIndex="inherit">
        <AnimatePresence>
          <AvatarEnterEffect key="me" layoutId="meAvatar">
            <My3DAvatar key="me" />
          </AvatarEnterEffect>
          {peerDataList.map(peer => (
            <AvatarEnterEffect key={peer.id} layoutId={'peerAvatar' + peer.id}>
              <Peer3DAvatar key={peer.id} peer={peer} />
            </AvatarEnterEffect>
          ))}
        </AnimatePresence>
      </Center>
    </LayoutGroup>
  );
};

export default RoomAvatarView;
