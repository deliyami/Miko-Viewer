import { Box, Container, Heading, Icon, Stack, Text } from '@chakra-ui/react';
import dayjs from 'dayjs';
import Link from 'next/link';
import { FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

export default function SmallWithLogoLeft() {
  const nowYear = dayjs(new Date()).format('YYYY');

  return (
    <Box bg="#F7FAFC" ml={60} p={10}>
      <Container
        as={Stack}
        maxW={'6xl'}
        direction="row"
        direction={{ base: 'column', md: 'row' }}
        spacing={4}
        justify={{ base: 'center', md: 'space-between' }}
        align={{ base: 'center', md: 'center' }}
      >
        <Heading>MIKO</Heading>
        <Stack direction={'row'} spacing={6}>
          <Link href={'/'}>
            <a>Home</a>
          </Link>
          <Link href={'/concerts'}>
            <a>List</a>
          </Link>
          <Link href={'/my'}>
            <a>MyPage</a>
          </Link>
          <Link href={'/'}>
            <a>Contact</a>
          </Link>
        </Stack>
        <Stack direction={'row'} spacing={5}>
          <Icon as={FaYoutube} color="red" boxSize={5} />
          <Icon as={FaInstagram} color="pink.500" boxSize={5} />
          <Icon as={FaTwitter} color="cyan.500" boxSize={5} />
        </Stack>
      </Container>
      <Container as={Stack} maxW={'6xl'} align="start">
        <Text fontSize="sm" color="grey">
          {nowYear} © MIKO Group
        </Text>
      </Container>
    </Box>
  );
}
