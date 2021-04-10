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
    root: {
      backgroundColor: red[600],
      color: "white",
    },
  },
  MuiCard: {
    root: {
      backgroundColor: grey[100],
      margin: "1rem",
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
