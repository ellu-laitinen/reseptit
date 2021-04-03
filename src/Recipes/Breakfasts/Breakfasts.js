import React, { useEffect, useState } from "react";
import {
  Link,
  useRouteMatch,
  Switch,
  Route,
  BrowserRouter as Router,
} from "react-router-dom";
import RecipeCard from "../Breakfasts/RecipeCard";

import AddRecipe from "../../AddRecipe";
import FullRecipe from "./FullRecipe";
import axios from "axios";

const Breakfasts = () => {
  const [breakfast, setBreakfast] = useState([]);
  let match = useRouteMatch();

  useEffect(() => {
    axios.get("http://localhost:3001/breakfast").then((response) => {
      const breakfastList = response.data;
      setBreakfast(breakfastList);
      console.log(breakfastList);
    });
  }, []);

  const recipeList = breakfast.map((item) => {
    return (
      <RecipeCard
        title={item.title}
        ingredients={item.ingredients.map((j) => (
          <li>{j}</li>
        ))}
        instructions={item.instructions}
        link={`/${item.id}`}
      />
    );
  });

  return (
    <div>
      <Router>
        <Switch>
          <Route path="/:postId">
            <FullRecipe />
          </Route>
          <Route path={match.path}>
            <div>{recipeList}</div>
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default Breakfasts;
