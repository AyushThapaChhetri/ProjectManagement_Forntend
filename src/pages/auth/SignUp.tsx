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
  //   Text,
  HStack,
  Fieldset,
  useMediaQuery,
} from "@chakra-ui/react";
import { PasswordInput } from "@/components/ui/password-input";
import {
  Controller,
  type SubmitHandler,
  useForm,
  // type Resolver,
} from "react-hook-form";

import background from "@/assets/swayambu.png";
import { RadioGroup } from "@chakra-ui/react";
// import { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import axios from "axios";
import api from "@/api/Api";
import { useEffect } from "react";
import { useNavigate } from "react-router";
// import { signUpSchema } from "@/schemas/SignUpSchema";
// import type { InferType } from "yup";
// import { yupResolver } from "@hookform/resolvers/yup";
// type FormValues = InferType<typeof signUpSchema>;

// 1) Define your form’s TypeScript type (matching what you expect to POST)
type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  gender: "male" | "female" | "other";
  dob: Date; // because you send ISO string
  address?: string;
  phone?: string;
  title?: string;
};

const items = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
  { label: "Other", value: "other" },
];

const SignUp = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (refreshToken && refreshToken.trim() !== "") {
      navigate("/");
    }
  });
  const [isShortScreen] = useMediaQuery(["(min-height: 801px)"]);
  const {
    control,
    register,
    handleSubmit,
    setError,
    formState: { errors },
    reset,
  } = useForm<FormValues>();
  // } = useForm({
  //   resolver: yupResolver(signUpSchema),
  // });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const finalData = {
      ...data,
      dob: data.dob instanceof Date ? data.dob.toISOString() : data.dob,
    };
    console.log(finalData); // or send it to the API
    // reset();
    try {
      await api.post("/user/signup", finalData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      // console.log("Signup Success:", response.data);
      toast.success("Registered Successfully");

      reset();
      // } catch (error) {
      // if (axios.isAxiosError(error)) {
      // toast.error(
      //   `${
      //     error.response?.data?.message ||
      //     error.response?.data ||
      //     error.message
      //   }`
      // );

      // }
    } catch (err) {
      if (
        axios.isAxiosError(err) &&
        Array.isArray(err.response?.data?.errors)
      ) {
        err.response!.data.errors.forEach(
          (e: { field: string; message: string }) => {
            setError(e.field as keyof FormValues, {
              type: "server",
              message: e.message,
            });
          }
        );
      } else if (err instanceof Error) {
        console.log(err.message);
      } else {
        console.log("Unknown error occurred");
      }
    }
  };
  return (
    <>
      <Flex
        direction={{ base: "column", md: "row" }}
        height={
          isShortScreen ? { mobile: "100vh" } : { base: "auto", ultra: "100vh" }
        }
        width={{ base: "100%" }}
        bg="cyan.50"
        overflowX="hidden"
        // boxSizing="border-box"
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
          <Card.Root
            bgColor="#f6f6f6"
            border="none"
            shadow="rgba(0, 0, 0, 0.35) 0px 5px 15px"
            // shadow="xl"
            w={{ base: "80%", tablet: "60%" }}
            // maxW="400px"
            // minH={{ base: "auto", md: "400px" }}
            minH={{ base: "auto" }}
          >
            <form onSubmit={handleSubmit(onSubmit)}>
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
                <Stack gap="5">
                  <HStack>
                    <Field.Root
                      invalid={!!errors.firstName}
                      width={{ base: "100%" }}
                      // required
                    >
                      <Field.Label fontSize={{ base: "sm", md: "sm" }}>
                        First Name
                        {/* <Field.RequiredIndicator /> */}
                      </Field.Label>
                      <Input
                        placeholder="First Name"
                        size={{ base: "sm", md: "md" }}
                        fontSize="16px"
                        {...register("firstName")}
                      />
                      <Field.ErrorText color="red" fontSize="xs">
                        {errors.firstName?.message}
                      </Field.ErrorText>
                    </Field.Root>
                    <Field.Root
                      invalid={!!errors.lastName}
                      width={{ base: "100%" }}
                      // required
                    >
                      <Field.Label fontSize={{ base: "sm", md: "sm" }}>
                        Last Name
                        {/* <Field.RequiredIndicator /> */}
                      </Field.Label>
                      <Input
                        placeholder="Last Name"
                        size={{ base: "sm", md: "md" }}
                        fontSize="16px"
                        {...register("lastName")}
                      />
                      <Field.ErrorText color="red" fontSize="xs">
                        {errors.lastName?.message}
                      </Field.ErrorText>
                    </Field.Root>
                  </HStack>
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
                      {/* <Field.RequiredIndicator /> */}
                    </Field.Label>
                    <PasswordInput
                      fontSize="16px"
                      size={{ base: "sm", md: "md" }}
                      {...register("password")}
                    />
                    <Field.ErrorText color="red" fontSize="xs">
                      {errors.password?.message}
                    </Field.ErrorText>
                  </Field.Root>
                  <Field.Root
                    invalid={!!errors.confirmPassword}
                    // required
                  >
                    <Field.Label fontSize={{ base: "sm", md: "sm" }}>
                      Confirm Password
                      {/* <Field.RequiredIndicator /> */}
                    </Field.Label>
                    <PasswordInput
                      fontSize="16px"
                      size={{ base: "sm", md: "md" }}
                      {...register("confirmPassword")}
                    />
                    <Field.ErrorText color="red" fontSize="xs">
                      {errors.confirmPassword?.message}
                    </Field.ErrorText>
                  </Field.Root>

                  <Fieldset.Root invalid={!!errors.gender}>
                    <Fieldset.Legend>Select Gender</Fieldset.Legend>
                    <Controller
                      name="gender"
                      control={control}
                      render={({ field }) => (
                        <RadioGroup.Root
                          name={field.name}
                          value={field.value}
                          onValueChange={({ value }) => {
                            field.onChange(value);
                          }}
                        >
                          <HStack gap="6">
                            {items.map((item) => (
                              <RadioGroup.Item
                                key={item.value}
                                value={item.value}
                              >
                                <RadioGroup.ItemHiddenInput
                                  onBlur={field.onBlur}
                                />
                                <RadioGroup.ItemIndicator />
                                <RadioGroup.ItemText>
                                  {item.label}
                                </RadioGroup.ItemText>
                              </RadioGroup.Item>
                            ))}
                          </HStack>
                        </RadioGroup.Root>
                      )}
                    />

                    {errors.gender && (
                      <Fieldset.ErrorText>
                        {errors.gender?.message}
                      </Fieldset.ErrorText>
                    )}
                  </Fieldset.Root>
                  <Field.Root
                    invalid={!!errors.dob}
                    width={{ base: "100%" }}
                    // required
                  >
                    <Field.Label fontSize={{ base: "sm", md: "sm" }}>
                      Dob
                      {/* <Field.RequiredIndicator /> */}
                    </Field.Label>
                    <Controller
                      name="dob"
                      control={control}
                      defaultValue={undefined}
                      render={({ field }) => (
                        <DatePicker
                          selected={field.value}
                          onChange={field.onChange}
                          onBlur={field.onBlur}
                          dateFormat="yyyy-MM-dd"
                        />
                      )}
                    />
                    {errors.dob && (
                      <Field.ErrorText color="red" fontSize="xs">
                        {errors.dob?.message}
                      </Field.ErrorText>
                    )}
                  </Field.Root>
                  <Field.Root
                    invalid={!!errors.address}
                    width={{ base: "100%" }}
                  >
                    <Field.Label fontSize={{ base: "sm", md: "sm" }}>
                      Address
                    </Field.Label>
                    <Input
                      placeholder="Address"
                      size={{ base: "sm", md: "md" }}
                      fontSize="16px"
                      {...register("address")}
                    />
                    <Field.ErrorText color="red" fontSize="xs">
                      {errors.address?.message}
                    </Field.ErrorText>
                  </Field.Root>
                  <Field.Root invalid={!!errors.phone} width={{ base: "100%" }}>
                    <Field.Label fontSize={{ base: "sm", md: "sm" }}>
                      Phone Number
                    </Field.Label>
                    <Input
                      placeholder="Phone no."
                      size={{ base: "sm", md: "md" }}
                      fontSize="16px"
                      {...register("phone")}
                    />
                    <Field.ErrorText color="red" fontSize="xs">
                      {errors.phone?.message}
                    </Field.ErrorText>
                  </Field.Root>
                  <Field.Root invalid={!!errors.title} width={{ base: "100%" }}>
                    <Field.Label fontSize={{ base: "sm", md: "sm" }}>
                      Job Title
                    </Field.Label>
                    <Input
                      placeholder="Job Title"
                      size={{ base: "sm", md: "md" }}
                      fontSize="16px"
                      {...register("title")}
                    />
                    <Field.ErrorText color="red" fontSize="xs">
                      {errors.title?.message}
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
                    Sign Up
                  </Button>
                </Flex>
              </Card.Footer>
            </form>
          </Card.Root>
        </Center>
      </Flex>
    </>
  );
};

export default SignUp;
