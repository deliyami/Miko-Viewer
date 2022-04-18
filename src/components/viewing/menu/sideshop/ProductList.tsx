import { Box, Button, Flex, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react';
import { FaCoins } from '@react-icons/all-files/fa/FaCoins';
import { FaShoppingCart } from '@react-icons/all-files/fa/FaShoppingCart';
import { IMAGE_DOMAIN } from '@src/const';
import { Product } from '@src/types/share';
import Options from './Options';

type ProductData = {
  product: Product;
};

export default function ProductList({ product }: ProductData) {
  //   function setOption() {}
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Flex mb={'20%'} justifyContent={'center'}>
      {/* <Menu isOpen={isOpen}>
          <MenuList onMouseEnter={onOpen} onMouseLeave={onClose}>
          onMouseEnter={onOpen} onMouseLeave={onClose}
            <MenuItem>Menu Item 1</MenuItem>
            <MenuItem>Menu Item 2</MenuItem>
            <MenuItem>Menu Item 3</MenuItem>
          </MenuList>
        </Menu> */}
      <Flex alignItems={'center'} flexDir={'column'}>
        <Box w={'200px'} rounded={'8%'}>
          <Image alt="product_image" src={`${IMAGE_DOMAIN}product_image/${product.image}`} boxSize={'full'}></Image>
        </Box>
        <Text>{product.name}</Text>
        <Text fontWeight={'bold'}>¥{product.price}</Text>
        <Flex mt={'5%'} w={'300px'} justifyContent="space-around">
          <Button onClick={onOpen} _hover={{ color: 'orange', background: '#EFEFEF' }} w={'130px'} background="orange" color={'white'}>
            注文&nbsp;
            <FaCoins />
          </Button>
          <Button onClick={onOpen} _hover={{ color: 'blue.300', background: '#EFEFEF' }} w={'130px'} background="blue.300" color={'white'}>
            カート
            <FaShoppingCart />
          </Button>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>オプション選択</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Options stock={product.stock} size={product.size} color={product.color} />
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={onClose}>
                  注文する
                </Button>
                <Button variant="ghost">キャンセル</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Flex>
      </Flex>
    </Flex>
  );
}
