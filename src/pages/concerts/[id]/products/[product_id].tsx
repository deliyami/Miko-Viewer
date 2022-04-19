import { Box, Flex } from '@chakra-ui/react';
import AsyncBoundary from '@src/components/common/wrapper/AsyncBoundary';
import AllItem from '@src/components/product/AllItem';
import Details from '@src/components/product/details/Details';
import ProductDetail from '@src/components/product/ProductDetail';
import { getPageLaravelData, getSingleLaravelData } from '@src/helper';
import BasicLayout from '@src/layout/BasicLayout';
import { Product } from '@src/types/share';
import { Pagination } from '@src/types/share/common';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { ReactElement } from 'react';

type Data = {
  anotherProducts: Pagination<Product>;
  curProduct: Product;
};

export const getServerSideProps: GetServerSideProps<Data> = async context => {
  const concertId = parseInt(context.query.id as string, 10);
  const productId = parseInt(context.query.product_id as string, 10);

  try {
    const productsResult = await getPageLaravelData('/products', {
      filter: [['concert_id', concertId]],
      perPage: 100,
    });

    const curProductResult = await getSingleLaravelData('/products', productId);

    return {
      props: {
        anotherProducts: productsResult,
        curProduct: curProductResult.data,
      },
    };
  } catch (error) {
    return {
      redirect: {
        destination: '/500',
        permanent: false,
      },
    };
  }
};

export default function ProductPage({ anotherProducts, curProduct }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <Flex flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
      <Box mb={'3%'} w="full">
        <ProductDetail item={curProduct}></ProductDetail>
      </Box>
      <AllItem allItem={anotherProducts}></AllItem>
      <Details item={curProduct}></Details>
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
