/* eslint-disable no-nested-ternary */
import { Flex, Select, Text } from '@chakra-ui/react';
import ProductsList from '@src/components/product/ProductsList';
import { getPageLaravelData } from '@src/helper';
import BasicLayout from '@src/layout/BasicLayout';
import { Product } from '@src/types/share';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import { ChangeEventHandler, ReactElement, useMemo, useState } from 'react';

type Data = {
  products: Product[];
};

export const getServerSideProps: GetServerSideProps<Data> = async context => {
  const concertId = parseInt((context.query.id as string) ?? '1', 10);

  try {
    const result = await getPageLaravelData('/products', {
      filter: [['concert_id', concertId]],
    });
    return {
      props: {
        products: result.data,
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

export default function ProductsPage({ products }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const [selected, setSelected] = useState<'新着順' | '売れている順' | '価格が安い順' | '価格が高い順'>('新着順');

  const onSelectedChanged: ChangeEventHandler<HTMLSelectElement> = e => {
    setSelected(e.target.value as typeof selected);
  };

  const sortedProduct = useMemo(() => {
    return products.sort((a, b) => {
      switch (selected) {
        case '新着順':
          return a.id - b.id;
        case '価格が安い順':
          return a.price - b.price;
        case '価格が高い順':
          return b.price - a.price;
        // TODO 판매순
        case '売れている順':
          return b.price - a.price;
        default:
          return 1;
      }
    });
  }, [selected, products]);

  return (
    <Flex flexDirection="column" alignItems="center" h="full" w="full" justifyContent="center" p="2%">
      {products.length === 0 ? (
        <Text color="gray.300" fontSize="4xl" cursor="default">
          このコンサートの賞品は用意しておりません。
        </Text>
      ) : (
        <Flex flexDirection="column">
          <Text mb="3%" fontSize="5xl">
            {router.query.id}번 콘서트의 상품
          </Text>
          <label htmlFor="product_sort">
            <Select id="sort" mb="3%" alignSelf="end" textAlign="center" w="15%" size="md" value={selected} onChange={onSelectedChanged}>
              <option>新着順</option>
              <option>売れている順</option>
              <option>価格が安い順</option>
              <option>価格が高い順</option>
            </Select>
          </label>
          <Flex>
            <ProductsList products={sortedProduct}></ProductsList>
          </Flex>
        </Flex>
      )}
    </Flex>
  );
}

ProductsPage.getLayout = function getLayout(page: ReactElement) {
  return <BasicLayout>{page}</BasicLayout>;
};
