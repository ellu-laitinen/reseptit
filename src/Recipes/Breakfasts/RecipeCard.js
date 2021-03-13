import React from "react";
import { Link } from "react-router-dom";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import "./RecipeCard.scss";

const RecipeCard = ({ title, ingredients, instructions, link }) => {
  return (
    <Grid container spacing={2} direction="row">
      <Grid item xs={12}>
        <Card>
          <Typography variant="h6">{title}</Typography>
          <Typography>{ingredients}</Typography>
          <Typography>{instructions}</Typography>
          <Link to={link}>Koko resepti</Link>
        </Card>
      </Grid>
    </Grid>
  );
};

export default RecipeCard;
