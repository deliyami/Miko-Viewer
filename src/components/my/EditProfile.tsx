import { SmallCloseIcon } from '@chakra-ui/icons';
import { Avatar, AvatarBadge, Button, Center, Flex, FormControl, FormLabel, Heading, IconButton, Image, Input, Stack } from '@chakra-ui/react';
import { S3_URL } from '@src/const';
import { useUser } from '@src/state/swr';

const EditProfile = () => {
  const { data: userData } = useUser();
  return (
    <Flex direction={{ base: 'column', md: 'row' }} justify={{ base: 'center', md: 'space-between' }} align={{ base: 'center', md: 'end' }} ml={{ base: 0, sm: '10' }} px={10}>
      <Stack spacing={4} w={'full'}>
        <Heading mb={5} fontSize={{ base: '2xl', sm: '4xl' }}>
          User Profile Edit
        </Heading>
        <FormControl id="userName">
          <FormLabel>User Avatar</FormLabel>
          <Stack direction={['column', 'row']} spacing={6}>
            <Center>
              <Avatar size="2xl" src={S3_URL + userData.avatar}>
                <AvatarBadge as={IconButton} size="sm" rounded="full" top="-10px" colorScheme="red" aria-label="remove Image" icon={<SmallCloseIcon />} />
              </Avatar>
            </Center>
            <Center w="full">
              <Button w="full">Change Avatar</Button>
            </Center>
          </Stack>
        </FormControl>
        <FormControl id="userName" isRequired>
          <FormLabel>User name</FormLabel>
          <Input placeholder="name" _placeholder={{ color: 'gray.500' }} type="text" />
        </FormControl>
        <FormControl id="email" isRequired>
          <FormLabel>Email address</FormLabel>
          <Input placeholder="email@example.com" _placeholder={{ color: 'gray.500' }} type="email" />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <Input placeholder="password" _placeholder={{ color: 'gray.500' }} type="password" />
        </FormControl>
        <Stack spacing={6} direction={['column', 'row']}>
          <Button
            bg={'red.400'}
            color={'white'}
            w="full"
            _hover={{
              bg: 'red.500',
            }}
          >
            Cancel
          </Button>
          <Button
            bg={'cyan.400'}
            color={'white'}
            w="full"
            _hover={{
              bg: 'cyan.500',
            }}
          >
            Submit
          </Button>
        </Stack>
      </Stack>
      <Image mb={10} display={{ base: 'none', md: 'center' }} minW="40vh" maxW="55vh" src={S3_URL + 'logo/color=simple.svg'} opacity="30%" alt="miko-loco" />
    </Flex>
  );
};

export default EditProfile;
