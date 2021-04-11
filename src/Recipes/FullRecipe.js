import React, { useEffect, useState } from "react";
import { useParams, useRouteMatch } from "react-router-dom";
import { Card, Grid, Typography } from "@material-ui/core";

import * as queries from "../graphql/queries";
import { API, Storage } from "aws-amplify";

const FullRecipe = () => {
  const [loadedRecipe, setLoadedRecipe] = useState("");
  let { postId } = useParams();
  let { recipe } = useParams();

  console.log(recipe);
  console.log(postId);

  useEffect(() => {
    if (recipe === "breakfast") {
      console.log(recipe);
      fetchBreakfast();
    }
    if (recipe === "dinner") {
      fetchDinner();
    }
    if (recipe === "lunch") {
      fetchLunch();
    }
    if (recipe === "snacks") {
      fetchSnack();
    }
  }, []);

  async function fetchBreakfast() {
    console.log("fetching breakfasts");
    const apiData = await API.graphql({
      query: queries.getBreakfast,
      variables: { id: postId },
    });
    console.log(apiData);
    const recipeFromAPI = apiData.data.getBreakfast;
    console.log(recipeFromAPI);
    if (recipeFromAPI.image) {
      console.log(recipeFromAPI);
      const image = await Storage.get(recipeFromAPI.image);
      recipeFromAPI.image = image;
    }
    setLoadedRecipe(recipeFromAPI);
    console.log(recipeFromAPI);
  }

  async function fetchDinner() {
    const apiData = await API.graphql({
      query: queries.getDinner,
      variables: { id: postId },
    });
    console.log(apiData);
    const recipeFromAPI = apiData.data.getDinner;
    console.log(recipeFromAPI);
    if (recipeFromAPI.image) {
      console.log(recipeFromAPI);
      const image = await Storage.get(recipeFromAPI.image);
      recipeFromAPI.image = image;
    }
    setLoadedRecipe(apiData.data.getDinner);
    console.log(apiData.data.getDinner);
  }

  async function fetchLunch() {
    const apiData = await API.graphql({
      query: queries.getLunch,
      variables: { id: postId },
    });
    console.log(apiData);
    const recipeFromAPI = apiData.data.getLunch;
    console.log(recipeFromAPI);
    if (recipeFromAPI.image) {
      console.log(recipeFromAPI);
      const image = await Storage.get(recipeFromAPI.image);
      recipeFromAPI.image = image;
    }
    setLoadedRecipe(apiData.data.getLunch);
    console.log(apiData.data.getLunch);
  }

  async function fetchSnack() {
    const apiData = await API.graphql({
      query: queries.getSnack,
      variables: { id: postId },
    });
    console.log(apiData);
    const recipeFromAPI = apiData.data.getSnack;
    console.log(recipeFromAPI);
    if (recipeFromAPI.image) {
      console.log(recipeFromAPI);
      const image = await Storage.get(recipeFromAPI.image);
      recipeFromAPI.image = image;
    }
    setLoadedRecipe(apiData.data.getSnack);
    console.log(apiData.data.getSnack);
  }

  /*   useEffect(() => {
    if (!loadedRecipe) {
      axios
        .get("http://localhost:3001/" + recipe + "/" + postId)
        .then((response) => {
          console.log(response.data);
          setLoadedRecipe(response.data);
        });
    }
  }); */

  console.log(loadedRecipe);
  return (
    <Card>
      <Grid container direction="column" spacing={4}>
        <Grid item>
          <Typography variant="h4">{loadedRecipe.title}</Typography>
        </Grid>
        <Grid item>
          <img
            src={loadedRecipe.image}
            alt={loadedRecipe.title}
            style={{ width: 400 }}
          />
        </Grid>
        <Grid item>
          {/*   {loadedRecipe.ingredients.map((ing) => (
          <ul>
            <li>{ing.ingredients}</li>
          </ul>
        ))} */}
          <Typography>Ainesosat:</Typography>
          <Typography>{loadedRecipe.ingredients}</Typography>
        </Grid>
        <Grid item>
          <Typography>Ohje:</Typography>
          <Typography>{loadedRecipe.instructions}</Typography>
        </Grid>
      </Grid>
    </Card>
  );
};

export default FullRecipe;
