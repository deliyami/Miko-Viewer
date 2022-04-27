import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Button,
  Flex,
  Link,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
} from '@chakra-ui/react';
import { NEXT_URL } from '@src/const';
import { useUser } from '@src/state/swr';
import { useSingleLaravel } from '@src/state/swr/useLaravel';
import { useRouter } from 'next/router';

const Paydone = () => {
  const router = useRouter();
  const { data: userData } = useUser();
  // const orders = useSingleLaravel('/orders', userData?.id, {});
  return (
    <Flex flexDir={'column'}>
      <Text fontSize={'3xl'} textAlign={'center'} my={'5%'}>
        ありがとうございます。ご注文手続きが完了しました。
      </Text>
      <TableContainer alignSelf={'center'} w={'70%'}>
        <Table mb={'15%'}>
          <TableCaption textAlign={'left'}>
            会員様は、会員メニュー内の
            <Link color="blue.500" href="#">
              「お買い物リスト」
            </Link>
            からもご確認いただけます。
            <br></br>
            <br></br>お申し込み内容メールの再送をご希望される場合には、 <br></br>
            あ問い合わせフォームより件名を「お申し込み内容確認メールの再送希望」としてご連絡をお願いいたします。
          </TableCaption>
          <Tbody>
            <Td>ご注文番号</Td>
            <Td textAlign={'center'}>
              {/* <Flex justifyContent={'end'}> */}
              <Accordion allowMultiple>
                <Flex justifyContent={'center'}>
                  <AccordionItem>
                    <AccordionButton color={'blue.500'}>
                      {/* {data.id} */}
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel>data</AccordionPanel>
                  </AccordionItem>
                </Flex>
              </Accordion>
              {/* </Flex> */}
            </Td>
          </Tbody>
          <Tbody>
            <Td>お支払い総額(コイン)</Td>
            <Td textAlign={'center'}>data</Td>
          </Tbody>
          <Tbody>
            <Td>今回のお買い物のポイント</Td>
            <Td textAlign={'center'}>data</Td>
          </Tbody>
          <Tbody>
            <Td>ご注文履歴</Td>
            <Td textAlign={'center'}>
              <Link color="blue.500" href="/my/order">
                ご注文履歴
              </Link>
            </Td>
          </Tbody>
        </Table>
      </TableContainer>
      <Button onClick={() => window.open(`${NEXT_URL}/concerts/${router.query.id}/products`, '_self')} alignSelf={'center'} w="30%">
        ショッピングを続く
      </Button>
    </Flex>
  );
};
export default Paydone;
