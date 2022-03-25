import { SearchIcon } from '@chakra-ui/icons';
import { Box, Center, Flex, Heading, HStack, IconButton, Input, Spacer, Text, VStack } from '@chakra-ui/react';
import PaginationBtn from '@src/components/common/button/PaginationBtn';
import Category from '@src/components/concert/Category';
import ConcertList from '@src/components/home/ConcertList';
import { getDataFromLaravel } from '@src/helper/getDataFromLaravel';
import BasicLayout from '@src/layout/BasicLayout';
import { Pagination } from '@src/types/share/common/common';
import { Concert } from '@src/types/share/Concert';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import { KeyboardEventHandler, ReactElement, useState } from 'react';

type Data = {
  data?: Pagination<Concert>;
  categoryId: number;
};

const SearchBox = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const onChangeSearch = e => {
    setSearchQuery(e.target.value);
  };
  const onClickSearch = () => {
    setSearchQuery('');
    router.push(`/concerts?search=${searchQuery}`);
  };

  const enterKey: KeyboardEventHandler<HTMLInputElement> = e => {
    if (e.key === 'Enter') {
      onClickSearch();
    }
  };
  return (
    <HStack>
      <Input w="400px" variant="flushed" value={searchQuery} required onChange={onChangeSearch} onKeyUp={enterKey} />
      <IconButton aria-label="Search database" icon={<SearchIcon />} type="submit" onClick={onClickSearch} />
    </HStack>
  );
};

export const getServerSideProps: GetServerSideProps<Data> = async context => {
  const URL_CONCERTS = '/concerts';
  const categoryId = parseInt(context.query.category_id as string);
  const page = context.query.page as string;
  const search = context.query.search as string;

  const result = await getDataFromLaravel<Pagination<Concert>>(URL_CONCERTS, {
    sort: ['-id'],
    filter: categoryId ? [['category_id', categoryId]] : null,
    page: parseInt(page),
    per_page: 6,
    search,
  });

  return {
    props: {
      data: result?.data ?? null,
      categoryId,
    },
  };
};

export default function ConcertPage({ data, categoryId }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const handleDenyAccess = () => {
    setTimeout(() => {
      router.push('/');
    }, 1000);
  };
  if (!data) handleDenyAccess();
  if (!data)
    return (
      <Center height="auto" width="full">
        <Text fontSize="7xl">비정상 접근</Text>
      </Center>
    );

  return (
    <Flex width="full" justifyContent="center">
      <Box w="1000px">
        <HStack>
          <Heading fontWeight="700" size="2xl" my="20px">
            Concert List
          </Heading>
          <Spacer />
          <SearchBox />
        </HStack>
        <VStack mt={4} spacing={16}>
          <Category />
          {data ? (
            <>
              <VStack spacing={10}>
                <ConcertList data={data.data} />
                <PaginationBtn data={data.meta} url={`/concerts?category_id=${categoryId}`} />
              </VStack>
            </>
          ) : (
            'no data'
          )}
        </VStack>
      </Box>
    </Flex>
  );
}
ConcertPage.getLayout = function getLayout(page: ReactElement) {
  return <BasicLayout>{page}</BasicLayout>;
};
