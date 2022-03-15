import { Box, Text } from "@chakra-ui/react";
import UserDonate from "@src/components/test/UserDonate";
import { useRouter } from "next/router";

const CoinPage = second => {
  const router = useRouter();
  return (
    <Box>
      {router.asPath}
      <Text>donate</Text>
      <UserDonate></UserDonate>
    </Box>
  );
};

export default CoinPage;
