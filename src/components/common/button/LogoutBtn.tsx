import { Box, Flex, Icon, Text } from '@chakra-ui/react';
import { FiLogIn } from '@react-icons/all-files/fi/FiLogIn';
import { FiLogOut } from '@react-icons/all-files/fi/FiLogOut';
import { axiosI } from '@src/state/fetcher';
import { loginState } from '@src/state/recoil';
import { useUser } from '@src/state/swr';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';

const LogoutBtn = () => {
  const router = useRouter();
  const { mutate } = useUser();
  const setLoginState = useSetRecoilState(loginState);

  const logoutHandler = async () => {
    const isLogoutSuccess = await axiosI.get<boolean>('/logout');

    if (isLogoutSuccess) {
      mutate(undefined, { revalidate: false });
      setLoginState(false);
      setTimeout(() => {
        router.push('/');
      }, 1000);
    }
  };

  return (
    <Box onClick={logoutHandler}>
      <Flex
        w="full"
        p={2}
        align="center"
        borderRadius="lg"
        cursor="pointer"
        _hover={{
          bg: 'cyan.400',
          color: 'white',
        }}
      >
        <Icon mx="4" fontSize="20" as={FiLogOut} />
        <Text>Logout</Text>
      </Flex>
    </Box>
  );
};

const LoginBtn = () => {
  return (
    <Box listStyleType="none" fontSize="lg" fontWeight="bold">
      <Link href="/login" passHref aria-label="login-btn">
        <a>
          <Flex
            w="full"
            align="center"
            p="2"
            mx="2"
            textDecoration="none"
            _focus={{ boxShadow: 'none' }}
            borderRadius="lg"
            cursor="pointer"
            _hover={{
              bg: 'cyan.400',
              color: 'white',
            }}
          >
            <Icon
              mr="4"
              fontSize="20"
              _groupHover={{
                color: 'white',
              }}
              as={FiLogIn}
            />
            <Text>Login</Text>
          </Flex>
        </a>
      </Link>
    </Box>
  );
};

export { LogoutBtn, LoginBtn };
