import { Avatar, Box, Flex, FlexProps, HStack, Icon, Image, Link, Menu, MenuButton, MenuItem, MenuList, Text, useColorModeValue, VStack } from '@chakra-ui/react';
import { S3_URL } from '@src/const';
import { useUser } from '@src/state/swr/useUser';
import React, { ReactText, Suspense } from 'react';
import { IconType } from 'react-icons';
import { FiCheck, FiChevronDown, FiHome, FiList, FiStar } from 'react-icons/fi';
import { LoginBtn, LogoutBtn } from '../common/button/LogoutBtn';

interface LinkItemProps {
  name: string;
  icon: IconType;
  url: string;
}

const LinkItems: Array<LinkItemProps> = [
  { name: 'Home', icon: FiHome, url: '/' },
  { name: 'List', icon: FiList, url: '/concerts' },
  { name: 'My History', icon: FiCheck, url: '/my/lists/ticket' },
  { name: 'My Page', icon: FiStar, url: '/my' },
];

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactText;
  url: string;
}

const NavItem = ({ icon, url, children }: NavItemProps) => {
  return (
    <Link href={url} style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
      <a>
        <Flex
          align="center"
          p="4"
          mx="4"
          borderRadius="lg"
          cursor="pointer"
          _hover={{
            bg: 'cyan.400',
            color: 'white',
          }}
        >
          {icon && (
            <Icon
              mr="4"
              fontSize="16"
              _groupHover={{
                color: 'white',
              }}
              as={icon}
            />
          )}
          {children}
        </Flex>
      </a>
    </Link>
  );
};

const SidebarContent = () => {
  return (
    <Box zIndex={100} bg={useColorModeValue('white', 'gray.900')} borderRight="1px" borderRightColor={useColorModeValue('gray.200', 'gray.700')} w="230px" pos="fixed" h="full">
      <Flex h="20" alignItems="center" mx="12" my="2">
        <Image boxSize="130px" src={S3_URL + 'logo/color%3Dsimple.svg'} />
      </Flex>
      {LinkItems.map(link => (
        <NavItem key={link.name} icon={link.icon} url={link.url}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

const MobileNav = () => {
  const { data } = useUser();

  return (
    <Flex alignItems={'center'}>
      {data ? (
        <Menu>
          <MenuButton py={2} _focus={{ boxShadow: 'none' }}>
            <HStack spacing={3}>
              <Avatar size={'sm'} src={S3_URL + data.avatar} fallbackSrc="https://i.pinimg.com/564x/ba/7d/a2/ba7da2c7fa66b6a81d357df4a4113333.jpg" />
              <VStack display={{ base: 'none', md: 'flex' }} alignItems="flex-start" spacing="1px" ml="2">
                <Text fontSize="lg" fontWeight="600">
                  {data.name}
                </Text>
              </VStack>
              <Box display={{ base: 'none', md: 'flex' }}>
                <FiChevronDown />
              </Box>
            </HStack>
          </MenuButton>
          <MenuList alignItems={'center'}>
            <MenuItem>
              <LogoutBtn />
            </MenuItem>
          </MenuList>
        </Menu>
      ) : (
        <LoginBtn />
      )}
    </Flex>
  );
};

export default function MenuBar() {
  return (
    <Box>
      <SidebarContent />
      <Flex
        px={4}
        height="20"
        alignItems="center"
        bg={useColorModeValue('white', 'gray.900')}
        borderBottomWidth="1px"
        borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
        justifyContent="flex-end"
      >
        <Suspense fallback={<Text> 로딩 </Text>}>
          <MobileNav />
        </Suspense>
      </Flex>
    </Box>
  );
}
