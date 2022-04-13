import { Box, Button, Flex, Heading, HStack, Spacer, Text } from '@chakra-ui/react';
import { useUser } from '@src/state/swr';

const CoinHeader = () => {
  const { data: userData } = useUser();
  return (
    <Flex>
      <Heading pt={3} size="md">
        {userData.name}様の Coin
      </Heading>
      <Spacer />
      <Box>
        <HStack>
          <Text fontSize="2xl" fontWeight="550">
            {userData.coin}C
          </Text>
          <Button
            bg="yellow.300"
            borderColor="yellow.300"
            _hover={{ bg: 'yellow.400', color: 'white' }}
            _active={{
              bg: 'yellow.400',
              color: 'white',
              transform: 'scale(0.98)',
            }}
          >
            充電
          </Button>
        </HStack>
      </Box>
    </Flex>
  );
};

export default CoinHeader;
