import { object, string } from "yup";

export const authSchema = object({
  email: string()
    .email("Please enter a valid email address")
    .required("Email field is required"),
  password: string()
    .min(6, "Minimun of 6 characters for the password")
    .max(255)
    .required("Password field is required"),
});
