import React from "react";
import { Link } from "react-router-dom";
import data from "../../breakfasts.json";
import RecipeCard from "../Breakfasts/RecipeCard";

const Breakfasts = () => {
  const recipeList = data.map((item) => {
    return (
      <RecipeCard
        key={item.id}
        title={item.title}
        ingredients={item.ingredients}
        instructions={item.instructions}
      />
    );
  });
  return <div>{recipeList}</div>;
};

export default Breakfasts;
