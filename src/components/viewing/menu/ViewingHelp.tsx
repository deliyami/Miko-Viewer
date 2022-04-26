import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Heading, Kbd, Text, useDisclosure } from '@chakra-ui/react';
import React, { FC, forwardRef, useImperativeHandle } from 'react';

const ShortKeyExplain: FC<{ aKey: string; text: string }> = ({ aKey, text }) => {
  return (
    <Text>
      <Kbd>{aKey}</Kbd> - {text}
    </Text>
  );
};

const ViewingHelp = forwardRef((_, ref) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

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
        <DrawerHeader>ヘルプ</DrawerHeader>
        <DrawerBody>
          <Heading size="md" py="1">
            ショートカットキー
          </Heading>
          <ShortKeyExplain aKey="C" text="チャットインプットを開く" />
          <ShortKeyExplain aKey="D" text="개발자 옵션을 열기" />
          <ShortKeyExplain aKey="G" text="굿즈창을 열기" />
          <ShortKeyExplain aKey="S" text="설정창을 열기" />
          <ShortKeyExplain aKey="H" text="헬퍼창을 열기" />
          <ShortKeyExplain aKey="1-9" text="펜라이트 색상 변경" />
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

ViewingHelp.displayName = 'ViewingDrawer';

export default ViewingHelp;
