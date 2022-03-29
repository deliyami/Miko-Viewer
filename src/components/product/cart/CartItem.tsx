import { CloseButton, Flex, Image, Select, Text } from '@chakra-ui/react';
import { S3_URL } from '@src/const';

const CartItem = ({ query, selectedCount, setSelectedCount }) => {
  function onSelectChange(e) {
    setSelectedCount(e.target.value);
  }
  let item = null;
  if (query.item) {
    item = JSON.parse(query.item);
  }
  return (
    <Flex w={800} border="solid" mt={'3%'} overflow={'auto'} h={600} flexDirection={'column'}>
      <Flex h={'25%'} m={'5%'} justifyContent={'space-evenly'} w={'100%'}>
        <Image w="15%" h="100%" src={`${S3_URL}products/${item.image}`} rounded={'30%'} alt="productImage"></Image>
        <Flex m={'2%'} flexDirection={'column'}>
          <Text fontSize={'xl'}>{item.name}</Text>
          <Text textAlign={'right'}>カラー : {query.color}</Text>
          <Text textAlign={'right'}>サイズ : {query.size}</Text>
        </Flex>
        <Flex w={'20%'} ml={'5%'} mr={'5%'} justifyContent={'center'} alignItems="center">
          <Select value={selectedCount} onChange={onSelectChange}>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </Select>
        </Flex>
        <Flex w={'20%'} justifyContent={'center'} alignItems="center">
          <Text>¥{item.price * selectedCount}</Text>
        </Flex>
        <Flex ml={'0%'} justifyContent={'center'} alignItems="center">
          <CloseButton></CloseButton>
        </Flex>
      </Flex>
    </Flex>
  );
};
export default CartItem;
