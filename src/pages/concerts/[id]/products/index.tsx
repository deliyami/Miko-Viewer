import { Flex, Select, Spinner, Text, useMediaQuery } from '@chakra-ui/react';
import { getDataFromLaravel } from '@src/helper/getDataFromLaravel';
import BasicLayout from '@src/layout/BasicLayout';
import { Pagination } from '@src/types/share/common/common';
import { Product } from '@src/types/share/Product';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { ReactElement, useEffect, useState } from 'react';
import ProductsList from '../../../../components/product/ProductsList';

type Data = {
  data?: Pagination<Product>;
};

export const getServerSideProps: GetServerSideProps<Data> = async context => {
  const URL_PRODUCTS = '/products';
  const concertId = parseInt((context.query.id as string) ?? '1');
  const result = await getDataFromLaravel<Pagination<Product>>(URL_PRODUCTS, {
    filter: [['concert_id', concertId]],
  });
  return {
    props: {
      data: result?.data ?? null,
    },
  };
};

export default function ProductsPage({ data }) {
  console.log(data.length);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isLargerThan960] = useMediaQuery('(min-width: 960px)');
  const [selected, setSelected] = useState('新着順');
  useEffect(() => {
    if (data) {
      setIsLoading(false);
      console.log(isLoading);
    } else console.log(isLoading);
  }, []);
  function onSelectedChanged(event) {
    setSelected(event.target.value);
    if (event.target.value == '최신순') {
      sortForLatest();
    } else if (event.target.value == '판매순') {
      sortForSold();
    } else if (event.target.value == '낮은가격순') {
      sortForLowPrice();
    } else if (event.target.value == '높은가격순') {
      sortForHighPrice();
    }
  }

  function sortForLatest() {
    data.sort(function (a, b) {
      return a.id - b.id;
    });
    console.log('sortForLatest');
  }
  function sortForSold() {}
  function sortForLowPrice() {
    data.sort(function (a, b) {
      return a.price - b.price;
    });
  }
  function sortForHighPrice() {
    data.sort(function (a, b) {
      return b.price - a.price;
    });
  }

  return (
    <Flex flexDirection={'column'} alignItems={'center'} h="full" w={'full'} justifyContent={'center'} p={'2%'}>
      {isLoading ? (
        <Flex alignItems={'center'} justifyContent="center">
          <Spinner size={'xl'}></Spinner>
        </Flex>
      ) : data.data.length === 0 ? (
        <Text color={'gray.300'} fontSize={'4xl'} cursor="default">
          このコンサートの賞品は用意しておりません。
        </Text>
      ) : (
        <Flex flexDirection={'column'}>
          <Text mb={'3%'} fontSize={'5xl'}>
            {router.query.id}번 콘서트의 상품
          </Text>
          <Select mb={'3%'} alignSelf={'end'} textAlign={'center'} w={'15%'} size={'md'} value={selected} onChange={onSelectedChanged}>
            <option>新着順</option>
            <option>売れている順</option>
            <option>価格が安い順</option>
            <option>価格が高い順</option>
          </Select>
          <Flex>
            <ProductsList data={data}></ProductsList>
          </Flex>
        </Flex>
      )}
    </Flex>
  );
}

ProductsPage.getLayout = function getLayout(page: ReactElement) {
  return <BasicLayout>{page}</BasicLayout>;
};
