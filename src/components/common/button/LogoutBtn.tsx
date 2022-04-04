import { Box, Flex, Icon, Link, Text } from '@chakra-ui/react';
import { FiLogIn } from '@react-icons/all-files/fi/FiLogIn';
import { FiLogOut } from '@react-icons/all-files/fi/FiLogOut';
import { axiosI } from '@src/state/fetcher';
import { useUser } from '@src/state/swr/useUser';
import { useRouter } from 'next/router';

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
    <Flex px={5} onClick={logoutHandler} align="center" borderRadius="lg" cursor="pointer">
      <Icon mr="4" fontSize="20" as={FiLogOut} />
      <Text>Logout</Text>
    </Flex>
  );
};

const LoginBtn = () => {
  return (
    <Box listStyleType="none" fontSize="lg" fontWeight="bold">
      <Link href="/login" style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
        <a>
          <Flex
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
