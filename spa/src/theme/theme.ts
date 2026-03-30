import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  colorSchemes: {
    light: {
      palette: { background: { default: "#f8f8f2", paper: "#e6e6e6" } },
    },
    dark: {
      palette: { background: { default: "#272822", paper: "#3a382f" } },
    },
  },
});
