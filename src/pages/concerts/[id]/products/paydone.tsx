import { Flex } from "@chakra-ui/react";
import Status from "@src/components/product/Status";
import BasicLayout from "@src/layout/BasicLayout";
import { ReactElement } from "react";

const paydone = () => {
  return (
    <Flex flexDirection={"column"} w={"50%"} h="100vh" p={"2%"} ml={"25%"}>
      <Status status="4"></Status>
    </Flex>
  );
};

paydone.getLayout = function getLayout(page: ReactElement) {
  return <BasicLayout>{page}</BasicLayout>;
};
