import { Box, Flex, Text } from '@chakra-ui/react';
import axios from 'axios';
import ProductDetail from '@src/components/product/ProductDetail';
import AllItem from '@src/components/product/AllItem';
import { ReactElement } from 'react';
import BasicLayout from '@src/layout/BasicLayout';
import Details from '@src/components/product/details/Details';

const Post = ({ item, allItem }) => {
  console.log(allItem);
  return (
    <Flex flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
      <Box mb={'3%'} w="full">
        {item ? (
          <ProductDetail item={item}></ProductDetail>
        ) : (
          <Text color={'gray.300'} fontSize={'5xl'} cursor="default">
            このコンサートの賞品は用意しておりません。
          </Text>
        )}
      </Box>
      {allItem.length <= 1 ? null : <AllItem allItem={allItem}></AllItem>}
      <Details item={item}></Details>
    </Flex>
  );
};
export default Post;

export async function getServerSideProps(context) {
  const product_id = context.params.products_id;
  const concert_id = context.params.id;
  console.log('goods_id = ' + product_id);
  let data = [];
  let concertProducts = [];
  await axios.get(`http://127.0.0.1:8080/api/products/${product_id}`).then(res => {
    data = res.data.data;
  });
  await axios.get(`http://localhost:8080/api/products?per_page=20&filter=concert_id%3A${concert_id}}`).then(res => {
    concertProducts = res.data.data;
  });
  return {
    props: {
      item: data,
      allItem: concertProducts,
    },
  };
}

Post.getLayout = function getLayout(page: ReactElement) {
  return <BasicLayout>{page}</BasicLayout>;
};
