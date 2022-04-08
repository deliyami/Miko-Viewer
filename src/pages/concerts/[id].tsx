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
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import TicketBox from '@src/components/concert/TicketBox';
import { S3_URL } from '@src/const';
import { convertDate, getDataFromLaravel } from '@src/helper';
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

const TicketTab: FC<{ data: Ticket[] }> = ({ data: tickets }) => {
  const today = new Date();
  const [tabNum, setTabNum] = useState(0);

  const onClickSale = clickId => {
    setTabNum(clickId);
  };

  const colors = useColorModeValue(['blue', 'red'], []);
  const [tabIndex, setTabIndex] = useState(tabNum);
  const colorScheme = colors[tabIndex];

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
            {tickets?.map(ticket => (
              <Box key={ticket.id}>
                {new Date(ticket.saleEndDate) > today && (
                  <Box _hover={{ bg: '#EBF8FF' }}>
                    <TicketBox data={ticket} />
                  </Box>
                )}
              </Box>
            ))}
          </TabPanel>
          <TabPanel>
            {tickets?.map(ticket => (
              <Box key={ticket.id}>
                {new Date(ticket.saleEndDate) < today && (
                  <Box _hover={{ bg: '#EBF8FF' }}>
                    <TicketBox data={ticket} />
                  </Box>
                )}
              </Box>
            ))}
          </TabPanel>
        </TabPanels>
      </Tabs>
      {tickets.length === 0 && (
        <Center>
          <Text>티켓없음.</Text>
        </Center>
      )}
    </>
  );
};

const LiveInformation: FC<{ data: Concert }> = ({ data: concert }) => {
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
      {/* <AspectRatio ratio={1}>
        <Image src={S3_URL + concert.coverImage} objectFit="cover" alt="concertImage" />
      </AspectRatio> */}

      <Image borderRadius="2%" boxSize="sm" objectFit="cover" src={S3_URL + concert.coverImage} alt="Concert Image" />

      <Box px={4}>
        <Flex mb={3} direction={{ base: 'column', md: 'row' }} minW={{ base: '50vh', md: '70vh' }}>
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
                <Button size="sm" onClick={handleToggle} mt={2} fontSize="16px" borderRadius="2px">
                  詳細情報を{show ? '閉じる' : '見る'}
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
  const CONCERT_URL_CONCERTS = `/concerts/${concertId}`;
  const TICKET_URL_CONCERTS = `/tickets`;

  const concertData = await getDataFromLaravel<Pagination<Concert>>(CONCERT_URL_CONCERTS);
  const ticketsData = await getDataFromLaravel<Pagination<Ticket>>(TICKET_URL_CONCERTS, {
    with: ['concert'],
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
    <Flex justifyContent="center">
      <Box>
        <LiveInformation data={concert.data} />
        <TicketTab data={tickets.data} />
      </Box>
    </Flex>
  );
}

LiveDetailPage.getLayout = function getLayout(page: ReactElement) {
  return <BasicLayout>{page}</BasicLayout>;
};
