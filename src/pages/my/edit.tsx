import { Box, Button, Center, Flex, FormControl, FormErrorMessage, FormLabel, Heading, Image, Input } from "@chakra-ui/react";
import { S3_URL } from "@src/const";
import MyLayout from "@src/layout/MyLayout";
import { useUser } from "@src/state/swr/useUser";
import { ReactElement, useState } from "react";
import { useForm } from "react-hook-form";

export default function EditPage() {
  const {
    formState: { errors, isSubmitting },
    register,
  } = useForm<{ email: string; name: string }>({ mode: "all" });
  const { data: userData } = useUser();

  const [userName, setName] = useState(userData.name);
  const [userEmail, setEmail] = useState(userData.email);

  const onChangeEmail = e => {
    console.log("dd");
    setEmail(e.target.value);
  };
  const onChangeName = e => {
    console.log("dd");
    setName(e.target.value);
  };

  return (
    <Flex width="full" justifyContent="center" p={4}>
      <Box>
        <Heading fontWeight="700" size="2xl" my="5px">
          My Edit
        </Heading>
        <Box spacing={20} p={12} mt={6} boxShadow="lg">
          <Image src={S3_URL + userData.avatar} fallbackSrc="https://via.placeholder.com/300" />
          <Box>
            <FormControl id="name" isInvalid={!!errors.name}>
              <FormLabel>Name</FormLabel>
              <Input
                onChange={onChangeName}
                value={userName}
                type="text"
                id="name"
                {...register("name", {
                  required: "This is required",
                  minLength: {
                    value: 1,
                    message: "Minimum length should be 1",
                  },
                })}
              />
              <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
            </FormControl>
            <FormControl id="email" isInvalid={!!errors.email}>
              <FormLabel>Email address</FormLabel>
              <Input
                onChange={onChangeEmail}
                value={userEmail}
                type="email"
                id="email"
                {...register("email", {
                  required: "This is required",
                  minLength: {
                    value: 4,
                    message: "Minimum length should be 4",
                  },
                })}
              />
              <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
            </FormControl>

            <Heading as="h5" size="sm" my={2}>
              Coin
            </Heading>
            <Input mb={4} value={`${userData.coin}`} isReadOnly />
            <Center>
              <Button
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                type="submit"
                isLoading={isSubmitting}
              >
                회원수정
              </Button>
            </Center>
          </Box>
        </Box>
      </Box>
    </Flex>
  );
}

EditPage.getLayout = function getLayout(page: ReactElement) {
  return <MyLayout>{page}</MyLayout>;
};
