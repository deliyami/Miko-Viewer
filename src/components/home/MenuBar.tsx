import {
  Avatar,
  Box,
  BoxProps,
  CloseButton,
  Collapse,
  Drawer,
  DrawerContent,
  Flex,
  FlexProps,
  HStack,
  Icon,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuList,
  Text,
  useColorModeValue,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { CgProfile } from '@react-icons/all-files/cg/CgProfile';
import { FiChevronDown } from '@react-icons/all-files/fi/FiChevronDown';
import { FiHome } from '@react-icons/all-files/fi/FiHome';
import { FiList } from '@react-icons/all-files/fi/FiList';
import { FiMenu } from '@react-icons/all-files/fi/FiMenu';
import { IconType } from '@react-icons/all-files/lib';
import { IMAGE_DOMAIN } from '@src/const';
import { useCheckLogin, useUser } from '@src/state/swr';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useRef } from 'react';
import { useHover } from 'usehooks-ts';
import { LoginBtn, LogoutBtn } from '../common/button/LogoutBtn';
import AsyncBoundary from '../common/wrapper/AsyncBoundary';

interface LinkItemProps {
  name: string;
  icon?: IconType;
  url?: string;
}

const LinkItems: Array<LinkItemProps> = [
  { name: 'Home', icon: FiHome, url: '/' },
  { name: 'Concert List', icon: FiList, url: '/concerts' },
];

const SubLinkItems: Array<LinkItemProps> = [
  { name: '情報', icon: undefined, url: '/my' },
  { name: '情報修正', icon: undefined, url: '/my/edit' },
  { name: 'チケットリスト', icon: undefined, url: '/my/lists/ticket' },
  { name: 'コイン', icon: undefined, url: '/my/coin' },
  { name: 'カート', icon: undefined, url: '/my/cart' },
  { name: 'ご注文履歴', icon: undefined, url: '/my/order' },
];

interface NavItemProps extends FlexProps {
  link: LinkItemProps;
}

const NavItem = ({ link, ...rest }: NavItemProps) => {
  const router = useRouter();
  const { icon, name, url } = link;
  const nowPath = router.pathname as string;

  const Content = () => (
    <Flex
      align="center"
      p="4"
      mx="4"
      borderRadius="lg"
      role="group"
      cursor="pointer"
      _hover={{
        color: '#39c5bb',
      }}
      userSelect="none"
      position="relative"
      onHover
      {...rest}
    >
      {icon && (
        <Icon
          mr="4"
          fontSize="16"
          _groupHover={{
            color: '#39c5bb',
          }}
          as={icon}
        />
      )}
      {link.name}
      {nowPath === url && <Box position="absolute" w="2" h="10" backgroundColor="#39c5bb" borderRadius="full" left="-18px" />}
    </Flex>
  );

  if (url)
    return (
      <Link href={url}>
        <a>
          <Content />
        </a>
      </Link>
    );

  return <Content />;
};

const UserInfoBox = () => {
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

interface TopNavProps extends FlexProps {
  onOpen: () => void;
}

const TopNav = ({ onOpen, ...rest }: TopNavProps) => {
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
// NOTE pendingFallback하고 결과가 같으면 hydration 에러가 왜 날까

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SideBarMyPageMenu = () => {
  const isLogin = useCheckLogin();
  const { isOpen, onToggle } = useDisclosure();
  const hoverRef = useRef<any>(null);
  const isHover = useHover(hoverRef);

  const isActive = isHover || isOpen;

  return (
    <Box ref={hoverRef}>
      {isLogin && (
        <NavItem
          onClick={() => {
            onToggle();
          }}
          link={{ name: 'My Page', icon: CgProfile }}
        />
      )}
      <Collapse in={isActive} animateOpacity>
        {SubLinkItems.map(link => (
          <NavItem link={link} key={link.url} pl={12} />
        ))}
      </Collapse>
    </Box>
  );
};

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
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
      {LinkItems.map(link => (
        <NavItem link={link} key={link.url} />
      ))}
      <SideBarMyPageMenu />
    </Box>
  );
};

export default function MenuBar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box>
      <SidebarContent onClose={() => onClose} display={{ base: 'none', md: 'block' }} />
      <Drawer autoFocus={false} isOpen={isOpen} placement="left" onClose={onClose} returnFocusOnClose={false} onOverlayClick={onClose} size="full">
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <TopNav onOpen={onOpen} />
    </Box>
  );
}
