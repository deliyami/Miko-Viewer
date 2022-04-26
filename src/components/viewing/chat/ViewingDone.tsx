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
  StackProps,
  Text,
  TextProps,
  useDisclosure,
} from '@chakra-ui/react';
import { doneItem, IMAGE_DOMAIN } from '@src/const';
import { useColorStore } from '@src/hooks';
import { useSocket } from '@src/hooks/dynamicHooks';
import { useUser } from '@src/state/swr';
import { DoneSendInterface } from '@src/types/share';
import { motion } from 'framer-motion';
import { forwardRef, useImperativeHandle, useState } from 'react';

const MotionP = motion<Omit<TextProps, 'transition'>>(Text);
const MotionHStack = motion<Omit<StackProps, 'transition'>>(HStack);

const container = {
  animate: {
    transition: {
      staggerChildren: 0.35,
    },
  },
};

const letterAnimation = {
  initial: {
    y: null,
  },
  animate: j => {
    return {
      y: -5,
      transition: {
        ease: [0.4, 0.1, 0.2, 0.95],
        // ease: [0.2, 0.2, 1, 0.2],
        duration: 0.8,
        repeat: Infinity,
        repeatType: 'reverse',
        delay: j * 0.3,
      },
    };
  },
};

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

  const resetAndClose = () => {
    setClicked(-1);
    onClose();
  };

  const doneSendHandler = () => {
    // console.log('send', doneItem[clicked]);
    if (clicked === -1) return;
    const item = doneItem[clicked];
    const data: DoneSendInterface = {
      sender: user.data!.name,
      itemId: item.id,
      timestamp: Date.now(),
    };
    socket.emit('fe-send-done', data);
    resetAndClose();
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
                opacity={clicked === i ? 1 : 0.5}
                boxShadow={clicked === i ? `0 0 3px 3px ${primary}` : ''}
                _focus={{ boxShadow: `0 0 3px 3px ${primary}`, borderRadius: '16px', opacity: 1 }}
                _hover={{ boxShadow: `0 0 3px 3px ${weakPrimary}`, borderRadius: '16px', opacity: 0.8 }}
                key={i}
                onClick={() => {
                  doneSelectHandler(i);
                }}
              >
                <Flex direction="column" align="center" height="25vh" minHeight="150px" justifyContent="space-between">
                  <Text>{done.name}</Text>
                  <Image style={{ minWidth: '100px', width: '100px' }} src={`${IMAGE_DOMAIN}doneSVG/${done.name}.svg`} alt="doneSVG"></Image>
                  <MotionHStack spacing={0} initial="initial" animate="animate" variants={container}>
                    {`${done.price}`.split('').map((str, j) => (
                      <MotionP custom={j} initial="initial" animate="animate" variants={clicked === i ? letterAnimation : null} key={j}>
                        {str}
                      </MotionP>
                    ))}
                  </MotionHStack>
                </Flex>
              </Button>
            ))}
          </HStack>
        </DrawerBody>

        <DrawerFooter>
          <Button variant="outline" mr={3} onClick={resetAndClose}>
            Cancel
          </Button>
          <Button disabled={clicked === -1} colorScheme="blue" onClick={doneSendHandler}>
            Send
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
});
ViewingDone.displayName = 'DoneHelp';
