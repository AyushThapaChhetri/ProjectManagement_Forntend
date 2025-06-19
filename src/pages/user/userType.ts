export type FormValues = {
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
