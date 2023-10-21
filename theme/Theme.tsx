import { PaletteMode } from "@mui/material";
import { createTheme } from "@mui/material";
import type { PaletteOptions } from "@mui/material";

const lightModeTheme: PaletteOptions = {
  primary: {
    main: "#0B4619",
    "100": "#116530",
  },
  secondary: {
    main: "#ecd8a4",
    "100": "#E8E8CC",
    "200": "#FFCC1D",
  },
};

const darkModeTheme: PaletteOptions = {
  primary: {
    main: "#0B4619",
    "100": "#116530",
  },
  secondary: {
    main: "#ecd8a4",
    "100": "#E8E8CC",
    "200": "#FFCC1D",
  },
};

export const MainTheme = (mode: PaletteMode) => {
  return createTheme({
    typography: {
      fontFamily: "Poppins",
    },
    palette: mode === "light" ? lightModeTheme : darkModeTheme,
    components: {
      MuiButton: {
        styleOverrides: {
          root: { textTransform: "none" },
        },
      },
      MuiFab: {
        styleOverrides: {
          root: { textTransform: "none" },
        },
      },
    },
  });
};
