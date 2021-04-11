import { createMuiTheme } from "@material-ui/core/styles";
import { red, grey } from "@material-ui/core/colors";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: red[100],
    },
  },
  shape: {
    borderRadius: 0,
  },
});

theme.overrides = {
  muiButton: {
    colorPrimary: {
      backgroundColor: red[200],
    },
    colorSecondary: {
      paddingLeft: 0,
    },
    outlinedPrimary: {
      color: "black",
    },
  },
  MuiCard: {
    root: {
      backgroundColor: grey[100],
      margin: "1rem",
      padding: "2rem",
      boxShadow: "none",
    },
  },
  MuiTextField: {
    root: {
      backgroundColor: "white",
    },
  },
  MuiAppBar: {
    root: {
      marginBottom: "2rem",
      boxShadow: "none",
    },
  },
};

export default theme;
