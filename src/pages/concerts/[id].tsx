import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { Box, Button, Collapse, Container, Flex, Grid, GridItem, Heading, Stack, Text } from '@chakra-ui/react';
import ConcertTab from '@src/components/concert/ConcertTab';
import { IMAGE_DOMAIN } from '@src/const';
import { convertDate, getPageLaravelData, getSingleLaravelData } from '@src/helper';
import BasicLayout from '@src/layout/BasicLayout';
import { Concert, Product, Ticket } from '@src/types/share';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { FC, ReactElement } from 'react';

type Data = {
  concert: Concert;
  tickets: Ticket[];
  products: Product[];
};

const LiveInformation: FC<{ data: Concert }> = ({ data: concert }) => {
  const router = useRouter();
  const [show, setShow] = React.useState(false);
  const handleToggle = () => setShow(!show);

  const startDate = convertDate(concert.allConcertStartDate, 'YMDHM');
  const endDate = convertDate(concert.allConcertEndDate, 'YMDHM');

  return (
    <Container
      as={Stack}
      maxW={'6xl'}
      direction={{ base: 'column', md: 'row' }}
      spacing={4}
      justify={{ base: 'center', md: 'space-between' }}
      align={{ base: 'center', md: 'start' }}
    >
      <Box position="relative" w={350} h={350} borderRadius="12px" boxShadow="rgba(0, 0, 0, 0.1) 0px 4px 12px">
        <Image
          src={IMAGE_DOMAIN + concert.coverImage}
          placeholder="blur"
          blurDataURL="/image/defaultImage.png"
          quality={70}
          layout="fill"
          objectFit="cover"
          alt={`${concert.title} image`}
          style={{ borderRadius: '12px' }}
        />
      </Box>
      <Box px={4}>
        <Flex pb={3} direction={{ base: 'column', md: 'row' }} minW={{ md: '50vh' }}>
          <Heading fontWeight="700">{concert.title}</Heading>
          <Text pt={{ base: '0', md: '4' }} pl={{ base: '0', md: '5' }}>
            {concert.artist}
          </Text>
        </Flex>
        <Grid templateRows="repeat(2, 1fr)" templateColumns="repeat(5, 1fr)">
          <GridItem rowSpan={2} colSpan={1}>
            <Text fontWeight="500">公演期間</Text>
            <Text fontWeight="500">公演内容</Text>
          </GridItem>
          <GridItem rowSpan={2} colSpan={4} maxW={{ md: '70vh' }}>
            <Text fontWeight="440">
              {startDate} ~ {endDate}
            </Text>
            <div>
              <Collapse startingHeight={20} in={show}>
                <Text fontWeight="440">{concert.content}</Text>
              </Collapse>
              {concert.content.length > 50 && (
                <Button color="orange" size="sm" onClick={handleToggle} mt={2} borderRadius="4px">
                  {show ? '閉じる' : 'もっと見る'}
                  {show ? <ChevronUpIcon /> : <ChevronDownIcon />}
                </Button>
              )}
            </div>
          </GridItem>
        </Grid>
      </Box>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps<Data> = async context => {
  const concertId = parseInt(context.query.id as string, 10);

  try {
    const concertPromise = getSingleLaravelData('/concerts', concertId, {});
    const ticketsPromise = getPageLaravelData('/tickets', {
      with: ['concert'],
      filter: [['concert_id', concertId]],
    });
    const productsPromise = await getPageLaravelData('/products', {
      filter: [['concert_id', concertId]],
    });

    const [concertsResult, ticketsResult, productsResult] = await Promise.allSettled([concertPromise, ticketsPromise, productsPromise]);

    if (concertsResult.status === 'rejected' || ticketsResult.status === 'rejected' || productsResult.status === 'rejected') {
      return {
        redirect: {
          destination: '/500',
          permanent: false,
        },
      };
    }

    return {
      props: {
        concert: concertsResult.value.data,
        tickets: ticketsResult.value.data,
        products: productsResult.value.data,
      },
    };
  } catch (error) {
    return {
      redirect: {
        destination: '/500',
        permanent: false,
      },
    };
  }
};

export default function LiveDetailPage({ concert, tickets, products }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Head>
        <title key="title">{concert.title} | Miko</title>
      </Head>
      <Flex direction="column" alignItems="center" p={3}>
        <Box>
          <LiveInformation data={concert} />
          <ConcertTab tickets={tickets} products={products} />
        </Box>
      </Flex>
    </>
  );
}

LiveDetailPage.getLayout = function getLayout(page: ReactElement) {
  return <BasicLayout>{page}</BasicLayout>;
};
