// import { loginSchema } from "../../schemas/loginSchema";
import { loginSchema } from "@/schemas/loginSchema";
import {
  Box,
  Button,
  Card,
  Center,
  Field,
  Flex,
  // Heading,
  Input,
  Stack,
  // VStack,
} from "@chakra-ui/react";
import { PasswordInput } from "@/components/ui/password-input";
import { type SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import background from "@/assets/management.png";
// import { FaEye } from "react-icons/fa";
// import { FaEyeSlash } from "react-icons/fa";
// import { useState } from "react";
// import { toast } from "react-toastify";
// import axios, { AxiosError } from "axios";

interface FormValues {
  email: string;
  password: string;
}

const Login = () => {
  // const [passwordShowLogin, setPasswordShowLogin] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(loginSchema),
  });
  const onSubmit: SubmitHandler<FormValues> = (data) => console.log(data);
  return (
    <>
      <Flex
        direction={{ base: "column", md: "row" }}
        height={{ base: "auto", md: "100vh" }}
        width={{ base: "100%" }}
        bg="cyan.50"
        overflowX="hidden"
      >
        <Box
          height={{ base: "380px", md: "100%" }}
          width={{ base: "100%", md: "50%" }}
          flexShrink={0}
          bgClip="border-box"
          bgSize="cover"
          bgRepeat="no-repeat"
          bgImage={`url(${background})`}
          // display={{ base: "none", md: "block" }}
        ></Box>
        {/* <Flex
          direction={{ base: "column", md: "row" }}
          height={{ base: "50%", md: "100%" }}
          width={{ base: "100%", md: "50%" }}
          justify="center"
          align="center"
        > */}
        <Center
          flex={1}
          w={{ base: "100%", md: "50%" }}
          minH={{ base: "600px", md: "auto" }}
          overflowY="auto"
          py={{ base: 4, md: 8 }}
          bgColor="gray.300"
        >
          <Card.Root
            bgColor="#f6f6f6"
            border="none"
            shadow="rgba(0, 0, 0, 0.35) 0px 5px 15px"
            // shadow="xl"
            w="80%"
            maxW="400px"
            // minH={{ base: "auto", md: "400px" }}
            minH={{ base: "auto" }}
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <Card.Header pb={{ base: 2, md: 4 }}>
                <Card.Title
                  fontFamily="mono"
                  fontSize={{ base: "xl", md: "2xl" }}
                >
                  Login
                </Card.Title>
                <Card.Description fontFamily="mono" color="gray">
                  We suggest using the email address you use at work.
                </Card.Description>
              </Card.Header>
              <Card.Body pt={0}>
                <Stack
                  // spaceY="10px"
                  gap="5"
                  // height="100%"
                  // maxH={{ base: "60vh", md: "none" }}
                  // overflowY="auto"
                >
                  <Field.Root
                    invalid={!!errors.email}
                    width={{ base: "100%" }}
                    required
                  >
                    <Field.Label fontSize={{ base: "sm", md: "sm" }}>
                      Email
                    </Field.Label>
                    <Input
                      placeholder="me@example.com"
                      size={{ base: "sm", md: "md" }}
                      {...register("email")}
                    />
                    <Field.ErrorText color="red" fontSize="xs">
                      {errors.email?.message}
                    </Field.ErrorText>
                  </Field.Root>
                  <Field.Root invalid={!!errors.password} required>
                    <Field.Label fontSize={{ base: "sm", md: "sm" }}>
                      Password
                    </Field.Label>
                    <PasswordInput
                      size={{ base: "sm", md: "md" }}
                      {...register("password")}
                    />
                    <Field.ErrorText color="red" fontSize="xs">
                      {errors.password?.message}
                    </Field.ErrorText>
                  </Field.Root>
                </Stack>
              </Card.Body>
              <Card.Footer pt={1} pb={10}>
                <Button
                  bgColor="#6822ef"
                  _active={{ bg: "blue.300" }}
                  color="white"
                  width="100%"
                  type="submit"
                >
                  Login
                </Button>
              </Card.Footer>
            </form>
          </Card.Root>
        </Center>
      </Flex>
    </>
  );
};

export default Login;
