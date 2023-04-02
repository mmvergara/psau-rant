import { createTheme } from "@mui/material";

export const psauTheme = createTheme({
  typography: {
    fontFamily: "Poppins",
  },
  palette: {
    primary: {
      main: "#0B4619",
      "100": "#116530",
    },
    secondary: {
      main: "#ecd8a4",
      "100": "#E8E8CC",
      "200": "#FFCC1D",
    },
  },
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
