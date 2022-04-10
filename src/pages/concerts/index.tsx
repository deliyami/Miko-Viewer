import { SearchIcon } from '@chakra-ui/icons';
import { Box, Button, Center, Flex, HStack, Icon, Input, InputGroup, InputLeftElement, InputRightElement, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import { FiFilter } from '@react-icons/all-files/fi/FiFilter';
import PaginationBtn from '@src/components/common/button/PaginationBtn';
import CategoryFilter from '@src/components/concert/CategoryFilter';
import ConcertList from '@src/components/home/ConcertList';
import { getDataFromLaravel } from '@src/helper';
import BasicLayout from '@src/layout/BasicLayout';
import { usePageLaravel } from '@src/state/swr/useLaravel';
import { Concert } from '@src/types/share';
import { CommonFSW, Pagination } from '@src/types/share/common';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import { KeyboardEventHandler, ReactElement, useEffect, useState } from 'react';

const PER_PAGE = 12;

type Data = {
  iniData?: Pagination<Concert>;
  initialParam: {
    categoryId?: number;
    page?: number;
    search?: string;
  };
};

const SearchBox = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const onChangeSearch = e => {
    setSearchQuery(e.target.value);
  };
  const onClickSearch = () => {
    setSearchQuery('');
    router.query.search = searchQuery;
    router.push(router, undefined, { shallow: true });
  };

  const enterKey: KeyboardEventHandler<HTMLInputElement> = e => {
    if (e.key === 'Enter') {
      onClickSearch();
    }
  };
  return (
    <HStack>
      <InputGroup size="md" maxW={{ xl: '115vh' }}>
        <InputLeftElement>
          <SearchIcon pointerEvents="none" color="gray.300" />
        </InputLeftElement>
        <Input w="full" pr="4.5rem" type="text" placeholder="Enter title" value={searchQuery} onKeyUp={enterKey} required onChange={onChangeSearch} />
        <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="sm" onClick={onClickSearch} type="submit" mr={2}>
            Search
          </Button>
        </InputRightElement>
      </InputGroup>
    </HStack>
  );
};

export const getServerSideProps: GetServerSideProps<Data> = async context => {
  const URL_CONCERTS = '/concerts';

  const categoryId = parseInt(context.query.category_id as string, 10);
  const page = parseInt(context.query.page as string, 10);
  const search = context.query.search as string;

  const result = await getDataFromLaravel<Pagination<Concert>>(URL_CONCERTS, {
    filter: categoryId ? [['category_id', categoryId]] : null,
    perPage: PER_PAGE,
    page,
    search,
  });

  return {
    props: {
      iniData: result?.data ?? null,
      initialParam: {
        ...(categoryId ? { categoryId } : {}),
        ...(page ? { page } : {}),
        ...(search ? { search } : {}),
      },
    },
  };
};

export default function ConcertPage({ iniData, initialParam }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const [isShowCategoryFilter, setIsShowCategoryFilter] = useState(false);
  const [categoryId, setCategoryId] = useState(initialParam.categoryId);
  const [page, setPage] = useState(initialParam.page);
  const [search, setSearch] = useState(initialParam.search);
  const query: CommonFSW = { page, perPage: PER_PAGE, filter: [['category_id', categoryId]], search: search ? '*' + search + '*' : null };
  const { data: concertsData } = usePageLaravel('/concerts', query, { fallbackData: iniData });

  useEffect(() => {
    const param = parseInt(router.query.page as string, 10);
    if (Number.isNaN(param)) return setPage(null);
    setPage(param);
  }, [router.query.page]);

  useEffect(() => {
    const param = parseInt(router.query.category_id as string, 10);
    if (Number.isNaN(param)) return setCategoryId(null);
    setCategoryId(param);
  }, [router.query.category_id]);

  useEffect(() => {
    const param = router.query.search as string;
    if (!param) return setSearch(null);
    setSearch(param);
  }, [router.query.search]);

  const handleShowCategoryFilter = () => {
    setIsShowCategoryFilter(!isShowCategoryFilter);
  };

  if (!concertsData) {
    return (
      <Center height="auto" width="full">
        <Text fontSize="7xl">No Data</Text>
      </Center>
    );
  }

  return (
    <Flex justifyContent="center">
      <Box>
        <Box id="scroll-into" />
        <SearchBox />
        <Flex pt={3} pb={8}>
          <Icon boxSize={5} m={3} onClick={handleShowCategoryFilter} cursor="pointer" as={FiFilter} />
          <Box visibility={isShowCategoryFilter ? 'visible' : 'hidden'}>
            <CategoryFilter />
          </Box>
        </Flex>
        {concertsData ? (
          <VStack spacing={10}>
            <Box minW={{ xl: '115vh' }}>
              <SimpleGrid columns={[2, null, 3]} spacing="40px">
                <ConcertList data={concertsData.data} />
              </SimpleGrid>
            </Box>
            <PaginationBtn data={concertsData.meta} options={{ shallow: true }} />
          </VStack>
        ) : (
          'no data'
        )}
      </Box>
    </Flex>
  );
}

ConcertPage.getLayout = function getLayout(page: ReactElement) {
  return <BasicLayout>{page}</BasicLayout>;
};
