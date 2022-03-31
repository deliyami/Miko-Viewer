import { Button, Flex } from '@chakra-ui/react';
import { NEXT_URL } from '@src/const';
import { useRouter } from 'next/router';

const Buttons = ({ page }) => {
  const router = useRouter();
  return (
    <Flex justifyContent={'space-between'} h="100px" mt={'10%'}>
      <Button w="23%" fontSize={'2xl'} onClick={() => router.back()}>
        ← 戻る
      </Button>
      <Button onClick={() => window.open(`${NEXT_URL}//concerts/${router.query.id}/products/${page}`, '_self')} fontSize={'2xl'} w="23%">
        次へ →
      </Button>
    </Flex>
  );
};
export default Buttons;
