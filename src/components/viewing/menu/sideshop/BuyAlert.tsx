import { Alert, AlertIcon } from '@chakra-ui/react';

export default function BuyAlert() {
  return (
    <Alert status="success">
      <AlertIcon />
      商品購買が完了しました。
    </Alert>
  );
}
