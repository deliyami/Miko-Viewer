import { Box, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import CameraScreen from "@src/components/common/meidaView/CameraScreen";
import { myStreamState } from "@src/state/recoil/viewingState";
import { FC } from "react";
import { useRecoilValue } from "recoil";

const MyCamera: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const myStream = useRecoilValue(myStreamState);
  return (
    <Box position="fixed" top="10px" right="10px">
      <Button onClick={onOpen}>내 카메라</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <CameraScreen stream={myStream} />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default MyCamera;
