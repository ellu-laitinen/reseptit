import React, { createContext, useState } from "react";

export const BreakfastContext = createContext();

const BreakfastContextProvider = (props) => {
  const [breakfast, setBreakfast] = useState([
    {
      title: "recipe 1",
      ingredients: ["eggs", "bacon"],

      instructions: "paista pannulla",
    },
    {
      title: "recipe 2",
      ingredients: ["apples", "oranges", "bananas"],
      instructions: "kuori ja pilko",
    },
    {
      title: "recipe 3",
      ingredients: ["jogurt"],
      instructions: "avaa kansi",
    },
  ]);

  return (
    <BreakfastContext.Provider value={{ breakfast, setBreakfast }}>
      {props.children}
    </BreakfastContext.Provider>
  );
};

export default BreakfastContextProvider;
