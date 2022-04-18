import { Flex, Select, Text } from '@chakra-ui/react';
import ProductsList from '@src/components/product/ProductsList';
import { Product } from '@src/types/share';
import { useRouter } from 'next/router';
import { ChangeEventHandler, FC, useMemo, useState } from 'react';

const ProductsTab: FC<{ products: Product[] }> = ({ products }) => {
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
        <Text color="gray.300" fontSize="3xl" cursor="default">
          このコンサートの賞品は用意しておりません。
        </Text>
      ) : (
        <Flex flexDirection="column">
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
};

export default ProductsTab;
