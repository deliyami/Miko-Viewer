import { Center, Text } from '@chakra-ui/react';
import { NextPageContext } from 'next';

//   is only used in production
//  500 error page
interface ErrorComponentProps {
  statusCode?: number;
}

function Error({ statusCode }: ErrorComponentProps) {
  return (
    <Center w="full" h="100vh">
      <Text>404 - not found page</Text>
      <Text>{statusCode ? `An error ${statusCode} occurred on server` : 'An error occurred on client'}</Text>;
    </Center>
  );
}

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  if (res && res.statusCode) return { statusCode: res.statusCode };
  if (err && err.statusCode) return { statusCode: err.statusCode };
  return { statusCode: 404 };
};

export default Error;
