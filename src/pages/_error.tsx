import { Center, Text } from '@chakra-ui/react';

//   is only used in production
function Error({ statusCode }) {
  return (
    <Center w="full" h="100vh">
      <Text>404 - not found page</Text>
      <Text>{statusCode ? `An error ${statusCode} occurred on server` : 'An error occurred on client'}</Text>;
    </Center>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
