import { Flex, Input, Text } from '@chakra-ui/react';
import CommonDivider from '@src/components/common/divider/CommonDivider';
import Address from './Address';
import Buttons from './Buttons';
import NotifyCheck from './NotifyCheck';

const Info = ({ setAddress, tabIndex, setTabIndex }) => {
  return (
    <Flex flexDirection={'column'} w={'50%'} h="100%" p={'2%'} ml={'25%'}>
      <Flex mt={'14%'} justifyContent={'space-between'} alignItems={'center'}>
        <Text w={'15%'}>
          お名前<span style={{ color: 'red', fontSize: '1px', marginLeft: '10%' }}>必要</span>
        </Text>
        <Flex w={'70%'} justifyContent={'space-around'}>
          <Input required w={'45%'} placeholder="性" />
          <Input required w={'45%'} placeholder="名" />
        </Flex>
      </Flex>
      <CommonDivider></CommonDivider>
      <Flex justifyContent={'space-between'} alignItems={'center'}>
        <Text w={'22%'}>
          お名前(ふりがな)<span style={{ color: 'red', fontSize: '1px', marginLeft: '10%' }}>必要</span>
        </Text>
        <Flex w={'70%'} justifyContent={'space-around'}>
          <Input required w={'45%'} placeholder="セイ" />
          <Input required w={'45%'} placeholder="メイ" />
        </Flex>
      </Flex>
      <CommonDivider></CommonDivider>
      <Address setAddress={setAddress}></Address>
      <CommonDivider></CommonDivider>
      <Flex justifyContent={'space-between'} alignItems={'center'}>
        <Text w={'16%'}>
          電話番号<span style={{ color: 'red', fontSize: '1px', marginLeft: '10%' }}>必要</span>
        </Text>
        <Flex alignItems={'center'} w="68%">
          <Input required type={'number'} w={'12%'} mr={'1%'} />
          -
          <Input required type={'number'} w={'12%'} mx={'1%'} />
          -
          <Input required type={'number'} w={'12%'} ml={'1%'} />
        </Flex>
      </Flex>

      <CommonDivider></CommonDivider>
      <Flex justifyContent={'space-between'} alignItems={'center'}>
        <Text w={'24%'}>
          メールアドレス<span style={{ color: 'red', fontSize: '1px', marginLeft: '10%' }}>必要</span>
        </Text>
        <Flex w={'50%'} mr={'18%'} flexDirection={'column'} justifyContent={'space-around'}>
          <Input required type={'text'} mb={'2%'} />
          <Input required type={'text'} placeholder="確認のためにもう一度入力してください。" />
        </Flex>
      </Flex>
      <CommonDivider></CommonDivider>
      <NotifyCheck></NotifyCheck>
      <Buttons tabIndex={tabIndex} setTabIndex={setTabIndex}></Buttons>
    </Flex>
  );
};
export default Info;
