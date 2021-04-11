import React, { useEffect, useState } from "react";
import RecipeCard from "../RecipeCard";
import {
  Link,
  useRouteMatch,
  Switch,
  Route,
  BrowserRouter as Router,
} from "react-router-dom";
import { listSnacks } from "../../graphql/queries";
import {
  deleteSnack as deleteSnacksMutation,
  createSnack as createSnackMutation,
} from "../../graphql/mutations";
import { API, Storage } from "aws-amplify";
import { Typography, Grid } from "@material-ui/core";

import FullRecipe from "../FullRecipe";
import AddRecipe from "../AddRecipe";

const Snacks = () => {
  const [snacks, setSnacks] = useState([]);
  let match = useRouteMatch();
  const initialState = {
    title: "",
    ingredients: "",
    instructions: "",
  };
  const [snackData, setSnackData] = useState(initialState);

  useEffect(() => {
    fetchSnacks();
  }, []);

  async function fetchSnacks() {
    const apiData = await API.graphql({ query: listSnacks });
    const snackFromAPI = apiData.data.listSnacks.items;
    await Promise.all(
      snackFromAPI.map(async (recipe) => {
        if (recipe.image) {
          const image = await Storage.get(recipe.image);
          recipe.image = image;
          //      console.log(recipe.image);
        }
      })
    );
    setSnacks(snackFromAPI);
    console.log(apiData.data.listSnacks.items);
  }

  async function deleteSnack({ id }) {
    const newSnackArray = snacks.filter((recipe) => recipe.id !== id);
    setSnacks(newSnackArray);
    await API.graphql({
      query: deleteSnacksMutation,
      variables: { input: { id } },
    });
  }

  // create a new recipe
  async function createSnack() {
    if (!snackData.title || !snackData.ingredients || !snackData.instructions)
      return;
    let savedSnack = await API.graphql({
      query: createSnackMutation,
      variables: { input: snackData },
    });
    if (savedSnack.image) {
      const image = await Storage.get(savedSnack.image);
      savedSnack.image = image;
    }
    setSnacks([...snacks, savedSnack.data.createSnack]);

    setSnackData(initialState);
  }

  return (
    <div>
      <Router>
        <Switch>
          <Route path={`/:category/:postId`}>
            <FullRecipe />
          </Route>
          <Route path={match.path}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h5">Ilta- ja välipalat</Typography>
              </Grid>
              {snacks.map((item) => {
                return (
                  <Grid item xs={12} sm={4}>
                    <RecipeCard
                      title={item.title}
                      img={item.image}
                      link={`${match.url}/${item.id}`}
                      remove={() => deleteSnack(item)}
                    />
                  </Grid>
                );
              })}
              <Grid item xs={12}>
                <AddRecipe
                  recipeData={snackData}
                  setRecipeData={setSnackData}
                  createRecipe={createSnack}
                  category={"välipala"}
                />
              </Grid>
            </Grid>
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default Snacks;
