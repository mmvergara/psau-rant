import AndroidIcon from "@mui/icons-material/Android";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Head from "next/head";
import Link from "next/link";

const SignInPage = () => {
  return (
    <>
      <Head>
        <title>Sign In</title>
      </Head>
      <Container maxWidth="md" sx={{ marginTop: "5vh" }}>
        <Box
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
            Android App
          </Typography>

          <Button
            LinkComponent={Link}
            href="https://www.mediafire.com/file/l04w138t0wm0sly/psau-rant-v1.0.1.apk/file"
            target="_blank"
            type="submit"
            variant="contained"
            sx={{
              width: "100%",
              maxWidth: "400px",
              fontSize: "15px",
              color: "white",
            }}
          >
            <span style={{ marginRight: "3px" }}>Download Android App v1.0.1</span>
            <AndroidIcon htmlColor="#ffffff" />
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default SignInPage;
