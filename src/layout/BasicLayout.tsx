import { Box } from '@chakra-ui/react';
import Footer from '@src/components/home/Footer';
import MenuBar from '@src/components/home/MenuBar';
import { FC, ReactElement } from 'react';

//  NOTE <Loading/>이 아닌 Loading으로 경고
type Props = {
  children: ReactElement;
};

const Layout: FC<Props> = ({ children }) => {
  return (
    <Box minH="100vh" display="flex" flexDir="column">
      <MenuBar />
      <Box ml={{ base: 0, md: 60 }} mt="10" p="4" paddingBottom="100px" flexGrow={1}>
        {children}
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;
