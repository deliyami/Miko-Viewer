import { Flex, Select } from '@chakra-ui/react';
import { ChangeEventHandler } from 'react';

type OptionType = {
  stock: number;
  color: string;
  size: string;
  setStock: Function;
  setColor: Function;
  setSize: Function;
  sizeValue: string;
  colorValue: string;
  stockValue: number;
};

export default function Options({ setStock, setColor, setSize, sizeValue, colorValue, stockValue, stock, color, size }: OptionType) {
  const onCountChange: ChangeEventHandler<HTMLSelectElement> = event => {
    console.log(event.target?.value);
    setStock(parseInt(event.target?.value, 10));
  };

  const onColorChange: ChangeEventHandler<HTMLSelectElement> = event => {
    setColor(event.target.value);
  };
  const onSizeChange: ChangeEventHandler<HTMLSelectElement> = event => {
    setSize(event.target.value);
  };

  let bgColor = 'orange';
  if (colorValue === 'Black') {
    bgColor = 'blackAlpha.200';
  } else {
    bgColor = `${colorValue.toLowerCase()}.200`;
  }

  return (
    <Flex alignItems="center" w={'100%'} justifyContent="space-around">
      {/* <Text>数量</Text> */}
      <Select focusBorderColor="#1CE0D" w={'30%'} placeholder="数量" value={stockValue} onChange={onCountChange}>
        {[...Array(stock)].map((count, key) => {
          return <option key={key}>{key + 1}</option>;
        })}
      </Select>
      <Select focusBorderColor="#1CE0D" background={bgColor} w={'30%'} placeholder="カラー" value={colorValue} onChange={onColorChange}>
        {JSON.parse(color).map((value: string, key: number) => {
          return <option key={key}>{value}</option>;
        })}
      </Select>
      <Select focusBorderColor="#1CE0D" w={'30%'} placeholder="サイズ" value={sizeValue} onChange={onSizeChange}>
        {JSON.parse(size).map((value: string, key: number) => {
          return <option key={key}>{value}</option>;
        })}
      </Select>
    </Flex>
  );
}
