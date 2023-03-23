import useAuthStateRouter from "@/utilities/hooks/useAuthStateRouter";
import { Box, Container, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";
import Image from "next/image";
import googleIcon from "../../public/icons/google.svg";
const SignInPage = () => {
  const { user, loading, router } = useAuthStateRouter();
  const formik = useFormik({
    initialValues: { email: "", password: "" },
    onSubmit: (values) => {},
  });

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
        />
        <TextField
          name="password"
          label="Password"
          variant="filled"
          sx={{ width: "100%", maxWidth: "400px" }}
        />
        <Button
          type="submit"
          variant="contained"
          sx={{ width: "100%", maxWidth: "400px" }}
        >
          Login
        </Button>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "white",
            ":hover": { backgroundColor: "white" },
            width: "100%",
            maxWidth: "400px",
          }}
        >
          <Image src={googleIcon} alt="Google Sign In" height={25} width={25} />
          <Typography fontWeight={600} color="dimgray" ml={1}>
            Sign In with Google
          </Typography>
        </Button>
        <Button>Create New Account</Button>
      </Box>
    </Container>
  );
};

export default SignInPage;
