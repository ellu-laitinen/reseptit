import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useRouteMatch } from "react-router-dom";
import { Card } from "@material-ui/core";

const FullRecipe = () => {
  const [loadedRecipe, setLoadedRecipe] = useState();
  let { postId } = useParams();
  let { recipe } = useParams();

  useEffect(() => {
    if (!loadedRecipe) {
      axios
        .get("http://localhost:3001/" + recipe + "/" + postId)
        .then((response) => {
          console.log(response.data);
          setLoadedRecipe(response.data);
        });
    }
  });
  console.log(postId);
  let recipeData = undefined;

  if (postId) {
    recipeData = <h1>loading</h1>;
  }
  if (loadedRecipe) {
    recipeData = (
      <Card>
        <p>this is the full recipe {postId}</p>

        <h1>{loadedRecipe.title}</h1>
        {loadedRecipe.ingredients.map((ing) => (
          <ul>
            <li>{ing}</li>
          </ul>
        ))}

        <p>{loadedRecipe.instructions}</p>
      </Card>
    );
  }

  return recipeData;
};

export default FullRecipe;
