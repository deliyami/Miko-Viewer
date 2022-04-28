import { Box, Collapse, useDisclosure } from '@chakra-ui/react';
import { CgProfile } from '@react-icons/all-files/cg/CgProfile';
import { useCheckLogin } from '@src/state/swr';
import React, { useEffect, useRef } from 'react';
import { useHover } from 'usehooks-ts';
import { LinkItemProps, SideBarNavItem } from './SideBarNavItem';

const SubLinkItems: Array<LinkItemProps> = [
  { name: '情報', icon: undefined, url: '/my' },
  { name: '情報修正', icon: undefined, url: '/my/edit' },
  { name: 'チケットリスト', icon: undefined, url: '/my/lists/ticket' },
  { name: 'コイン', icon: undefined, url: '/my/coin' },
  { name: 'カート', icon: undefined, url: '/my/cart' },
  { name: 'ご注文履歴', icon: undefined, url: '/my/order' },
];

const SideBarMyPageMenu = () => {
  const isLogin = useCheckLogin();
  const { isOpen, onToggle } = useDisclosure();
  const hoverRef = useRef<any>(null);
  const isHover = useHover(hoverRef);

  const isActive = (isHover || isOpen) && isLogin;

  useEffect(() => {
    onToggle();
  }, []);

  return (
    <Box ref={hoverRef}>
      {isLogin && (
        <SideBarNavItem
          onClick={() => {
            onToggle();
          }}
          link={{ name: 'My Page', icon: CgProfile }}
        />
      )}
      <Collapse in={isActive} animateOpacity>
        {SubLinkItems.map(link => (
          <SideBarNavItem link={link} key={link.url} pl={12} />
        ))}
      </Collapse>
    </Box>
  );
};

export default SideBarMyPageMenu;
