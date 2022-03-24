import { Box, Text, Image } from '@chakra-ui/react';

const Delivery = () => {
  return (
    <Box w={'40.5%'}>
      <Image src="/image/productPage/delivery.svg"></Image>
      <Text border={'1px'} p={'3%'} fontSize={'2xl'}>
        送料について 通常の送料は一律¥429（税込）となります。 沖縄・各離島も一律¥429（税込）です。 一回のご注文分を全て同梱してお届けいたします。
        税抜5,000円以上（税込5,500円以上）購入すると、送料無料になります。
      </Text>
    </Box>
  );
};
export default Delivery;
