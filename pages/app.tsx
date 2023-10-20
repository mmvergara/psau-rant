import AndroidIcon from "@mui/icons-material/Android";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Head from "next/head";
import Link from "next/link";

const DownloadAppPage = () => {
  return (
    <>
      <Head>
        <title>PSAU Rant | App</title>
        <meta name="description" content="PSAU Rant App" />
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
            href="https://www.mediafire.com/file/y6w3qr4ikdhths5/psau-rant-v1.2.0.apk/file"
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
            <span style={{ marginRight: "3px" }}>
              Download Android App v1.2.0
            </span>
            <AndroidIcon htmlColor="#ffffff" />
          </Button>
        </Box>
      </Container>
    </>
  );
};

export async function getServerSideProps() {
  console.log("getServerSideProps");
  return {
    props: {},
  };
}

export default DownloadAppPage;
