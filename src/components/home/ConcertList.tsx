import { AspectRatio, Box, Heading, Image, Spinner, Text, VStack } from '@chakra-ui/react';
import { S3_URL } from '@src/const';
import { Concert } from '@src/types/share';
import Link from 'next/link';
import { FC, Suspense } from 'react';

const ConcertCard: FC<{ concert: Concert }> = ({ concert }) => {
  // console.log(concert);
  return (
    <Box className="movie">
      <Link href={`/concerts/${concert.id}`}>
        <a>
          <Box maxW="300px">
            <AspectRatio maxW="300px" ratio={1}>
              <Image src={S3_URL + concert.coverImage} objectFit="cover" alt="concertImage" />
            </AspectRatio>
            <VStack pt={3} align="center">
              <Heading size="sm" fontSize="22px">
                {concert.title}
              </Heading>
              <Text textStyle="body">{concert.artist}</Text>
            </VStack>
          </Box>
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
    <Suspense fallback={<Spinner thickness="3px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />}>
      {concerts?.map((concert, index) => (
        <Box key={index}>
          <ConcertCard concert={concert} />
        </Box>
      ))}
    </Suspense>
  );
};

export default ConcertList;
