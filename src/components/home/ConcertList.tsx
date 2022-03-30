import { Box, Heading, Image, SimpleGrid, Spinner, Text, VStack } from '@chakra-ui/react';
import { S3_URL } from '@src/const';
import { Concert } from '@src/types/share/Concert';
import Link from 'next/link';
import { FC, Suspense } from 'react';

const ConcertCard: FC<{ concert: Concert }> = ({ concert }) => {
  // console.log(concert);
  return (
    <Box className="movie">
      <Link href={`/concerts/${concert.id}`}>
        <a>
          <Image boxSize="300px" src={S3_URL + concert.coverImage} />
          <VStack pt={3}>
            <Heading size="sm" fontSize="22px">
              {concert.title}
            </Heading>
            <Text textStyle="body">{concert.artist}</Text>
          </VStack>
        </a>
      </Link>

      <style>
        {`
          .movie img {
            border-radius: 12px;
            transition: transform 0.2s ease-in-out;
            box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
          }
          .movie:hover img {
            transform: scale(1.05);
          }
       `}
      </style>
    </Box>
  );
};

const ConcertList: FC<{ data: Concert[] }> = ({ data }) => {
  const concerts = data;
  return (
    <Box>
      <SimpleGrid columns={[2, null, 3]} spacing={8}>
        <Suspense fallback={<Spinner thickness="3px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />}>
          {concerts?.map((concert, index) => (
            <Box key={index}>
              <ConcertCard concert={concert} />
            </Box>
          ))}
        </Suspense>
      </SimpleGrid>
    </Box>
  );
};

export default ConcertList;
