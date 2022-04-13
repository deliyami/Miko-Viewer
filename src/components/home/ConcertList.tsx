import { Box, Text } from '@chakra-ui/react';
import { IMAGE_DOMAIN } from '@src/const';
import { convertDate } from '@src/helper';
import { Concert } from '@src/types/share';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

const ConcertCard: FC<{ concert: Concert }> = ({ concert }) => {
  const concertStartDate = convertDate(concert.allConcertStartDate, 'YMDHM');
  // console.log(concert);
  return (
    <Box className="movie">
      <Link href={`/concerts/${concert.id}`}>
        <a>
          <Box maxW="300px">
            <Image
              src={IMAGE_DOMAIN + concert.coverImage}
              placeholder="blur"
              blurDataURL="/image/defaultImage.png"
              quality={100}
              objectFit="cover"
              width={300}
              layout="responsive"
              height={300}
              alt="concertImage"
              className="concertImg"
            />
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
          .concertImg {
            border-radius: 12px;
            transition: transform 0.2s ease-in-out;
            box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
          }
          .concertImg:hover {
            transform: scale(1.05);
            border-radius: 12px;
            transition: transform 0.2s ease-in-out;
          }
       `}
      </style>
    </Box>
  );
};

const ConcertList: FC<{ data: Concert[] }> = ({ data }) => {
  const concerts = data;
  return (
    <>
      {concerts?.map((concert, index) => (
        <Box key={index}>
          <ConcertCard concert={concert} />
        </Box>
      ))}
    </>
  );
};

export default ConcertList;
