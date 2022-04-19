import { Flex, Select } from '@chakra-ui/react';
import Loading from '@src/pages/test';
import { enterTicketDataState } from '@src/state/recoil';
import { usePageLaravel } from '@src/state/swr/useLaravel';
import { ChangeEventHandler, useMemo, useState } from 'react';
import { useRecoilValue } from 'recoil';
import ProductList from './ProductList';
import Search from './Search';

type Type = {
  setCartCount: Function;
};

export default function Product({ setCartCount }: Type) {
  const enterTicketData = useRecoilValue(enterTicketDataState);
  const { data: products } = usePageLaravel('/products', { filter: [['concert_id', enterTicketData?.id]] });
  const [selected, setSelected] = useState<'新着順' | '売れている順' | '価格が安い順' | '価格が高い順'>('新着順');

  const onSelectedChanged: ChangeEventHandler<HTMLSelectElement> = e => {
    setSelected(e.target.value as typeof selected);
  };

  const sortedProduct = useMemo(() => {
    return products?.data.sort((a, b) => {
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
    <Flex direction={'column'} h={'80vh'}>
      <Search></Search>
      <label htmlFor="product_sort">
        <Flex alignItems="center" justifyContent={'end'} mb="20px">
          <Select w={'100px'} h="30px" fontSize={'sm'} focusBorderColor="#1CE0D7" textAlign={'center'} id="sort" value={selected} onChange={onSelectedChanged}>
            <option>新着順</option>
            <option>売れている順</option>
            <option>価格が安い順</option>
            <option>価格が高い順</option>
          </Select>
        </Flex>
      </label>
      {products ? (
        <Flex flexWrap={'wrap'} alignItems="center" p={'4%'} justifyContent="space-between" overflow="auto">
          {sortedProduct?.map((product, key) => {
            return <ProductList setCartCount={setCartCount} key={key} product={product}></ProductList>;
          })}
        </Flex>
      ) : (
        <Loading></Loading>
      )}
    </Flex>
  );
}
