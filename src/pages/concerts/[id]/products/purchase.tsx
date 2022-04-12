import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import Carts from '@src/components/product/cart/Carts';
import Check from '@src/components/product/pay/Check';
import Info from '@src/components/product/pay/Info';
import Paydone from '@src/components/product/pay/Paydone';
import { getDataFromLaravel } from '@src/helper/getDataFromLaravel';
import BasicLayout from '@src/layout/BasicLayout';
import { useUser } from '@src/state/swr/useUser';
import { Cart } from '@src/types/share/Cart';
import { Pagination } from '@src/types/share/common/common';
import { ReactElement, useEffect, useState } from 'react';

const purchase = () => {
  const [address, setAddress] = useState('');
  const [tabIndex, setTabIndex] = useState(1);
  // const [totalCost, setTotalCoast] = useState(0);
  const [data, setData] = useState([]);
  function handleTabsChange(index) {
    setTabIndex(index);
  }
  const user = useUser();

  // const URL_PRODUCTS = '/cart_products';
  const URL_PRODUCTS = `/cart_products/${user.data.id}`;
  // console.log("ue");
  useEffect(() => {
    getDataFromLaravel<Pagination<Cart>>(URL_PRODUCTS).then(response => setData(response.data));
  }, []);
  console.log(data);
  // console.log(address);
  return (
    <Tabs index={tabIndex} onChange={handleTabsChange} variant="soft-rounded" colorScheme="green" isFitted>
      <TabList>
        <Tab>ショッピングカート</Tab>
        <Tab>お客様情報の入力</Tab>
        <Tab>ご注文内容確認</Tab>
        <Tab>完了</Tab>
      </TabList>
      {data === undefined ? null : (
        <TabPanels>
          <TabPanel>
            <Carts data={data} setData={setData} />
          </TabPanel>
          <TabPanel>
            <Info setAddress={setAddress} tabIndex={tabIndex} setTabIndex={setTabIndex} />
          </TabPanel>
          <TabPanel>
            <Check data={data} address={address} tabIndex={tabIndex} setTabIndex={setTabIndex} />
          </TabPanel>
          <TabPanel>
            <Paydone />
          </TabPanel>
        </TabPanels>
      )}
    </Tabs>
  );
};

export default purchase;

purchase.getLayout = function getLayout(page: ReactElement) {
  return <BasicLayout>{page}</BasicLayout>;
};
