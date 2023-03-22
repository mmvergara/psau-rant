import type { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material";
import { psauTheme } from "@/styles/Theme";
import Navbar from "@/components/Layout/Navbar";
import "react-toastify/dist/ReactToastify.css";
import "@/styles/globals.css";
import { ToastContainer } from "react-toastify";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={psauTheme}>
      <Navbar />
      <ToastContainer position="bottom-right" />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
