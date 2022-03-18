import { Box, HStack, Image, Spacer, Text } from "@chakra-ui/react";
import { S3_URL } from "@src/const";
import { useUser } from "@src/state/swr/useUser";
import Link from "next/link";
import { FC, Suspense } from "react";
import LogoutBtn from "../common/button/LogoutBtn";

const MenuLink: FC<{ name: string; url: string }> = ({ name, url }) => {
  return (
    <Box as="li" listStyleType="none" fontSize="23px" fontWeight="bold" px="20px">
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
          <HStack px="20px">
            <Image
              borderRadius="100%"
              boxSize="60px"
              // objectFit="none"
              src={S3_URL + data.avatar}
              fallbackSrc="https://i.pinimg.com/564x/ba/7d/a2/ba7da2c7fa66b6a81d357df4a4113333.jpg"
              alt="Dan Abramov"
            />
            <Box>
              <Text fontSize="20px" fontWeight="bold">
                {data.name}
              </Text>
              <Box>
                <LogoutBtn />
              </Box>
            </Box>
          </HStack>
        </>
      ) : (
        <MenuLink name="로그인" url="/login" />
      )}
    </Box>
  );
};

const MenuBar = params => {
  // const devList = [{name: '챗팅', url: '/live/viewing' }];

  const linkList = [
    { name: "콘서트 검색", url: "/concerts" },
    { name: "이용자", url: "/my" },
    { name: "챗팅", url: "/live/viewing" },
    // {name: '로그인', url: '/login' },
    // ...devList,
  ];

  return (
    <Box position="sticky" top="0" backgroundColor="white" boxShadow="rgb(240 240 240) 0px -1px 0px inset" as="header">
      <HStack as="ul" width="full" alignItems="center" padding="20px">
        <Link href="/">
          <a>
            <Image src={"https://static.line-scdn.net/line_live/17d6ec1a9df/img/viewing/logo_viewing_pc_0923.png"} width="250px" objectFit="contain" />
          </a>
        </Link>
        <Spacer />
        <HStack spacing={20}>
          {linkList.map(({ name, url }) => (
            <MenuLink key={name} name={name} url={url} />
          ))}
        </HStack>
        <Suspense fallback={<Text> 로딩 </Text>}>
          <UserData />
        </Suspense>
      </HStack>
    </Box>
  );
};

export default MenuBar;
