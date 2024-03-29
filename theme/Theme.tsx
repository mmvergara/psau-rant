import { createTheme } from "@mui/material";
import type { PaletteOptions } from "@mui/material";

const palette: PaletteOptions = {
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

export const MainTheme = createTheme({
  typography: {
    fontFamily: "Poppins",
  },
  palette,
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
