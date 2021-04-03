import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

const FullRecipe = () => {
  const [loadedRecipe, setLoadedRecipe] = useState();
  let { postId } = useParams();

  useEffect(() => {
    if (!loadedRecipe) {
      axios
        .get("http://localhost:3001/breakfast/" + postId)
        .then((response) => {
          console.log(response.data);
          setLoadedRecipe(response.data);
        });
    }
  });

  let recipeData = undefined;

  if (postId) {
    recipeData = <h1>loading</h1>;
  }
  if (loadedRecipe) {
    recipeData = (
      <div>
        <p>this is the full recipe {postId}</p>

        <h1>{loadedRecipe.title}</h1>
        <p>{loadedRecipe.ingredients}</p>
        <p>{loadedRecipe.instructions}</p>
      </div>
    );
  }

  return recipeData;
};

export default FullRecipe;
