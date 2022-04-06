import {
  Button,
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
} from '@chakra-ui/react';
import { RiMoneyDollarCircleFill } from '@react-icons/all-files/ri/RiMoneyDollarCircleFill';
import { Dispatch, memo, SetStateAction } from 'react';

type Props = {
  amount: number;
  setAmount: Dispatch<SetStateAction<number>>;
};

export const SuperChatOption = memo<Props>(({ amount, setAmount }) => {
  return (
    <Popover placement="top" offset={[0, 30]}>
      <PopoverTrigger>
        <Button>
          <RiMoneyDollarCircleFill />
        </Button>
      </PopoverTrigger>
      <Portal>
        <PopoverContent>
          <PopoverHeader>Super Chat!</PopoverHeader>
          <Text>{amount}円</Text>
          <PopoverCloseButton />
          <PopoverBody>
            <Slider aria-label="super-chat-amount" value={amount} min={0} max={10000} onChange={val => setAmount(val)} step={100} defaultValue={0}>
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  );
});

SuperChatOption.displayName = 'SuperChatOption';
