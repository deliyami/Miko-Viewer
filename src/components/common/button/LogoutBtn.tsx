import { Box, Flex, Icon, Link, Text } from '@chakra-ui/react';
import { axiosI } from '@src/state/fetcher';
import { useUser } from '@src/state/swr/useUser';
import { useRouter } from 'next/router';
import { FiLogIn, FiLogOut } from 'react-icons/fi';

const LogoutBtn = () => {
  const router = useRouter();
  const { mutate } = useUser();
  const logoutHandler = async () => {
    const isLogoutSuccess = await axiosI.get<boolean>('/logout');

    if (isLogoutSuccess) {
      router.push('/');
      setTimeout(() => {
        mutate(null, { revalidate: false });
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
      <Link href="/login" style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
        <a>
          <Flex
            w="full"
            align="center"
            p="2"
            mx="2"
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
