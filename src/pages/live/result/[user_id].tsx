import { Box, Button, Flex, Grid, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, SimpleGrid, Text, useDisclosure } from "@chakra-ui/react"
import MenuBar from "@src/components/home/MenuBar";
import Footer from "@src/components/home/Footer";
import KakaoShareButton from '@src/components/result/KakaoShareButton';
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import SNSModal from "@src/components/result/SNSModal";
import Score from "@src/components/result/Score";
const result = () => {
    const router = useRouter();
    const users = ["u1", "u2", "u3", "u4", "u5", "u6", "u7", "u8"];
    const score = []
    useEffect(() => {
        const script = document.createElement('script')
        script.src = '//developers.kakao.com/sdk/js/kakao.min.js'
        script.async = true
    
        document.body.appendChild(script)
        return () => {
          document.body.removeChild(script)
        }
      }, [])
    
    return (
        <Box w={"100vw"} h={"100vh"}>
            <MenuBar></MenuBar>
            <Flex h="72%" flexDirection={"column"} justifyContent={"space-evenly"}>
                <Text ml={"5%"} h={"1%"} fontWeight={"bold"} fontSize={"6xl"}>
                ユーザ{router.query.user_id}の結果
                </Text>``
                <Flex h={"80%"} justifyContent={"space-around"} alignItems={"center"}>
                    <Flex justifyContent={"center"} h={"70%"} alignItems={"center"} rounded={"3%"} border={"solid"} w="25%" borderColor="teal.300">아바타 or 프로필 사진</Flex>
                    <Flex flexDirection={"column"} alignItems={"center"} h={"70%"} justifyContent={"space-evenly"} rounded={"3%"} w="25%">
                        <Score score={score}></Score>
                        <SNSModal></SNSModal>
                    </Flex>
                    <Flex mb={"3%"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"} rounded={"3%"} h="full" w="30%">
                        <Text fontSize={"5xl"}>ランキング</Text>
                        <SimpleGrid h={"80%"} w={"full"} columns={1} spacing={2} overflow={"auto"}>
                            {users.map((user, key) => {
                                return (
                                    <Flex key={key} p={"1.5%"} alignItems={"center"}>
                                        <Flex w={"10%"} mr={"2%"} border="solid" borderColor={"teal.400"} rounded={100} justifyContent={"center"}>
                                            <Text fontSize={"3xl"}>
                                                {key + 1}
                                            </Text>
                                        </Flex>
                                        <Flex justifyContent={"space-around"} pl="2%" as={"samp"} fontSize={"2xl"} textAlign={"center"} w={"80%"} border={"solid"} borderColor="teal.200" p={"2%"} roundedLeft={100} roundedRight={100}>
                                            <Text ml={"7%"}>
                                                {user}
                                            </Text>
                                            <Text mt={"3%"} color={"gray.400"} fontSize={"md"}>
                                                Total:100
                                            </Text>
                                        </Flex>
                                    </Flex>
                                )
                            })}
                        </SimpleGrid>
                    </Flex>
                </Flex>
            </Flex>
            <Footer></Footer>
        </Box>
    )
}
export default result;