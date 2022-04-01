import { Box, Flex } from '@chakra-ui/react';
import { getDataFromLaravel } from '@src/helper/getDataFromLaravel';
import { enterTicketDataState } from '@src/state/recoil/concertState';
import { Pagination } from '@src/types/share/common/common';
import { Product } from '@src/types/share/Product';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';

// type Data = {
//   data?: Pagination<Product>;
// };

// export const getServerSideProps: GetServerSideProps<Data> = async context => {
//   const URL_PRODUCTS = '/products';
//   const concertId = parseInt((context.query.id as string) ?? '1', 10);
//   const result = await getDataFromLaravel<Pagination<Product>>(URL_PRODUCTS, {
//     filter: [['concert_id', 1]],
//   });
//   return {
//     props: {
//       data: result?.data ?? null,
//     },
//   };
// };

const ProductList = () => {
  const URL_PRODUCTS = '/products';
  const enterTicketData = useRecoilValue(enterTicketDataState);
  const [data, setData] = useState({});
  // function data() {
  //   return getDataFromLaravel<Pagination<Product>>(URL_PRODUCTS, {
  //     filter: [['concert_id', enterTicketData.concertId]],
  //   }).then(response => response.data);
  // }
  // useEffect(() => {
  const result = getDataFromLaravel<Pagination<Product>>(URL_PRODUCTS, {
    filter: [['concert_id', enterTicketData.concertId]],
  }).then(response => setData(response.data));
  console.log('fmpasodfijasdpfjas;djf;asdljf;alsdjfapos');
  // }, []);
  console.log(data);
  return (
    <Flex>
      {/* {data.data.map((item, key) => {
        <Box key={key}>{item.name}</Box>;
      })} */}
      {/* {data !== undefined
        ? data.map((item, key) => {
            <Box key={key}>{item.name}</Box>;
          })
        : null} */}
    </Flex>
  );
};
export default ProductList;
