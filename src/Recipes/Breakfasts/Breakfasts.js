import React, { useContext } from "react";
import { Link, useRouteMatch, Switch, Route } from "react-router-dom";
import RecipeCard from "../Breakfasts/RecipeCard";
import { Card } from "@material-ui/core";
import { BreakfastContext } from "../../_Contexts/BreakfastContext";
import AddRecipe from "../../AddRecipe";
import FullRecipe from "./FullRecipe";

const Breakfasts = () => {
  let match = useRouteMatch();
  const { breakfast } = useContext(BreakfastContext);

  return breakfast.map((item) => {
    console.log(item.ingredients.map((i) => i));
    return (
      <Switch>
        <Route path="/reseptit/:id">
          <FullRecipe />
        </Route>
        <Route path={match.path}>
          <RecipeCard
            title={item.title}
            ingredients={item.ingredients.map((i) => (
              <li>{i}</li>
            ))}
            instructions={item.instructions}
            link={`/${item.id}`}
          ></RecipeCard>
        </Route>
      </Switch>
    );
  });
};

export default Breakfasts;
