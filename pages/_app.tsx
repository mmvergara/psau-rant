import { UserDataProvider } from "@/context/AuthContext";
import { ToastContainer } from "react-toastify";
import type { AppProps } from "next/app";
import "react-toastify/dist/ReactToastify.css";
import "@/styles/globals.css";
import { ThemeContextProvider } from "@/theme/ThemeContextProvider";

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
