import React, { useEffect, useState } from "react";
import {
  Link,
  useRouteMatch,
  Switch,
  Route,
  BrowserRouter as Router,
} from "react-router-dom";
import RecipeCard from "../RecipeCard";

import AddRecipe from "../../AddRecipe";
import FullRecipe from "../FullRecipe";
import axios from "axios";
import { Grid } from "@material-ui/core";

const Dinner = () => {
  const [dinner, setDinner] = useState([]);
  let match = useRouteMatch();

  useEffect(() => {
    axios.get("http://localhost:3001/dinner").then((response) => {
      const dinnerList = response.data;
      setDinner(dinnerList);
    });
  }, []);

  const recipeList = dinner.map((item) => {
    return (
      <Grid item xs={12} sm={4}>
        <RecipeCard
          title={item.title}
          img={item.img}
          link={`${match.url}/${item.id}`}
        />
      </Grid>
    );
  });

  return (
    <div>
      <Router>
        <Switch>
          <Route path={"/:recipe/:postId"}>
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

export default Dinner;
