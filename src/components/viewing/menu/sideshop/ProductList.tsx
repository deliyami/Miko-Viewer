import { Box, Flex, Image, Text } from '@chakra-ui/react';
import Loading from '@src/components/common/Loading';
import { S3_URL } from '@src/const';
import { getDataFromLaravel } from '@src/helper/getDataFromLaravel';
import { enterTicketDataState } from '@src/state/recoil/viewing/curData/curTicketState';
import { Pagination } from '@src/types/share/common/common';
import { Product } from '@src/types/share/Product';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import Search from './Search';
import SortSelectForm from './SortSelectForm';

const ProductList = () => {
  const URL_PRODUCTS = '/products';
  const enterTicketData = useRecoilValue(enterTicketDataState);
  const [data, setData] = useState({});

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
        data.data.map((item, key) => {
          return (
            <Flex key={key} mb={'20%'}>
              <Flex flexDir={'column'}>
                <Box w={'200px'} rounded={'8%'}>
                  <Image src={`${S3_URL}products/${item.image}`} boxSize={'full'}></Image>
                </Box>
                <Text>{item.name}</Text>
                <Text textAlign={'right'} fontWeight={'bold'}>
                  ¥{item.price}
                </Text>
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
