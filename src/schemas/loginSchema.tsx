import * as Yup from "yup";

export const loginSchema = Yup.object({
  email: Yup.string()
    .email("Please Enter Valid Email")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Please Enter Valid Email"
    )
    .required("Please Enter Email"),
  password: Yup.string().required("Please Enter Password"),
});
