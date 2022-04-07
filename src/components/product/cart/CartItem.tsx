import { CloseButton, Flex, Select, Image, Text } from '@chakra-ui/react';
import { LARAVEL_URL, S3_URL } from '@src/const';
import axios from 'axios';
import { useState } from 'react';

const CartItem = ({ data }) => {
  // console.log(Array(data)[0][0]);
  // console.log(typeof data);
  // data[0].map((item)=>{
  //   console.log(item);
  // })
  console.log(data);
  const [quantity, setQuantity] = useState(data.quantity);
  function onSelectChange(e) {
    setQuantity(e.target.value);
  }
  function deleteCart(cartId) {
    axios
      .delete(`${LARAVEL_URL}/cart_products/${cartId}`)
      .then(response => console.log(response))
      .catch(error => console.log(error));
  }
  // let item = null;
  // if (query.item) {
  //   item = JSON.parse(query.item);
  // }
  // console.log(data[0].products.data);
  return (
    <Flex w={'100%'} mt={'3%'} overflow={'auto'} h={600} flexDirection={'column'}>
      {data.map((item, key) => {
        return (
          <Flex h={'25%'} key={key} mb="5%" shadow={'xs'} justifyContent={'space-evenly'} w={'100%'}>
            <Image w="15%" h="100%" src={`${S3_URL}products/${item.products[0].image}`} rounded={'30%'} alt="productImage"></Image>
            <Flex m={'2%'} flexDirection={'column'}>
              <Text fontSize={'xl'}>{item.products[0].name}</Text>
              <Text textAlign={'right'}>カラー : {item.color}</Text>
              <Text textAlign={'right'}>サイズ : {item.size}</Text>
            </Flex>
            <Flex w={'13%'} ml={'5%'} mr={'5%'} justifyContent={'center'} alignItems="center">
              <Select value={item.quantity} onChange={onSelectChange}>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </Select>
            </Flex>
            <Flex w={'10%'} justifyContent={'center'} alignItems="center">
              <Text>¥{item.products[0].price * item.quantity}</Text>
            </Flex>
            <Flex ml={'3%'} justifyContent={'center'} alignItems="center">
              <CloseButton onClick={() => deleteCart(item.id)}></CloseButton>
            </Flex>
          </Flex>
        );
      })}
    </Flex>
  );
};
export default CartItem;
