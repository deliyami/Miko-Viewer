import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, useDisclosure } from '@chakra-ui/react';
import { useRef } from 'react';

type Confirm = {
  totalPrice: number;
  onCart: Function;
};

export default function CartConfirmation({ totalPrice, onCart }: Confirm) {
  const cancelRef = useRef(null);
  const { isOpen, onClose } = useDisclosure();
  return (
    <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
      <AlertDialogOverlay>
        <AlertDialogContent w={'20%'} mt="7%">
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            ご注文の確認
          </AlertDialogHeader>

          <AlertDialogBody textAlign={'center'}>
            コイン<span style={{ color: '#E74A45' }}>「{totalPrice + 300}」</span>を使ってご注文しますか？
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button
              bg={'#1CE0D7'}
              _hover={{ bg: '#B0F5F1' }}
              color="white"
              onClick={() => {
                onClose();
                onCart();
              }}
            >
              注文
            </Button>
            <Button bg={'#F57F6E'} _hover={{ bg: '#F6B0A6' }} color="white" onClick={onClose} ml={3}>
              戻る
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}
