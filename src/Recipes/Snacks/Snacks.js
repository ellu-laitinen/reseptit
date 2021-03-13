import React, { useContext } from "react";
import RecipeCard from "../Breakfasts/RecipeCard";
import { Card } from "@material-ui/core";
import { SnackContext } from "../../_Contexts/SnackContext";

const Snacks = () => {
  const { snack } = useContext(SnackContext);

  return snack.map((item) => {
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

export default Snacks;
