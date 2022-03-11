import { Box, Button, Flex, Heading, VStack } from "@chakra-ui/react";
import Carousel from "@src/components/home/Carousel";
import ConcertList from "@src/components/home/ConcertList";
import { getDataFromLaravel } from "@src/helper/getDataFromLaravel";
import BasicLayout from "@src/layout/BasicLayout";
import { Pagination } from "@src/types/share/common/common";
import { Concert } from "@src/types/share/Concert";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import Link from "next/link";
import { ReactElement } from "react";

const tab = [
  { id: "ranking", name: "RANKING" },
  { id: "new", name: "NEW" },
];

// TIP 무조건 서버에서 실행됨, Dev모드에서는 매번 실행
export const getStaticProps: GetStaticProps<{
  data: Concert[];
}> = async context => {
  const { data } = await getDataFromLaravel<Pagination<Concert>>("/concerts", {
    per_page: 3,
  });

  return {
    props: {
      data: data.data,
    },
    revalidate: 60 * 30, // 30분 마다 재생성
  };
};

export default function HomePage({ data }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Box>
      <Carousel />
      <Flex pt="50" width="full" justifyContent="center">
        <VStack align="start">
          {tab.map(({ name }) => (
            <Box mb={9} key={name}>
              <Heading size="xl" fontSize="50px" my={5}>
                {name}
              </Heading>
              <ConcertList data={data} />
              <Link href={`/concerts`}>
                <a>
                  <Button mt={5}>더보기</Button>
                </a>
              </Link>
            </Box>
          ))}
        </VStack>
      </Flex>
    </Box>
  );
}

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <BasicLayout>{page}</BasicLayout>;
};
