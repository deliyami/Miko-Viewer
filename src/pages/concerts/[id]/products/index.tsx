import { Text, Spinner, useMediaQuery, Flex, Select } from '@chakra-ui/react';
import BasicLayout from '@src/layout/BasicLayout';
import axios from 'axios';
import { useRouter } from 'next/router';
import { ReactElement, useEffect, useState } from 'react';
import ProductsList from '../../../../components/product/ProductsList';

const ProductsPage = second => {
  const router = useRouter();
  // let rId = router.query.id;
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLargerThan960] = useMediaQuery('(min-width: 960px)');
  const [selected, setSelected] = useState('新着順');

  function onSelectedChanged(event) {
    setSelected(event.target.value);
    // if (event.target.value == "최신순") {
    //   sortForLatest();
    // } else if (event.target.value == "판매순") {
    //   sortForSold();
    // } else if (event.target.value == "낮은가격순") {
    //   sortForLowPrice();
    // } else if (event.target.value == "높은가격순") {
    //   sortForHighPrice();
    // }
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

  useEffect(() => {
    if (!router.isReady) return;
    getData();
  }, [router.isReady]);

  function getData() {
    axios.get(`http://localhost:8080/api/products?per_page=20&filter=concert_id%3A${router.query.id}}`).then(res => {
      console.log(res.data);
      if (res.data.length > 1) {
        setData(
          res.data.sort((a, b) => {
            return a.id - b.id;
          }),
        );
      }
      setData(res.data.data);
      setIsLoading(false);
    });
  }

  return (
    <Flex flexDirection={'column'} alignItems={'center'} h="full" w={'full'} justifyContent={'center'} p={'2%'}>
      {isLoading ? (
        <Flex alignItems={'center'} justifyContent="center">
          <Spinner size={'xl'}></Spinner>
        </Flex>
      ) : data.length === 0 ? (
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
};

export default ProductsPage;

ProductsPage.getLayout = function getLayout(page: ReactElement) {
  return <BasicLayout>{page}</BasicLayout>;
};
