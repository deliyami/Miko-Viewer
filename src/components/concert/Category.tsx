import { Box, Button } from '@chakra-ui/react';
import { categoryArray } from '@src/const';
import { useRouter } from 'next/router';

const Category = () => {
  const router = useRouter();

  const setCategory = id => {
    router.push(`/concerts?category_id=${id}`);
  };

  return (
    <Box>
      {categoryArray.map((category, idx) => (
        <Button key={idx + 1} onClick={() => setCategory(idx + 1)} m="10px" colorScheme="blue">
          {category}
        </Button>
      ))}
    </Box>
  );
};

export default Category;
