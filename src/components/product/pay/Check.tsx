import { CheckCircleIcon } from '@chakra-ui/icons';
import { Button, Divider, Flex, Image, List, ListIcon, ListItem, Table, TableContainer, Tbody, Td, Text, Tr, useDisclosure } from '@chakra-ui/react';
import { FaCoins } from '@react-icons/all-files/fa/FaCoins';
import CommonDivider from '@src/components/common/divider/CommonDivider';
import { IMAGE_DOMAIN } from '@src/const';
import { useUser } from '@src/state/swr/useUser';
import { Cart } from '@src/types/local';
import PaymentModal from './PaymentModal';

type CheckType = {
  address: string;
  carts: Cart;
  setTabIndex: Function;
  setPayCheck: Function;
};

const Check = ({ address, carts, setTabIndex, setPayCheck }: CheckType) => {
  // console.log(data);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: userData } = useUser();
  let totalCoast: number = 0;
  const productIds: Array<number> = [];
  const quantity: Array<number> = [];
  const size: Array<string> = [];
  const color: Array<string> = [];
  carts.map((item: Cart) => {
    totalCoast += item.products[0].price * item.quantity;
    size.push(item.size);
    color.push(item.color);
    quantity.push(item.quantity);
    // alert(JSON.stringify(item));
    if (!productIds.includes(item.product_id)) productIds.push(item.product_id);
    return 1;
  });
  // console.log(typeof productIds);

  return (
    <Flex w={'50%'} p={'2%'} ml={'25%'} justifyContent="center" flexDir={'column'}>
      <TableContainer w={'100%'} alignSelf={'center'}>
        <Table border={'1px'} borderColor="blackAlpha.200" variant={'unstyled'}>
          <Tbody>
            <Tr borderBottom={'1px'} borderColor="blackAlpha.200">
              <Td background={'blackAlpha.100'}>お届けの日時</Td>
              <Td>{}</Td>
            </Tr>
            <Tr borderBottom={'1px'} borderColor="blackAlpha.200">
              <Td background={'blackAlpha.100'}>お届け先</Td>
              <Td>
                お名前&nbsp;：&nbsp;{userData?.name} 様<br />
                <CommonDivider />
                ご住所&nbsp;：&nbsp;{address}
              </Td>
            </Tr>
            <Tr borderBottom={'1px'} borderColor="blackAlpha.200">
              <Td background={'blackAlpha.100'}>お支払い</Td>
              <Td>コイン</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
      <Text my="7%" fontSize={'2xl'}>
        商品情報({carts.length})
      </Text>
      <Flex rounded={'xl'} w="100%" h={'40%'} alignSelf="center" border="solid" p={'3%'} borderColor={'blackAlpha.200'} overflowX="scroll">
        {carts.map((item: Cart, key: number) => (
          <Flex key={key} justifyContent="space-around" mr={'10%'} w={'100%'} flexShrink={0}>
            <Image w={'25%'} src={`${IMAGE_DOMAIN}product_image/${item.products[0].image}`} alt="productImage"></Image>
            <Flex w={'65%'} flexDir={'column'}>
              <Text fontSize={'lg'}>{item.products[0].name}</Text>
              <Text mb={'4%'} fontWeight={'bold'}>
                お支払い明細（税入）
              </Text>

              <Flex justifyContent={'space-between'} color="gray" mb={'2%'}>
                <Text>size</Text>
                <Text>{item.size}</Text>
              </Flex>
              <Flex justifyContent={'space-between'} color="gray" mb={'2%'}>
                <Text>color</Text>
                <Text>{item.color}</Text>
              </Flex>
              <Flex justifyContent={'space-between'} color="gray" mb={'2%'}>
                <Text>
                  {item.products[0].price}
                  <span style={{ fontSize: 'small' }}>×</span>
                  {item.quantity}
                </Text>
                <Flex>
                  <Text>{item.products[0].price * item.quantity}</Text>
                  &nbsp;
                  <Text alignItems={'center'} h="60%" mt={'4px'} justifyContent="center">
                    <FaCoins color="#FFC300" />
                  </Text>
                </Flex>
              </Flex>
              <Divider mb={'2%'} height={'6%'} borderColor={'blackAlpha.300'}></Divider>
              <Flex alignItems={'center'} justifyContent="end">
                <Text mr={'2%'}>小計</Text>
                <Text fontSize={'lg'} color="#EB2721" fontWeight={'bold'}>
                  {item.products[0].price * item.quantity}
                </Text>
                &nbsp;
                <Text alignItems={'center'} h="60%" justifyContent="center">
                  <FaCoins color="#FFC300" />
                </Text>
              </Flex>
            </Flex>
          </Flex>
        ))}
      </Flex>
      <Text fontSize={'2xl'} my="7%">
        ご注文合計
      </Text>
      <Flex rounded={'xl'} w={'40%'} alignSelf="center" border="solid" p={'3%'} borderColor={'blackAlpha.200'} flexDir="column" overflow="auto">
        <Flex justifyContent={'space-between'}>
          <Text mb={'4%'}>商品代金合計</Text>
          <Flex>
            <Text>{totalCoast}</Text>&nbsp;
            <Text alignItems={'center'} mt="4px" h="60%" justifyContent="center">
              <FaCoins color="#FFC300" />
            </Text>
          </Flex>
        </Flex>
        <Divider></Divider>
        <Flex justifyContent={'space-between'}>
          <Text mb={'4%'}>内消費税</Text>
          <Flex>
            <Text>{totalCoast / 10}</Text>&nbsp;
            <Text alignItems={'center'} mt="4px" h="60%" justifyContent="center">
              <FaCoins color="#FFC300" />
            </Text>
          </Flex>
        </Flex>
        <Divider></Divider>
        <Flex mb={'10%'} justifyContent={'space-between'}>
          <Text>送料</Text>
          <Flex>
            <Text>300</Text>&nbsp;
            <Text alignItems={'center'} mt="4px" h="60%" justifyContent="center">
              <FaCoins color="#FFC300" />
            </Text>
          </Flex>
        </Flex>
        <Flex flexDir={'column'} border="1px" borderColor={'blackAlpha.300'} rounded="2xl" my={'4%'} p="3%">
          <Text fontSize={'lg'} textAlign={'center'}>
            お支払い総額
          </Text>
          <Flex alignSelf={'center'} ml="10%" fontSize={'xl'}>
            <Text color="#EB2721" fontWeight={'bold'}>
              {totalCoast + 300}
            </Text>
            &nbsp;
            <Text alignItems={'center'} mt="4px" h="60%" justifyContent="center">
              <FaCoins color="#FFC300" />
            </Text>
          </Flex>
        </Flex>
        <Button onClick={onOpen} mt={'6%'} colorScheme={'green'}>
          ご注文を確定する
        </Button>
      </Flex>

      <Flex mt={'13%'} rounded={'lg'} w={'130%'} alignSelf="center" background={'gray.100'} p={'4%'} borderColor={'gray.200'} flexDir={'column'}>
        <Text fontSize={'lg'} fontWeight={'bold'}>
          注文を確定する前に下記をご確認ください。
        </Text>
        <Divider h={'10px'} mb={'10px'} />
        <List spacing={3} fontSize={'sm'}>
          <ListItem>
            <ListIcon as={CheckCircleIcon} color="green.500" />
            ご注文キャンセルについて（Webからキャンセル手続き可能な場合があります。詳しくはこちらをご確認ください。）
          </ListItem>
          <ListItem>
            <ListIcon as={CheckCircleIcon} color="green.500" />
            お客様都合の返品について（未使用・未開封で商品到着８日以内に限らせていただきます。詳しくはこちらをご確認ください。）
          </ListItem>
          <ListItem>
            <ListIcon as={CheckCircleIcon} color="green.500" />
            個人情報の取扱いについて（MICO個人情報方針）
          </ListItem>
        </List>
      </Flex>
      <PaymentModal
        setTabIndex={setTabIndex}
        setPayCheck={setPayCheck}
        quantity={quantity}
        user_id={userData?.id}
        size={size}
        color={color}
        product_id={productIds}
        total_price={totalCoast}
        address={address}
        isOpen={isOpen}
        onClose={onClose}
      />
    </Flex>
  );
};
export default Check;
