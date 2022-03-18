import { Box, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";

const cateName = [
  { id: 1, name: "J-POP" },
  { id: 2, name: "K-POP" },
  { id: 3, name: "애니메이션" },
  { id: 4, name: "재즈/소울" },
  { id: 5, name: "밴드" },
  { id: 6, name: "발라드" },
];

const Category = () => {
  const router = useRouter();

  const setCategory = id => {
    router.push(`/concerts?category_id=${id}`);
  };

  return (
    <Box>
      {cateName.map((name, idx) => (
        <Button key={idx} onClick={() => setCategory(name.id)} m="10px" colorScheme='blue'>
          {name.name}
        </Button>
      ))}
    </Box>
  );
};

export default Category;
