import { CheckCircleIcon } from '@chakra-ui/icons';
import { Button, Divider, Flex, Image, List, ListIcon, ListItem, Table, TableContainer, Tbody, Td, Text, Tr } from '@chakra-ui/react';
import CommonDivider from '@src/components/common/divider/CommonDivider';
import { S3_URL } from '@src/const';
import { useUser } from '@src/state/swr/useUser';
import Buttons from './Buttons';

const Check = ({ address, tabIndex, setTabIndex, data }) => {
  console.log(address);
  const user = useUser();
  let totalCoast = null;
  data.map((item, key) => {
    totalCoast += item.products[0].price * item.quantity;
  });
  console.log(totalCoast);
  return (
    <Flex w={'50%'} p={'2%'} ml={'25%'} justifyContent="center" flexDir={'column'}>
      <TableContainer w={'100%'} alignSelf={'center'}>
        <Table border={'1px'} borderColor="blackAlpha.200" variant={'unstyled'}>
          <Tbody>
            <Tr borderBottom={'1px'} borderColor="blackAlpha.200">
              <Td background={'blackAlpha.100'}>お届けの日時</Td>
              <Td>日時</Td>
            </Tr>
            <Tr borderBottom={'1px'} borderColor="blackAlpha.200">
              <Td background={'blackAlpha.100'}>お届け先</Td>
              <Td>
                お名前　：　{user.data.name} 様<br />
                <CommonDivider />
                ご住所　：　{address}
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
        商品情報
      </Text>
      <Flex rounded={'xl'} w="100%" h={'40%'} alignSelf="center" border="solid" p={'3%'} borderColor={'blackAlpha.200'} overflowX="scroll">
        {data.map((item, key) => (
          <Flex key={key} justifyContent="space-around" mr={'10%'} w={'100%'} flexShrink="0">
            <Image w={'25%'} src={`${S3_URL}products/${item.products[0].image}`} alt="productImage"></Image>
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
                  ￥{item.products[0].price}
                  <span style={{ fontSize: 'small' }}>×</span>
                  {item.quantity}
                </Text>
                <Text>￥{item.products[0].price * item.quantity}</Text>
              </Flex>
              <Divider mb={'2%'} height={'6%'} borderColor={'blackAlpha.300'}></Divider>
              <Text fontSize={'lg'} textAlign={'right'}>
                小計　<span style={{ color: '#EB2721', fontWeight: 'bold' }}>￥{item.products[0].price * item.quantity}</span>
              </Text>
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
          <Text> ¥{totalCoast}</Text>
        </Flex>
        <Divider></Divider>
        <Flex justifyContent={'space-between'}>
          <Text mb={'4%'}>内消費税</Text>
          <Text>¥{totalCoast / 10}</Text>
        </Flex>
        <Divider></Divider>
        <Flex mb={'10%'} justifyContent={'space-between'}>
          <Text>送料</Text>
          <Text>¥300</Text>
        </Flex>
        <Text fontSize={'xl'} textAlign={'center'}>
          お支払い総額<span style={{ color: '#EB2721', fontWeight: 'bold' }}> ￥{totalCoast + 300}</span>
        </Text>
        <Button mt={'6%'} colorScheme={'green'}>
          ご注文を確定する
        </Button>
      </Flex>
      {/* <hr></hr> */}
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
      <Buttons tabIndex={tabIndex} setTabIndex={setTabIndex}></Buttons>
    </Flex>
  );
};
export default Check;
