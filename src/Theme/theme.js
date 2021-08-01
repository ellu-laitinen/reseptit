import { createMuiTheme } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";

const theme = createMuiTheme({
  palette: "light",
  shape: {
    borderRadius: 0,
  },
});

theme.overrides = {
  muiButton: {
    outlined: {
      backgroundColor: "green",
      color: "black",
    },

    colorSecondary: {
      paddingLeft: 0,
    },
  },
  MuiCard: {
    root: {
      backgroundColor: green[50],
      margin: "1rem",
      padding: "1rem",
      borderRadius: "10px",
    },
  },
  MuiTextField: {
    root: {
      backgroundColor: "white",
    },
  },
  MuiAppBar: {
    root: {
      backgroundColor: green[100],
      marginBottom: "2rem",
      boxShadow: "none",
    },
  },
  MuiTypography: {
    h5: {
      marginLeft: "2rem",
    },
    h4: {
      padding: "1rem",
    },
  },
};

export default theme;
