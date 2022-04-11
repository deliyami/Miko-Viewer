import { Button, Center, Flex } from '@chakra-ui/react';
import { Meta } from '@src/types/share/common';
import { NextRouter, useRouter } from 'next/router';
import { ComponentProps, FC } from 'react';

type Props = {
  data: Meta;
  options?: Parameters<NextRouter['push']>[2];
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

const PaginationBtn: FC<Props> = ({ data: { current_page, last_page }, options }) => {
  const router = useRouter();
  const [curPage, lastPage, startPage] = [current_page, last_page, 1];

  const onPageChangeHandler = page => {
    router.query.page = page + '';
    router.push(router, null, { scroll: false, ...options });
  };

  const onBeforePageHandler = () => {
    router.query.page = curPage - 1 + '';
    router.push(router, null, { scroll: false, ...options });
  };

  const onNextPageHandler = () => {
    router.query.page = curPage + 1 + '';
    router.push(router, null, { scroll: false, ...options });
  };

  const handleToScrollInto = () => {
    const el = document.getElementById('scroll-into');
    if (el) {
      el.scrollIntoView();
    }
  };

  const leftBtnNum = Math.max(curPage - startPage, 0);
  const rightBtnNum = Math.max(lastPage - curPage, 0);

  return (
    <Flex justifyContent="center">
      <Flex justifyContent="center" columnGap="10px" onClick={handleToScrollInto}>
        <Center width="30px">{curPage !== startPage && <PageBtn px={3} text="<" onClick={onBeforePageHandler} />}</Center>
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
        <Center width="30px">{curPage !== lastPage && <PageBtn px={3} text=">" onClick={onNextPageHandler} />}</Center>
      </Flex>
    </Flex>
  );
};

export default PaginationBtn;
