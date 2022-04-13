import { Box, Button, Heading, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react';
import { useUser } from '@src/state/swr';
import { Ticket } from '@src/types/share';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import TicketPayment from './TicketPaymeny';

const ShowModal: FC<{ data: Ticket }> = ({ data: ticket }) => {
  return (
    <>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Heading as="h3" size="md"></Heading>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody my={6}>
          <TicketPayment data={ticket} />
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </>
  );
};

const TicketModal: FC<{ data: Ticket }> = ({ data: ticket }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
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
      <Modal size="4xl" isOpen={isOpen} onClose={onClose} isCentered>
        <ShowModal data={ticket} />
      </Modal>
    </Box>
  );
};

export default TicketModal;
