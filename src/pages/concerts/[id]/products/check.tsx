import { Flex } from '@chakra-ui/react';
import Buttons from '@src/components/product/pay/buttons';
import Title from '@src/components/product/pay/Title';
import Status from '@src/components/product/Status';
import BasicLayout from '@src/layout/BasicLayout';
import { ReactElement } from 'react';

const check = () => {
  return (
    <Flex flexDirection={'column'} w={'50%'} h="100vh" p={'2%'} ml={'25%'}>
      <Status status={3}></Status>
      <Title title={'ご注文内容確認'}></Title>
      <Buttons page={'paydone'}></Buttons>
    </Flex>
  );
};
export default check;

check.getLayout = function getLayout(page: ReactElement) {
  return <BasicLayout>{page}</BasicLayout>;
};
