import React from "react";
import {
  Grid,
  Card,
  Button,
  Typography,
  makeStyles,
  Divider,
} from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";

const useStyles = makeStyles({
  link: {
    color: "black",
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  button: {
    textDecoration: "none",
    marginTop: "2rem",
    "&:hover": {
      backgroundColor: "inherit",
    },
  },
});

const FullRecipeCard = ({ loadedRecipe, link, remove, category }) => {
  const classes = useStyles();
  const history = useHistory();

  const instructions = loadedRecipe.instructions;
  return (
    <Card>
      <Grid container direction="column" spacing={3}>
        <Grid container>
          <Grid item xs={9} sm={11}>
            <Typography variant="h4">{loadedRecipe.title}</Typography>
          </Grid>
        </Grid>
        <Grid container spacing={4}>
          {loadedRecipe.image ? (
            <Grid item xs={12} md={6}>
              <img
                src={loadedRecipe.image}
                alt={loadedRecipe.title}
                style={{ width: "100%" }}
              />
            </Grid>
          ) : (
            ""
          )}

          <Grid item xs={12} sm={6}>
            <Typography variant="h5">Ainesosat:</Typography>
            <ul style={{ listStyleType: "circle" }}>
              {loadedRecipe &&
                loadedRecipe.ingredients.map((i) => (
                  <>
                    <li key={i}>{i}</li>
                    <Divider style={{ width: "80%", marginBottom: "0.5rem" }} />
                  </>
                ))}
            </ul>
            <Typography></Typography>
          </Grid>
        </Grid>
        <Typography variant="h5" style={{ marginTop: "1rem" }}>
          Ohje:
        </Typography>
        <Grid item>
          <Typography style={{ marginLeft: "1rem" }}>
            {instructions &&
              instructions.split("\n").map((item) => {
                return (
                  <span>
                    {item}
                    <br></br>
                  </span>
                );
              })}
          </Typography>
        </Grid>
      </Grid>
    </Card>
  );
};

export default FullRecipeCard;
