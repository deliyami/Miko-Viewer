import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Heading, useDisclosure } from '@chakra-ui/react';
import CameraScreen from '@src/components/common/mediaView/CameraScreen';
import CameraSwitch from '@src/components/common/mediaView/CameraSwitch';
import { myStreamState } from '@src/state/recoil';
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
    <Drawer isOpen={isOpen} placement="right" size="md" onClose={onClose}>
      <DrawerOverlay backgroundColor="transparent" />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>カメラ変更</DrawerHeader>
        <DrawerBody>
          <Heading size="md" py="1">
            カメラ画像
          </Heading>
          <CameraScreen stream={myStream} />
          <CameraSwitch />
        </DrawerBody>

        <DrawerFooter>
          <Button variant="outline" mr={3} onClick={onClose}>
            閉じる
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
});

MyCamera.displayName = 'MyCamera';

export default MyCamera;
