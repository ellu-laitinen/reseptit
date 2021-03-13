import React, { createContext, useState } from "react";

export const AddRecipeContext = createContext();

const AddRecipeContextProvider = (props) => {
  const initialState = [
    {
      title: "",
      ingredients: [],
      instructions: "",
    },
  ];

  const [recipe, setRecipe] = useState(initialState);

  const changeHandler = (e) => {
    setRecipe({
      ...recipe,
      [e.target.name]: e.target.value,
    });
  };

  const addRecipe = (e) => {
    console.log("new recipe added");
    console.log(recipe);
  };

  return (
    <AddRecipeContext.Provider
      value={{ recipe, setRecipe, changeHandler, addRecipe }}
    >
      {props.children}
    </AddRecipeContext.Provider>
  );
};

export default AddRecipeContextProvider;
