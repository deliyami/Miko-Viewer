import { Box, Button } from '@chakra-ui/react';
import { categoryArray } from '@src/const';
import { useRouter } from 'next/router';
import { memo } from 'react';

const CategoryFilter = memo(() => {
  const router = useRouter();
  const curCategoryId = parseInt(router.query.category_id as string);
  const setCategory = id => {
    if (id === curCategoryId) {
      const { category_id, ...rest } = router.query;
      router.query = rest;
    } else {
      router.query.category_id = id;
    }

    router.query.page = '1';
    router.push(router, undefined, { shallow: true });
  };

  return (
    <Box>
      {categoryArray.map((category, idx) => (
        <Button
          key={idx + 1}
          onClick={() => setCategory(idx + 1)}
          m={1}
          variant="ghost"
          bg={curCategoryId === idx + 1 && 'cyan.300'}
          color={curCategoryId === idx + 1 ? 'white' : 'cyan.500'}
          _hover={{ bg: 'cyan.300', color: 'white' }}
        >
          {category}
        </Button>
      ))}
    </Box>
  );
});

CategoryFilter.displayName = 'CategoryFilter';

export default CategoryFilter;
