import { Flex, Text } from '@chakra-ui/react';
import Paydone from '@src/components/product/pay/Paydone';
import Title from '@src/components/product/pay/Title';
import Status from '@src/components/product/Status';
import BasicLayout from '@src/layout/BasicLayout';
import { ReactElement } from 'react';

const paydone = ({ data }) => {
  return (
    <Flex flexDirection={'column'} w={'50%'} h="100vh" p={'2%'} ml={'25%'}>
      <Status status="4"></Status>
      <Title title={'完了'}></Title>
      <Text fontSize={"3xl"} textAlign={'center'} mb={'10%'}>
        ありがとうございました。ご注文手続きが完了しました。
      </Text>
      <Paydone data={data}></Paydone>
    </Flex>
  );
};

export default paydone;

paydone.getLayout = function getLayout(page: ReactElement) {
  return <BasicLayout>{page}</BasicLayout>;
};
