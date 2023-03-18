import Navbar from "@/components/Layout/Navbar";
import "@/styles/globals.css";
import { createTheme, ThemeProvider } from "@mui/material";
import type { AppProps } from "next/app";

const psauTheme = createTheme({
  palette: {
    primary: {
      main: "#25532e",
    },
    secondary:{
      main: "#e4c76b",
    }
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={psauTheme}>
      <Navbar />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
