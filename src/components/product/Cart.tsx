
import { Button, Image, Text, Flex } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";


const Cart = (props) => {
    const router = useRouter();
    console.log("??" + props.item);
    return (
        <Link href={{
            pathname: `/concerts/${router.query.id}/products/cart`,
            query: {
                cartCount: props.cartCount,
                count: props.count,
                size: props.size,
                color: props.color,
                item: JSON.stringify(props.item) 
            }
        }}>
            <Flex flexDirection={"column"}>
                {props.cartCount !== 0 ?
                    <Flex justifyContent={"end"}>
                        <Text color={"white"} pl={3} pr={3} align="center" rounded="100%" bg={"tomato"}>{props.cartCount}</Text>
                    </Flex>
                    : null
                }
                <Button aria-label="cart" icon={<Image src='/cart.svg' alt='next' />} mb={5} w={82.5} h={82.5} shadow={"2xl"} _hover={{ bg: "blue.100" }} borderRadius={"100%"} colorScheme={"blue"} bg={"white"} ><Image src="/cart.svg"></Image></Button>
            </Flex>
        </Link>
    )
}
export default Cart;