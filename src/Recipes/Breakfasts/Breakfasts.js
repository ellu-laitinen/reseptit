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

const Breakfasts = () => {
  const [breakfast, setBreakfast] = useState([]);
  let match = useRouteMatch();

  useEffect(() => {
    axios.get("http://localhost:3001/breakfast").then((response) => {
      setBreakfast(response.data);
      console.log(response.data);
    });
  }, []);

  const removeHandler = (id) => {
    console.log(id);

    axios
      .delete("http://localhost:3001/breakfast/" + id)
      .then(() => {
        return axios.get("http://localhost:3001/breakfast");
      })
      .then((response) => {
        setBreakfast(response.data);
      });
  };

  const recipeList = breakfast.map((item) => {
    return (
      <Grid item xs={12} sm={4}>
        <RecipeCard
          title={item.title}
          img={item.img}
          link={`${match.url}/${item.id}`}
          remove={() => removeHandler(item.id)}
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

export default Breakfasts;
