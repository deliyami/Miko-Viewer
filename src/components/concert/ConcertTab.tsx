import { Box, Center, Stack, StackDivider, Tab, TabList, TabPanel, TabPanels, Tabs, useColorModeValue } from '@chakra-ui/react';
import TicketBox from '@src/components/concert/TicketBox';
import { Ticket } from '@src/types/share';
import React, { FC, useMemo, useState } from 'react';

const ConcertTab: FC<{ data: Ticket[] }> = ({ data: tickets }) => {
  const colors = useColorModeValue(['blue', 'red'], []);
  const [tabIndex, setTabIndex] = useState(0);
  const colorScheme = colors[tabIndex];

  const [sellingTickets, sellEndTickets] = useMemo(() => {
    const aSellingTickets = [];
    const aSellEndTickets = [];

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
                <Center my={10}>販売中のチケットがありません。</Center>
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
                <Center my={10}>販売終了のチケットがありません。</Center>
              )}
            </Stack>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default ConcertTab;
