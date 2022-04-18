import { Box, Center, Stack, StackDivider, Tab, TabList, TabPanel, TabPanels, Tabs, Text, useColorModeValue } from '@chakra-ui/react';
import TicketBox from '@src/components/concert/TicketBox';
import { Product, Ticket } from '@src/types/share';
import React, { FC, useMemo, useState } from 'react';
import ProductsTab from '../product/ProductsTab';

type Data = {
  tickets: Ticket[];
  products: Product[];
};

const ConcertTab: FC<Data> = ({ tickets, products }) => {
  const colors = useColorModeValue(['blue', 'red', 'purple'], []);
  const [tabIndex, setTabIndex] = useState(0);
  const colorScheme = colors[tabIndex];

  const [sellingTickets, sellEndTickets] = useMemo(() => {
    const aSellingTickets = [] as Ticket[];
    const aSellEndTickets = [] as Ticket[];

    const today = new Date();

    tickets.forEach(ticket => {
      if (new Date(ticket.saleEndDate) <= today) {
        aSellEndTickets.push(ticket);
      } else {
        aSellingTickets.push(ticket);
      }
    });

    return [aSellingTickets, aSellEndTickets];
  }, [tickets]);

  // console.log(tickets);
  return (
    <>
      <Tabs mt={7} defaultIndex={0} onChange={index => setTabIndex(index)} colorScheme={colorScheme}>
        <TabList>
          <Tab color="gray">販売中</Tab>
          <Tab color="gray">販売終了</Tab>
          <Tab color="gray">グッズ</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Stack divider={<StackDivider borderColor={useColorModeValue('gray.100', 'gray.700')} />}>
              {sellingTickets.length ? (
                sellingTickets.map(ticket => (
                  <Box key={ticket.id} _hover={{ bg: '#EBF8FF' }}>
                    <TicketBox data={ticket} />
                  </Box>
                ))
              ) : (
                <Center my={10}>
                  <Text color="gray.300" fontSize="3xl" cursor="default">
                    販売中のチケットがありません。
                  </Text>
                </Center>
              )}
            </Stack>
          </TabPanel>
          <TabPanel>
            <Stack divider={<StackDivider borderColor={useColorModeValue('gray.100', 'gray.700')} />}>
              {sellEndTickets.length ? (
                sellEndTickets.map(ticket => (
                  <Box key={ticket.id} _hover={{ bg: '#FFF5F5' }}>
                    <TicketBox data={ticket} />
                  </Box>
                ))
              ) : (
                <Center my={10}>
                  <Text color="gray.300" fontSize="3xl" cursor="default">
                    販売終了のチケットがありません。
                  </Text>
                </Center>
              )}
            </Stack>
          </TabPanel>
          <TabPanel>
            <ProductsTab products={products} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default ConcertTab;
