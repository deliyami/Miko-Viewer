import { ArrowForwardIcon, PlusSquareIcon } from "@chakra-ui/icons";
import { Button, ButtonGroup, Flex, IconButton, Popover, PopoverBody, PopoverContent, PopoverFooter, PopoverTrigger } from "@chakra-ui/react";
import router from "next/router";
import { useState } from "react";

const PopOver = ({ count, color, size, cartCount, setCartCount }) => {
  const [isOpen, setIsOpen] = useState(false);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const [cartIsOpen, setCartIsOpen] = useState(false);
  const cartOpen = () => setCartIsOpen(true);
  const cartClose = () => setCartIsOpen(false);
  function onCart() {
    console.log('onCart');
    if (count == 0 || color == '' || size == '') {
      alert('オプションを全部選択して下さい。');
    } else if (count !== 0 && color !== '' && size !== '') {
      setCartCount(cartCount + 1);
    }
  }
  function onBuy() {
    console.log('onBuy');
    if (count == 0 || color == '' || size == '') {
      alert('オプションを全部選択して下さい。');
    } else if (count !== 0 && color !== '' && size !== '') {
      router.push(`/concerts/${router.query.id}/products/pay`);
    }
  }
  return (
    <Flex w={"100%"} justifyContent={"space-between"}>
      <Flex>
        <Popover isOpen={cartIsOpen} onClose={cartClose} returnFocusOnClose={false} placement="bottom" closeOnBlur={false}>
          <PopoverTrigger>
            <ButtonGroup
              _hover={{ shadow: "xl" }}
              float={"right"}
              onClick={() => {
                cartOpen();
                close();
              }}
              isAttached
              variant={"outline"}
            >
              <Button bg={"gray.100"}>カートに入れる</Button>
              <IconButton bg={"gray.100"} aria-label="Cart" icon={<PlusSquareIcon></PlusSquareIcon>}></IconButton>
            </ButtonGroup>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverBody>カートに入れますか？</PopoverBody>
            <PopoverFooter d="flex" justifyContent="flex-end">
              <ButtonGroup size="sm">
                <Button variant="outline" onClick={cartClose}>
                  キャンセル
                </Button>
                <Button
                  colorScheme="blue"
                  onClick={() => {
                    onCart();
                    cartClose();
                  }}
                >
                  入れる
                </Button>
              </ButtonGroup>
            </PopoverFooter>
          </PopoverContent>
        </Popover>
      </Flex>
      <Flex>
        <Popover isOpen={isOpen} onClose={close} returnFocusOnClose={false} placement="bottom" closeOnBlur={false}>
          <PopoverTrigger>
            <ButtonGroup
              _hover={{ shadow: "xl" }}
              onClick={() => {
                open();
                cartClose();
              }}
              isAttached
              variant={"outline"}
            >
              <Button bg={"gray.100"}>注文する</Button>
              <IconButton bg={"gray.100"} aria-label="Buy" icon={<ArrowForwardIcon></ArrowForwardIcon>}></IconButton>
            </ButtonGroup>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverBody>レージに進みますか？</PopoverBody>
            <PopoverFooter d="flex" justifyContent="flex-end">
              <ButtonGroup size="sm">
                <Button variant="outline" onClick={close}>
                  キャンセル
                </Button>
                <Button
                  colorScheme="blue"
                  onClick={() => {
                    onBuy();
                    close();
                  }}
                >
                  レージに進む
                </Button>
              </ButtonGroup>
            </PopoverFooter>
          </PopoverContent>
        </Popover>
      </Flex>
    </Flex>
  );
};

export default PopOver;
