import { Center } from '@chakra-ui/react';
import { DonateOption } from '@src/components/viewing/chat/DonateOption';
import { useState } from 'react';

const Donate = () => {
  const [amount, setAmount] = useState<number>(0);
  const [itemId, setItemId] = useState<number>(-1);
  return (
    <Center>
      <DonateOption amount={amount} itemId={itemId} setAmount={setAmount} setItemId={setItemId}></DonateOption>
    </Center>
  );
};

export default Donate;
