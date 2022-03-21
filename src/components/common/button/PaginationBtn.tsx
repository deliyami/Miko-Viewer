import { Button, Center, HStack } from '@chakra-ui/react';
import { Meta } from '@src/types/share/common/common';
import { useRouter } from 'next/router';
import { ComponentProps, FC } from 'react';

type Props = {
  data: Meta;
  url: string;
};

const PageBtn: FC<{ text: number | string } & ComponentProps<typeof Button>> = ({ text, ...props }) => {
  return (
    <Button {...props} colorScheme="gray">
      {text}
    </Button>
  );
};

const PaginationBtn: FC<Props> = ({ data: { current_page, last_page }, url }) => {
  const router = useRouter();
  const [curPage, lastPage, startPage] = [current_page, last_page, 1];

  const onPageChangeHandler = page => {
    router.push(url + `&page=${page}`);
  };

  const onBeforePageHandler = () => {
    router.push(url + `&page=${curPage - 1}`);
  };

  const onNextPageHandler = () => {
    router.push(url + `&page=${curPage + 1}`);
  };

  return (
    <Center minWidth="container.md">
      <HStack>
        {curPage != startPage && <PageBtn text="<" onClick={onBeforePageHandler} />}
        {new Array(Math.max(curPage - startPage, 0)).fill(0).map((_, idx) => (
          <PageBtn text={startPage + idx} onClick={() => onPageChangeHandler(startPage + idx)} />
        ))}
        <PageBtn text={curPage} color="green.400" />
        {new Array(Math.max(lastPage - curPage, 0)).fill(0).map((_, idx) => {
          return <PageBtn text={curPage + idx + 1} onClick={() => onPageChangeHandler(curPage + idx + 1)} />;
        })}
        {curPage != lastPage && <PageBtn text=">" onClick={onNextPageHandler} />}
      </HStack>
    </Center>
  );
};

export default PaginationBtn;
