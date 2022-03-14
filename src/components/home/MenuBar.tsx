import { Box, HStack, Text } from "@chakra-ui/react";
import { useUser } from "@src/state/swr/useUser";
import Link from "next/link";
import { FC, Suspense } from "react";
import LogoutBtn from "../common/button/LogoutBtn";

const MenuLink: FC<{ name: string; url: string }> = ({ name, url }) => {
  return (
    <Box as="li" listStyleType="none" fontSize="24px" fontWeight="bold" px="20px">
      <Link href={url}>
        <a>{name}</a>
      </Link>
    </Box>
  );
};

const UserData = () => {
  const { data } = useUser();

  return (
    <Box>
      {data ? (
        <>
          <Text>{data.email}</Text>
          <LogoutBtn />
        </>
      ) : (
        <MenuLink name="로그인" url="/login" />
      )}
    </Box>
  );
};

const MenuBar = params => {
  const devList = [{ name: "챗팅", url: "/live/viewing" }];

  const linkList = [
    { name: "콘서트 검색", url: "/concerts" },
    { name: "이용자", url: "/my" },
    // { name: '로그인', url: '/login' },
    ...devList,
  ];

  return (
    <Box as="header" position="sticky" top="0" backgroundColor="white" boxShadow="rgb(240 240 240) 0px -1px 0px inset">
      <HStack as="ul" width="full" alignItems="center" padding="20px">
        <Box
          backgroundImage={"url(https://static.line-scdn.net/line_live/17d6ec1a9df/img/viewing/logo_viewing_pc_0923.png)"}
          backgroundRepeat="no-repeat"
          // href="https://viewing.live.line.me"
          width="272px"
          height="60px"
        ></Box>
        {linkList.map(({ name, url }) => (
          <MenuLink key={name} name={name} url={url} />
        ))}
        <Suspense fallback={<Text> 로딩 </Text>}>
          <UserData />
        </Suspense>
      </HStack>
    </Box>
  );
};

export default MenuBar;
