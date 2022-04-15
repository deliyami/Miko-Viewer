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
    <Box minH="100vh">
      <MenuBar />
      <Box ml={{ base: 0, md: 60 }} mt="10" p="4" minH="70vh" paddingBottom="100px">
        {children}
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;
