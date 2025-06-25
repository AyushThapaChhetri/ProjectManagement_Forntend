import { Box, Card, Center, Flex, Link } from "@chakra-ui/react";

import background from "@/assets/swayambu.png";

import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import axios from "axios";
import api from "@/api/Api";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import UserForm from "@/components/form/UserForm";
import type { FormValues } from "../user/userType";
// import { signUpSchema } from "@/schemas/SignUpSchema";
// import type { InferType } from "yup";
// import { yupResolver } from "@hookform/resolvers/yup";
// type FormValues = InferType<typeof signUpSchema>;

// 1) Define your form’s TypeScript type (matching what you expect to POST)
// type FormValues = {
//   firstName: string;
//   lastName: string;
//   email: string;
//   password: string;
//   confirmPassword: string;
//   gender: "male" | "female" | "other";
//   dob: Date; // because you send ISO string
//   address?: string;
//   phone?: string;
//   title?: string;
// };

// const items = [
//   { label: "Male", value: "male" },
//   { label: "Female", value: "female" },
//   { label: "Other", value: "other" },
// ];

export type ApiError = {
  field: string;
  message: string;
};

const SignUp = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (refreshToken && refreshToken.trim() !== "") {
      navigate("/");
    }
  });

  // const {
  //   control,
  //   register,
  //   handleSubmit,
  //   setError,
  //   formState: { errors },
  //   reset,
  // } = useForm<FormValues>();

  // const onSubmit: SubmitHandler<FormValues> = async (
  const onSubmit = async (
    data: FormValues
  ): Promise<ApiError[] | undefined> => {
    const finalData = {
      ...data,
      dob: data.dob instanceof Date ? data.dob.toISOString() : data.dob,
    };
    console.log(finalData); // or send it to the API
    try {
      await api.post("/user/signup", finalData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      // console.log("Signup Success:", response.data);
      toast.success("Registered Successfully");
      navigate("/login");
      return undefined;

      // reset();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        const respData = error.response?.data;

        // 422 validation errors (Yup)
        if (status === 422 && Array.isArray(respData.errors)) {
          return respData.errors as ApiError[];
        }

        // 409 conflict: Email already exists
        if (status === 409 && typeof respData.message === "string") {
          return [{ field: "email", message: respData.message }];
        }
      }

      toast.error("An error occurred during signup");
      return undefined;
    }
  };
  return (
    <>
      <Flex
        direction={{ base: "column", md: "row" }}
        h={"100vh"}
        width={{ base: "100%" }}
        maxW={"3200px"}
        bg="cyan.50"
        // overflowX="hidden"
        overflow="hidden"
      >
        <Box
          height={{ base: "auto" }}
          width={{ base: "100%", md: "50%" }}
          display={{ base: "none", wide: "block" }}
          flexShrink={0}
          bgClip="border-box"
          bgSize="cover"
          bgRepeat="no-repeat"
          bgImage={`url(${background})`}
        ></Box>
        <Center
          flex={1}
          w={{ base: "100%", md: "50%" }}
          minH={{ base: "600px", md: "auto" }}
          py={{ base: 4, md: 8 }}
          bgColor="gray.300"
          // bgColor="green"
          // overflow="hidden"
        >
          <Card.Root
            // bgColor="#f6f6f6"
            // bgColor="blue.200"
            colorPalette={"gray"}
            border="none"
            shadow="rgba(0, 0, 0, 0.35) 0px 5px 15px"
            w={{ base: "80%", tablet: "60%" }}
            h={"90%"}
            maxH={"fit-content"}
            overflow={"auto"}
            css={{
              "&::-webkit-scrollbar": {
                borderRadius: "8px",
                width: "8px",
              },
              "&::-webkit-scrollbar-thumb": {
                background: "#888", // color of the scrollbar thumb
                borderRadius: "8px",
              },
              "&::-webkit-scrollbar-thumb:hover": {
                background: "#555", // on hover
              },
              "&::-webkit-scrollbar-track": {
                background: "#f1f1f1", // background of scrollbar
              },
            }}
            // minH={{ base: "auto" }}
          >
            {/* <form onSubmit={handleSubmit(onSubmit)}> */}
            <Card.Header pb={{ base: 2, md: 4 }}>
              <Card.Title
                fontFamily="mono"
                fontSize={{ base: "xl", md: "2xl" }}
              >
                Sign Up
              </Card.Title>
              <Card.Description fontFamily="mono" color="gray">
                Already a member?&nbsp;
                <Link variant="underline" href="login" color="blue">
                  Login
                </Link>
              </Card.Description>
            </Card.Header>
            <Card.Body pt={0}>
              <UserForm mode="signup" onSubmit={onSubmit} />
            </Card.Body>
          </Card.Root>
        </Center>
      </Flex>
    </>
  );
};

export default SignUp;
