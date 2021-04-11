import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useRouteMatch } from "react-router-dom";
import { Card } from "@material-ui/core";

import * as queries from "../graphql/queries";
import { API, Storage } from "aws-amplify";
import RecipeCard from "./RecipeCard";

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
    setLoadedRecipe(apiData.data.getDinner);
    console.log(apiData.data.getDinner);
  }

  async function fetchLunch() {
    const apiData = await API.graphql({
      query: queries.getLunch,
      variables: { id: postId },
    });
    setLoadedRecipe(apiData.data.getLunch);
    console.log(apiData.data.getLunch);
  }

  async function fetchSnack() {
    const apiData = await API.graphql({
      query: queries.getSnack,
      variables: { id: postId },
    });
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
      <h1>{loadedRecipe.title}</h1>
      {/*   {loadedRecipe.ingredients.map((ing) => (
          <ul>
            <li>{ing.ingredients}</li>
          </ul>
        ))} */}

      <p>{loadedRecipe.ingredients}</p>
      <p>{loadedRecipe.instructions}</p>
      <img
        src={loadedRecipe.image}
        alt={loadedRecipe.title}
        style={{ width: 400 }}
      />
    </Card>
  );
};

export default FullRecipe;
