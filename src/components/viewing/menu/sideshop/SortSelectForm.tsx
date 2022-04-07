import { Flex, Select } from '@chakra-ui/react';
import { useState, useEffect } from 'react';

const SortSelectForm = ({ data }) => {
  const [selected, setSelected] = useState(1);
  function onChangeSelected(e) {
    setSelected(e.target.value);
    console.log(e.target.value);
  }

  function sortByCreatedAt() {
    if (data.data !== undefined) {
      data.data.sort(function (a, b) {
        return a.id - b.id;
      });
    }
  }
  function sortByOrdered() {
    // if (data.data !== undefined) {
    //   data.data.sort(function (a, b) {
    //     return a.id - b.id;
    //   });
    // }
    console.log('sortByOrdered');
  }
  function sortByLowestPrice() {
    if (data.data !== undefined) {
      data.data.sort(function (a, b) {
        return a.price - b.price;
      });
    }
  }
  function sortByHighestPrice() {
    if (data.data !== undefined) {
      data.data.sort(function (a, b) {
        return b.price - a.price;
      });
    }
  }
  useEffect(() => {
    switch (selected) {
      case 1:
        sortByCreatedAt();
        break;
      case 2:
        sortByOrdered();
        break;
      case 3:
        sortByLowestPrice();
        break;
      case 4:
        sortByHighestPrice();
        break;
      default:
        sortByCreatedAt();
    }
  }, [selected]);
  return (
    <Flex justifyContent={'end'} mb="10%">
      <Select textAlign={'center'} onChange={onChangeSelected} w="33%" value={selected} size="sm">
        <option value="1">新着順</option>
        <option value="2">人気順</option>
        <option value="3">価格が安い順</option>
        <option value="4">価格が高い順</option>
      </Select>
    </Flex>
  );
};
export default SortSelectForm;
