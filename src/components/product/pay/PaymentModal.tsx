import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button } from '@chakra-ui/react';
import { LARAVEL_URL } from '@src/const';
import axios from 'axios';
import { useRef } from 'react';

const PaymentModal = ({ isOpen, onClose, quantity, address, total_price, user_id, product_id }) => {
  const cancelRef = useRef();
  function goPayment() {
    axios
      .post(`${LARAVEL_URL}/orders`, {
        user_id,
        quantity,
        address,
        state: false,
        total_price,
        product_id,
      })
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }
  return (
    <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            レージ
          </AlertDialogHeader>

          <AlertDialogBody>コイン{total_price}を使ってご注文しますか？</AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              いいえ
            </Button>
            <Button
              colorScheme="blue"
              onClick={() => {
                onClose();
                goPayment();
              }}
              ml={3}
            >
              はい
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};
export default PaymentModal;
