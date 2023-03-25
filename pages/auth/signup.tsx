import { FirebaseAuth } from "@/firebase/Firebase-Client";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { authSchema } from "@/utilities/ValidationSchemas";
import { useFormik } from "formik";
import { useState } from "react";
import { toast } from "react-toastify";
import useGoogleSignInRouter from "@/utilities/hooks/useGoogleSignInRouter";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import useAuthStateRouter from "@/utilities/hooks/useAuthStateRouter";

const SignInPage = () => {
  const { user, router } = useAuthStateRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async () => {
    setIsLoading(true);
    const { email, password } = formik.values;
    try {
      await createUserWithEmailAndPassword(FirebaseAuth, email, password);
      router.push("/");
    } catch (e) {
      toast.error("Failed to create account");
    }
    setIsLoading(false);
  };

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    onSubmit: handleSignUp,
    validationSchema: authSchema,
  });

  const emailErrors = formik.touched.email && formik.errors.email;
  const passwordErrors = formik.touched.password && formik.errors.password;

  if (user) {
    router.push("/");
    return <></>;
  }
  return (
    <Container maxWidth="md" sx={{ marginTop: "5vh" }}>
      <Box
        onSubmit={formik.handleSubmit}
        component="form"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          backgroundColor: "#f0e2bf",
          borderRadius: "2px",
          padding: "1em",
          paddingY: "2em",
          gap: "1em",
        }}
      >
        <Typography
          variant="h2"
          fontWeight={500}
          color="primary"
          textAlign="center"
          fontSize={{ xs: "1.5rem", sm: "2rem", md: "3.5rem" }}
        >
          Sign Up
        </Typography>
        <TextField
          name="email"
          label="Email"
          variant="filled"
          sx={{ width: "100%", maxWidth: "400px" }}
          error={!!emailErrors}
          helperText={emailErrors}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <TextField
          name="password"
          label="Password"
          variant="filled"
          type="password"
          sx={{ width: "100%", maxWidth: "400px" }}
          error={!!passwordErrors}
          helperText={passwordErrors}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <Button
          type="submit"
          variant="contained"
          sx={{
            width: "100%",
            maxWidth: "400px",
            fontSize: "15px",
            color: "white",
          }}
        >
          {isLoading ? (
            <CircularProgress size={26.5} color="inherit" />
          ) : (
            "Create New Account"
          )}
        </Button>
        <Button onClick={() => router.push("/auth/signin")}>
          Already have an account? Sign In
        </Button>
      </Box>
    </Container>
  );
};

export default SignInPage;
