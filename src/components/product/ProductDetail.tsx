import { Text, Box, Image, Button, Select, Flex, ButtonGroup, IconButton, PopoverTrigger, Popover, PopoverBody, PopoverContent, PopoverFooter } from "@chakra-ui/react";
import { FC, useState } from "react";
import { ArrowForwardIcon, PlusSquareIcon } from "@chakra-ui/icons"
import Cart from "./Cart";
import { useRouter } from "next/router";
import { Product } from "@src/types/share/Product";
import PopOver from "./PopOver";
import OptionSelect from "./OptionSelect";

const ProductDetail = ({ item }) => {
    console.log(item);
    const router = useRouter();
    const [cartCount, setCartCount] = useState(0);
    

    return (
        <Flex ml={"10%"} p={"2%"}>
            <Flex mr={"7%"}>
                <Box w={500} h={500}>
                    <Image boxSize={"full"} src={item.image}></Image>
                </Box>
            </Flex>
            <Flex flexDirection={"column"}>
                <Flex flexDirection={"column"}>
                    <Box align={"right"}>
                        <Text fontSize={30}>{item.name}</Text>
                        <Text fontWeight="bold" mt={"2%"} fontSize={35}>¥{item.price}</Text>
                    </Box>
                </Flex>
                <OptionSelect></OptionSelect>
            </Flex>
            
            {/* <Flex flexDirection={"column"} mt={"380"} alignItems={"end"} ml={190}>
                <Cart cartCount={cartCount} count={count} size={size} item={item} color={color}></Cart>
            </Flex> */}
        </Flex>
    );
}
export default ProductDetail;