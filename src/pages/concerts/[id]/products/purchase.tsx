import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import AsyncBoundary from '@src/components/common/wrapper/AsyncBoundary';
import Carts from '@src/components/product/cart/Carts';
import Check from '@src/components/product/pay/Check';
import Info from '@src/components/product/pay/Info';
import Paydone from '@src/components/product/pay/Paydone';
import BasicLayout from '@src/layout/BasicLayout';
import { ReactElement, useState } from 'react';

const purchase = () => {
  const [tabIndex, setTabIndex] = useState(1);
  function handleTabsChange(index) {
    setTabIndex(index);
  }
  return (
    <Tabs index={tabIndex} onChange={handleTabsChange} variant="soft-rounded" colorScheme="green" isFitted>
      <TabList>
        <Tab>ショッピングカート</Tab>
        <Tab>お客様情報の入力</Tab>
        <Tab>ご注文内容確認</Tab>
        <Tab>完了</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <Carts />
        </TabPanel>
        <TabPanel>
          <Info tabIndex={tabIndex} setTabIndex={setTabIndex} />
        </TabPanel>
        <TabPanel>
          <Check tabIndex={tabIndex} setTabIndex={setTabIndex} />
        </TabPanel>
        <TabPanel>
          <Paydone />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default purchase;

purchase.getLayout = function getLayout(page: ReactElement) {
  return (
    <BasicLayout>
      <AsyncBoundary>{page}</AsyncBoundary>
    </BasicLayout>
  );
};
