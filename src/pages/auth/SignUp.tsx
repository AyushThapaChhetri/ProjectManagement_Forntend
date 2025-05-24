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
// import { yupResolver } from "@hookform/resolvers/yup";
import background from "@/assets/swayambu.png";
import { signUpSchema } from "@/schemas/SignUpSchema";
import { RadioGroup } from "@chakra-ui/react";
import type { InferType } from "yup";
// import { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import axios from "axios";
import api from "@/api/Api";
type FormValues = InferType<typeof signUpSchema>;

// Explicitly define our FormValues type, making sure optionality is correct
// interface FormValues extends FormValuesFromSchema {}
// interface FormValues {
//   firstName: string;
//   lastName: string;
//   email: string;
//   password: string;
//   confirmPassword: string;
//   gender: "male" | "female" | "other";
//   dob: Date;
//   address?: string;
//   phone?: string;
//   title?: string;
// }

const items = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
  { label: "Other", value: "other" },
];

const SignUp = () => {
  const [isShortScreen] = useMediaQuery(["(min-height: 801px)"]);
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
    // } = useForm<FormValues>();
  } = useForm({
    resolver: yupResolver(signUpSchema),
  });
  // } = useForm<FormValues>({
  //   resolver: yupResolver(signUpSchema),
  // });
  // } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const finalData = {
      ...data,
      dob: data.dob instanceof Date ? data.dob.toISOString() : data.dob,
    };
    console.log(finalData); // or send it to the API
    reset();
    try {
      // const response = await axios.post("http://localhost:5000/api/signup", values, {
      // await axios.post("http://localhost:5000/api/user/signup",
      //   finalData, {
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // });

      await api.post("/user/signup", finalData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      // console.log("Signup Success:", response.data);
      toast.success("Registered Successfully");
      reset();

      // Optional: Add success handling
      // alert("Signup successful!");
      // redirect to another page if needed
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(
          `${
            error.response?.data?.message ||
            error.response?.data ||
            error.message
          }`
        );
      } else if (error instanceof Error) {
        console.log(error.message);
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
        // height={{ base: "100vh", wide: "auto", ultra: "100vh" }}
        // height={{ base: "100%" }}
        // height={{ ultra: "100vh" }}
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
                <Stack
                  // spaceY="10px"
                  gap="5"
                  // height="100%"
                  // maxH={{ base: "60vh", md: "none" }}
                  // overflowY="auto"
                >
                  <HStack>
                    <Field.Root
                      invalid={!!errors.firstName}
                      width={{ base: "100%" }}
                      required
                    >
                      <Field.Label fontSize={{ base: "sm", md: "sm" }}>
                        First Name
                        <Field.RequiredIndicator />
                      </Field.Label>
                      <Input
                        placeholder="First Name"
                        size={{ base: "sm", md: "md" }}
                        {...register("firstName")}
                      />
                      <Field.ErrorText color="red" fontSize="xs">
                        {errors.firstName?.message}
                      </Field.ErrorText>
                    </Field.Root>
                    <Field.Root
                      invalid={!!errors.lastName}
                      width={{ base: "100%" }}
                      required
                    >
                      <Field.Label fontSize={{ base: "sm", md: "sm" }}>
                        Last Name
                        <Field.RequiredIndicator />
                      </Field.Label>
                      <Input
                        placeholder="Last Name"
                        size={{ base: "sm", md: "md" }}
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
                    required
                  >
                    <Field.Label fontSize={{ base: "sm", md: "sm" }}>
                      Email
                      <Field.RequiredIndicator />
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
                      <Field.RequiredIndicator />
                    </Field.Label>
                    <PasswordInput
                      size={{ base: "sm", md: "md" }}
                      {...register("password")}
                    />
                    <Field.ErrorText color="red" fontSize="xs">
                      {errors.password?.message}
                    </Field.ErrorText>
                  </Field.Root>
                  <Field.Root invalid={!!errors.confirmPassword} required>
                    <Field.Label fontSize={{ base: "sm", md: "sm" }}>
                      Confirm Password
                      <Field.RequiredIndicator />
                    </Field.Label>
                    <PasswordInput
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
                    required
                  >
                    <Field.Label fontSize={{ base: "sm", md: "sm" }}>
                      Dob
                      <Field.RequiredIndicator />
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
