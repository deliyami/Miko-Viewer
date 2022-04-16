import { Box, Flex, Text } from '@chakra-ui/react';
import AsyncBoundary from '@src/components/common/wrapper/AsyncBoundary';
import AllItem from '@src/components/product/AllItem';
import Details from '@src/components/product/details/Details';
import ProductDetail from '@src/components/product/ProductDetail';
import { getDataFromLaravel } from '@src/helper';
import BasicLayout from '@src/layout/BasicLayout';
import { Product } from '@src/types/share';
import { Pagination } from '@src/types/share/common';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { ReactElement } from 'react';

type Data = {
  data?: Pagination<Product>;
  item?: Pagination<Product>;
  concertId: number;
};

export const getServerSideProps: GetServerSideProps<Data> = async context => {
  const URL_PRODUCTS = '/products';
  const concertId = parseInt((context.query.id as string) ?? '1', 10);
  // let categoryId = parseInt((context.query.category_id as string) ?? "1");
  // const page = context.query.page as string;
  // const search = context.query.search as string;

  const result = await getDataFromLaravel<Pagination<Product>>(URL_PRODUCTS, {
    filter: [['concert_id', concertId]],
    // page: parseInt(page),
    // per_page: 3,
    // search,
  });

  const item = await getDataFromLaravel<Pagination<Product>>(`${URL_PRODUCTS}/${context.query.product_id}`);

  return {
    props: {
      data: result?.data ?? null,
      concertId,
      item: item?.data ?? null,
    },
  };
};

export default function ProductPage({ data, item }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  // const router = useRouter();
  console.log(item.data);
  console.log(data);
  return (
    <Flex flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
      <Box mb={'3%'} w="full">
        {item.data ? (
          <ProductDetail item={item.data}></ProductDetail>
        ) : (
          <Text color={'gray.300'} fontSize={'5xl'} cursor="default">
            このコンサートの賞品は用意しておりません。
          </Text>
        )}
      </Box>
      {data.data.length <= 1 ? null : <AllItem allItem={data}></AllItem>}
      <Details item={item.data}></Details>
    </Flex>
  );
}

ProductPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <BasicLayout>
      <AsyncBoundary>{page}</AsyncBoundary>
    </BasicLayout>
  );
};
