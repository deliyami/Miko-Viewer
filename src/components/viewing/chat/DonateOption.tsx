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
import { RiGiftFill } from '@react-icons/all-files/ri/RiGiftFill';
import { S3_URL } from '@src/const';
import addDonateToRoom from '@src/helper/addDonateToRoom';
import useSocket from '@src/hooks/useSocket';
import { donateAccept } from '@src/state/recoil/donateState';
import { DONATEITEM, PATHNAME } from '@src/state/shareObject/shareDonateObject';
import { useUser } from '@src/state/swr/useUser';
import { DoneSendInterface } from '@src/types/share/DoneItem';
import { FC, memo } from 'react';
import { useRecoilState } from 'recoil';

type Prop = {};

const newDonateAccept = (data: DoneSendInterface) => {
  console.log(data);
};

export const DonateOption: FC<Prop> = memo(() => {
  const user = useUser();
  const socket = useSocket();
  const { onOpen, onClose, isOpen } = useDisclosure();
  const [donateApt, setDonateApt] = useRecoilState(donateAccept);

  // useEffect(() => {
  //   socket.on('fe-send-donation', newDonateAccept);
  //   return () => {
  //     socket.off('fe-send-donation', newDonateAccept);
  //   };
  // }, []);

  const donateSendHandler = (index: number) => {
    const data: DoneSendInterface = {
      sender: user.data.name,
      itemId: index,
      timestamp: Date.now(),
    };

    // showChatToRoom(user.data.uuid, newMessage, 5); // 이거보고 만들 것

    // socket.emit('fe-send-donation', data);
    addDonateToRoom(data);
    if (!donateApt) setDonateApt(e => !e);
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
                    donateSendHandler(DONATEITEM[i].id);
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
