import React, { useEffect, useState } from "react";
import { useParams, Switch, useRouteMatch, Link, Route, BrowserRouter as Router } from "react-router-dom";
import { Card, Grid, Typography, Button } from "@material-ui/core";

import * as queries from "../../graphql/queries";
import { API, Storage } from "aws-amplify";

import EditRecipe from "../EditRecipe/EditRecipe";
import FullRecipeCard from "./FullRecipeCard";

const FullRecipe = () => {
  const [loadedRecipe, setLoadedRecipe] = useState("");
  let match= useRouteMatch();

  // useParams checks the parameters of the URL that match,
  // e.g.  /:category/:postId
  let { postId, category } = useParams();

  // try switch case??
  useEffect(() => {
    if (category === "breakfast") {
      console.log(category);
      fetchBreakfast();
    }
    if (category === "dinner") {
      fetchDinner();
    }
    if (category === "lunch") {
      fetchLunch();
    }
    if (category === "snacks") {
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

/*     if (recipeFromAPI.image) {
      console.log(recipeFromAPI);
      const image = await Storage.get(recipeFromAPI.image);
      recipeFromAPI.image = image;
    } */
    setLoadedRecipe(recipeFromAPI);
  
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


console.log(match.url)
  return (
    <Router>
      <Switch>
        <Route path= {`${match.url}/edit/:id`}>
<EditRecipe/>
        </Route>
        <Route path={match.path}>
<FullRecipeCard link={match.url} loadedRecipe={loadedRecipe} />
    </Route>
    </Switch>
    </Router>
  );
};

export default FullRecipe;
