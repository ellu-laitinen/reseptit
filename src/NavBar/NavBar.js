import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import { AmplifySignOut } from "@aws-amplify/ui-react";

import "./NavBar.css";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  link: {
    color: "purple",
    textDecoration: "none",
    textTransform: "uppercase",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  title: {
    color: "purple",
  },
}));

const NavBar = () => {
  const classes = useStyles();
  return (
    <div /* className={classes.root} */>
      <AppBar position="static">
        <Toolbar className="toolbar">
          <Typography variant="h6" className={classes.title}>
            <Link to="/" className={classes.link}>
              Ellun reseptipankki
            </Link>
          </Typography>
          <Grid container spacing={2} justify="flex-end">
            <Grid item>
              <Link to="/breakfast" className={classes.link}>
                Aamupalat
              </Link>
            </Grid>
            <Grid item>
              <Link to="/snacks" className={classes.link}>
                Väli- ja iltapalat
              </Link>
            </Grid>
            <Grid item>
              <Link to="/lunch" className={classes.link}>
                Lounaat
              </Link>
            </Grid>
            <Grid item>
              <Link to="/dinner" className={classes.link}>
                Päiväruuat
              </Link>
            </Grid>
            <AmplifySignOut />
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
