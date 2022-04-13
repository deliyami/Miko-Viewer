import { Search2Icon } from '@chakra-ui/icons';
import { Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { KeyboardEventHandler, useState } from 'react';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  //   const router = useRouter();

  const onChangeSearch = e => {
    setSearchQuery(e.target.value);
    console.log(e.target.value);
  };
  const onClickSearch = () => {
    setSearchQuery('');
    // router.push(`/concerts?search=${searchQuery}`);
  };
  const enterKey: KeyboardEventHandler<HTMLInputElement> = e => {
    if (e.key === 'Enter') {
      onClickSearch();
    }
  };
  return (
    <InputGroup mb={'5%'}>
      <InputRightElement cursor={'pointer'} background={'blue.300'}>
        <Search2Icon color={'white'} />
      </InputRightElement>
      <Input value={searchQuery} placeholder="Search" onKeyUp={enterKey} variant="flushed" onChange={onChangeSearch} type={'search'}></Input>
    </InputGroup>
  );
};
export default Search;
