import { Box, Button, Checkbox, Flex, FormControl, FormErrorMessage, FormLabel, Heading, Input, Link, Stack } from "@chakra-ui/react";
import useColorStore from "@src/hooks/useColorStore";
import BasicLayout from "@src/layout/BasicLayout";
import { useLogin, useUser } from "@src/state/swr/useUser";
import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React, { ReactElement } from "react";
import { useForm } from "react-hook-form";

const LoginPage = () => {
  const {
    handleSubmit,
    control,
    reset,
    watch,
    setValue,
    register,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<{ email: string; password: string }>({ mode: "all" });
  const { data: userData, error: userError } = useUser();
  const router = useRouter();

  const onSubmit = async (data: any) => {
    const result = await useLogin(data);
    if (result) {
      router.push("/");
    }
  };

  if (userData && !userError) {
    router.push("/"); // 로그인 상태면 홈으로 강제 이동동
  }

  // console.info(watch());
  console.log(errors);
  return (
    <>
      <Head>
        <title>LOGIN | MICO</title>
        <meta name="description" content="미코 로그인 페이지" />
      </Head>
      <Flex minH={"100vh"} align={"center"} justify={"center"} bg={useColorStore("background")}>
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={8} px={2}>
          <Stack align={"center"}>
            <Heading fontSize={"6xl"}>MIKO</Heading>
          </Stack>
          <Box rounded="lg" bg={useColorStore("surface")} boxShadow={"lg"} p={8}>
            <Stack spacing={4}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl id="email" isInvalid={!!errors.email}>
                  <FormLabel>Email address</FormLabel>
                  <Input
                    type="email"
                    id="email"
                    {...register("email", {
                      required: "This is required",
                      minLength: {
                        value: 4,
                        message: "Minimum length should be 4",
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
                    {...register("password", {
                      required: "This is required",
                      minLength: {
                        value: 4,
                        message: "Minimum length should be 4",
                      },
                    })}
                  />
                  <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
                </FormControl>
                <Stack spacing={10}>
                  <Stack direction={{ base: "column", sm: "row" }} align={"start"} justify={"space-between"}>
                    <Checkbox>Remember me</Checkbox>
                    <NextLink href="./user/password">
                      <Link color={"blue.400"}>비밀번호 찾기</Link>
                    </NextLink>
                    <NextLink href="./user/sign-up">
                      <Link color={"blue.400"}>회원가입</Link>
                    </NextLink>
                  </Stack>
                  <Button
                    bg={"blue.400"}
                    color={"white"}
                    _hover={{
                      bg: "blue.500",
                    }}
                    type="submit"
                    isLoading={isSubmitting}
                  >
                    로그인
                  </Button>
                  <Button
                    bg={"blue.400"}
                    color={"white"}
                    _hover={{
                      bg: "blue.500",
                    }}
                    type="submit"
                    isLoading={isSubmitting}
                    onClick={() => {
                      router.push(`http://${process.env.NEXT_PUBLIC_LARAVEL_URL}/login/google`);
                    }}
                  >
                    Google
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

LoginPage.getLayout = function getLayout(page: ReactElement) {
  return <BasicLayout>{page}</BasicLayout>;
};

export default LoginPage;
