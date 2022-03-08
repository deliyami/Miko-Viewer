import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { useRouter } from 'next/router';

const MyListPage = (second) => {
  const router = useRouter();
  const { menu } = router.query as { menu: string };
  return (
    <Box>
      <Tabs variant="enclosed" isFitted>
        <TabList>
          <Tab>보기전 티켓</Tab>
          <Tab>사용한 티켓</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <p>one!</p>
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default MyListPage;
