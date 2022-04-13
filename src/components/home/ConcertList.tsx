import { AspectRatio, Box, Image, Spinner, Text } from '@chakra-ui/react';
import { IMAGE_DOMAIN } from '@src/const';
import { convertDate } from '@src/helper';
import { Concert } from '@src/types/share';
import Link from 'next/link';
import { FC } from 'react';
import AsyncBoundary from '../common/wrapper/AsyncBoundary';

const ConcertCard: FC<{ concert: Concert }> = ({ concert }) => {
  const concertStartDate = convertDate(concert.allConcertStartDate, 'YMDHM');
  // console.log(concert);
  return (
    <Box className="movie">
      <Link href={`/concerts/${concert.id}`}>
        <a>
          <Box maxW="300px">
            <AspectRatio maxW="300px" ratio={1}>
              <Image src={IMAGE_DOMAIN + concert.coverImage} objectFit="cover" alt="concertImage" fallbackSrc="/defaultImage.png" />
            </AspectRatio>
            <Box my={2}>
              <Text color="gray.700" fontSize="sm">
                {concertStartDate}
              </Text>
              <Text fontSize="xl" fontWeight="bold">
                {concert.title}
              </Text>
            </Box>
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
    <AsyncBoundary pendingFallback={<Spinner thickness="3px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />}>
      {concerts?.map((concert, index) => (
        <Box key={index}>
          <ConcertCard concert={concert} />
        </Box>
      ))}
    </AsyncBoundary>
  );
};

export default ConcertList;
