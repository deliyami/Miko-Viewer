import { Image, Flex, Text, Box, SimpleGrid, Button } from "@chakra-ui/react";
import { Product } from "@src/types/share/Product";
import { FC } from "react";

const AllItem: FC<{ allItem: Product[] }> = ({ allItem }) => {
    return (
        <Flex flexDir={"column"} w={"82%"}>
            <Text fontSize={"3xl"} fontWeight={"bold"}>
                このコンサートの他の商品
            </Text>
            <SimpleGrid spacing={20} p={"2%"} columns={5}>
                {allItem.map((item, key) => {
                    if (key > 5) {
                        return (
                            <Flex flexDirection={"column"} key={key}>
                                <Box>
                                    <Box>
                                        <Image src={item.image}></Image>
                                    </Box>
                                    <Text textAlign={"right"}>{item.name}</Text>
                                    <Text textAlign={"right"}>¥{item.price}</Text>
                                </Box>
                            </Flex>
                        )
                    }
                })}
            </SimpleGrid>
            <Flex justifyContent={"end"} mr={"2%"}>
                <Button w={"10%"}>
                    <Text fontWeight={"bold"} fontSize={"xl"}>
                        全ての商品へ &#10132;
                    </Text>
                </Button>
            </Flex>
        </Flex>
    )
}
export default AllItem;