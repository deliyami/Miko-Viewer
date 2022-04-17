import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { Box, Button, Center, Collapse, Container, Flex, Grid, GridItem, Heading, Stack, Text } from '@chakra-ui/react';
import ConcertTab from '@src/components/concert/ConcertTab';
import { IMAGE_DOMAIN } from '@src/const';
import { convertDate, getDataFromLaravel } from '@src/helper';
import BasicLayout from '@src/layout/BasicLayout';
import { Concert, Ticket } from '@src/types/share';
import { Pagination } from '@src/types/share/common';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { FC, ReactElement } from 'react';

type Data = {
  concert?: Pagination<Concert>;
  tickets?: Pagination<Ticket>;
};

const LiveInformation: FC<{ data: Concert }> = ({ data: concert }) => {
  const router = useRouter();
  const [show, setShow] = React.useState(false);
  const handleToggle = () => setShow(!show);

  const startDate = convertDate(concert.allConcertStartDate, 'YMDHM');
  const endDate = convertDate(concert.allConcertEndDate, 'YMDHM');

  return (
    <Container
      as={Stack}
      maxW={'6xl'}
      direction={{ base: 'column', md: 'row' }}
      spacing={4}
      justify={{ base: 'center', md: 'space-between' }}
      align={{ base: 'center', md: 'start' }}
    >
      <Box position="relative" w={350} h={350} borderRadius="12px" boxShadow="rgba(0, 0, 0, 0.1) 0px 4px 12px">
        <Image
          src={IMAGE_DOMAIN + concert.coverImage}
          placeholder="blur"
          blurDataURL="/image/defaultImage.png"
          quality={70}
          layout="fill"
          objectFit="cover"
          alt={`${concert.title} image`}
          style={{ borderRadius: '12px' }}
        />
      </Box>
      <Box px={4}>
        <Flex pb={3} direction={{ base: 'column', md: 'row' }} minW={{ md: '50vh' }}>
          <Heading fontWeight="700">{concert.title}</Heading>
          <Text pt={{ base: '0', md: '4' }} pl={{ base: '0', md: '5' }}>
            {concert.artist}
          </Text>
          <Button colorScheme="purple" ml={3} onClick={() => router.push(`/concerts/${router.query.id}/products`)}>
            グッズ
          </Button>
        </Flex>
        <Grid templateRows="repeat(2, 1fr)" templateColumns="repeat(5, 1fr)">
          <GridItem rowSpan={2} colSpan={1}>
            <Text fontWeight="500">公演期間</Text>
            <Text fontWeight="500">公演内容</Text>
          </GridItem>
          <GridItem rowSpan={2} colSpan={4} maxW={{ md: '70vh' }}>
            <Text fontWeight="440">
              {startDate} ~ {endDate}
            </Text>
            <div>
              <Collapse startingHeight={20} in={show}>
                <Text fontWeight="440">{concert.content}</Text>
              </Collapse>
              {concert.content.length > 50 && (
                <Button color="orange" size="sm" onClick={handleToggle} mt={2} borderRadius="4px">
                  {show ? '閉じる' : 'もっと見る'}
                  {show ? <ChevronUpIcon /> : <ChevronDownIcon />}
                </Button>
              )}
            </div>
          </GridItem>
        </Grid>
      </Box>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps<Data> = async context => {
  const concertId = context.query.id as string;
  const CONCERT_URL_CONCERT = `/concerts/${concertId}`;
  const TICKET_URL_CONCERTS = `/tickets`;

  const concertData = await getDataFromLaravel<Pagination<Concert>>(CONCERT_URL_CONCERT);
  const ticketsData = await getDataFromLaravel<Pagination<Ticket>>(TICKET_URL_CONCERTS, {
    with: ['concert'],
    filter: [['concert_id', concertId]],
  });

  return {
    props: {
      concert: concertData?.data,
      tickets: ticketsData?.data,
    },
  };
};

export default function LiveDetailPage({ concert, tickets }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();

  const handleDenyAccess = () => {
    setTimeout(() => {
      router.push('/concerts');
    }, 1000);
  };

  if (!concert) handleDenyAccess();
  if (!concert) {
    return (
      <Center height="auto" width="full">
        <Text fontSize="7xl">비정상 접근</Text>
      </Center>
    );
  }
  console.log(concert);
  return (
    <>
      <Head>
        <title key="title">{concert.data.title} | Miko</title>
      </Head>
      <Flex direction="column" alignItems="center" p={3}>
        <Box>
          <LiveInformation data={concert.data} />
          <ConcertTab data={tickets.data} />
        </Box>
      </Flex>
    </>
  );
}

LiveDetailPage.getLayout = function getLayout(page: ReactElement) {
  return <BasicLayout>{page}</BasicLayout>;
};
