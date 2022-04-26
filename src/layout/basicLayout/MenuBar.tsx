import { Box, Drawer, DrawerContent, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import { SideBar } from './sideNav/Sidebar';
import { TopNav } from './topNav/TopNav';

export default function MenuBar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box>
      <SideBar onClose={() => onClose} display={{ base: 'none', md: 'block' }} />
      <Drawer autoFocus={false} isOpen={isOpen} placement="left" onClose={onClose} returnFocusOnClose={false} onOverlayClick={onClose} size="full">
        <DrawerContent>
          <SideBar onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <TopNav onOpen={onOpen} />
    </Box>
  );
}
