import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Flex, Box, Image, useDisclosure, Button } from '@chakra-ui/react';
import KakaoShareButton from './KakaoShareButton';

const SNSModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box>
      <Button h={'220%'} borderColor={'black'} fontSize={'2xl'} color="white" as={'samp'} onClick={onOpen} bg={'teal.200'} cursor={'pointer'}>
        SNSに共有する
      </Button>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay></ModalOverlay>
        <ModalContent>
          <ModalHeader borderBottom={'solid'} borderColor={'gray.500'}>
            SNSに共有する
          </ModalHeader>
          <ModalCloseButton></ModalCloseButton>
          <ModalBody mt={'10%'} mb={'10%'}>
            <Flex justifyContent={'space-around'}>
              <KakaoShareButton></KakaoShareButton>
              <Box cursor={'pointer'} w={'10%'} h={'50%'}>
                <Image boxSize={'full'} src="/image/snsLogo/icons8-instagram.svg"></Image>
              </Box>
              <Box cursor={'pointer'} w={'10%'} h={'50%'}>
                <Image boxSize={'full'} src="/image/snsLogo/icons8-twitter.svg"></Image>
              </Box>
              <Box cursor={'pointer'} w={'10%'} h={'50%'}>
                <Image boxSize={'full'} src="/image/snsLogo/icons8-line.svg"></Image>
              </Box>
              <Box cursor={'pointer'} w={'10%'} h={'50%'}>
                <Image boxSize={'full'} src="/image/snsLogo/icons8-facebook.svg"></Image>
              </Box>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};
export default SNSModal;
