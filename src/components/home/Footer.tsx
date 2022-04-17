import { Box, Container, Heading, Icon, Stack, Text } from '@chakra-ui/react';
import { FaInstagram } from '@react-icons/all-files/fa/FaInstagram';
import { FaTwitter } from '@react-icons/all-files/fa/FaTwitter';
import { FaYoutube } from '@react-icons/all-files/fa/FaYoutube';
import dayjs from 'dayjs';
import Link from 'next/link';

export default function SmallWithLogoLeft() {
  const nowYear = dayjs(new Date()).format('YYYY');

  return (
    <Box bg="#F7FAFC" ml={{ base: 0, md: 60 }} p={10}>
      <Container
        as={Stack}
        maxW={'6xl'}
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
        <Text fontSize="sm" color="#525252">
          {nowYear} © MIKO Group
        </Text>
      </Container>
    </Box>
  );
}
