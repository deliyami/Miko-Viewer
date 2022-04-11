import {
  Button,
  Center,
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
import { IconType } from '@react-icons/all-files';
import { RiGiftFill } from '@react-icons/all-files/ri/RiGiftFill';
import { doneItem, S3_URL } from '@src/const';
import { useColorStore } from '@src/hooks';
import { Children, cloneElement, FC, forwardRef, memo, ReactElement, useImperativeHandle, useRef, useState } from 'react';

const IconBox: FC<{ icon: IconType }> = ({ children, icon }) => {
  const imperativeRef = useRef(null);
  const primary = useColorStore('primary');

  return (
    <Center
      onClick={() => {
        imperativeRef.current.open();
      }}
      cursor="pointer"
      _hover={{ color: primary }}
    >
      {Children.map(children, (child, _) =>
        cloneElement(
          child as ReactElement,
          // @ts-ignore
          { ...child.props, ref: imperativeRef },
        ),
      )}

      <Button>{icon({})}</Button>
    </Center>
  );
};

const DoneHelp = forwardRef((_, ref) => {
  const weakPrimary = useColorStore('weekPrimary');
  const primary = useColorStore('primary');
  const [clicked, setClicked] = useState<number>(-1);

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
    console.log('send', doneItem[clicked]);
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
DoneHelp.displayName = 'DoneHelp';

export const TempDoneOption: FC = memo(() => {
  return (
    <IconBox icon={RiGiftFill}>
      <DoneHelp />
    </IconBox>
  );
});

TempDoneOption.displayName = 'TempDoneOption';
