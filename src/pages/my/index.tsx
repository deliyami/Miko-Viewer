import { Text } from '@chakra-ui/react';
import BasicLayout from '@src/layout/BasicLayout';
import { useUser } from '@src/state/swr';
import Head from 'next/head';
import { ReactElement } from 'react';

export default function MyPage() {
  const { data: userData } = useUser();
  return (
    <>
      <Head>
        <title key="title">My Profile | Miko</title>
      </Head>
      <Text>soon</Text>
    </>
  );
}

MyPage.getLayout = function getLayout(page: ReactElement) {
  return <BasicLayout>{page}</BasicLayout>;
};
