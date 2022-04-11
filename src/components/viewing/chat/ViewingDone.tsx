import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  HStack,
  Image,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { doneItem, S3_URL } from '@src/const';
import { useColorStore } from '@src/hooks';
import { useSocket } from '@src/hooks/dynamicHooks';
import { useUser } from '@src/state/swr';
import { DoneSendInterface } from '@src/types/share';
import { forwardRef, useImperativeHandle, useState } from 'react';

export const ViewingDone = forwardRef((_, ref) => {
  const weakPrimary = useColorStore('weekPrimary');
  const primary = useColorStore('primary');
  const [clicked, setClicked] = useState<number>(-1);
  const socket = useSocket();
  const user = useUser();

  const { onOpen, onClose, isOpen } = useDisclosure();

  useImperativeHandle(ref, () => ({
    open: () => {
      onOpen();
    },
  }));

  const doneSelectHandler = (index: number) => {
    setClicked(index);
    console.log(index);
  };

  const doneSendHandler = () => {
    // console.log('send', doneItem[clicked]);
    const item = doneItem[clicked];
    console.log('되고는 있다', item);
    console.log('되고는 있다', user.data.name);
    const data: DoneSendInterface = {
      sender: user.data.name,
      itemId: item.id,
      timestamp: Date.now(),
    };
    socket.emit('fe-send-done', data);
    onClose();
  };

  return (
    <Drawer isOpen={isOpen} placement="bottom" size="md" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Done</DrawerHeader>
        <DrawerBody>
          <HStack isInline={true} spacing={8}>
            {doneItem.map((done, i) => (
              <Button
                variant="unstyled"
                height="25vh"
                minHeight="150px"
                borderRadius="16px"
                boxShadow={clicked === i ? `0 0 3px 3px ${primary}` : ''}
                _focus={{ boxShadow: `0 0 3px 3px ${primary}`, borderRadius: '16px' }}
                _hover={{ boxShadow: `0 0 3px 3px ${weakPrimary}`, borderRadius: '16px' }}
                key={i}
                onClick={() => {
                  doneSelectHandler(i);
                }}
              >
                <Flex
                  direction="column"
                  align="center"
                  height="25vh"
                  minHeight="150px"
                  justifyContent="space-between"
                  // _hover={{ boxShadow: `0 0 3px 3px ${weakPrimary}`, borderRadius: '16px' }}
                  // _focus={{ boxShadow: `0 0 3px 3px ${Primary}`, borderRadius: '16px' }}
                >
                  <Text>{done.name}</Text>
                  <Image style={{ minWidth: '100px', width: '100px' }} src={`${S3_URL}doneSVG/${done.path}.svg`} alt="doneSVG"></Image>
                  <Text>{done.price}</Text>
                </Flex>
              </Button>
            ))}
          </HStack>
        </DrawerBody>

        <DrawerFooter>
          <Button variant="outline" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="blue" onClick={doneSendHandler}>
            Send
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
});
ViewingDone.displayName = 'DoneHelp';
