import { Box, BoxProps, CloseButton, Flex, HStack, Image, Text } from '@chakra-ui/react';
import React from 'react';
import CommonSideMenu from './SideBarCommonMenu';
import SideBarMyPageMenu from './SideBarMyPageMenu';

// NOTE pendingFallback하고 결과가 같으면 hydration 에러가 왜 날까
interface SidebarProps extends BoxProps {
  onClose: () => void;
}
export const SideBar = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box zIndex={100} transition="3s ease" borderRight="1px" borderRightColor="gray.200" w={{ base: 'full', md: 60 }} pos="fixed" h="full" fontWeight="700" {...rest}>
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <HStack>
          <Image boxSize="60px" src="/logo/logo3.png" alt="miko-logo" />
          <Text fontSize="3xl" fontWeight="bold">
            ミコ
          </Text>
        </HStack>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      <CommonSideMenu />
      <SideBarMyPageMenu />
    </Box>
  );
};
