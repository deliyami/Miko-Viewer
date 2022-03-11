import { Box, Text } from "@chakra-ui/react";
import BasicLayout from "@src/layout/BasicLayout";
import { useRouter } from "next/router";
import { ReactElement } from "react";

const SignPage = second => {
  const router = useRouter();
  return (
    <Box>
      {router.asPath}
      <Text>회원가입</Text>
    </Box>
  );
};

SignPage.getLayout = function getLayout(page: ReactElement) {
  return <BasicLayout>{page}</BasicLayout>;
};

export default SignPage;
