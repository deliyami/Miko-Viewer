import {
  Box,
  Button,
  Grid,
  Image,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  useDisclosure,
} from '@chakra-ui/react';
import { S3_URL } from '@src/const';
import useSocket from '@src/hooks/useSocket';
import { PATHNAME } from '@src/state/shareObject/shareDonateObject';
import { useUser } from '@src/state/swr/useUser';
import { DoneSendInterface } from '@src/types/share/DoneItem';
import { FC, memo } from 'react';
import { RiGiftFill } from 'react-icons/ri';

type Prop = {};

export const DonateOption: FC<Prop> = memo(() => {
  const user = useUser();
  const socket = useSocket();
  const { onOpen, onClose, isOpen } = useDisclosure();
  const donateSendHandler = (index: number) => {
    const data: DoneSendInterface = {
      sender: user.data.name,
      itemId: index,
      timestamp: Date.now(),
    };

    // showChatToRoom(user.data.uuid, newMessage, 5); // 이거보고 만들 것
    // showDonateToRoom(user.data.uuid, newMessage, 5);

    // socket.emit('fe-send-message', data);
    console.log(data);
    // setAmount(0);
    // setItemId(-1);
    onClose();
  };
  return (
    <Popover onClose={onClose} onOpen={onOpen} isOpen={isOpen} offset={[0, 30]}>
      <PopoverTrigger>
        <Button>
          <RiGiftFill />
        </Button>
      </PopoverTrigger>
      <Portal>
        <PopoverContent>
          <PopoverArrow />
          <PopoverHeader>Donate!</PopoverHeader>
          <PopoverCloseButton />
          <PopoverBody>
            <Grid templateColumns="repeat(3, 1fr)">
              {PATHNAME.map((value, i) => (
                <Box
                  key={i}
                  onClick={() => {
                    donateSendHandler(i);
                  }}
                >
                  <Image src={`${S3_URL}donateSVG/${value}.svg`} alt="donateSVG"></Image>
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
