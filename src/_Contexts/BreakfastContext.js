import React, { createContext, useState } from "react";

export const BreakfastContext = createContext();

const BreakfastContextProvider = (props) => {
  const [breakfast, setBreakfast] = useState([
    {
      id: 1,
      title: "recipe 1",
      ingredients: ["eggs", "bacon"],

      instructions: "paista pannulla",
    },
    {
      id: 2,
      title: "recipe 2",
      ingredients: ["apples", "oranges", "bananas"],
      instructions: "kuori ja pilko",
    },
    {
      id: 3,
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
