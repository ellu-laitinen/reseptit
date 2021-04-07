import React, { useEffect, useState } from "react";
import {
  Link,
  useRouteMatch,
  Switch,
  Route,
  BrowserRouter as Router,
} from "react-router-dom";
import { listDinners } from "../../graphql/queries";
import { API } from "aws-amplify";
import { deleteDinner as deleteDinnerMutation } from "../../graphql/mutations";
import RecipeCard from "../RecipeCard";

import AddRecipe from "../../AddRecipe/AddBreakfast";
import FullRecipe from "../FullRecipe";
import axios from "axios";
import { Grid } from "@material-ui/core";
import AddDinner from "../../AddRecipe/AddDinner";

const Dinner = () => {
  const [dinner, setDinner] = useState([]);
  let match = useRouteMatch();

  useEffect(() => {
    fetchDinners();
  }, []);

  async function fetchDinners() {
    const apiData = await API.graphql({ query: listDinners });
    setDinner(apiData.data.listDinners.items);
    console.log(apiData.data.listDinners.items);
  }

  async function deleteDinner({ id }) {
    const newBreakfastArray = dinner.filter((recipe) => recipe.id !== id);
    setDinner(newBreakfastArray);
    await API.graphql({
      query: deleteDinnerMutation,
      variables: { input: { id } },
    });
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
                      img={item.img}
                      link={`${match.url}/${item.id}`}
                      remove={() => deleteDinner(item)}
                    />
                  </Grid>
                );
              })}
              <Grid item xs={12}>
                <AddDinner />
              </Grid>
            </Grid>
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default Dinner;
