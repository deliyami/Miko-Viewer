import { Progress, Tab, TabList, Box, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import AsyncBoundary from '@src/components/common/wrapper/AsyncBoundary';
import Carts from '@src/components/product/cart/Carts';
import Check from '@src/components/product/pay/Check';
import Info from '@src/components/product/pay/Info';
import Paydone from '@src/components/product/pay/Paydone';
import BasicLayout from '@src/layout/BasicLayout';
import { useSingleLaravel } from '@src/state/swr/useLaravel';
import { useUser } from '@src/state/swr/useUser';
// import { Cart } from '@src/types/local';
import { ReactElement, SetStateAction, useState } from 'react';

const Purchase = () => {
  const [address, setAddress] = useState('');
  const [tabIndex, setTabIndex] = useState(1);
  // const [data, setData] = useState({});

  function handleTabsChange(index: SetStateAction<number>) {
    setTabIndex(index);
  }

  console.log(tabIndex);
  const { data: userData } = useUser();

  const { data } = useSingleLaravel('/cart_products', userData?.id, {});

  if (!data) return <Box>no Data</Box>;

  return (
    <>
      {/* <Slider value={(tabIndex + 1) * 25} mb="1%">
        <SliderTrack bg={'red.100'}>
          <SliderFilledTrack bg={'tomato'}></SliderFilledTrack>
        </SliderTrack>
      </Slider> */}
      <Progress hasStripe isAnimated value={(tabIndex + 1) * 25} colorScheme="red" mb="2%" bg={'red.100'} />
      <Tabs index={tabIndex} onChange={handleTabsChange} variant="soft-rounded" colorScheme="green" isFitted>
        <TabList>
          <Tab>ショッピングカート</Tab>
          <Tab>お客様情報の入力</Tab>
          {address === '   -' ? (
            <>
              <Tab isDisabled cursor={'default'}>
                ご注文内容確認
              </Tab>
              <Tab isDisabled cursor={'default'}>
                完了
              </Tab>
            </>
          ) : (
            <>
              <Tab>ご注文内容確認</Tab>
              <Tab>完了</Tab>
            </>
          )}
        </TabList>
        {data && (
          <TabPanels>
            <TabPanel>
              <Carts setTabIndex={setTabIndex} />
            </TabPanel>
            <TabPanel>
              <Info address={address} setAddress={setAddress} tabIndex={tabIndex} setTabIndex={setTabIndex} />
            </TabPanel>
            <TabPanel>
              <Check data={data} setTabIndex={setTabIndex} address={address} />
            </TabPanel>
            <TabPanel>
              <Paydone data={data} />
            </TabPanel>
          </TabPanels>
        )}
      </Tabs>
    </>
  );
};

export default Purchase;

Purchase.getLayout = function getLayout(page: ReactElement) {
  return (
    <BasicLayout>
      <AsyncBoundary>{page}</AsyncBoundary>
    </BasicLayout>
  );
};
