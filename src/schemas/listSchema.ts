import * as yup from "yup";

export const listSchema = yup.object({
  name: yup.string().required(),
});
