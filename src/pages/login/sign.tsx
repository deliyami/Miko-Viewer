import { Box, Button, Flex, FormControl, FormErrorMessage, FormLabel, Heading, Input, Link, Stack } from '@chakra-ui/react';
import AsyncBoundary from '@src/components/common/wrapper/AsyncBoundary';
import { useColorStore } from '@src/hooks';
import BasicLayout from '@src/layout/BasicLayout';
import { useUser } from '@src/state/swr';
import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';
import { useForm } from 'react-hook-form';

const RedirectLogic = () => {
  const router = useRouter();

  const { data: userData, error: userError } = useUser();

  if (userData && !userError) {
    router.push('/'); // 로그인 상태면 홈으로 강제 이동
  }
  return <></>;
};

const SignPage = () => {
  const {
    handleSubmit,
    control,
    reset,
    watch,
    setValue,
    register,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<{ name: string; email: string; password: string; avatar: string }>({ mode: 'all' });

  const onSubmit = async (data: any) => {
    // post로 보내기
    // console.log("submit");
    // console.log(data);
    // const result = await axios.post(
    //   `http://localhost:8080/api/users`, data
    // ).then(res => {
    //   console.log(res);
    // }).catch(e => {
    //   console.log(e);
    // });
    // console.log(result);
    // if (result) {
    //   router.push('/');
    // }
  };

  return (
    <>
      <Head>
        <title>SIGN | MICO</title>
        <meta name="description" content="미코 회원가입 페이지" />
      </Head>
      <AsyncBoundary pendingFallback={<></>}>
        <RedirectLogic />
      </AsyncBoundary>
      <Flex minH={'100vh'} align={'center'} justify={'center'} bg={useColorStore('background')}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={8} px={2}>
          <Stack align={'center'}>
            <Heading fontSize={'6xl'}>MIKO</Heading>
          </Stack>
          <Box rounded="lg" bg={useColorStore('surface')} boxShadow={'lg'} p={8}>
            <Stack spacing={4}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl id="name" isInvalid={!!errors.name}>
                  <FormLabel>Name</FormLabel>
                  <Input
                    type="text"
                    id="name"
                    {...register('name', {
                      required: 'This is required',
                      minLength: {
                        value: 2,
                        message: 'Minimum length should be 2',
                      },
                    })}
                  />
                  <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
                </FormControl>
                <FormControl id="email" isInvalid={!!errors.email}>
                  <FormLabel>Email address</FormLabel>
                  <Input
                    type="email"
                    id="email"
                    {...register('email', {
                      required: 'This is required',
                      minLength: {
                        value: 4,
                        message: 'Minimum length should be 4',
                      },
                    })}
                  />
                  <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
                </FormControl>
                <FormControl id="password" isInvalid={!!errors.password}>
                  <FormLabel>Password</FormLabel>
                  <Input
                    type="password"
                    id="password"
                    {...register('password', {
                      required: 'This is required',
                      minLength: {
                        value: 4,
                        message: 'Minimum length should be 4',
                      },
                    })}
                  />
                  <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
                </FormControl>
                <FormControl id="avatar" isInvalid={!!errors.avatar}>
                  <FormLabel>Avatar</FormLabel>
                  <Input
                    type="file"
                    id="avatar"
                    {...register('avatar', {
                      required: 'This is required',
                    })}
                  />
                  <FormErrorMessage>{errors.avatar && errors.avatar.message}</FormErrorMessage>
                </FormControl>
                <Stack spacing={10}>
                  <Stack direction={{ base: 'column', sm: 'row' }} align={'end'} justify={'space-between'}>
                    <NextLink href="/login">
                      <Link color={'blue.400'}>로그인</Link>
                    </NextLink>
                  </Stack>
                  <Button
                    bg={'blue.400'}
                    color={'white'}
                    _hover={{
                      bg: 'blue.500',
                    }}
                    type="submit"
                    isLoading={isSubmitting}
                  >
                    회원가입
                  </Button>
                </Stack>
              </form>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </>
  );
};

SignPage.getLayout = function getLayout(page: ReactElement) {
  return <BasicLayout>{page}</BasicLayout>;
};

export default SignPage;
