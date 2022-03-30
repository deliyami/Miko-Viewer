import {
  Box,
  Button,
  Grid,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { DonateIcon } from '@src/components/viewing/chat/icon/DonateIcon';
import useSocket from '@src/hooks/useSocket';
import { PATHNAME } from '@src/state/shareObject/shareDonateObject';
import { useUser } from '@src/state/swr/useUser';
import { DonateInterface } from '@src/types/DonateTypes';
import { Dispatch, FC, SetStateAction } from 'react';
import { RiGiftFill } from 'react-icons/ri';

type Prop = {
  amount: number;
  itemId: number;
  setAmount: Dispatch<SetStateAction<number>>;
  setItemId: Dispatch<SetStateAction<number>>;
};

export const DonateOption: FC<Prop> = ({ amount, itemId, setAmount, setItemId }) => {
  const user = useUser();
  const socket = useSocket();
  const { onOpen, onClose, isOpen } = useDisclosure();
  const donateSendHandler = (index: number) => {
    const data: DonateInterface = {
      sender: user.data.name,
      amount,
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
            <Text>{amount}円</Text>
            <Slider aria-label="donate-amount" value={amount} min={0} max={10000} onChange={val => setAmount(val)} step={100} defaultValue={0}>
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
          </PopoverBody>
          <PopoverFooter>
            <Grid templateColumns="repeat(3, 1fr)">
              {PATHNAME.map((value, i) => (
                <Box
                  key={i}
                  onClick={() => {
                    donateSendHandler(i);
                  }}
                >
                  <DonateIcon path={value}></DonateIcon>
                </Box>
              ))}
            </Grid>
          </PopoverFooter>
        </PopoverContent>
      </Portal>
    </Popover>
  );
};
