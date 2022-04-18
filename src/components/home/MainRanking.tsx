import { Box, Flex, Text } from '@chakra-ui/react';
import { IMAGE_DOMAIN } from '@src/const';
import { convertDate } from '@src/helper';
import { Concert } from '@src/types/share';
import Image from 'next/image';
import Link from 'next/link';
import React, { FC } from 'react';

const RankingCard: FC<{ data: Concert }> = ({ data: concert }) => {
  const concertStartDate = convertDate(concert.allConcertStartDate, 'YMDHM');

  return (
    <>
      <Flex w="full" alignItems="center" justifyContent="center">
        <Box
          w="xs"
          shadow="lg"
          rounded="lg"
          overflow="hidden"
          mx="auto"
          transition="all 0.2s linear"
          transitionDuration="0.2s"
          boxShadow="rgba(0, 0, 0, 0.1) 0px 4px 10px"
          _hover={{
            transform: 'scale(1.04)',
            transitionDuration: '0.2s',
          }}
        >
          <Link href={`/concerts/${concert.id}`}>
            <a>
              <Image
                src={IMAGE_DOMAIN + concert.coverImage}
                placeholder="blur"
                blurDataURL="/image/defaultImage.png"
                quality={70}
                objectFit="cover"
                width={300}
                height={300}
                layout="responsive"
                alt={`${concert.title} image`}
              />
            </a>
          </Link>
          <Box py={5} textAlign="center">
            <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
              {concertStartDate}
            </Text>
            <Text fontSize="xl" className="word" fontWeight="bold" px={3}>
              {concert.title}
            </Text>
          </Box>
        </Box>
      </Flex>
      <style>
        {`
        .word {
          display: block;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        `}
      </style>
    </>
  );
};

const MainRanking: FC<{ data: Concert[] }> = ({ data: concerts }) => {
  return (
    <>
      {concerts?.map((concert, index) => (
        <Box className="card" key={index} maxW="300px" m={4}>
          <RankingCard data={concert} />
        </Box>
      ))}
    </>
  );
};
export default MainRanking;
