import React, { useContext } from "react";
import { Link } from "react-router-dom";
import RecipeCard from "../Breakfasts/RecipeCard";
import { Card } from "@material-ui/core";
import { BreakfastContext } from "../../_Contexts/BreakfastContext";

const Breakfasts = () => {
  const { breakfast } = useContext(BreakfastContext);

  return breakfast.map((item) => {
    console.log(item.ingredients.map((i) => i));
    return (
      <RecipeCard
        title={item.title}
        ingredients={item.ingredients.map((i) => (
          <li>{i}</li>
        ))}
        instructions={item.instructions}
      ></RecipeCard>
    );
  });
};

export default Breakfasts;
