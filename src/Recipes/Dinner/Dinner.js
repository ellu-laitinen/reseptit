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
import { deleteDinner as deleteDinnerMutation } from "../../graphql/mutations";
import RecipeCard from "../RecipeCard";

import AddRecipe from "../AddRecipe/AddRecipe";

import FullRecipe from "../FullRecipe/FullRecipe";
import { Grid, Typography } from "@material-ui/core";

const Dinner = () => {
  const [dinner, setDinner] = useState([]);
  let match = useRouteMatch();

  useEffect(() => {
    async function fetchDinners() {
      ("fetching dinnahs");
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
    fetchDinners();
  }, []);
  // DELETE dinner
  console.log(dinner);
  async function deleteDinner({ id }) {
    const newDinnerArray = dinner.filter((recipe) => recipe.id !== id);
    setDinner(newDinnerArray);
    await API.graphql({
      query: deleteDinnerMutation,
      variables: { input: { id } },
    });
  }

  return (
    <div>
      <Router>
        <Switch>
          <Route path={"/:category/:postId"}>
            <FullRecipe />
          </Route>
          <Route path={match.path}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h5">Päiväruuat</Typography>
              </Grid>
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
                <AddRecipe category={"päiväruoca"} />
              </Grid>
            </Grid>
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default Dinner;
