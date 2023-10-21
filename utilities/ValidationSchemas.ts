import { object, string } from "yup";

const email = string()
  .email("Please enter a valid email address")
  .required("Email field is required");
const password = string()
  .min(6, "Minimun of 6 characters for the password")
  .max(255)
  .required("Password field is required");
const username = string()
  .min(3, "Minimun of 3 characters for the username")
  .max(255)
  .required("Username field is required");

export const signinSchema = object({
  email,
  password,
});
export const signupSchema = object({
  username,
  email,
  password,
});
export const updateUsernameSchema = object({
  username,
});

export const rantSchema = object({
  rant_title: string()
    .min(3, "Minimun of 3 characters for the rant title")
    .max(255)
    .required("Rant title field is required"),
  rant_content: string()
    .min(3, "Minimun of 3 characters for the rant content")
    .max(255)
    .required("Rant content field is required"),
});
