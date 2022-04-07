import { Flex, Radio, RadioGroup, Text } from '@chakra-ui/react';
import { useState } from 'react';

const NotifyCheck = () => {
  const [radio, setRadio] = useState('0');
  return (
    <Flex justifyContent={'space-between'} alignItems={'center'}>
      <Text w={'22%'}>
        メルマガ配信<span style={{ color: 'red', fontSize: '1px', marginLeft: '10%' }}>必要</span>
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
  );
};
export default NotifyCheck;
