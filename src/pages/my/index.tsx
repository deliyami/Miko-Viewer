import { Avatar, Badge, Box, Button, Center, Flex, Heading, HStack, Image, Input, Link, Stack, Text, useColorModeValue } from '@chakra-ui/react';
import { S3_URL } from '@src/const';
import BasicLayout from '@src/layout/BasicLayout';
import { useUser } from '@src/state/swr';
import { User } from '@src/types/share/User';
import { FC, ReactElement } from 'react';

const MyCard: FC<{ data: User }> = ({ data }) => {
  // console.log(data);
  return (
    <Flex width="full" justifyContent="center" p={4}>
      <Box>
        <Heading fontWeight="700" size="2xl" my="5px">
          My Page
        </Heading>
        <HStack spacing={20} p={12} mt={6} boxShadow="lg">
          <Image src={S3_URL + data.avatar} fallbackSrc="https://via.placeholder.com/300" />
          <Box>
            <Heading as="h5" size="sm" my={2}>
              Name
            </Heading>
            <Input mb={2} value={data.name} isReadOnly />
            <Heading as="h5" size="sm" my={2}>
              Email
            </Heading>
            <Input mb={2} value={data.email} isReadOnly />
            <Heading as="h5" size="sm" my={2}>
              Coin
            </Heading>
            <Input mb={2} value={`${data.coin}`} isReadOnly />
            <Center>
              <Link href={`/my/edit`}>
                <a>
                  <Button>Edit</Button>
                </a>
              </Link>
            </Center>
          </Box>
        </HStack>
      </Box>
    </Flex>
  );
};

export default function MyPage() {
  const { data: userData } = useUser();
  return (
    <Center py={6}>
      <Box maxW={'320px'} w={'full'} bg={useColorModeValue('white', 'gray.900')} boxShadow={'2xl'} rounded={'lg'} p={6} textAlign={'center'}>
        <Avatar
          size={'xl'}
          src={'https://images.unsplash.com/photo-1520810627419-35e362c5dc07?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ'}
          alt={'Avatar Alt'}
          mb={4}
          pos={'relative'}
          _after={{
            content: '""',
            w: 4,
            h: 4,
            bg: 'green.300',
            border: '2px solid white',
            rounded: 'full',
            pos: 'absolute',
            bottom: 0,
            right: 3,
          }}
        />
        <Heading fontSize={'2xl'} fontFamily={'body'}>
          Lindsey James
        </Heading>
        <Text fontWeight={600} color={'gray.500'} mb={4}>
          @lindsey_jam3s
        </Text>
        <Text textAlign={'center'} color={useColorModeValue('gray.700', 'gray.400')} px={3}>
          Actress, musician, songwriter and artist. PM for work inquires or{' '}
          <Link href={'#'} color={'blue.400'}>
            #tag
          </Link>{' '}
          me in your posts
        </Text>

        <Stack align={'center'} justify={'center'} direction={'row'} mt={6}>
          <Badge px={2} py={1} bg={useColorModeValue('gray.50', 'gray.800')} fontWeight={'400'}>
            #art
          </Badge>
          <Badge px={2} py={1} bg={useColorModeValue('gray.50', 'gray.800')} fontWeight={'400'}>
            #photography
          </Badge>
          <Badge px={2} py={1} bg={useColorModeValue('gray.50', 'gray.800')} fontWeight={'400'}>
            #music
          </Badge>
        </Stack>

        <Stack mt={8} direction={'row'} spacing={4}>
          <Button
            flex={1}
            fontSize={'sm'}
            rounded={'full'}
            _focus={{
              bg: 'gray.200',
            }}
          >
            Message
          </Button>
          <Button
            flex={1}
            fontSize={'sm'}
            rounded={'full'}
            bg={'blue.400'}
            color={'white'}
            boxShadow={'0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'}
            _hover={{
              bg: 'blue.500',
            }}
            _focus={{
              bg: 'blue.500',
            }}
          >
            Follow
          </Button>
        </Stack>
      </Box>
    </Center>
  );
}

MyPage.getLayout = function getLayout(page: ReactElement) {
  return <BasicLayout>{page}</BasicLayout>;
};
