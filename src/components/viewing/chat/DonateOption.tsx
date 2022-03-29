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
} from '@chakra-ui/react';
import { DonateIcon } from '@src/components/viewing/chat/icon/DonateIcon';
import { DonateIconName } from '@src/types/DonateTypes';
import { Dispatch, FC, SetStateAction } from 'react';
import { RiGiftFill } from 'react-icons/ri';

type Prop = {
  amount: number;
  itemId: number;
  setAmount: Dispatch<SetStateAction<number>>;
  setItemId: Dispatch<SetStateAction<number>>;
};

const PATHNAME: DonateIconName[] = ['GreenHeart', 'Confetti', 'Battery', 'FourStar', 'Gift', 'Mental', 'Night', 'StarBurst', 'MoneyRain'];

export const DonateButton: FC<Prop> = ({ amount, itemId, setAmount, setItemId }) => {
  return (
    <Popover>
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
                <Box key={i} onClick={() => setItemId(i)}>
                  <DonateIcon path={value}></DonateIcon>
                </Box>
              ))}
            </Grid>
            <Text>{amount}円</Text>
            <Slider aria-label="donate-amount" value={amount} min={0} max={10000} onChange={val => setAmount(val)} step={100} defaultValue={0}>
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
          </PopoverBody>
          <PopoverFooter></PopoverFooter>
        </PopoverContent>
      </Portal>
    </Popover>
  );
};
