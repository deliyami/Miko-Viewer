import { Box, Text } from '@chakra-ui/react';
import { AiOutlineSound } from '@react-icons/all-files/ai/AiOutlineSound';
import { AiOutlineUserAdd } from '@react-icons/all-files/ai/AiOutlineUserAdd';
import { BiVolumeMute } from '@react-icons/all-files/bi/BiVolumeMute';
import { FiMoreHorizontal } from '@react-icons/all-files/fi/FiMoreHorizontal';
import { AvatarModel } from '@src/components/viewing/avatar/AvatarModel';
import { NEXT_URL } from '@src/const';
import { latestScoreState } from '@src/state/recoil/scoreState';
import { isOnModelState } from '@src/state/recoil/viewingState';
import { useUser } from '@src/state/swr/useUser';
import { FC } from 'react';
import { useRecoilValue } from 'recoil';
import { AvatarMenu } from './AvatarMenu';
import { AvatarScore } from './AvatarScore';

const AVATAR_SIZE = 200;

export const My3DAvatar: FC = () => {
  const {
    data: { uuid },
  } = useUser();
  const scores = useRecoilValue(latestScoreState);
  const isOnModel = useRecoilValue(isOnModelState);

  return (
    <Box
      position="relative"
      width={AVATAR_SIZE}
      height={AVATAR_SIZE}
      backgroundImage={!isOnModel && "url('/image/temp/avatar.png')"}
      backgroundRepeat="no-repeat"
      backgroundSize="cover"
    >
      <AvatarMenu>
        <BiVolumeMute size="20px" />
        <AiOutlineSound size="20px" />
        <AiOutlineUserAdd size="20px" />
        <FiMoreHorizontal size="20px" />
      </AvatarMenu>
      {isOnModel && (
        <Box overflow="hidden" position="relative" pointerEvents="none">
          <AvatarModel width={AVATAR_SIZE} height={AVATAR_SIZE} path={`${NEXT_URL}/resources/babylonjs/models/proseka/proseka.glb`} peerId={uuid} antialias></AvatarModel>
        </Box>
      )}
      <AvatarScore score={scores?.[uuid] ?? 0} />
      <Box width="full" position="absolute" top="0" h="2rem" color="white" pointerEvents="none">
        <Text fontSize="6xl" id={uuid + 'motion'}></Text>
        <Text fontSize="3xl" width="30vw" id={uuid + 'chat'}></Text>
      </Box>
      {/* <TempAddScoreLogic /> */}
    </Box>
  );
};