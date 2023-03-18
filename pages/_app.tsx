import Navbar from "@/components/Layout/Navbar";
import "@/styles/globals.css";
import { createTheme, ThemeProvider } from "@mui/material";
import type { AppProps } from "next/app";

const psauTheme = createTheme({
  typography:{
    fontFamily: "Poppins",
  },
  palette: {
    primary: {
      main: "#0B4619",
      "100": "#116530",
    },
    secondary: {
      main: "#FFCC1D",
      "100": "#E8E8CC",
    },

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
