import { ThemeProvider } from "@mui/material";
import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import GlobalStyles from "@mui/material/GlobalStyles";
import type { PaletteMode } from "@mui/material";
import { MainTheme } from "./Theme";

type ThemeContextType = {
  mode: string;
  toggleColorMode: () => void;
};

export const ThemeContext = createContext<ThemeContextType>({
  mode: "light",
  toggleColorMode: () => {},
});

export const ThemeContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [mode, setMode] = useState<PaletteMode>("light");
  const toggleColorMode = () => {
    localStorage.setItem("theme", mode === "light" ? "dark" : "light");
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    setMode(localStorage.getItem("theme") as PaletteMode);
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        mode,
        toggleColorMode,
      }}
    >
      <GlobalStyles
        styles={{
          body: {
            backgroundColor: mode === "light" ? "#ecd8a4" : "#242424",
          },
        }}
      />
      <ThemeProvider theme={MainTheme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useMainTheme = () => {
  return useContext(ThemeContext);
};
