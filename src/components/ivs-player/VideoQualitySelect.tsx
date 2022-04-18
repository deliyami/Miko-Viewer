import { Box, Flex, Popover, PopoverBody, PopoverContent, PopoverHeader, PopoverTrigger, Text, VStack } from '@chakra-ui/react';
import { IoCheckmarkSharp } from '@react-icons/all-files/io5/IoCheckmarkSharp';
import { IoSettingsSharp } from '@react-icons/all-files/io5/IoSettingsSharp';
import * as ivs from 'amazon-ivs-player';
import { FC, MouseEventHandler } from 'react';

const VideoQualitySelect: FC<{
  player: ivs.MediaPlayer;
  selectableQuality: ivs.Quality[];
}> = ({ selectableQuality, player }) => {
  const setQuality: MouseEventHandler<HTMLDivElement> = event => {
    if (event.target instanceof HTMLDivElement) {
      const idx = parseInt(event.target.dataset.idx as string, 10);
      player.setQuality(selectableQuality[idx]);
    }
  };
  const curQuality = player.getQuality();
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

VideoQualitySelect.displayName = 'VideoQualitySelect';

export default VideoQualitySelect;
