import { FirebaseAuth } from "@/firebase/Firebase-Client";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { signupSchema } from "@/utilities/ValidationSchemas";
import { useFormik } from "formik";
import { useState } from "react";
import { toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import useAuthStateRouter from "@/utilities/hooks/useAuthStateRouter";
import CenterCircularProgress from "@/components/Layout/CenterCircularProgress";
import { signUpFirebaseWithEmailAndPassword } from "@/firebase/services/auth_service";

const SignInPage = () => {
  const { user, router, loading } = useAuthStateRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async () => {
    setIsLoading(true);
    const { errM } = await signUpFirebaseWithEmailAndPassword(formik.values);
    setIsLoading(false);
    if (errM) {
      toast.error(errM);
      return;
    }
    formik.resetForm();
    toast.success("Successfully signed up");
  };

  // Formik ===================
  const formik = useFormik({
    initialValues: { username: "", email: "", password: "" },
    onSubmit: handleSignUp,
    validationSchema: signupSchema,
  });

  const usernameErrors = formik.touched.username && formik.errors.username;
  const emailErrors = formik.touched.email && formik.errors.email;
  const passwordErrors = formik.touched.password && formik.errors.password;

  if (user && !isLoading) {
    router.push("/");
    return <></>;
  }

  if (loading) return <CenterCircularProgress />;

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
          name="username"
          label="Username"
          variant="filled"
          sx={{ width: "100%", maxWidth: "400px" }}
          error={!!usernameErrors}
          helperText={usernameErrors}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
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
