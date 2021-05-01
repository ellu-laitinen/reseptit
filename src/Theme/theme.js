import { createMuiTheme } from "@material-ui/core/styles";
import { red, grey } from "@material-ui/core/colors";

const theme = createMuiTheme({

  palette:"light",
  shape: {
    borderRadius: 0,
  },
});

theme.overrides = {
  muiButton: {
   outlined: {
      backgroundColor:"green",
      color: "black",
    },
    outlined:{
      backgroundColor:"green",
      color: "black",
    },
    colorSecondary: {
      paddingLeft: 0,
    },
 
  },
  MuiCard: {
    root: {
      backgroundColor: red[50],
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
      backgroundColor:red[100],
      marginBottom: "2rem",
      boxShadow: "none",
    },
  },
};

export default theme;
