import { Button, Flex, Heading, HStack, Input, VStack } from '@chakra-ui/react';
import PaginationBtn from '@src/components/common/button/PaginationBtn';
import Category from '@src/components/concert/Category';
import ConcertList from '@src/components/home/ConcertList';
import BasicLayout from '@src/layout/BasicLayout';
import { axiosI } from '@src/state/fetcher';
import { createFSWQueryString } from '@src/state/swr/createQueryStringKey';
import { Pagination } from '@src/types/share/common/common';
import { Concert } from '@src/types/share/Concert';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import { KeyboardEventHandler, ReactElement, useState } from 'react';

type Data = {
  data: Pagination<Concert>;
  categoryId: number;
};

const SearchBox = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const onChangeSearch = (e) => {
    setSearchQuery(e.target.value);
  };
  const onClickSearch = () => {
    setSearchQuery('');
    router.push(
      `/concerts?category_id=${router.query.category_id}&search=${searchQuery}`
    );
  };

  const enterKey: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') {
      onClickSearch();
    }
  };
  return (
    <HStack>
      <Input
        width="auto"
        placeholder="Basic usage"
        name="sWord"
        value={searchQuery}
        required
        onChange={onChangeSearch}
        onKeyUp={enterKey}
      />
      <Button id="btn" name="btn" type="submit" onClick={onClickSearch}>
        Search
      </Button>
    </HStack>
  );
};

export const getServerSideProps: GetServerSideProps<Data> = async (context) => {
  const URL_CONCERTS = '/concerts';
  let categoryId = parseInt((context.query.category_id as string) ?? '1');

  const page = context.query.page as string;
  const search = context.query.search as string;

  let url =
    URL_CONCERTS +
    '?' +
    createFSWQueryString({
      filter: [['category_id', categoryId]],
      page: parseInt(page),
      per_page: 6,
      search,
    });
  const { data } = await axiosI.get<Pagination<Concert>>(url);
  console.log(url, data.data.length);

  return {
    props: {
      data: data,
      categoryId,
    },
  };
};

export default function ConcertPage({
  data,
  categoryId,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <Flex pt={50} width="full" justifyContent="center">
      <VStack>
        <Heading fontWeight="700" size="2xl" my="20px">
          Concert List
        </Heading>
        <SearchBox />
        <Category />
        <ConcertList data={data.data} />
        <PaginationBtn
          data={data.meta}
          url={`/concerts?category_id=${categoryId}`}
        />
      </VStack>
    </Flex>
  );
}

ConcertPage.getLayout = function getLayout(page: ReactElement) {
  return <BasicLayout>{page}</BasicLayout>;
};
