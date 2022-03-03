import {
  Image,
  SimpleGrid,
  Text,
  useMediaQuery,
  VStack,
} from '@chakra-ui/react';
import Link from 'next/link';

const ConcertCard = () => {
  return (
    <Link href="">
      <VStack>
        <Image
          src="https://obs.line-scdn.net/0h-k7bIERqckQKG2WTdxoNE1pGdDNzNWhVbmM4di0ZLnByK2BCY344cnhIKnckfjQUNCluIixPKXJzKDUVNHQ1Ji0aKXMnI2dFNXo7ImoaeCB1IzMXMQ/f375x375"
          alt=""
        />
        <VStack>
          <Text textStyle="h6">aaaa</Text>
          <Text textStyle="st">aaaa</Text>
          <Text textStyle="body">aaaa</Text>
        </VStack>
      </VStack>
    </Link>
  );
};

const ConcertList = (params) => {
  const [isLargerThan960] = useMediaQuery('(min-width: 960px)');

  return (
    <SimpleGrid columns={isLargerThan960 ? 3 : 2} spacing={10} width="full">
      {Array(10)
        .fill(0)
        .map((_, id) => (
          <ConcertCard key={id} />
        ))}
    </SimpleGrid>
  );
};

export default ConcertList;
