import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogOverlay,
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Square,
  Text,
  useDisclosure
} from '@chakra-ui/react';
import { convertDate } from '@src/helper/convertDate';
import { useUser } from '@src/state/swr/useUser';
import { Ticket } from '@src/types/share/Ticket';
import { useRouter } from 'next/router';
import React, { FC } from 'react';

const TicketInfo: FC<{ data: Ticket }> = ({ data: ticket }) => {
  const startDate = convertDate(ticket.concertStartDate, 'YMDHM'); // 티켓 시작날

  return (
    <Box>
      <HStack>
        <Square size="15px" borderRadius="2px" bg="purple.200" color="white" />
        <Heading as="h5" size="sm" color="purple.700">
          チケット情報
        </Heading>
      </HStack>
      <Box border="1px solid" borderColor="gray.200" w="330px" borderRadius={4} mt={3}>
        <Box margin={2} pl={2}>
          <Text fontSize="sm" color="#696969">
            公演の日付
          </Text>
          <Text fontSize="md">{startDate}</Text>
        </Box>
        <Divider />
        <Box margin={2} pl={2}>
          <Text fontSize="sm" color="#696969">
            価格
          </Text>
          <Text fontSize="md">{ticket.price}円</Text>
        </Box>
        <Divider />
        <Box margin={2} pl={2}>
          <Text fontSize="sm" color="#696969">
            枚数
          </Text>
          <Text fontSize="md">1 枚</Text>
        </Box>
      </Box>
    </Box>
  );
};

const TicketPay: FC<{ data: Ticket }> = ({ data: ticket }) => {
  const router = useRouter();
  const { data: userData } = useUser();
  const userCoin = userData.coin as number;
  const ticketPrice = ticket.price as number;

  const coinRecharge = () => {
    router.push('/my/coin');
  };
  return (
    <Box>
      <Heading as="h5" size="md" color="red.600">
        決済情報
      </Heading>
      <Grid templateRows="repeat(1, 1fr)" templateColumns="repeat(5, 1fr)" gap={8} mt={4}>
        <GridItem rowSpan={1} colSpan={2}>
          <Text fontSize="md" color="#696969">
            保有するコイン
          </Text>
          <Text fontSize="md" color="#696969">
            決済金額
          </Text>
        </GridItem>
        <GridItem rowSpan={1} colSpan={3}>
          <Text fontSize="md">{userCoin}C</Text>
          <Text fontSize="md">{ticketPrice}円</Text>
        </GridItem>
      </Grid>
      {ticketPrice < userCoin && (
        <Button size="sm" bg="green.400" onClick={coinRecharge}>
          コイン充填
        </Button>
      )}
    </Box>
  );
};

const AlertButton = () => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  const onClickOK = () => {
    onClose();
    router.push('/my/lists/ticket');
  };

  return (
    <>
      <Button colorScheme="blue" onClick={onOpen} mr={3}>
        購入
      </Button>

      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogBody>
              <Center my={5}>
                <Text fontSize="xl">お支払いなさいますか</Text>
              </Center>
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                いいえ
              </Button>
              <Button colorScheme="blue" onClick={onClickOK} ml={3}>
                はい
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

const TicketModal: FC<{ data: Ticket }> = ({ data: ticket }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  console.log(ticket);
  const { data: userData } = useUser();
  const router = useRouter();

  const onClickOK = () => {
    if (userData) {
      onOpen();
    } else {
      router.push('/login');
    }
  };

  return (
    <Box>
      <Button onClick={onClickOK} color="white" bg="#4299E1" width="65px" variant="solid" borderRadius={15} _hover={{ bg: '#2B6CB0' }}>
        購入
      </Button>
      <Modal size="3xl" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Heading as="h3" size="md">
              チケット購入
            </Heading>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Flex>
              <TicketInfo data={ticket} />
              <Spacer />
              <Divider h="250px" orientation="vertical" />
              <Spacer />
              <TicketPay data={ticket} />
            </Flex>
          </ModalBody>
          <ModalFooter>
            <AlertButton />
            <Button onClick={onClose}>中止</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default TicketModal;
