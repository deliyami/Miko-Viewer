import { Box, Flex, Slider, SliderFilledTrack, SliderMark, SliderThumb, SliderTrack, Text } from '@chakra-ui/react';
import { myAvatarReplicateNumState } from '@src/state/recoil';
import React, { FC } from 'react';
import { useRecoilState } from 'recoil';

export const MAX_REPLICATE = 4;
export const ReplicateMyAvatarOption: FC = () => {
  const [num, setNum] = useRecoilState(myAvatarReplicateNumState);

  return (
    <Flex flexDir="column">
      <Text> my avatar replicate num : {num}</Text>
      <Slider defaultValue={num} value={num} onChange={v => setNum(v)} min={0} max={MAX_REPLICATE} step={1}>
        <SliderTrack bg="blue.200">
          <Box position="relative" right={10} />
          <SliderFilledTrack bg="blue.500" />
        </SliderTrack>
        <SliderThumb boxSize={4} />
        {new Array(MAX_REPLICATE + 1).fill(0).map((_, idx) => (
          <SliderMark key={'sliderMark' + idx} value={idx} pt="2" w="0" fontSize="sm">
            {idx}
          </SliderMark>
        ))}
      </Slider>
    </Flex>
  );
};
