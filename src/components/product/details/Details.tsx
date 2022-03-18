import { Box, Flex, Text, SimpleGrid } from "@chakra-ui/react/node_modules/@chakra-ui/layout";
import { Product } from "@src/types/share/Product";
import { FC, useState } from "react";
import Detail from "./Detail";
import Comment from "./Comment";
import QnA from "./QnA";
import Delivery from "./Delivery";

const Details: FC<{ item: Product[] }> = ({ item }) => {
    const [ch, setCh] = useState(1);
    console.log(ch);
    return (
        <Flex flexDirection={"column"} w={"100vw"} overflow="auto" mt={"4%"} h="120vh">
            <Box alignSelf={"center"} w={"60%"} h={"70"} borderTop="2px" cursor={"pointer"}>
                <SimpleGrid bg='gray.100' alignItems={"center"} columns={4} h={"full"} fontSize={"xl"} textAlign={"center"}>
                    <Box onClick={() => setCh(1)}><Text>アイテム説明</Text></Box>
                    <Box borderLeft={"1px"} onClick={() => setCh(2)} borderColor={"gray.300"}><Text>総合評価</Text></Box>
                    <Box borderLeft={"1px"} borderColor={"gray.300"} onClick={() => setCh(3)}><Text>Q&A</Text></Box>
                    <Box borderLeft={"1px"} borderColor={"gray.300"} onClick={() => setCh(4)}><Text>配送関連</Text></Box>
                </SimpleGrid>
            </Box>
            <Flex mt={"5%"} justifyContent={"center"}  alignItems={"center"}>
                {ch === 1 ? <Detail item={item}></Detail> : null}
                {ch === 2 ? <Comment></Comment> : null}
                {ch === 3 ? <QnA></QnA> : null}
                {ch === 4 ? <Delivery></Delivery> : null}
            </Flex>
        </Flex>
    )
}

export default Details;