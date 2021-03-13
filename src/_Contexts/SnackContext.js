import React, { createContext, useState } from "react";

export const SnackContext = createContext();

const SnackContextProvider = (props) => {
  const [snack, setSnack] = useState([
    {
      title: "Välipala 1",
      ingredients: ["eggs", "bacon"],

      instructions: "paista pannulla",
    },
    {
      title: "Välipala 2",
      ingredients: ["apples", "oranges", "bananas"],
      instructions: "kuori ja pilko",
    },
    {
      title: "Iltapala 3",
      ingredients: ["jogurt"],
      instructions: "avaa kansi",
    },
  ]);

  return (
    <SnackContext.Provider value={{ snack, setSnack }}>
      {props.children}
    </SnackContext.Provider>
  );
};

export default SnackContextProvider;
