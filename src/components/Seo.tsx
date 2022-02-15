import Head from 'next/head';
import { FC } from 'react';

const Seo: FC<{ title: string }> = ({ title }) => {
  return (
    <Head>
      <title>{title}</title>
    </Head>
  );
};

export default Seo;
