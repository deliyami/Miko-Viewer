import { Button, Flex, Input, Select, Text } from '@chakra-ui/react';
import { ChangeEvent, useState } from 'react';

type Type = {
  setAddress: Function;
};

const Address = ({ setAddress }: Type) => {
  //   const [address, setAddress] = useState();
  const [selected, setSelected] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [zipCode2, setZipCode2] = useState('');
  const [city, setCity] = useState('');
  const [detail, setDetail] = useState('');

  function onChangeSelected(e: ChangeEvent<HTMLSelectElement>) {
    setSelected(e.target.value);
  }
  function onChangeCity(e: React.ChangeEvent<HTMLInputElement>) {
    setCity(e.target.value);
  }
  function onChangeDetail(e: React.ChangeEvent<HTMLInputElement>) {
    setDetail(e.target.value);
  }
  function onChangeZipCode(e: React.ChangeEvent<HTMLInputElement>) {
    setZipCode(e.target.value);
  }
  function onChangeZipCode2(e: React.ChangeEvent<HTMLInputElement>) {
    setZipCode2(e.target.value);
  }
  setAddress(selected + ' ' + city + ' ' + detail + ' ' + zipCode + '-' + zipCode2);
  return (
    <>
      <Flex justifyContent={'space-between'} alignItems={'center'}>
        <Text w={'16%'}>
          住所<span style={{ color: 'red', fontSize: '1px', marginLeft: '10%' }}>必要</span>
        </Text>
        <Flex w={'48%'} mr="20%" alignContent={'center'} alignItems="center" justifyContent={'space-around'}>
          〒<Input type={'number'} required w={'20%'} value={zipCode} onChange={onChangeZipCode} />-
          <Input required type={'number'} value={zipCode2} onChange={onChangeZipCode2} w={'20%'} />?
          <Button onClick={() => window.open('https://www.post.japanpost.jp/zipcode/', '_blank')}>郵便番号検索</Button>
        </Flex>
      </Flex>
      <Flex py={'2%'} ml={'32%'} w={'50%'} flexDirection={'column'}>
        <Select pb={'2%'} w={'45%'} required value={selected} onChange={onChangeSelected}>
          <option>都道府県を選択</option>
          <option>北海道</option>
          <option>青森県</option>
          <option>岩手県</option>
          <option>宮城県</option>
          <option>秋田県</option>
          <option>山形県</option>
          <option>福島県</option>
          <option>茨城県</option>
          <option>栃木県</option>
          <option>群馬県</option>
          <option>埼玉県</option>
          <option>千葉県</option>
          <option>東京都</option>
          <option>神奈川県</option>
          <option>新潟県</option>
          <option>富山県</option>
          <option>石川県</option>
          <option>福井県</option>
          <option>山梨県</option>
          <option>長野県</option>
          <option>岐阜県</option>
          <option>静岡県</option>
          <option>愛知県</option>
          <option>三重県</option>
          <option>滋賀県</option>
          <option>京都府</option>
          <option>大阪府</option>
          <option>兵庫県</option>
          <option>奈良県</option>
          <option>和歌山県</option>
          <option>鳥取県</option>
          <option>島根県</option>
          <option>岡山県</option>
          <option>広島県</option>
          <option>山口県</option>
          <option>徳島県</option>
          <option>香川県</option>
          <option>愛媛県</option>
          <option>高知県</option>
          <option>福岡県</option>
          <option>佐賀県</option>
          <option>長崎県</option>
          <option>熊本県</option>
          <option>大分県</option>
          <option>宮崎県</option>
          <option>鹿児島県</option>
          <option>沖縄県</option>
        </Select>
        <Input required mb={'2%'} onChange={onChangeCity} value={city} placeholder="市区町村名(例 : 千台田区神田神保町)" />
        <Input required onChange={onChangeDetail} value={detail} placeholder="番地・ビル名(例 : 1-3-5)" />
      </Flex>
    </>
  );
};
export default Address;
