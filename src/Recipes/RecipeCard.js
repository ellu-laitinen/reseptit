import React from "react";
import { Link } from "react-router-dom";
import { Card, Typography, Grid, Button, makeStyles } from "@material-ui/core";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

const useStyles = makeStyles({
  link: {
    color: "black",
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  button: {
    paddingLeft: 0,
    marginLeft: 0,
    justifyContent: "flex-start",
    "&:hover": {
      backgroundColor: "inherit",
    },
  },
});

const RecipeCard = ({ title, img, link, remove }) => {
  const classes = useStyles();
  return (
    <Card elevation={3}>
      <Grid container spacing={2} direction="column">
        <Grid item xs={12}>
          <Button>
            <Link to={link} className={classes.link}>
              <Typography variant="h6">{title}</Typography>
            </Link>
          </Button>
        </Grid>

        <Grid item>
          <img src={img} alt={img} style={{ width: "75%" }} />
        </Grid>

        <Grid item>
          <Button onClick={remove} color="secondary" className={classes.button}>
            <DeleteOutlineIcon size="small" />
          </Button>
        </Grid>
      </Grid>
    </Card>
  );
};

export default RecipeCard;
