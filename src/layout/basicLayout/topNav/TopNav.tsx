import { Flex, FlexProps, HStack, IconButton, Image, Text, useColorModeValue } from '@chakra-ui/react';
import { FiMenu } from '@react-icons/all-files/fi/FiMenu';
import React from 'react';
import AsyncBoundary from '../../../components/common/wrapper/AsyncBoundary';
import { UserInfoBox } from './UserInfoBox';

interface TopNavProps extends FlexProps {
  onOpen: () => void;
}

export const TopNav = ({ onOpen, ...rest }: TopNavProps) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}
    >
      <IconButton display={{ base: 'flex', md: 'none' }} onClick={onOpen} variant="outline" aria-label="open menu" icon={<FiMenu />} />
      <HStack display={{ base: 'flex', md: 'none' }}>
        <Image boxSize="60px" src="/logo/logo3.png" alt="miko-logo" />
        <Text fontSize="2xl" fontWeight="bold">
          Miko
        </Text>
      </HStack>
      <AsyncBoundary pendingFallback={<></>}>
        <UserInfoBox />
      </AsyncBoundary>
    </Flex>
  );
};
