import React, { useEffect, useState } from "react";
import RecipeCard from "../RecipeCard";
import {
  Link,
  useRouteMatch,
  Switch,
  Route,
  BrowserRouter as Router,
} from "react-router-dom";
import axios from "axios";
import { Card, Grid } from "@material-ui/core";

import FullRecipe from "../FullRecipe";

const Snacks = () => {
  const [snack, setSnack] = useState([]);
  let match = useRouteMatch();

  useEffect(() => {
    axios.get("http://localhost:3001/snacks").then((response) => {
      const snackList = response.data;
      setSnack(snackList);
    });
  }, []);
  const removeHandler = (id) => {
    console.log(id);

    axios
      .delete("http://localhost:3001/snacks/" + id)
      .then(() => {
        return axios.get("http://localhost:3001/snacks");
      })
      .then((response) => {
        setSnack(response.data);
      });
  };

  const recipeList = snack.map((item) => {
    return (
      <Grid item xs={12} sm={4}>
        <RecipeCard
          title={item.title}
          img={item.img}
          link={`${match.url}/${item.id}`}
          remove={()=> removeHandler(item.id)}
        />
      </Grid>
    );
  });

  return (
    <div>
      <Router>
        <Switch>
          <Route path={`/:snacks/:postId`}>
            <FullRecipe />
          </Route>
          <Route path={match.path}>
            <Grid container spacing={2}>
              {recipeList}
            </Grid>
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default Snacks;
