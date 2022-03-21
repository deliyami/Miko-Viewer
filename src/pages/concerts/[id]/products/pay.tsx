import { Button, Flex, Input, Radio, RadioGroup, Select, Text } from '@chakra-ui/react';
import CommonDivider from '@src/components/common/divider/CommonDivider';
import Status from '@src/components/product/Status';
import BasicLayout from '@src/layout/BasicLayout';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactElement, useState } from 'react';

const pay = () => {
  const [radio, setRadio] = useState('0');
  const router = useRouter();
  return (
    <Flex flexDirection={"column"} w={"50%"} h="100%" p={"2%"} ml={"25%"}>
      <Status status={2}></Status>
      <Text fontWeight={'bold'} fontSize="3xl" alignSelf={'center'} mb="7%">
        お客様情報の入力
      </Text>
      <Flex justifyContent={'space-between'} alignItems={'center'}>
        <Text w={'15%'}>
          お名前<span style={{ color: 'red', fontSize: '1px', marginLeft: '10%' }}>必要</span>
        </Text>
        <Flex w={'70%'} justifyContent={'space-around'}>
          <Input required w={'45%'} placeholder="性" />
          <Input required w={'45%'} placeholder="名" />
        </Flex>
      </Flex>
      <CommonDivider></CommonDivider>
      <Flex justifyContent={"space-between"} alignItems={"center"}>
        <Text w={"22%"}>
          お名前(ふりがな)<span style={{ color: "red", fontSize: "1px", marginLeft: "10%" }}>必要</span>
        </Text>
        <Flex w={'70%'} justifyContent={'space-around'}>
          <Input required w={'45%'} placeholder="セイ" />
          <Input required w={'45%'} placeholder="メイ" />
        </Flex>
      </Flex>
      <CommonDivider></CommonDivider>
      <Flex justifyContent={'space-between'} alignItems={'center'}>
        <Text w={'16%'}>
          住所<span style={{ color: 'red', fontSize: '1px', marginLeft: '10%' }}>必要</span>
        </Text>
        <Flex w={'48%'} mr="20%" alignContent={'center'} alignItems="center" justifyContent={'space-around'}>
          〒<Input required w={'20%'} />-
          <Input required w={'20%'} />?<Button onClick={() => window.open('https://www.post.japanpost.jp/zipcode/', '_blank')}>郵便番号検索</Button>
        </Flex>
      </Flex>
      <Flex py={"2%"} ml={"32%"} w={"50%"} flexDirection={"column"}>
        <Select pb={"2%"} w={"45%"} required>
          <option>都道府県を選択</option>
          <option value="1">北海道</option>
          <option value="1">青森県</option>
          <option value="3">岩手県</option>
          <option value="4">宮城県</option>
          <option value="5">秋田県</option>
          <option value="6">山形県</option>
          <option value="7">福島県</option>
          <option value="8">茨城県</option>
          <option value="9">栃木県</option>
          <option value="10">群馬県</option>
          <option value="11">埼玉県</option>
          <option value="12">千葉県</option>
          <option value="13">東京都</option>
          <option value="14">神奈川県</option>
          <option value="15">新潟県</option>
          <option value="16">富山県</option>
          <option value="17">石川県</option>
          <option value="18">福井県</option>
          <option value="19">山梨県</option>
          <option value="20">長野県</option>
          <option value="21">岐阜県</option>
          <option value="22">静岡県</option>
          <option value="23">愛知県</option>
          <option value="24">三重県</option>
          <option value="25">滋賀県</option>
          <option value="26">京都府</option>
          <option value="27">大阪府</option>
          <option value="28">兵庫県</option>
          <option value="29">奈良県</option>
          <option value="30">和歌山県</option>
          <option value="31">鳥取県</option>
          <option value="32">島根県</option>
          <option value="33">岡山県</option>
          <option value="34">広島県</option>
          <option value="35">山口県</option>
          <option value="36">徳島県</option>
          <option value="37">香川県</option>
          <option value="38">愛媛県</option>
          <option value="39">高知県</option>
          <option value="40">福岡県</option>
          <option value="41">佐賀県</option>
          <option value="42">長崎県</option>
          <option value="43">熊本県</option>
          <option value="44">大分県</option>
          <option value="45">宮崎県</option>
          <option value="46">鹿児島県</option>
          <option value="47">沖縄県</option>
        </Select>
        <Input required mb={'2%'} placeholder="市区町村名(例 : 千台田区神田神保町)" />
        <Input required placeholder="番地・ビル名(例 : 1-3-5)" />
      </Flex>
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
      <Flex justifyContent={"space-between"} alignItems={"center"}>
        <Text w={"24%"}>
          メールアドレス<span style={{ color: "red", fontSize: "1px", marginLeft: "10%" }}>必要</span>
        </Text>
        <Flex w={'50%'} mr={'18%'} flexDirection={'column'} justifyContent={'space-around'}>
          <Input required type={'text'} mb={'2%'} />
          <Input required type={'text'} placeholder="確認のためにもう一度入力してください。" />
        </Flex>
      </Flex>
      <CommonDivider></CommonDivider>
      <Flex justifyContent={"space-between"} alignItems={"center"}>
        <Text w={"22%"}>
          メルマガ配信<span style={{ color: "red", fontSize: "1px", marginLeft: "10%" }}>必要</span>
        </Text>
        <RadioGroup w={'68%'} onChange={setRadio} value={radio}>
          <Radio required value="1">
            配信
          </Radio>
          <Radio required value="2" ml={'10px'}>
            解除
          </Radio>
        </RadioGroup>
      </Flex>

      <Flex justifyContent={'space-between'} h="100px" mt={'10%'}>
        <Button w="23%" fontSize={'2xl'} onClick={() => router.back()}>
          ← 戻る
        </Button>
        <Link href={`/concerts/${router.query.id}/products/check`}>
          <Button fontSize={'2xl'} w="23%">
            次へ →
          </Button>
        </Link>
      </Flex>
    </Flex>
  );
};

export default pay;

pay.getLayout = function getLayout(page: ReactElement) {
  return <BasicLayout>{page}</BasicLayout>;
};
