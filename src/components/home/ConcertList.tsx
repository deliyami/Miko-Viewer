import { Box, Text } from '@chakra-ui/react';
import { IMAGE_DOMAIN } from '@src/const';
import { convertDate } from '@src/helper';
import { Concert } from '@src/types/share';
import Image from 'next/image';
import Link from 'next/link';
import React, { FC } from 'react';

const ConcertCard: FC<{ concert: Concert }> = ({ concert }) => {
  const concertStartDate = convertDate(concert.allConcertStartDate, 'YMDHM');

  // console.log(concert);
  return (
    <Link href={`/concerts/${concert.id}`}>
      <a>
        <Box
          className="concert"
          transition="all 0.2s linear"
          transition-duration="0.2s"
          _hover={{
            transform: 'scale(1.05)',
            transitionDuration: '0.2s',
          }}
        >
          <Image
            src={IMAGE_DOMAIN + concert.coverImage}
            placeholder="blur"
            blurDataURL="/image/defaultImage.png"
            quality={100}
            objectFit="cover"
            width={300}
            height={300}
            alt="concertImage"
            style={{ borderRadius: '12px' }}
          />
        </Box>
        <Box pt={2}>
          <Text color="gray.700" fontSize="sm">
            {concertStartDate}
          </Text>
          <Text fontSize="xl" fontWeight="bold">
            {concert.title}
          </Text>
        </Box>
      </a>
    </Link>
  );
};

const ConcertList: FC<{ data: Concert[] }> = ({ data }) => {
  const concerts = data;
  return (
    <>
      {concerts?.map((concert, index) => (
        <Box key={index} maxW={300}>
          <ConcertCard concert={concert} />
        </Box>
      ))}
    </>
  );
};

export default ConcertList;
