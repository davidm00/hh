import { createTheme } from "@mui/material/styles";

// Primary Colors
const pLight = "#96d79d";
const pMain = "#66a56e";
const pDark = "#387642";
const pContrast = "#000";

// Secondary Colors
const sLight = "#f0efdf";
const sMain = "#bdbdad";
const sDark = "#8d8d7e";
const sContrast = "#000";

// Utility
/* Text */
const tPrimary = "#0b1312";
const tSecondary = "#f0f1eb";
const tDisabled = "#e2e2e2";
/* Background */
const background = "#cac6a8";

export const primaryTheme = createTheme({
  typography: {
    "fontFamily": `"Inconsolata"`,
  },
  palette: {
    primary: {
      light: pLight,
      main: pMain,
      dark: pDark,
      contrastText: pContrast,
    },
    secondary: {
      light: sLight,
      main: sMain,
      dark: sDark,
      contrastText: sContrast,
    },
    text: {
      primary: tPrimary,
      secondary: tSecondary,
      disabled: tDisabled,
    },
    background: {
      default: background,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: pMain,
          color: "inherit",
          "&:hover": {
            backgroundColor: pLight,
            boxShadow: " 0 8px 16px 0 rgba(0, 0, 0, 0.2)",
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: pDark,
          color: "white",
        },
      },
    },
  },
});
