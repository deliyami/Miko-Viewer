import { Flex } from '@chakra-ui/react';
import { getDataFromLaravel } from '@src/helper/getDataFromLaravel';
import { enterTicketDataState } from '@src/state/recoil/concertState';
import { Pagination } from '@src/types/share/common/common';
import { Product } from '@src/types/share/Product';
import { GetServerSideProps } from 'next';
import { useRecoilValue } from 'recoil';

type Data = {
  data?: Pagination<Product>;
};

export const getServerSideProps: GetServerSideProps<Data> = async context => {
  const URL_PRODUCTS = '/products';
  const concertId = parseInt((context.query.id as string) ?? '1', 10);
  const result = await getDataFromLaravel<Pagination<Product>>(URL_PRODUCTS, {
    filter: [['concert_id', 1]],
  });
  return {
    props: {
      data: result?.data ?? null,
    },
  };
};

const ProductList = ({ data }) => {
  console.log('fmpasodfijasdpfjas;djf;asdljf;alsdjfapos');
  const enterTicketData = useRecoilValue(enterTicketDataState);
  console.log(data);
  return <Flex>{enterTicketData.concertId}</Flex>;
};
export default ProductList;
