import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button } from '@chakra-ui/react';
import { LARAVEL_URL } from '@src/const';
import axios from 'axios';
import { useRef } from 'react';

type PaymentModalType = {
  isOpen: boolean;
  onClose: Function;
  quantity: number[];
  size: string[];
  color: string[];
  address: string;
  total_price: number;
  user_id: number;
  product_id: number[];
  setTabIndex: Function;
  setPayCheck: Function;
};

const PaymentModal = ({ isOpen, onClose, quantity, setPayCheck, address, total_price, size, color, user_id, product_id, setTabIndex }: PaymentModalType) => {
  const cancelRef = useRef(null);
  // console.log(quantity);
  function goPayment() {
    axios
      .post(`${LARAVEL_URL}/orders`, {
        user_id,
        quantity,
        address,
        state: false,
        total_price: total_price + 300,
        size,
        color,
        // product_id: JSON.stringify(product_id),
        product_id,
      })
      .then(() => {
        setTabIndex(3);
        setPayCheck(true);
      })
      .catch(err => console.log(err));
  }
  return (
    <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={() => onClose()}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            レージ
          </AlertDialogHeader>

          <AlertDialogBody>
            コイン<span style={{ color: '#E74A45' }}>「{total_price + 300}」</span>を使ってご注文しますか？
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={() => onClose()}>
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
