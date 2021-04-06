import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useRouteMatch } from "react-router-dom";
import { Card } from "@material-ui/core";

import * as queries from "../graphql/queries";
import { API } from "aws-amplify";

const FullRecipe = () => {
  const [loadedRecipe, setLoadedRecipe] = useState();
  let { postId } = useParams();
  let { recipe } = useParams();

  useEffect(() => {
    fetchNote();
  }, []);

  async function fetchNote() {
    const apiData = await API.graphql({
      query: queries.getRecipe,
      variables: { id: postId },
    });
    setLoadedRecipe(apiData.data.getRecipe);
    console.log(apiData.data.getRecipe);
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
  console.log(postId);
  let recipeData = undefined;

  if (postId) {
    recipeData = <h1>loading</h1>;
  }
  if (loadedRecipe) {
    console.log(loadedRecipe);
    recipeData = (
      <Card>
        <p>Tässä resepti numero {postId}</p>

        <h1>{loadedRecipe.title}</h1>
        {/*   {loadedRecipe.ingredients.map((ing) => (
          <ul>
            <li>{ing.ingredients}</li>
          </ul>
        ))} */}

        <p>{loadedRecipe.ingredients}</p>
        <p>{loadedRecipe.instructions}</p>
      </Card>
    );
  }

  return recipeData;
};

export default FullRecipe;
