import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Input,
  VStack,
} from '@chakra-ui/react';
import Category from '@src/components/Category';
import ConcertList from '@src/components/home/ConcertList';
import Footer from '@src/components/home/Footer';
import MenuBar from '@src/components/home/MenuBar';
import { axiosI } from '@src/state/fetcher';
import { createFSWQueryString } from '@src/state/swr/createQueryStringKey';
import { Pagination } from '@src/types/share/common/common';
import { Concert } from '@src/types/share/Concert';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';

const ConcertPage: FC<{ data: Pagination<Concert>; category_id: number }> = ({
  data,
  category_id,
}) => {
  const links = data.meta.links;

  const router = useRouter();

  const onClickPage = async (url) => {
    const page = url.split('=');
    if (category_id) {
      router.push(`/concerts?category_id=${category_id}&page=${page[1]}`);
    } else {
      router.push(`/concerts?page=${page[1]}`);
    }
  };

  const [searchWord, setSearchWord] = useState('');

  const onChangeSearch = (e) => {
    setSearchWord(e.target.value);
  };
  const onClickSearch = () => {
    // console.log(searchWord);
    // http://localhost:8080/api/concerts?search=f*
    router.push(`/concerts?search=${searchWord}`);
    setSearchWord('');
  };
  const enterKey = (e) => {
    if (window.event.keyCode == 13) {
      onClickSearch();
    }
  };

  return (
    <Box>
      <MenuBar />
      <Box mb={30} pb={20}>
        <Flex pt={50} width="full" justifyContent="center">
          <VStack>
            <Heading fontWeight="700" size="2xl" my="20px">
              Concert List
            </Heading>
            <HStack>
              <Input
                width="auto"
                placeholder="Basic usage"
                name="sWord"
                value={searchWord}
                required
                onChange={onChangeSearch}
                onKeyUp={enterKey}
              />
              <Button id="btn" name="btn" type="submit" onClick={onClickSearch}>
                Search
              </Button>
            </HStack>
            <Category />
            <ConcertList data={data.data} />
            <HStack>
              {links.length > 3 &&
                links?.map((link, key) => (
                  <>
                    {link.url === null ? (
                      <Button disabled key={key}>
                        {link.label}
                      </Button>
                    ) : (
                      <Button onClick={() => onClickPage(link.url)}>
                        {link.label}
                      </Button>
                    )}
                  </>
                ))}
            </HStack>
          </VStack>
        </Flex>
      </Box>
      <Footer />
    </Box>
  );
};

export async function getServerSideProps(context) {
  const URL_CONCERTS = '/concerts';
  const category_id = context.query.category_id;
  const page = context.query.page;
  const search = context.query.search;

  let url =
    URL_CONCERTS +
    '?' +
    createFSWQueryString({
      filter: [['category_id', category_id]],
      page: page,
      per_page: 3,
    });

  const { data } = await axiosI.get<Pagination<Concert>>(url);

  return {
    props: {
      data: data,
      category_id,
    },
  };
}

export default ConcertPage;
