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
import { deleteSnack as deleteSnacksMutation } from "../../graphql/mutations";
import { API } from "aws-amplify";
import axios from "axios";
import { Card, Grid } from "@material-ui/core";

import FullRecipe from "../FullRecipe";
import AddSnack from "../../AddRecipe/AddSnack";

const Snacks = () => {
  const [snacks, setSnacks] = useState([]);
  let match = useRouteMatch();

  useEffect(() => {
    fetchSnacks();
  }, []);

  async function fetchSnacks() {
    const apiData = await API.graphql({ query: listSnacks });
    setSnacks(apiData.data.listSnacks.items);
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

  return (
    <div>
      <Router>
        <Switch>
          <Route path={`/:recipe/:postId`}>
            <FullRecipe />
          </Route>
          <Route path={match.path}>
            <Grid container spacing={2}>
              {snacks.map((item) => {
                return (
                  <Grid item xs={12} sm={4}>
                    <RecipeCard
                      title={item.title}
                      img={item.img}
                      link={`${match.url}/${item.id}`}
                      remove={() => deleteSnack(item)}
                    />
                  </Grid>
                );
              })}
              <Grid item xs={12}>
                <AddSnack />
              </Grid>
            </Grid>
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default Snacks;
