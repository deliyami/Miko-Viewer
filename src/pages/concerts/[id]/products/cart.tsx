import { Box, Flex, Text, Image, Select, CloseButton, Button } from "@chakra-ui/react";
import Footer from "@src/components/home/Footer";
import MenuBar from "@src/components/home/MenuBar";
import { useRouter, withRouter } from "next/router";
import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
const cart = ({ router: { query } }) => {
  console.log("item : " + query.item);
  const router = useRouter();
  const [selectedCount, setSelectedCount] = useState(query.count);
  const item = JSON.parse(query.item);
  function onSelectChange(e) {
    setSelectedCount(e.target.value);
  }
  function goPay() {
    router.push(`/concerts/${router.query.id}/products/pay`);
  }
  return (
    <Flex justifyContent={"space-between"} flexDirection={"column"} h={"100vh"}>
      <MenuBar></MenuBar>
      {query.cartCount == 0 ? (
        <Text p={"5%"} textAlign={"center"} color={"gray.300"} fontSize={"4xl"} cursor="default">
          ショッピングカートに何も入っていません。
        </Text>
      ) : (
        <Box h={"80%"} p={"2%"}>
          <Flex h="100%" border="1px" borderColor={"gray.300"} rounded="xl">
            <Flex flexDirection={"column"} pb={"3%"} justifyContent={"space-evenly"}>
              <Flex mt="3%" justifyContent={"center"}>
                <Text fontSize={"3xl"}>ショッピングカート({query.cartCount})</Text>
              </Flex>
              <Flex w={800} mt={"3%"} overflow={"auto"} h={600} flexDirection={"column"}>
                <Flex h={"25%"} m={"5%"} justifyContent={"space-evenly"} w={"100%"}>
                  <Image w="20%" h="100%" src={item.image} rounded={"30%"}></Image>
                  <Flex m={"2%"} flexDirection={"column"}>
                    <Text fontSize={"xl"}>{item.name}</Text>
                    <Text textAlign={"right"}>カラー : {query.color}</Text>
                    <Text textAlign={"right"}>サイズ : {query.size}</Text>
                  </Flex>
                  <Flex w={"20%"} ml={"5%"} mr={"5%"} justifyContent={"center"} alignItems="center">
                    <Select value={selectedCount} onChange={onSelectChange}>
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                    </Select>
                  </Flex>
                  <Flex w={"20%"} justifyContent={"center"} alignItems="center">
                    <Text>¥{item.price * selectedCount}</Text>
                  </Flex>
                  <Flex ml={"7%"} justifyContent={"center"} alignItems="center">
                    <CloseButton></CloseButton>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
            <Flex flexDirection={"column"} justifyContent={"space-between"} ml={"9%"} h={"70%"} w="30%" p={"2%"} mt={"4%"} border="1px" borderColor={"gray.300"} rounded="lg">
              <Text fontWeight={"bold"} fontSize={"4xl"} textAlign="center">
                Order Summary
              </Text>
              <Flex flexDirection={"column"} color={"gray"} fontSize={"xl"} textAlign="center">
                <Flex justifyContent={"space-between"}>
                  <Text mb={"4%"}>商品代金合計</Text>
                  <Text> ¥{item.price * selectedCount}</Text>
                </Flex>
                <Flex justifyContent={"space-between"}>
                  <Text mb={"4%"}>内消費税</Text>
                  <Text>¥{(item.price * 1) / 10}</Text>
                </Flex>
                <Flex justifyContent={"space-between"}>
                  <Text>送料</Text>
                  <Text>¥300</Text>
                </Flex>
              </Flex>
              <hr></hr>
              <Flex fontSize={"2xl"} justifyContent={"space-between"}>
                <Text>ご注文合計</Text>
                <Text>¥{item.price * selectedCount + 300}</Text>
              </Flex>
              <Button onClick={goPay} colorScheme="blue" size="lg" fontSize="md" rightIcon={<FaArrowRight />}>
                <Text fontSize={"xl"}>注文する</Text>
              </Button>
            </Flex>
          </Flex>
        </Box>
      )}
      <Footer></Footer>
    </Flex>
  );
};
export default withRouter(cart);
