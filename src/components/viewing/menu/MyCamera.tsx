import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react';
import CameraScreen from '@src/components/common/meidaView/CameraScreen';
import CameraSwitch from '@src/components/common/meidaView/CameraSwitch';
import { myStreamState } from '@src/state/recoil/viewing/connection/streamState';
import { forwardRef, useImperativeHandle } from 'react';
import { useRecoilValue } from 'recoil';

const MyCamera = forwardRef((_, ref) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const myStream = useRecoilValue(myStreamState);

  useImperativeHandle(ref, () => ({
    open: () => {
      onOpen();
    },
  }));

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent maxW="50vw">
        <ModalHeader>내 카메라 확인</ModalHeader>
        <CameraSwitch></CameraSwitch>
        <ModalCloseButton />
        <ModalBody>
          <CameraScreen stream={myStream} />
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}></Button>
          {/* <Button variant="ghost">Secondary Action</Button> */}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
});

MyCamera.displayName = 'MyCamera';

export default MyCamera;
