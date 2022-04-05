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
import useSocket from '@src/hooks/useSocket';
import { doneAccept } from '@src/state/recoil/doneState';
import { DONEITEM, PATHNAME } from '@src/state/shareObject/shareDoneObject';
import { useUser } from '@src/state/swr/useUser';
import { DoneSendInterface } from '@src/types/share/DoneItem';
import { FC, memo } from 'react';
import { useRecoilState } from 'recoil';

export const DoneOption: FC = memo(() => {
  const user = useUser();
  const socket = useSocket();
  const { onOpen, onClose, isOpen } = useDisclosure();
  const [doneApt, setDoneApt] = useRecoilState(doneAccept);

  const doneSendHandler = (index: number) => {
    const data: DoneSendInterface = {
      sender: user.data.name,
      itemId: index,
      timestamp: Date.now(),
    };

    // showChatToRoom(user.data.uuid, newMessage, 5); // 이거보고 만들 것

    // socket.emit('fe-send-donation', data);
    // addDoneToRoom(data);
    socket.emit('fe-send-done', data);
    // if (!doneApt) setDoneApt(e => !e);
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
          <PopoverHeader>Done!</PopoverHeader>
          <PopoverCloseButton />
          <PopoverBody>
            <Grid templateColumns="repeat(3, 1fr)">
              {PATHNAME.map((value, i) => (
                <Box
                  key={i}
                  onClick={() => {
                    doneSendHandler(DONEITEM[i].id);
                  }}
                >
                  <Image src={`${S3_URL}doneSVG/${value}.svg`} alt="doneSVG"></Image>
                </Box>
              ))}
            </Grid>
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  );
});

DoneOption.displayName = 'DoneOption';
