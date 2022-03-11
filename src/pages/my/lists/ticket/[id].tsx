import { Box, Flex, Heading, Image, VStack } from "@chakra-ui/react";
import Footer from "@src/components/home/Footer";
import MenuBar from "@src/components/home/MenuBar";

const Ticket = params => {
  return (
    <Box>
      <MenuBar />
      <Box mb={30} pb={20}>
        <Flex pt={50} width="full" justifyContent="center">
          <VStack>
            <Heading fontWeight="700" size="2xl" my="20px">
              My Ticket
            </Heading>
            <Image src="https://img.freepik.com/free-vector/live-concert-ticket_53876-67419.jpg?t=st=1645698155~exp=1645698755~hmac=8c3d2d646fe408eb338ea762f19843dd371f4b588cff2fa7f8ed70a9e63de65b&w=1800" />
          </VStack>
        </Flex>
      </Box>
      <Footer />
    </Box>
  );
};

export default Ticket;
