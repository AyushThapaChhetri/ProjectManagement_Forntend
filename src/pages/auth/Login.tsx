// import { loginSchema } from "../../schemas/loginSchema";
import { loginSchema } from "@/schemas/loginSchema";
import {
  Box,
  Button,
  Card,
  Center,
  Field,
  Flex,
  Link,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { PasswordInput } from "@/components/ui/password-input";
import { type SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import background from "@/assets/management.png";
import { FaHome } from "react-icons/fa";
import api from "@/api/Api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import axios from "axios";

interface FormValues {
  email: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (refreshToken && refreshToken.trim() !== "") {
      navigate("/");
    }
  });

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(loginSchema),
  });
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const response = await api.post("/auth/login", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      // console.log("Login Success:", response.data);
      // console.log("User Details:", response.data.user)
      // console.log(response.data.token);
      // const token = response.data.token;
      // console.log(response.data.data)
      const { accessToken, refreshToken } = response.data.data;

      // console.log("Access Token: ", accessToken);
      // console.log("Refresh Token: ", refreshToken);

      // localStorage.setItem("authToken", token);
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      navigate("/");
      toast.success("Logged In Successfully");
      reset();
    } catch (error: unknown) {
      // console.log("Caught error:", error);

      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.message ||
          error.response?.data ||
          error.message ||
          "An unknown error occurred";
        toast.error(message);
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else if (typeof error === "string") {
        toast.error(error);
      } else {
        toast.error("An unknown error occurred.");
      }
    }
  };
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

        <Center
          flex={1}
          w={{ base: "100%", md: "50%" }}
          minH={{ base: "600px", md: "auto" }}
          overflowY="auto"
          py={{ base: 4, md: 8 }}
          bgColor="gray.300"
        >
          <Link
            href="/"
            // color="blue"
            position="absolute"
            top={{ base: "40%", md: "0" }}
            left={{ base: "2%", md: "51%" }}
          >
            <FaHome />
            Home
          </Link>
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
                    // required
                  >
                    <Field.Label fontSize={{ base: "sm", md: "sm" }}>
                      Email
                      {/* <Field.RequiredIndicator /> */}
                    </Field.Label>
                    <Input
                      placeholder="me@example.com"
                      size={{ base: "sm", md: "md" }}
                      fontSize="16px"
                      {...register("email")}
                    />
                    <Field.ErrorText color="red" fontSize="xs">
                      {errors.email?.message}
                    </Field.ErrorText>
                  </Field.Root>
                  <Field.Root
                    invalid={!!errors.password}
                    // required
                  >
                    <Field.Label fontSize={{ base: "sm", md: "sm" }}>
                      Password
                      <Field.RequiredIndicator />
                    </Field.Label>
                    <PasswordInput
                      size={{ base: "sm", md: "md" }}
                      fontSize="16px"
                      {...register("password")}
                    />
                    <Field.ErrorText color="red" fontSize="xs">
                      {errors.password?.message}
                    </Field.ErrorText>
                  </Field.Root>
                </Stack>
              </Card.Body>
              <Card.Footer pt={1} pb={10}>
                <Flex
                  direction="column"
                  align="center"
                  // border="2px solid black"
                  width="100%"
                  gap="4"
                >
                  <Button
                    bgColor="#6822ef"
                    _active={{ bg: "blue.300" }}
                    color="white"
                    width="100%"
                    type="submit"
                  >
                    Login
                  </Button>
                  <Text>
                    Don't have an Account? Click Here&nbsp;
                    <Link variant="underline" href="signUp" color="blue">
                      SignUp!
                    </Link>
                  </Text>
                </Flex>
              </Card.Footer>
            </form>
          </Card.Root>
        </Center>
      </Flex>
    </>
  );
};

export default Login;
