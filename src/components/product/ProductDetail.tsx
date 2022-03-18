import { Text, Box, Image, Button, Select, Flex, ButtonGroup, IconButton, PopoverTrigger, Popover, PopoverBody, PopoverContent, PopoverFooter } from "@chakra-ui/react";
import { FC, useState } from "react";
import { ArrowForwardIcon, PlusSquareIcon } from "@chakra-ui/icons";
import Cart from "./Cart";
import { useRouter } from "next/router";
import { Product } from "@src/types/share/Product";
import PopOver from "./PopOver";
import OptionSelect from "./OptionSelect";

const ProductDetail = ({ item }) => {
  console.log(item);
  const router = useRouter();
  const [cartCount, setCartCount] = useState(0);
  const [count, setCount] = useState(0);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  // const [options, setOptions] = useState({""});
  // const [child, setChild] = useState(0);

  return (
    <Flex border={"solid"} justifyContent={"center"}>
      <Flex>
        <Box w={500} h={500}>
          <Image boxSize={"full"} src={item.image}></Image>
        </Box>
      </Flex>
      <Flex flexDirection={"column"} border="solid">
        <Flex flexDirection={"column"}>
          <Box align={"right"}>
            <Text fontSize={30}>{item.name}</Text>
            <Text fontWeight="bold" fontSize={35}>
              ¥{item.price}
            </Text>
          </Box>
        </Flex>
        <OptionSelect
          color={color}
          size={size}
          count={count}
          setColor={setColor}
          setSize={setSize}
          setCount={setCount}
          cartCount={cartCount}
          setCartCount={setCartCount}
        ></OptionSelect>
      </Flex>
      <Flex alignItems={"end"} border="solid">
        <Cart item={item} count={count} color={color} size={size} cartCount={cartCount}></Cart>
      </Flex>
      {/* <Flex flexDirection={"column"} mt={"380"} alignItems={"end"} ml={190}>
                <Cart cartCount={cartCount} count={count} size={size} item={item} color={color}></Cart>
            </Flex> */}
    </Flex>
  );
};
export default ProductDetail;
