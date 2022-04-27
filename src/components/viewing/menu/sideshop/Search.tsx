import { Search2Icon } from '@chakra-ui/icons';
import { Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { ChangeEventHandler, KeyboardEventHandler } from 'react';

type SearchType = {
  searchQuery: string;
  setSearchQuery: Function;
};

const Search = ({ searchQuery, setSearchQuery }: SearchType) => {
  //   const router = useRouter();

  const onChangeSearch: ChangeEventHandler<HTMLInputElement> = e => {
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
    <InputGroup bg={'white'} mb={'20px'} w={'450px'} alignSelf="center">
      <InputRightElement cursor={'pointer'} background={'#1CE0D7'}>
        <Search2Icon color={'white'} />
      </InputRightElement>
      <Input
        value={searchQuery}
        placeholder="Search"
        onKeyUp={enterKey}
        variant="flushed"
        focusBorderColor="#1CE0D7"
        _hover={{ borderBottomColor: '#1CE0D7' }}
        onChange={onChangeSearch}
        type={'search'}
      ></Input>
    </InputGroup>
  );
};
export default Search;
