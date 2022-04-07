import { Box, Button, Center, Collapse, Flex, Grid, GridItem, Heading, HStack, Image, Tab, TabList, TabPanel, TabPanels, Tabs, Text, useColorModeValue } from '@chakra-ui/react';
import TicketBox from '@src/components/concert/TicketBox';
import { S3_URL } from '@src/const';
import convertDate from '@src/helper/convertDate';
import { getDataFromLaravel } from '@src/helper/getDataFromLaravel';
import BasicLayout from '@src/layout/BasicLayout';
import { Pagination } from '@src/types/share/common/common';
import { Concert } from '@src/types/share/Concert';
import { Ticket } from '@src/types/share/Ticket';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import React, { FC, ReactElement, useState } from 'react';

type Data = {
  concert?: Pagination<Concert>;
  tickets?: Pagination<Ticket>;
};

const TicketList: FC<{ data: Ticket[] }> = ({ data: tickets }) => {
  // console.log('Ticket List', tickets);
  const router = useRouter();
  const saleId = parseInt(router.query.sale as string);
  const today = new Date();

  return (
    <>
      {tickets.length === 0 && (
        <Center>
          <Text>티켓없음.</Text>
        </Center>
      )}
      {tickets?.map(ticket => (
        <Box key={ticket.id}>
          {saleId === 1
            ? new Date(ticket.saleEndDate) < today && (
                <Box _hover={{ bg: '#FFF5F5' }}>
                  <TicketBox data={ticket} />
                </Box>
              )
            : new Date(ticket.saleEndDate) > today && (
                <Box _hover={{ bg: '#EBF8FF' }}>
                  <TicketBox data={ticket} />
                </Box>
              )}
        </Box>
      ))}
    </>
  );
};

const LiveInformation: FC<{ data: Concert }> = ({ data: concert }) => {
  // console.log(concert.detail.length);
  const [show, setShow] = React.useState(false);
  const handleToggle = () => setShow(!show);

  const startDate = convertDate(concert.allConcertStartDate, 'YMDHM');
  const endDate = convertDate(concert.allConcertEndDate, 'YMDHM');

  return (
    <Box>
      <Flex>
        <Image borderRadius="2%" boxSize="350px" src={S3_URL + concert.coverImage} fallbackSrc="" alt="Concert Image" />
        <Box alignItems="top" pl={12} flex="1">
          <HStack mb={5} spacing={3}>
            <Heading fontWeight="700">{concert.title}</Heading>
            <Text pt={3}>{concert.artist}</Text>
          </HStack>
          <Grid templateRows="repeat(2, 1fr)" templateColumns="repeat(5, 1fr)" gap={4}>
            <GridItem rowSpan={2} colSpan={1}>
              <Text fontWeight="500">公演期間</Text>
              <Text fontWeight="500">公演内容</Text>
            </GridItem>
            <GridItem rowSpan={2} colSpan={4}>
              <Text fontWeight="440">
                {startDate} ~ {endDate}
              </Text>
              <div>
                <Collapse startingHeight={20} in={show}>
                  <Text fontWeight="440">{concert.content}</Text>
                </Collapse>
                {concert.content.length > 50 && (
                  <Button size="sm" onClick={handleToggle} mt={2} fontSize="16px" borderRadius="2px">
                    詳細情報を{show ? '閉じる' : '見る'}
                  </Button>
                )}
              </div>
            </GridItem>
          </Grid>
        </Box>
      </Flex>
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps<Data> = async context => {
  const concertId = context.query.id as string;
  const CONCERT_URL_CONCERTS = `/concerts/${concertId}`;
  const TICKET_URL_CONCERTS = `/tickets`;

  const concertData = await getDataFromLaravel<Pagination<Concert>>(CONCERT_URL_CONCERTS);
  const ticketsData = await getDataFromLaravel<Pagination<Ticket>>(TICKET_URL_CONCERTS, {
    filter: [['concert_id', concertId]],
  });

  return {
    props: {
      concert: concertData?.data ?? null,
      tickets: ticketsData?.data ?? null,
    },
  };
};

export default function LiveDetailPage({ concert, tickets }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const concertId = router.query.id as string;
  const saleId = parseInt(router.query.sale as string);

  const handleDenyAccess = () => {
    setTimeout(() => {
      router.push('/concerts');
    }, 1000);
  };

  if (!concert) handleDenyAccess();
  if (!concert)
    return (
      <Center height="auto" width="full">
        <Text fontSize="7xl">비정상 접근</Text>
      </Center>
    );

  const onClickSale = clickId => {
    router.push(`/concerts/${concertId}?sale=${clickId}`);
  };
  const colors = useColorModeValue(['blue', 'red'], []);
  const [tabIndex, setTabIndex] = useState(saleId);
  const colorScheme = colors[tabIndex];
  // console.log(bg);

  return (
    <Flex justifyContent="center">
      <Box w="1000px">
        <LiveInformation data={concert.data} />
        <Tabs mt={7} defaultIndex={saleId || 0} onChange={index => setTabIndex(index)} colorScheme={colorScheme}>
          <TabList>
            <Tab color="gray" onClick={() => onClickSale(0)}>
              販売中
            </Tab>
            <Tab color="gray" onClick={() => onClickSale(1)}>
              販売終了
            </Tab>
            <Tab color="gray" onClick={() => router.push(`/concerts/${concertId}/products`)}>
              グッズリスト
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <TicketList data={tickets.data} />
            </TabPanel>
            <TabPanel>
              <TicketList data={tickets.data} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Flex>
  );
}

LiveDetailPage.getLayout = function getLayout(page: ReactElement) {
  return <BasicLayout>{page}</BasicLayout>;
};
