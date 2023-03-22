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
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { textTransform: "none" },
      },
    },
  },
});
