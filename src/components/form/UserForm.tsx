import {
  Button,
  Field,
  Fieldset,
  Flex,
  HStack,
  Input,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";
// import axios from "axios";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { PasswordInput } from "../ui/password-input";
import DatePicker from "react-datepicker";
import type { FormValues } from "@/pages/user/userType";
import "react-datepicker/dist/react-datepicker.css";
import type { ApiError } from "@/pages/auth/SignUp";

const items = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
  { label: "Other", value: "other" },
];

interface UserFormProps {
  onSubmit: (data: FormValues) => Promise<ApiError[] | undefined>;
  mode: "create" | "edit" | "signup";
  defaultValues?: Partial<FormValues>;
}

const UserForm = ({ onSubmit, mode, defaultValues }: UserFormProps) => {
  const {
    control,
    register,
    handleSubmit,
    setError,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    defaultValues: defaultValues || {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      gender: undefined,
      dob: undefined,
      address: "",
      phone: "",
      title: "",
    },
  });
  // } = useForm({
  //   resolver: yupResolver(signUpSchema),
  // });

  const handleFormSubmit: SubmitHandler<FormValues> = async (data) => {
    // try {
    const fieldErrors = await onSubmit(data);
    // If the parent returned some field errors, set them on the form:
    if (fieldErrors?.length) {
      fieldErrors.forEach((error) => {
        setError(error.field as keyof FormValues, {
          type: "server",
          message: error.message,
        });
      });
      return; // stop here, don’t reset or close
    } else {
      reset(); // Reset form on success
    }
  };

  return (
    <>
      <form id="user-form" onSubmit={handleSubmit(handleFormSubmit)}>
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
          {(mode === "create" || mode === "signup") && (
            <>
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
            </>
          )}
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
                      <RadioGroup.Item key={item.value} value={item.value}>
                        <RadioGroup.ItemHiddenInput onBlur={field.onBlur} />
                        <RadioGroup.ItemIndicator />
                        <RadioGroup.ItemText>{item.label}</RadioGroup.ItemText>
                      </RadioGroup.Item>
                    ))}
                  </HStack>
                </RadioGroup.Root>
              )}
            />

            {errors.gender && (
              <Fieldset.ErrorText>{errors.gender?.message}</Fieldset.ErrorText>
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
          <HStack>
            <Field.Root invalid={!!errors.address} width={{ base: "100%" }}>
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
          </HStack>
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
        {mode === "signup" && (
          <Flex direction="column" align="center" width="100%" gap="4" mt="4">
            <Button
              bgColor="#6822ef"
              color="white"
              width="100%"
              type="submit"
              //   onClick={handleSubmit(handleFormSubmit)}
            >
              Submit
            </Button>
          </Flex>
        )}
      </form>
    </>
  );
};

export default UserForm;
