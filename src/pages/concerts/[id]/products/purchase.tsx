import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import AsyncBoundary from '@src/components/common/wrapper/AsyncBoundary';
import Carts from '@src/components/product/cart/Carts';
import Check from '@src/components/product/pay/Check';
import Info from '@src/components/product/pay/Info';
import Paydone from '@src/components/product/pay/Paydone';
import BasicLayout from '@src/layout/BasicLayout';
import { useSingleLaravel } from '@src/state/swr/useLaravel';
import { useUser } from '@src/state/swr/useUser';
import { ReactElement, useState } from 'react';

//
export default function Purchase() {
  const [address, setAddress] = useState('');
  const [tabIndex, setTabIndex] = useState(1);
  function handleTabsChange(index) {
    setTabIndex(index);
  }
  const { data: userData } = useUser();

  const { data } = useSingleLaravel('/cart_products', userData?.id, {});

  if (!data) return <Box>no Data</Box>;

  return (
    <Tabs index={tabIndex} onChange={handleTabsChange} variant="soft-rounded" colorScheme="green" isFitted>
      <TabList>
        <Tab>ショッピングカート</Tab>
        <Tab>お客様情報の入力</Tab>
        <Tab>ご注文内容確認</Tab>
        <Tab>完了</Tab>
      </TabList>
      {data && (
        <TabPanels>
          <TabPanel>
            <Carts data={data} setData={setData} />
          </TabPanel>
          <TabPanel>
            <Info setAddress={setAddress} tabIndex={tabIndex} setTabIndex={setTabIndex} />
          </TabPanel>
          <TabPanel>
            <Check data={data} address={address} />
          </TabPanel>
          <TabPanel>
            <Paydone data={data} />
          </TabPanel>
        </TabPanels>
      )}
    </Tabs>
  );
}

Purchase.getLayout = function getLayout(page: ReactElement) {
  return (
    <BasicLayout>
      <AsyncBoundary>{page}</AsyncBoundary>
    </BasicLayout>
  );
};
