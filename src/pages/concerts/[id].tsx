import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Center,
  Collapse,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Stack,
  StackDivider,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import TicketBox from '@src/components/concert/TicketBox';
import { IMAGE_DOMAIN } from '@src/const';
import { convertDate, getDataFromLaravel } from '@src/helper';
import BasicLayout from '@src/layout/BasicLayout';
import { Concert, Ticket } from '@src/types/share';
import { Pagination } from '@src/types/share/common';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import React, { FC, ReactElement, useMemo, useState } from 'react';

type Data = {
  concert?: Pagination<Concert>;
  tickets?: Pagination<Ticket>;
};

const TicketTab: FC<{ data: Ticket[] }> = ({ data: tickets }) => {
  const [tabNum, setTabNum] = useState(0);

  const onClickSale = clickId => {
    setTabNum(clickId);
  };

  const colors = useColorModeValue(['blue', 'red'], []);
  const [tabIndex, setTabIndex] = useState(tabNum);
  const colorScheme = colors[tabIndex];

  const [sellingTickets, sellEndTickets] = useMemo(() => {
    const aSellingTickets = [];
    const aSellEndTickets = [];

    const today = new Date();

    tickets.forEach(ticket => {
      if (new Date(ticket.saleEndDate) <= today) {
        aSellingTickets.push(ticket);
      } else {
        aSellEndTickets.push(ticket);
      }
    });

    return [aSellingTickets, aSellEndTickets];
  }, [tickets]);

  return (
    <>
      <Tabs mt={7} defaultIndex={tabNum || 0} onChange={index => setTabIndex(index)} colorScheme={colorScheme}>
        <TabList>
          <Tab color="gray" onClick={() => onClickSale(0)}>
            販売中
          </Tab>
          <Tab color="gray" onClick={() => onClickSale(1)}>
            販売終了
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Stack divider={<StackDivider borderColor={useColorModeValue('gray.100', 'gray.700')} />}>
              {sellingTickets.length ? (
                sellingTickets.map(ticket => (
                  <Box key={ticket.id}>
                    <Box _hover={{ bg: '#EBF8FF' }}>
                      <TicketBox data={ticket} />
                    </Box>
                  </Box>
                ))
              ) : (
                <Box>NoData</Box>
              )}
            </Stack>
          </TabPanel>
          <TabPanel>
            <Stack divider={<StackDivider borderColor={useColorModeValue('gray.100', 'gray.700')} />}>
              {sellEndTickets.length ? (
                sellEndTickets.map(ticket => (
                  <Box key={ticket.id}>
                    <Box _hover={{ bg: '#EBF8FF' }}>
                      <TicketBox data={ticket} />
                    </Box>
                  </Box>
                ))
              ) : (
                <Box>NoData</Box>
              )}
            </Stack>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

const LiveInformation = ({ concert }) => {
  const [show, setShow] = React.useState(false);
  const handleToggle = () => setShow(!show);

  const startDate = convertDate(concert.allConcertStartDate, 'YMDHM');
  const endDate = convertDate(concert.allConcertEndDate, 'YMDHM');

  return (
    <Container
      className="concert"
      as={Stack}
      maxW={'6xl'}
      direction={{ base: 'column', md: 'row' }}
      spacing={4}
      justify={{ base: 'center', md: 'space-between' }}
      align={{ base: 'center', md: 'start' }}
    >
      <Image borderRadius="2%" boxSize="sm" src={IMAGE_DOMAIN + concert.coverImage} objectFit="cover" alt="concertImage" fallbackSrc="/defaultImage.png" />
      <Box px={4}>
        <Flex pb={3} direction={{ base: 'column', md: 'row' }} minW={{ md: '50vh' }}>
          <Heading fontWeight="700">{concert.title}</Heading>
          <Text pt={{ base: '0', md: '4' }} pl={{ base: '0', md: '5' }}>
            {concert.artist}
          </Text>
        </Flex>
        <Grid templateRows="repeat(2, 1fr)" templateColumns="repeat(5, 1fr)">
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
                <Button color="orange" size="sm" onClick={handleToggle} mt={2} borderRadius="4px">
                  {show ? '閉じる' : 'もっと見る'}
                  {show ? <ChevronUpIcon /> : <ChevronDownIcon />}
                </Button>
              )}
            </div>
          </GridItem>
        </Grid>
      </Box>
      <style>
        {`
          .concert img {
            border-radius: 12px;
            transition: transform 0.2s ease-in-out;
            box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
          }
       `}
      </style>
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
  // console.log(concert);
  return (
    <Flex justifyContent="center">
      <Box>
        <LiveInformation concert={concert.data} />
        <TicketTab data={tickets.data} />
      </Box>
    </Flex>
  );
}

LiveDetailPage.getLayout = function getLayout(page: ReactElement) {
  return <BasicLayout>{page}</BasicLayout>;
};
