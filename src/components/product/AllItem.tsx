import { Image, Flex, Text, Box, SimpleGrid, Button } from "@chakra-ui/react";
import { Product } from "@src/types/share/Product";
import { FC } from "react";

const AllItem: FC<{ allItem: Product[] }> = ({ allItem }) => {
    return (
        <Flex flexDir={"column"} w={"82%"}>
            <Text fontSize={"3xl"} fontWeight={"bold"}>
                このコンサートの他の商品
            </Text>
            <Flex>
                <SimpleGrid spacing={20} p={"2%"} columns={5}>
                    {allItem.map((item, key) => {
                        if (key > 5) {
                            return (
                                <Flex cursor={"pointer"} rounded="3%" _hover={{boxShadow:"2xl"}} flexDirection={"column"} key={key}>
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
                <Flex alignItems={"end"} ml={"3%"}>
                    <Button>
                        <Text fontWeight={"bold"} fontSize={"xl"}>
                            全ての商品へ &#10132;
                        </Text>
                    </Button>
                </Flex>
            </Flex>
        </Flex>
    )
}
export default AllItem;