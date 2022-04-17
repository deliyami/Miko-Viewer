import { CheckIcon, WarningTwoIcon } from '@chakra-ui/icons';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Heading,
  HStack,
  Icon,
  Spacer,
  Text,
  Tooltip,
  useDisclosure,
} from '@chakra-ui/react';
import { HiOutlineTicket } from '@react-icons/all-files/hi/HiOutlineTicket';
import { IMAGE_DOMAIN, LARAVEL_URL } from '@src/const';
import { convertDate } from '@src/helper';
import { axiosI } from '@src/state/fetcher';
import { useUser } from '@src/state/swr';
import { Ticket } from '@src/types/share';
import { AxiosError } from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { FC, useState } from 'react';

const TicketPaymentButton: FC<{ data: Ticket }> = ({ data: ticket }) => {
  const router = useRouter();
  const { data: userData } = useUser();
  const userCoin = userData.coin as number;
  const ticketPrice = ticket.price as number;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  const onClickPay = () => {
    if (ticketPrice <= userCoin) {
      axiosI
        .post(LARAVEL_URL + '/user_tickets', {
          ticket_id: ticket.id,
        })
        .then(response => {
          console.log(response);
          router.push('/my/lists/ticket');
        })
        .catch((e: AxiosError) => {
          console.error('error in TicketPayment', e.message);
        });
    } else {
      onOpen();
    }
  };

  const onClickCoinCharge = () => {
    router.push('/my/coin');
  };
  return (
    <>
      <Button
        leftIcon={<HiOutlineTicket />}
        rounded="3xl"
        mt={7}
        mb={3}
        color="green"
        onClick={onClickPay}
        _hover={{
          boxShadow: 'xl',
        }}
      >
        buy now
      </Button>
      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose} isCentered>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader>
              <HStack>
                <Icon color="red.600" as={WarningTwoIcon} />
                <Text fontSize="lg" fontWeight="bold" color="red.600">
                  コイン不足
                </Text>
              </HStack>
            </AlertDialogHeader>
            <AlertDialogBody>コインが足りません。 コインをチャージしますか?</AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} colorScheme="red" onClick={onClose}>
                いいえ
              </Button>
              <Button colorScheme="blue" onClick={onClickCoinCharge} ml={3}>
                はい
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

const TicketPay: FC<{ data: Ticket }> = ({ data: ticket }) => {
  const { data: userData } = useUser();
  const ticketPrice = ticket.price as number;
  const [showIcon, setShowIcon] = useState(false);
  const archiveEndTime = convertDate(ticket.archiveEndTime, 'YMDHM');

  return (
    <>
      <Text my={3}>Ticket Type</Text>
      <Box
        onClick={() => setShowIcon(!showIcon)}
        cursor="pointer"
        rounded="2xl"
        bg={showIcon ? 'tomato' : 'gray'}
        boxShadow={showIcon && 'xl'}
        transform={showIcon && 'scale(1.04)'}
        p={5}
        color="white"
        _hover={{
          bg: 'tomato',
          boxShadow: 'xl',
          transition: 'all .2s ease',
          // transform: 'scale(1.04)',
        }}
      >
        <Flex>
          <Box>
            <Text fontSize={'xl'} fontWeight="extrabold" textAlign={{ base: 'center', sm: 'left' }} lineHeight="shorter" letterSpacing="tight">
              Livestream Ticket
            </Text>
            <Text fontSize={{ base: 'md', md: 'lg' }} textAlign={{ base: 'center', sm: 'left' }}>
              ¥{ticketPrice}
            </Text>
          </Box>
          <Spacer />
          <Center pr={2}>{showIcon && <Icon as={CheckIcon} />}</Center>
        </Flex>
      </Box>
      <Text fontSize="sm" color="grey" pt={2}>
        *アーカイブ視聴期間は {archiveEndTime}まで
      </Text>
      {showIcon ? (
        <TicketPaymentButton data={ticket} />
      ) : (
        <Tooltip label="チケットをクリックしてください。" aria-label="A tooltip" hasArrow>
          <Button leftIcon={<HiOutlineTicket />} rounded="3xl" color="grey" mt={7}>
            buy now
          </Button>
        </Tooltip>
      )}
    </>
  );
};

const TicketPayment: FC<{ data: Ticket }> = ({ data: ticket }) => {
  const startDate = convertDate(ticket.concertStartDate, 'YMDHM'); // 티켓 시작날
  const EndDate = convertDate(ticket.concertEndDate, 'YMDHM');

  return (
    <Flex justifyContent="center">
      <Box mr={2} position="relative" w={350} h={350} borderRadius="12px" boxShadow="rgba(0, 0, 0, 0.1) 0px 4px 12px">
        <Image
          src={IMAGE_DOMAIN + ticket.concert.coverImage}
          placeholder="blur"
          blurDataURL="/image/defaultImage.png"
          quality={70}
          layout="fill"
          objectFit="cover"
          alt={`${ticket.concert.title} image`}
          style={{ borderRadius: '12px' }}
        />
      </Box>
      <Box p={2} ml={2}>
        <Heading as="h3" size="lg" mb={3}>
          {ticket.concert.title}
        </Heading>
        <Text mb={2}>
          {startDate} ~ {EndDate}
        </Text>
        <Divider />
        <TicketPay data={ticket} />
      </Box>
    </Flex>
  );
};

export default TicketPayment;
