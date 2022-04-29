import {
  Box,
  Button,
  Flex,
  HStack,
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  StackProps,
  Text,
  TextProps,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { RiGiftFill } from '@react-icons/all-files/ri/RiGiftFill';
import { doneItem } from '@src/const';
import { useColorStore } from '@src/hooks';
import { useSocket } from '@src/hooks/dynamicHooks';
import { useUser } from '@src/state/swr';
import { DoneSendInterface } from '@src/types/share';
import { motion } from 'framer-motion';
import { FC, memo, useState } from 'react';
import { DoneIcon } from '../centerContainer/done/DoneIcon';

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

const DoneButton: FC<{ onClose: Function }> = ({ onClose }) => {
  const weakPrimary = useColorStore('weekPrimary');
  const primary = useColorStore('primary');
  const [hover, setHover] = useState<number>(-1);
  const socket = useSocket();
  const user = useUser();

  const doneSendHandler = (index: number) => {
    // console.log('send', doneItem[clicked]);
    const item = doneItem[index];
    const data: DoneSendInterface = {
      sender: user.data!.name,
      itemId: item.id,
      timestamp: Date.now(),
    };
    socket.emit('fe-send-done', data);
    onClose();
  };

  return (
    <HStack isInline={true} margin={2} spacing={8}>
      {doneItem.map((done, i) => (
        <VStack
          variant="unstyled"
          height="25vh"
          minHeight="150px"
          borderRadius="16px"
          opacity={0.7}
          boxShadow={`0 0 3px 3px ${weakPrimary}`}
          onMouseEnter={() => setHover(i)}
          onMouseLeave={() => setHover(-1)}
          _hover={{ boxShadow: `0 0 3px 3px ${primary}`, borderRadius: '16px', opacity: 1 }}
          key={i}
          onClick={() => {
            doneSendHandler(i);
          }}
        >
          <Flex direction="column" align="center" height="25vh" minHeight="150px" justifyContent="space-between">
            <Text>{done.name}</Text>
            {/* <Image style={{ minWidth: '100px', width: '100px' }} src={`${IMAGE_DOMAIN}doneSVG/${done.name}.svg`} alt="doneSVG"></Image> */}
            <DoneIcon width={100} itemId={done.id}></DoneIcon>
            <MotionHStack spacing={0} initial="initial" animate="animate" variants={container}>
              {`${done.price}`.split('').map((str, j) => (
                <MotionP custom={j} initial="initial" animate="animate" variants={hover === i ? letterAnimation : null} key={j}>
                  {str}
                </MotionP>
              ))}
            </MotionHStack>
          </Flex>
        </VStack>
      ))}
    </HStack>
  );
};

export const DoneOption = memo(() => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  return (
    <Popover placement="top" offset={[0, 30]} boundary={'scrollParent'} isOpen={isOpen}>
      <PopoverTrigger>
        <Button onClick={onOpen}>
          <RiGiftFill />
        </Button>
      </PopoverTrigger>
      <Portal>
        <PopoverContent>
          <PopoverHeader>Done!</PopoverHeader>
          <PopoverCloseButton />
          <PopoverBody>
            <Box overflowX="auto">
              <DoneButton onClose={onClose}></DoneButton>
            </Box>
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  );
});

DoneOption.displayName = 'DoneOption';
