import React, { useEffect, useState } from "react";
import {
  useParams,
  Link,
  useRouteMatch,
  Switch,
  Route,
  BrowserRouter as Router,
} from "react-router-dom";
import RecipeCard from "./RecipeCard";
import { listBreakfasts, listDinners } from "../graphql/queries";
import { API } from "aws-amplify";
import { deleteBreakfast as deleteBreakfastMutation } from "../graphql/mutations";

import FullRecipe from "./FullRecipe";
import axios from "axios";
import { Grid } from "@material-ui/core";
import AddBreakfast from "../AddRecipe/AddBreakfast";

const Recipes = () => {
  const [recipe, setRecipe] = useState([]);
  let match = useRouteMatch();
  let { category } = useParams();

  console.log(category);

  useEffect(() => {
    if (category === "breakfast") {
      fetchBreakfasts();
    }
    if (category === "dinner") {
      fetchDinners();
    }
  }, []);

  async function fetchBreakfasts() {
    const apiData = await API.graphql({ query: listBreakfasts });
    setRecipe(apiData.data.listBreakfasts.items);
    console.log(apiData.data.listBreakfasts.items);
  }
  async function fetchDinners() {
    const apiData = await API.graphql({ query: listDinners });
    setRecipe(apiData.data.listDinners.items);
    console.log(apiData.data.listDinners.items);
  }

  /* async function deleteBreakfast({ id }) {
    const newBreakfastArray = breakfast.filter((recipe) => recipe.id !== id);
    setBreakfast(newBreakfastArray);
    await API.graphql({
      query: deleteBreakfastMutation,
      variables: { input: { id } },
    });
  } */

  const recipeList = recipe.map((item) => {
    return (
      <Grid item xs={12} sm={4}>
        <RecipeCard
          title={item.title}
          img={item.img}
          link={`${match.url}/${item.id}`}
          // remove={() => deleteBreakfast(item)}
          // <Button onClick={() => deleteNote(recipe)}>Poista resepti</Button>
        />
      </Grid>
    );
  });

  return (
    <div>
      <Router>
        <Switch>
          <Route path={"/:category/:postId"}>
            <FullRecipe />
          </Route>
          <Route path={match.path}>
            <Grid container spacing={2}>
              {recipeList}
              <AddBreakfast />
            </Grid>
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default Recipes;
