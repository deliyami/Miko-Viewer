import { Box, Center, Flex, Heading, Image, Stack, Text, useColorModeValue } from '@chakra-ui/react';
import { IMAGE_DOMAIN } from '@src/const';
import { convertDate } from '@src/helper';
import { Concert } from '@src/types/share';
import Link from 'next/link';
import React, { FC } from 'react';

const ProductSimple: FC<{ data: Concert; rankingNum: number }> = ({ data: concert, rankingNum }) => {
  const concertStartDate = convertDate(concert.allConcertStartDate, 'YMDHM');
  return (
    <Center py={2}>
      <Box role={'group'} p={6} maxW={'400px'} w={'full'} pos={'relative'} zIndex={1}>
        <Heading mb={2}>{rankingNum}</Heading>
        <Link href={`/concerts/${concert.id}`}>
          <a>
            <Box
              rounded={'lg'}
              pos={'relative'}
              height={'240px'}
              _after={{
                transition: 'all .1s ease',
                content: '""',
                w: 'full',
                h: 'full',
                pos: 'absolute',
                top: 5,
                left: 0,
                backgroundImage: `url(${IMAGE_DOMAIN + concert.coverImage})`,
                filter: 'blur(15px)',
                zIndex: -1,
              }}
              _groupHover={{
                _after: {
                  filter: 'blur(20px)',
                },
              }}
            >
              <Image rounded={'lg'} height={250} width={360} objectFit={'cover'} src={IMAGE_DOMAIN + concert.coverImage} />
            </Box>
          </a>
        </Link>
        <Stack pt={10} align={'center'}>
          <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
            {concertStartDate}
          </Text>
          <Heading fontSize={'2xl'} fontWeight={600}>
            {concert.title}
          </Heading>
          <Text>{concert.artist}</Text>
        </Stack>
      </Box>
    </Center>
  );
};

const RankingCard: FC<{ data: Concert[] }> = ({ data: concerts }) => {
  return (
    <>
      <Flex
        _hover={{ zIndex: 40 }}
        order={{ base: 2, md: 1 }}
        flex={{ sm: 1, lg: 'initial' }}
        w={{ lg: 2.3 / 7 }}
        rounded="lg"
        borderTopRightRadius={0}
        borderBottomLeftRadius="lg"
        bg={useColorModeValue('white', 'gray.700')}
        my={6}
        direction="column"
        boxShadow={'2xl'}
      >
        <ProductSimple data={concerts[1]} rankingNum={2} />
      </Flex>

      <Flex
        _hover={{ zIndex: 40 }}
        order={{ base: 1, md: 2 }}
        flex={{ base: 1, lg: 'initial' }}
        w={{ lg: 2.4 / 7 }}
        rounded="lg"
        bg={useColorModeValue('white', 'gray.700')}
        mt={{ base: 4, sm: -4 }}
        shadow="xl"
        zIndex={30}
        direction="column"
        boxShadow={'2xl'}
      >
        <ProductSimple data={concerts[0]} rankingNum={1} />
      </Flex>

      <Flex
        _hover={{ zIndex: 40 }}
        order={{ base: 3, md: 3 }}
        flex={{ sm: 1, lg: 'initial' }}
        w={{ lg: 2.3 / 7 }}
        roundedTop="lg"
        borderBottomRightRadius="lg"
        borderTopLeftRadius={0}
        bg={useColorModeValue('white', 'gray.700')}
        my={6}
        direction="column"
        boxShadow={'2xl'}
      >
        <ProductSimple data={concerts[2]} rankingNum={3} />
      </Flex>
    </>
  );
};

const MainRanking: FC<{ data: Concert[] }> = ({ data: concerts }) => {
  return (
    <Flex bg={useColorModeValue('#F9FAFB', 'gray.600')} p={10} w="full" justifyContent="center" alignItems="center">
      <Box w="full" pt={8}>
        <Flex direction={{ base: 'column', md: 'row' }} justifyContent="center" mb={{ base: 6, sm: 0 }}>
          <RankingCard data={concerts} />
        </Flex>
      </Box>
    </Flex>
  );
};
export default MainRanking;
