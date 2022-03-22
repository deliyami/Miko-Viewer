import { Box, Button, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, VStack } from '@chakra-ui/react';
import { forwardRef, ReactNode, useImperativeHandle, useRef } from 'react';

type Props = {
  children?: ReactNode;
  DonateFunction?: Function;
};

const DonateModal = forwardRef((props: Props, ref) => {
  const { DonateFunction } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();

  const nicknameInputRef = useRef(null);
  const coinInputRef = useRef(null);
  const contentInputRef = useRef(null);

  useImperativeHandle(ref, () => ({
    open: () => {
      onOpen();
    },
  }));

  const onSubmitHandler = e => {
    e.preventDefault();
    console.log('donation go!');
    DonateFunction(nicknameInputRef.current.value, coinInputRef.current.value, contentInputRef.current.value);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent maxW="50vw">
        <ModalHeader>donation</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box>
            <form onSubmit={onSubmitHandler}>
              <VStack>
                <FormLabel>사용자 이름</FormLabel>
                <Input ref={nicknameInputRef} type="text"></Input>
                <FormLabel>코인</FormLabel>
                <Input ref={coinInputRef} type="number"></Input>
                <FormLabel>내용</FormLabel>
                <Input ref={contentInputRef} type="text"></Input>
                <Button type="submit"></Button>
              </VStack>
            </form>
          </Box>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onSubmitHandler}></Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
});

DonateModal.displayName = 'DonateEffect';

export default DonateModal;
