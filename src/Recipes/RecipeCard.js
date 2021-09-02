import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardActionArea,
  Typography,
  Grid,
  Button,
  makeStyles,
  CardMedia,
  CardContent,
  CardActions,
} from "@material-ui/core";

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

const RecipeCard = ({ title, img, link }) => {
  const classes = useStyles();
  console.log(link);
  return (
    <Card elevation={3}>
      <CardActionArea>
        <Link to={link} className={classes.link}>
          <CardActions>
            {/* <Grid container spacing={2} direction="column">
            <Grid item xs={12}> */}

            <Typography variant="h6">{title}</Typography>

            {/*       </Grid>
          </Grid> */}
          </CardActions>
          <CardMedia>
            {/*  <Grid item> */}
            <img src={img} alt={img} style={{ width: "75%" }} />
            {/* </Grid> */}
          </CardMedia>
        </Link>
      </CardActionArea>
    </Card>
  );
};

export default RecipeCard;
