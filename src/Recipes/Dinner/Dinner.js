import React, { useEffect, useState } from "react";
import {
  Link,
  useRouteMatch,
  Switch,
  Route,
  BrowserRouter as Router,
} from "react-router-dom";
import { listDinners } from "../../graphql/queries";
import { API, Storage } from "aws-amplify";
import {
  deleteDinner as deleteDinnerMutation,
  createDinner as createDinnerMutation,
} from "../../graphql/mutations";
import RecipeCard from "../RecipeCard";

import AddRecipe from "../AddRecipe";
import FullRecipe from "../FullRecipe";
import { Grid } from "@material-ui/core";

const Dinner = () => {
  const [dinner, setDinner] = useState([]);
  let match = useRouteMatch();

  const initialState = {
    title: "",
    ingredients: "",
    instructions: "",
  };
  const [dinnerData, setDinnerData] = useState(initialState);

  useEffect(() => {
    fetchDinners();
  }, []);

  async function fetchDinners() {
    const apiData = await API.graphql({ query: listDinners });
    const dinnerFromAPI = apiData.data.listDinners.items;
    await Promise.all(
      dinnerFromAPI.map(async (recipe) => {
        if (recipe.image) {
          const image = await Storage.get(recipe.image);
          recipe.image = image;
          //      console.log(recipe.image);
        }
      })
    );
    setDinner(dinnerFromAPI);
    //  console.log(breakfastFromAPI);
  }

  // DELETE dinner

  async function deleteDinner({ id }) {
    const newDinnerArray = dinner.filter((recipe) => recipe.id !== id);
    setDinner(newDinnerArray);
    await API.graphql({
      query: deleteDinnerMutation,
      variables: { input: { id } },
    });
  }

  // create a new recipe
  async function createDinner() {
    if (
      !dinnerData.title ||
      !dinnerData.ingredients ||
      !dinnerData.instructions
    )
      return;
    await API.graphql({
      query: createDinnerMutation,
      variables: { input: dinnerData },
    });
    if (dinnerData.image) {
      const image = await Storage.get(dinnerData.image);
      dinnerData.image = image;
    }
    setDinner([...dinner, dinnerData]);
    fetchDinners();
    setDinnerData(initialState);
  }

  return (
    <div>
      <Router>
        <Switch>
          <Route path={"/:recipe/:postId"}>
            <FullRecipe />
          </Route>
          <Route path={match.path}>
            <Grid container spacing={2}>
              {dinner.map((item) => {
                return (
                  <Grid item xs={12} sm={4}>
                    <RecipeCard
                      title={item.title}
                      img={item.image}
                      link={`${match.url}/${item.id}`}
                      remove={() => deleteDinner(item)}
                    />
                  </Grid>
                );
              })}
              <Grid item xs={12}>
                <AddRecipe
                  recipeData={dinnerData}
                  setRecipeData={setDinnerData}
                  createRecipe={createDinner}
                  category={"päiväruoka"}
                />
              </Grid>
            </Grid>
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default Dinner;
