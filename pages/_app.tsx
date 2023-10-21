import { UserDataProvider } from "@/context/AuthContext";
import { ToastContainer } from "react-toastify";
import { ThemeContextProvider } from "@/theme/ThemeContextProvider";
import { MainTheme } from "@/theme/Theme";
import { ThemeProvider } from "@mui/material";
import type { AppProps } from "next/app";
import "react-toastify/dist/ReactToastify.css";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeContextProvider>
      <ToastContainer position="bottom-right" />
      <UserDataProvider>
        <Component {...pageProps} />
      </UserDataProvider>
    </ThemeContextProvider>
  );
}
