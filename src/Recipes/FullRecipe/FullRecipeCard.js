import React from "react";
import { Grid, Card, Button, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";

const FullRecipeCard = ({ loadedRecipe, link }) => {
  return (
    <Card>
      <Grid container direction="column" spacing={3}>
        <Grid container>
          <Grid item xs={9} sm={11}>
            <Typography variant="h4">{loadedRecipe.title}</Typography>
          </Grid>
          <Grid item xs={3} sm={1}>
            <Button style={{ padding: "1rem" }}>
              {" "}
              <Link to={`${link}/edit/${loadedRecipe.id}`}>
                <EditOutlinedIcon />
              </Link>
            </Button>
          </Grid>
        </Grid>
        {loadedRecipe.image ? (
          <Grid item>
            <img
              src={loadedRecipe.image}
              alt={loadedRecipe.title}
              style={{ width: "90%" }}
            />
          </Grid>
        ) : (
          ""
        )}

        <Grid item>
          <Typography>Ainesosat:</Typography>
          <ul>
            {loadedRecipe &&
              loadedRecipe.ingredients.map((i) => <li key={i}>{i}</li>)}
          </ul>
          <Typography></Typography>
        </Grid>
        <Grid item>
          <Typography>Ohje:</Typography>
          <Typography>{loadedRecipe.instructions}</Typography>
        </Grid>
      </Grid>
    </Card>
  );
};

export default FullRecipeCard;
