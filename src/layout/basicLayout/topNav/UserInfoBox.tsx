import { Avatar, Box, Flex, HStack, Menu, MenuButton, MenuList, Text, VStack } from '@chakra-ui/react';
import { FiChevronDown } from '@react-icons/all-files/fi/FiChevronDown';
import { LoginBtn, LogoutBtn } from '@src/components/common/button/LogoutBtn';
import { IMAGE_DOMAIN } from '@src/const';
import { useCheckLogin, useUser } from '@src/state/swr';
import React from 'react';

export const UserInfoBox = () => {
  const { data } = useUser();
  const isLogin = useCheckLogin();

  if (!data || !isLogin)
    return (
      <Box>
        <LoginBtn key="login key csr" />
      </Box>
    );

  return (
    <HStack spacing={{ base: '0', md: '6' }}>
      <Flex alignItems={'center'}>
        <Menu>
          <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: 'none' }}>
            <HStack>
              <Avatar size={'md'} {...(data.avatar ? { src: IMAGE_DOMAIN + data.avatar } : {})} />
              <VStack display={{ base: 'none', md: 'flex' }} alignItems="flex-start" spacing="1px" ml="2">
                <Text fontSize="md">{data.name}</Text>
                <Text fontSize="xs" color="gray.600">
                  {data.email}
                </Text>
              </VStack>
              <Box display={{ base: 'none', md: 'flex' }}>
                <FiChevronDown />
              </Box>
            </HStack>
          </MenuButton>
          <MenuList borderColor="gray.200">
            <LogoutBtn />
          </MenuList>
        </Menu>
      </Flex>
    </HStack>
  );
};
