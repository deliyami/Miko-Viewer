import { Avatar, Box, Flex, FlexProps, HStack, Icon, Image, Menu, MenuButton, MenuItem, MenuList, Text, useColorModeValue, VStack } from '@chakra-ui/react';
import { S3_URL } from '@src/const';
import { useUser } from '@src/state/swr/useUser';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { ReactText, Suspense, useState } from 'react';
import { IconType } from 'react-icons';
import { FiChevronDown, FiHome, FiList, FiStar } from 'react-icons/fi';
import { LoginBtn, LogoutBtn } from '../common/button/LogoutBtn';

interface LinkItemProps {
  name: string;
  icon: IconType;
  url: string;
}

const LinkItems: Array<LinkItemProps> = [
  { name: 'Home', icon: FiHome, url: '/' },
  { name: 'Concert List', icon: FiList, url: '/concerts' },
];

const SubLinkItems: Array<LinkItemProps> = [
  { name: '私の情報', icon: undefined, url: '/my' },
  { name: '私の情報修正', icon: undefined, url: '/my/edit' },
  { name: '私のチケットリスト', icon: undefined, url: '/my/lists/ticket' },
  { name: '私のコイン', icon: undefined, url: '/my/coin' },
];

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactText;
}

const NavItem = ({ icon, children, ...props }: NavItemProps) => {
  return (
    <>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        _hover={{
          bg: 'cyan.400',
          color: 'white',
        }}
        {...props}
      >
        {icon ? (
          <>
            <Icon
              mr="4"
              fontSize="16"
              _groupHover={{
                color: 'white',
              }}
              as={icon}
            />
            {children}
          </>
        ) : (
          <Text ml={8}>{children}</Text>
        )}
      </Flex>
    </>
  );
};

const SidebarContent = () => {
  const [isShow, setIsShow] = useState(false);
  const router = useRouter();
  const nowPath = router.pathname as string;

  // console.log(router.pathname);

  const ShowSubLinks = () => {
    setIsShow(!isShow);
  };

  return (
    <Box zIndex={100} bg={useColorModeValue('white', 'gray.900')} borderRight="1px" borderRightColor={useColorModeValue('gray.200', 'gray.700')} w="240px" pos="fixed" h="full">
      <Flex h="20" alignItems="center" mx="12" my="2">
        <Image boxSize="130px" src={S3_URL + 'logo/color%3Dsimple.svg'} />
      </Flex>
      {LinkItems.map(link => (
        <Link href={link.url} style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }} key={link.name}>
          <a>
            <NavItem color={nowPath === link.url && 'cyan.400'} icon={link.icon}>
              {link.name}
            </NavItem>
          </a>
        </Link>
      ))}
      <Box onClick={ShowSubLinks}>
        <NavItem icon={FiStar}>My Page</NavItem>
      </Box>
      {isShow &&
        SubLinkItems.map(link => (
          <Link href={link.url} style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }} key={link.name}>
            <a>
              <NavItem color={nowPath === link.url && 'cyan.400'} icon={link.icon}>
                {link.name}
              </NavItem>
            </a>
          </Link>
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
              <Avatar size={'sm'} src={S3_URL + data.avatar} />
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
