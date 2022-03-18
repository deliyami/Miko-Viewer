import { Box, Button, Flex, Grid, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, SimpleGrid, Text, useDisclosure } from "@chakra-ui/react";
import MenuBar from "@src/components/home/MenuBar";
import Footer from "@src/components/home/Footer";
import KakaoShareButton from "@src/components/result/KakaoShareButton";
import { useRouter } from "next/router";
import { ReactElement, useEffect, useRef, useState } from "react";
import SNSModal from "@src/components/result/SNSModal";
import Score from "@src/components/result/Score";
import BasicLayout from "@src/layout/BasicLayout";
import Charts from "@src/components/result/Charts";
import axios from "axios";
import Ranking from "@src/components/result/Ranking";

const result = () => {
  const router = useRouter();
  const users = ["u1", "u2", "u3", "u4", "u5", "u6", "u7", "u8"];
  const score = [];
  const [rank, setRank] = useState([]);
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "//developers.kakao.com/sdk/js/kakao.min.js";
    script.async = true;
    // ranking();

    document.body.appendChild(script);
    if (!router.isReady) return;
    return () => {
      document.body.removeChild(script);
    };
  }, [router.isReady]);

  //   function ranking(){
  //       axios.get(``).then( (res) =>{
  //           setRank(res.data);
  //           console.log(rank);
  //           //콘서트아이디를 주소창에
  //       }
  //       )

  return (
    <Box w={"100vw"} h={"100vh"}>
      <Flex h="72%" flexDirection={"column"} justifyContent={"space-evenly"}>
        <Text ml={"5%"} h={"1%"} fontWeight={"bold"} fontSize={"6xl"}>
          ユーザ{router.query.user_id}の結果
        </Text>
        <Flex h={"80%"} justifyContent={"space-around"} alignItems={"center"}>
          <Flex justifyContent={"center"} h={"70%"} alignItems={"center"} rounded={"3%"} border={"solid"} w="25%" borderColor="teal.300">
            아바타 or 프로필 사진
          </Flex>
          <Flex mb={"3%"} flexDirection={"column"} alignItems={"center"} h={"100%"} borderColor={"teal.300"} justifyContent={"space-evenly"} rounded={"3%"} w="22%">
            <Text fontSize={"3xl"} fontWeight={"bold"}>
              SCORE
            </Text>
            <Charts></Charts>
            <SNSModal></SNSModal>
          </Flex>
          <Ranking users={users} cId={router.query.id}></Ranking>
        </Flex>
      </Flex>
    </Box>
  );
};
export default result;

result.getLayout = function getLayout(page: ReactElement) {
  return <BasicLayout>{page}</BasicLayout>;
};
