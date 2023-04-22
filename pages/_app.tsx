import { UserDataProvider } from "@/context/AuthContext";
import { ToastContainer } from "react-toastify";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material";
import { psauTheme } from "@/styles/Theme";
import "react-toastify/dist/ReactToastify.css";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={psauTheme}>
      <ToastContainer position="bottom-right" />
      <UserDataProvider>
        <Component {...pageProps} />
      </UserDataProvider>
    </ThemeProvider>
  );
}
