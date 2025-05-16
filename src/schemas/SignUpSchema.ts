import * as Yup from "yup";

export const signUpSchema = Yup.object().shape({
  firstName: Yup.string()
    .trim()
    .min(2, "First name is too short")
    .max(30, "First name is too long")
    .required("Please enter your first name"),

  lastName: Yup.string()
    .trim()
    .min(2, "Last name is too short")
    .max(30, "Last name is too long")
    .required("Please enter your last name"),
  email: Yup.string()
    .trim()
    .email("Please Enter Valid Email")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Please Enter Valid Email"
    )
    .required("Please Enter Email"),
  password: Yup.string()
    .trim()
    .min(6, "Password must be at least 6 characters")
    .matches(/[a-z]/, "Password must contain at least 1 lower case letter") // for lowercase letters
    .matches(/[A-Z]/, "Password must contain at least 1 upper case letter") // for uppercase letters
    .matches(/\d/, "Password must contain at least 1 number") // for numbers
    .matches(/[\W_]/, "Password must contain at least 1 special character") // for special characters
    .required("Please Enter Password"),
  confirmPassword: Yup.string()
    .trim()
    .oneOf([Yup.ref("password"), undefined], "Password must match")
    .required("Enter Confirm Password"),
  gender: Yup.string()
    .trim()
    .oneOf(["male", "female", "other"], "Invalid gender selection")
    .required("Please Select Your Gender"),
  dob: Yup.date()
    .required("Please select your date of birth")
    .max(new Date(), "Date of birth cannot be in the future"),

  address: Yup.string()
    .trim()
    .transform((value) => (value === "" ? undefined : value))
    .optional(),

  phone: Yup.string()
    .trim()
    .transform((value) => (value === "" ? undefined : value))
    .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
    .optional(),

  title: Yup.string()
    .trim()
    .transform((value) => (value === "" ? undefined : value))
    .optional(),
});
