import { Box, HStack } from '@chakra-ui/react';
import Link from 'next/link';
import { FC } from 'react';

const MenuLink: FC<{ name: string; url: string }> = ({ name, url }) => {
  return (
    <Box as="li" listStyleType="none" fontSize="24px" fontWeight="bold" px="20px"  >
      <Link href={url}>
        <a>{name}</a>
      </Link>
    </Box>
  );
};

const linkList = [
  { name: '이용가이드', url: '/abc' },
  { name: '티켓 구입', url: '/abc' },
  { name: '알림', url: '/abc' },
];

const MenuBar = (params) => {
  return (
    <Box as="header"   position="sticky" top="0" backgroundColor="white" boxShadow="rgb(240 240 240) 0px -1px 0px inset"  >
      <HStack as="ul" width="full" alignItems="center" padding="20px" >
          <Box
            backgroundImage={
              'url(https://static.line-scdn.net/line_live/17d6ec1a9df/img/viewing/logo_viewing_pc_0923.png)'
            }
            backgroundRepeat="no-repeat"
            href="https://viewing.live.line.me"
            width="272px"
            height="60px"
          >
            {/* LINE LIVE-VIEWING */}
          </Box>
        {linkList.map(({ name, url }) => (
          <MenuLink key={name} name={name} url={url} />
        ))}
      </HStack>
    </Box>
  );
};

export default MenuBar;
