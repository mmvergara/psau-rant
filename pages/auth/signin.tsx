import { FirebaseAuth } from "@/firebase/Firebase-Client";
import useAuthStateRouter from "@/utilities/hooks/useAuthStateRouter";
import { signInWithEmailAndPassword } from "firebase/auth";
import { authSchema } from "@/utilities/ValidationSchemas";
import { useFormik } from "formik";
import { useState } from "react";
import { toast } from "react-toastify";
import useGoogleSignInRouter from "@/utilities/hooks/useGoogleSignInRouter";
import CircularProgress from "@mui/material/CircularProgress";
import googleIcon from "../../public/icons/google.svg";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Image from "next/image";

const SignInPage = () => {
  const { user, loading, router, signInWithGoogle } = useGoogleSignInRouter();
  const [isLoading, setIsLoading] = useState(false);

  if (user) {
    router.push("/");
    return <></>;
  }
  console.log(loading);

  const handleSignIn = async () => {
    setIsLoading(true);
    const { email, password } = formik.values;
    try {
      await signInWithEmailAndPassword(FirebaseAuth, email, password);
      router.push("/");
    } catch (e) {
      toast.error("Invalid Email or Password");
    }
    setIsLoading(false);
  };

  const handleGoogleSignIn = async () => {
    try {
      const userCredentials = await signInWithGoogle();
      if (!userCredentials) throw new Error();
    } catch (e) {
      toast.error("Google Sign In Failed");
    }
  };

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    onSubmit: handleSignIn,
    validationSchema: authSchema,
  });

  const emailErrors = formik.touched.email && formik.errors.email;
  const passwordErrors = formik.touched.password && formik.errors.password;
  console.log(emailErrors, passwordErrors);
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
        >
          Sign In
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
            "Login"
          )}
        </Button>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "white",
            ":hover": { backgroundColor: "white" },
            width: "100%",
            maxWidth: "400px",
          }}
          onClick={handleGoogleSignIn}
        >
          <Image src={googleIcon} alt="Google Sign In" height={25} width={25} />
          <Typography fontWeight={600} color="dimgray" ml={1}>
            Sign In with Google
          </Typography>
        </Button>
        <Button onClick={() => router.push("/auth/signup")}>
          Create New Account
        </Button>
      </Box>
    </Container>
  );
};

export default SignInPage;
