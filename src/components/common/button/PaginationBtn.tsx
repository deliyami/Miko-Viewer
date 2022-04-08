import { Button, Center, Flex } from '@chakra-ui/react';
import { Meta } from '@src/types/share/common';
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

const MAX_TOTAL_BTN = 11;
const MAX_SIDE_BTN = Math.floor(MAX_TOTAL_BTN / 2);

const PaginationBtn: FC<Props> = ({ data: { current_page, last_page }, url }) => {
  const router = useRouter();
  const [curPage, lastPage, startPage] = [current_page, last_page, 1];

  const onPageChangeHandler = page => {
    router.push(url + `&page=${page}`, null, { scroll: false });
  };

  const onBeforePageHandler = () => {
    router.push(url + `&page=${curPage - 1}`, null, { scroll: false });
  };

  const onNextPageHandler = () => {
    router.push(url + `&page=${curPage + 1}`, null, { scroll: false });
  };

  const leftBtnNum = Math.max(curPage - startPage, 0);
  const rightBtnNum = Math.max(lastPage - curPage, 0);

  return (
    <Flex justifyContent="center">
      <Flex justifyContent="center" columnGap="10px">
        <Center width="30px">{curPage !== startPage && <PageBtn text="<" onClick={onBeforePageHandler} />}</Center>
        <Center flexGrow="1" gap="5px">
          {new Array(leftBtnNum)
            .fill(0)
            .slice(0, Math.max(MAX_SIDE_BTN, MAX_TOTAL_BTN - 1 - rightBtnNum))
            .map((_, idx) => <PageBtn key={curPage + idx} text={curPage - idx - 1} onClick={() => onPageChangeHandler(curPage - idx - 1)} />)
            .reverse()}
          <PageBtn key={curPage} text={curPage} color="green.400" />
          {new Array(rightBtnNum)
            .fill(0)
            .slice(0, Math.max(MAX_SIDE_BTN, MAX_TOTAL_BTN - 1 - leftBtnNum))
            .map((_, idx) => {
              return <PageBtn key={curPage + idx + 1} text={curPage + idx + 1} onClick={() => onPageChangeHandler(curPage + idx + 1)} />;
            })}
        </Center>
        <Center width="30px">{curPage !== lastPage && <PageBtn text=">" onClick={onNextPageHandler} />}</Center>
      </Flex>
    </Flex>
  );
};

export default PaginationBtn;
