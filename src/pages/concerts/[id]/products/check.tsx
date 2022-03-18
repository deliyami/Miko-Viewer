import { Button, Flex, Link } from '@chakra-ui/react';
import Status from '@src/components/product/Status';
import BasicLayout from '@src/layout/BasicLayout';
import router from 'next/router';
import { ReactElement } from 'react';

const check = () => {
  return (
    <Flex flexDirection={'column'} w={'50%'} h="100vh" p={'2%'} ml={'25%'}>
      <Status status={3}></Status>
      <Flex justifyContent={'space-between'} h="100px" mt={'10%'}>
        <Button w="23%" fontSize={'2xl'} onClick={() => router.back()}>
          ← 戻る
        </Button>
        <Link href={`/concerts/${router.query.id}/products/paydone`}>
          <Button fontSize={'2xl'} w="23%">
            次へ →
          </Button>
        </Link>
      </Flex>
    </Flex>
  );
};
export default check;

check.getLayout = function getLayout(page: ReactElement) {
  return <BasicLayout>{page}</BasicLayout>;
};
