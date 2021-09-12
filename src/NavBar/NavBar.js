import React, { useState } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import "./NavBar.css";
import { Grid } from "@material-ui/core";
import { AmplifySignOut } from "@aws-amplify/ui-react";

const useStyles = makeStyles(() => ({
  link: {
    color: "white",
    textDecoration: "none",
    textTransform: "uppercase",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  /*   title: {
    color: "white",
  }, */
  toolbar: {
    background: "purple",
  },
}));

const NavBar = () => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const openHandler = () => {
    setOpen(!open);
  };
  return (
    <div /* className={classes.root} */>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
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

            {/*   <ExpandMoreIcon onClick={openHandler} /> */}
          </Grid>
        </Toolbar>{" "}
        {/*    {open ? (
          <>
            <Grid item>
              <Link to="/admin" style={{ textDecoration: "none" }}>
                {" "}
                <Button style={{ color: "white", textTransform: "lowercase" }}>
                  admin
                </Button>
              </Link>
            </Grid> */}
        {/*    <Grid item>
              <AmplifySignOut />
            </Grid> */}
        {/*       </>
        ) : (
          ""
        )} */}
      </AppBar>
    </div>
  );
};

export default NavBar;
