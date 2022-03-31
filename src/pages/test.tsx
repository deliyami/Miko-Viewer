import { Box, Flex } from '@chakra-ui/react';
import { getDataFromLaravel } from '@src/helper/getDataFromLaravel';
import { Pagination } from '@src/types/share/common/common';
import { Product } from '@src/types/share/Product';
import { GetServerSideProps } from 'next';

type Data = {
  data?: Pagination<Product>;
};

export const getServerSideProps: GetServerSideProps<Data> = async context => {
  const URL_PRODUCTS = '/products';
  const concertId = parseInt((context.query.id as string) ?? '2', 10);
  // const enterTicketData = useRecoilValue(enterTicketDataState);
  // console.log(nterTicketDataState.concertId);

  const result = await getDataFromLaravel<Pagination<Product>>(URL_PRODUCTS, {
    filter: [['concert_id', concertId]],
  });
  return {
    props: {
      data: result?.data ?? null,
    },
  };
};
const test = data => {
  // const enterTicketData = useRecoilValue(enterTicketDataState);
  // console.log(enterTicketData.concertId);
  console.log(data);
  return (
    <Flex>
      {data.data.data.map((item, key) => (
        <Box key={key}>{item.name}</Box>
      ))}
    </Flex>
  );
};
export default test;
