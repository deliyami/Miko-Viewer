import { Flex } from '@chakra-ui/react';
import { MotionBox } from '@src/components/common/motion/MotionChakra';
import { latestScoreState } from '@src/state/recoil';
import { AnimatePresence } from 'framer-motion';
import { memo } from 'react';
import { useRecoilValue } from 'recoil';

const AVATAR_SIZE = 200;

const COLORS = ['#36C5F0', '#2EB67D', '#E01E5A', '#ECB22E', '#E51670', '#36C5F0', '#2EB67D', '#E01E5A', '#ECB22E', '#E51670'];

type Props = {
  uuid: string;
};

export const AvatarScore = memo<Props>(({ uuid }) => {
  const scores = useRecoilValue(latestScoreState);
  const score = scores?.[uuid] ?? 0;

  return (
    <Flex position="relative" w={AVATAR_SIZE + 'px'} fontWeight="bold" fontSize="xl" textStyle="mm">
      <AnimatePresence>
        {score
          .toString()
          .split('')
          .reverse()
          .map((num, idx) => {
            return (
              <MotionBox
                key={num + '' + idx}
                right={idx * 20 + 'px'}
                w="20px"
                position="absolute"
                animate={{ color: ['#FFFFFF', COLORS[num], '#FFFFFF'], y: [0, -3, 0], scale: [0.8, 1 + idx * 0.25, 1], opacity: [0, 1, 1] }}
                exit={{ y: [3, 15, 25], opacity: [1, 0.4, 0] }}
                transition={{ duration: 0.4, type: 'spring' }}
              >
                {num}
              </MotionBox>
            );
          })}
      </AnimatePresence>
    </Flex>
  );
});

AvatarScore.displayName = 'ScoreView';
