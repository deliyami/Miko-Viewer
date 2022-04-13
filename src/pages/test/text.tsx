import { Center, Divider, Heading, Stack, Text } from '@chakra-ui/react';

const TextTestPage = () => {
  return (
    <Center flexDir="column">
      <Text fontSize="6xl">(6xl) In love with React & Next</Text>
      <Text fontSize="5xl">(5xl) In love with React & Next</Text>
      <Text fontSize="4xl">(4xl) In love with React & Next</Text>
      <Text fontSize="3xl">(3xl) In love with React & Next</Text>
      <Text fontSize="2xl">(2xl) In love with React & Next</Text>
      <Text fontSize="xl">(xl) In love with React & Next</Text>
      <Text fontSize="lg">(lg) In love with React & Next</Text>
      <Text fontSize="md">(md) In love with React & Next</Text>
      <Text fontSize="sm">(sm) In love with React & Next</Text>
      <Text fontSize="xs">(xs) In love with React & Next</Text>
      <Divider />
      <Stack spacing={6}>
        <Heading as="h1" size="4xl" isTruncated>
          (4xl) In love with React & Next
        </Heading>
        <Heading as="h2" size="3xl" isTruncated>
          (3xl) In love with React & Next
        </Heading>
        <Heading as="h2" size="2xl">
          (2xl) In love with React & Next
        </Heading>
        <Heading as="h2" size="xl">
          (xl) In love with React & Next
        </Heading>
        <Heading as="h3" size="lg">
          (lg) In love with React & Next
        </Heading>
        <Heading as="h4" size="md">
          (md) In love with React & Next
        </Heading>
        <Heading as="h5" size="sm">
          (sm) In love with React & Next
        </Heading>
        <Heading as="h6" size="xs">
          (xs) In love with React & Next
        </Heading>
      </Stack>
      <Divider />
      <Text as="i">Italic</Text>
      <br />
      <Text as="u">Underline</Text>
      <br />
      <Text as="abbr">I18N</Text>
      <br />
      <Text as="cite">Citation</Text>
      <br />
      <Text as="del">Deleted</Text>
      <br />
      <Text as="em">Emphasis</Text>
      <br />
      <Text as="ins">Inserted</Text>
      <br />
      <Text as="kbd">Ctrl + C</Text>
      <br />
      <Text as="mark">Highlighted</Text>
      <br />
      <Text as="s">Strikethrough</Text>
      <br />
      <Text as="samp">Sample</Text>
      <br />
      <Text as="sub">sub</Text>
      <br />
      <Text as="sup">sup</Text>
    </Center>
  );
};

export default TextTestPage;
