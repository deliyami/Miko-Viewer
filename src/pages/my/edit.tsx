import AsyncBoundary from '@src/components/common/wrapper/AsyncBoundary';
import EditProfile from '@src/components/my/EditProfile';
import BasicLayout from '@src/layout/BasicLayout';
import Head from 'next/head';
import { ReactElement } from 'react';

export default function EditPage() {
  return (
    <>
      <Head>
        <title key="title">Edit Profile | Miko</title>
      </Head>
      <EditProfile />
    </>
  );
}

EditPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <BasicLayout>
      <AsyncBoundary>{page}</AsyncBoundary>
    </BasicLayout>
  );
};
