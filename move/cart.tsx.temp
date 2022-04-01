/* eslint-disable eqeqeq */
import { Box, Flex, Text } from '@chakra-ui/react';
import Footer from '@src/components/home/Footer';
import MenuBar from '@src/components/home/MenuBar';
import CartItem from '@src/components/product/cart/CartItem';
import OrderSummary from '@src/components/product/cart/OrderSummary';
import BasicLayout from '@src/layout/BasicLayout';
import { withRouter } from 'next/router';
import { ReactElement, useState } from 'react';

const cart = ({ router: { query } }) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [selectedCount, setSelectedCount] = useState(query.count);
  return (
    <>
      <MenuBar></MenuBar>
      <Flex justifyContent={'space-between'} flexDirection={'column'} h={'100vh'}>
        {query.cartCount == 0 ? (
          <Text p={'5%'} textAlign={'center'} color={'gray.300'} fontSize={'4xl'} cursor="default">
            ショッピングカートに何も入っていません。
          </Text>
        ) : (
          <Box h={'80%'} p={'2%'}>
            <Flex h="100%" border="1px" justifyContent={'space-around'} borderColor={'gray.300'} rounded="xl">
              <Flex flexDirection={'column'} pb={'3%'} justifyContent={'space-evenly'}>
                <Flex mt="3%" justifyContent={'center'}>
                  <Text fontSize={'3xl'}>ショッピングカート({query.cartCount})</Text>
                </Flex>
                <CartItem query={query} selectedCount={selectedCount} setSelectedCount={setSelectedCount}></CartItem>
              </Flex>
              <OrderSummary rawItem={query.item} selectedCount={selectedCount}></OrderSummary>
            </Flex>
          </Box>
        )}
      </Flex>
      <Footer></Footer>
    </>
  );
};
export default withRouter(cart);

cart.getLayout = function getLayout(page: ReactElement) {
  return <BasicLayout>{page}</BasicLayout>;
};
