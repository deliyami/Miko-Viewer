import { Text } from '@chakra-ui/react';
import AsyncBoundary from '@src/components/common/wrapper/AsyncBoundary';
import BasicLayout from '@src/layout/BasicLayout';
import Head from 'next/head';
import { ReactElement } from 'react';

export default function MyAvatarPage() {
  return (
    <>
      <Head>
        <title key="title">My Avatar | Miko</title>
      </Head>
      <Text>아바타 커스텀 페이지</Text>
    </>
  );
}

MyAvatarPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <BasicLayout>
      <AsyncBoundary>{page}</AsyncBoundary>
    </BasicLayout>
  );
};
