import { Accordion, Box, Button, Flex, Image, Menu, MenuItem, MenuList, Text, useDisclosure } from '@chakra-ui/react';
import { FaCoins } from '@react-icons/all-files/fa/FaCoins';
import { FaShoppingCart } from '@react-icons/all-files/fa/FaShoppingCart';
import Loading from '@src/components/common/Loading';
import { IMAGE_DOMAIN } from '@src/const';
import { getDataFromLaravel } from '@src/helper';
import { enterTicketDataState } from '@src/state/recoil';
import { Product } from '@src/types/share';
import { Pagination } from '@src/types/share/common';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import Search from './Search';
import SortSelectForm from './SortSelectForm';
// import FaShoppingCart from '@react-icons/all-files/';

const ProductList = () => {
  const URL_PRODUCTS = '/products';
  const enterTicketData = useRecoilValue(enterTicketDataState);
  const [data, setData] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();

  // function data() {
  //   return getDataFromLaravel<Pagination<Product>>(URL_PRODUCTS, {
  //     filter: [['concert_id', enterTicketData.concertId]],
  //   }).then(response => response.data);
  // }
  useEffect(() => {
    getDataFromLaravel<Pagination<Product>>(URL_PRODUCTS, {
      filter: [['concert_id', enterTicketData.concertId]],
    }).then(response => setData(response.data));
  }, []);
  return (
    <Flex direction={'column'}>
      <Search></Search>
      <SortSelectForm data={data}></SortSelectForm>
      {data.data !== undefined ? (
        data.data?.map((item, key) => {
          return (
            <Flex key={key} mb={'20%'} justifyContent={'center'}>
              <Menu isOpen={isOpen}>
                <MenuList onMouseEnter={onOpen} onMouseLeave={onClose}>
                  <MenuItem>Menu Item 1</MenuItem>
                  <MenuItem>Menu Item 2</MenuItem>
                  <MenuItem>Menu Item 3</MenuItem>
                </MenuList>
              </Menu>
              <Flex alignItems={'center'} flexDir={'column'}>
                <Box w={'200px'} rounded={'8%'}>
                  <Image onMouseEnter={onOpen} onMouseLeave={onClose} src={`${IMAGE_DOMAIN}products/${item.image}`} boxSize={'full'}></Image>
                </Box>
                <Text>{item.name}</Text>
                <Text fontWeight={'bold'}>¥{item.price}</Text>
                <Flex mt={'5%'} w={'full'} justifyContent="space-around">
                  <Button _hover={{ color: 'orange', background: '#EFEFEF' }} leftIcon={<FaCoins />} w={'35%'} background="orange" color={'white'}>
                    注文
                  </Button>
                  <Button _hover={{ color: 'blue.300', background: '#EFEFEF' }} leftIcon={<FaShoppingCart />} w={'35%'} background="blue.300" color={'white'}>
                    カート
                  </Button>
                </Flex>
              </Flex>
            </Flex>
          );
        })
      ) : (
        <Loading></Loading>
      )}
    </Flex>
  );
};
export default ProductList;
