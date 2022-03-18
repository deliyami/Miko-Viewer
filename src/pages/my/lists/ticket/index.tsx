import { Box, Flex, Heading, VStack } from '@chakra-ui/react';
import { default as ConcertTicket } from '@src/components/ConcertTicket';
import Footer from '@src/components/home/Footer';
import MenuBar from '@src/components/home/MenuBar';

const Index = params => {
  return (
    <Box>
      <MenuBar />
      <Box mb={30} pb={20}>
        <Flex pt={50} width="full" justifyContent="center">
          <VStack>
            <Heading fontWeight="700" size="2xl" my="20px">
              My Ticket
            </Heading>
            <ConcertTicket />
          </VStack>
        </Flex>
      </Box>
      <Footer />
    </Box>
  );
};

export default Index;
