import { SearchIcon } from '@chakra-ui/icons';
import { Box, Button, Center, Flex, HStack, Icon, Input, InputGroup, InputLeftElement, InputRightElement, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import { FiFilter } from '@react-icons/all-files/fi/FiFilter';
import PaginationBtn from '@src/components/common/button/PaginationBtn';
import Category from '@src/components/concert/Category';
import ConcertList from '@src/components/home/ConcertList';
import { getDataFromLaravel } from '@src/helper';
import BasicLayout from '@src/layout/BasicLayout';
import { Concert } from '@src/types/share';
import { Pagination } from '@src/types/share/common';
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
      <InputGroup size="md" maxW={{ xl: '120vh' }}>
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
  const page = context.query.page as string;
  const search = context.query.search as string;

  const result = await getDataFromLaravel<Pagination<Concert>>(URL_CONCERTS, {
    filter: categoryId ? [['category_id', categoryId]] : null,
    page: parseInt(page, 10),
    per_page: 9,
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
  const [show, setShow] = useState(false);

  const handleDenyAccess = () => {
    setTimeout(() => {
      router.push('/');
    }, 1000);
  };
  if (!data) handleDenyAccess();
  if (!data) {
    return (
      <Center height="auto" width="full">
        <Text fontSize="7xl">비정상 접근</Text>
      </Center>
    );
  }

  const showCate = () => {
    setShow(!show);
  };

  return (
    <Flex justifyContent="center">
      <Box>
        <SearchBox />
        <Flex justifyContent="start" mt={3} mb={8}>
          <Icon boxSize={5} m={3} onClick={showCate} cursor="pointer" as={FiFilter} />
          {show && <Category />}
        </Flex>
        {data ? (
          <VStack spacing={5}>
            <Box minW={{ xl: '120vh' }}>
              <SimpleGrid columns={[2, null, 3]} spacing="40px">
                <ConcertList data={data.data} />
              </SimpleGrid>
            </Box>
            <PaginationBtn data={data.meta} url={`/concerts?category_id=${categoryId}`} />
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
