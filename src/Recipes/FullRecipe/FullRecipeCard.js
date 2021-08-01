import React from "react";
import { Grid, Card, Button, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";

const FullRecipeCard = ({ loadedRecipe, link }) => {
  const instructions = loadedRecipe.instructions;
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
        <Grid container spacing={4}>
          {loadedRecipe.image ? (
            <Grid item xs={12} sm={6}>
              <img
                src={loadedRecipe.image}
                alt={loadedRecipe.title}
                style={{ /* height: "15rem",  */ maxWidth: "15rem" }}
              />
            </Grid>
          ) : (
            ""
          )}

          <Grid item xs={12} sm={6}>
            <Typography>Ainesosat:</Typography>
            <ul style={{ listStyleType: "circle" }}>
              {loadedRecipe &&
                loadedRecipe.ingredients.map((i) => <li key={i}>{i}</li>)}
            </ul>
            <Typography></Typography>
          </Grid>
        </Grid>
        <Grid item>
          <Typography>Ohje:</Typography>
          <Typography>
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
