import React from "react";
import { Link } from "react-router-dom";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import "./RecipeCard.scss";
import { Button } from "@material-ui/core";

const RecipeCard = ({ title, img, link, remove }) => {
  return (
    <Card>
      <Grid container spacing={2} direction="column">
        <Grid item xs={12}>
          <Typography variant="h6">{title}</Typography>
        </Grid>
        <Grid item>
          <img src={img} alt={img} />
        </Grid>
        <Grid item>
          <Link to={link}>Koko resepti</Link>
        </Grid>
        <Grid item>
          <Button onClick={remove}>Poista resepti</Button>
        </Grid>
      </Grid>
    </Card>
  );
};

export default RecipeCard;
