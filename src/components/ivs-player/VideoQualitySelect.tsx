import { Box, Flex, Popover, PopoverBody, PopoverContent, PopoverHeader, PopoverTrigger, Text, VStack } from '@chakra-ui/react';
import * as ivs from 'amazon-ivs-player';
import { FC, MouseEventHandler, MutableRefObject } from 'react';
import { IoCheckmarkSharp, IoSettingsSharp } from 'react-icons/io5';

const VideoQualitySelect: FC<{
  player: MutableRefObject<ivs.MediaPlayer>;
  selectableQuality: ivs.Quality[];
}> = ({ player, selectableQuality }) => {
  const setQuality: MouseEventHandler<HTMLDivElement> = event => {
    if (event.target instanceof HTMLDivElement) {
      const idx = parseInt(event.target.dataset.idx);
      player.current.setQuality(selectableQuality[idx]);
    }
  };

  const curQuality = player.current?.getQuality();
  return (
    <Popover placement="top-end">
      {({ isOpen, onClose }) => (
        <>
          <PopoverTrigger>
            <Box fontSize="4xl">
              <IoSettingsSharp />
            </Box>
          </PopoverTrigger>
          <PopoverContent bgColor="#202020AA" onMouseLeave={onClose}>
            <PopoverBody onClick={setQuality}>
              <PopoverHeader>
                <Text fontSize="xl">画実</Text>
              </PopoverHeader>
              <VStack rowGap="5px" alignItems="start" fontSize="lg" fontWeight="bold">
                {selectableQuality.map((obj, i) => (
                  <Flex key={obj.name} w="full" data-idx={`${i}`} cursor="pointer">
                    <Text data-idx={`${i}`}>{obj.name}</Text>
                    {obj.name === curQuality?.name && <IoCheckmarkSharp />}
                  </Flex>
                ))}
              </VStack>
            </PopoverBody>
          </PopoverContent>
        </>
      )}
    </Popover>
  );
};

export default VideoQualitySelect;
