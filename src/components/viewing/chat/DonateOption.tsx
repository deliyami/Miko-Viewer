import { Box, Button, Grid, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, Portal, useDisclosure } from '@chakra-ui/react';
import { DonateIcon } from '@src/components/viewing/chat/icon/DonateIcon';
import { PATHNAME } from '@src/state/shareObject/shareDonateObject';
import { FC, memo } from 'react';
import { RiGiftFill } from 'react-icons/ri';

type Prop = {};

export const DonateOption: FC<Prop> = memo(() => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const donateSendHandler = () => {
    onClose();
  };
  return (
    <Popover onClose={onClose} onOpen={onOpen} isOpen={isOpen}>
      <PopoverTrigger>
        <Button>
          <RiGiftFill />
        </Button>
      </PopoverTrigger>
      <Portal>
        <PopoverContent>
          <PopoverArrow />
          <PopoverHeader>Donate</PopoverHeader>
          <PopoverCloseButton />
          <PopoverBody>
            <Grid templateColumns="repeat(3, 1fr)">
              {PATHNAME.map((value, i) => (
                <Box key={i} onClick={donateSendHandler}>
                  <DonateIcon path={value}></DonateIcon>
                </Box>
              ))}
            </Grid>
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  );
});

DonateOption.displayName = 'DonateOption';
