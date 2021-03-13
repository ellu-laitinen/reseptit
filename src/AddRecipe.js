import React, { useContext } from "react";
import { AddRecipeContext } from "./_Contexts/AddRecipeContext";

const AddRecipe = () => {
  const { changeHandler, addRecipe } = useContext(AddRecipeContext);

  return (
    <div>
      <label>Reseptin nimi</label>
      <input type="text" name="title" onChange={changeHandler}></input>
      <input type="text" name="ingredients" onChange={changeHandler}></input>
      <input type="text" name="instructions" onChange={changeHandler}></input>
      <button onClick={addRecipe}>Lisää resepti</button>
    </div>
  );
};

export default AddRecipe;
