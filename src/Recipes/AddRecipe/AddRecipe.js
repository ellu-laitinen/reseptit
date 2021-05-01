import React, { useState, useEffect } from "react";
import { API, Storage } from "aws-amplify";
import { createBreakfast as createBreakfastMutation } from "../../graphql/mutations";
import AddRecipeCard from "./AddRecipeCard";

const AddRecipe = () => {
  const [breakfast, setBreakfast] = useState([]);
  const [ingredients, setIngredients] = useState("");

  // FORM
  const initialState = {
    title: "",
    ingredients: ingredients,
    instructions: "",
  };

  const [breakfastData, setBreakfastData] = useState(initialState);
  console.log(breakfastData);

  const saveData = ({ name, value }) => {
    setBreakfastData({
      ...breakfastData,
      [name]: value,
    });
  };
  console.log(breakfastData);

  const changeIngHandler = (e) => {
    setIngredients({
      [e.target.name]: e.target.value,
    });
  };

  const addIng = (e) => {
    saveData({
      name: "ingredients",
      value: [...breakfastData.ingredients, ingredients.ingredients],
    });
    setIngredients({ value: "" });
  };

  async function onChange(e) {
    if (!e.target.files[0]) return;
    const file = e.target.files[0];
    setBreakfastData({ ...breakfastData, image: file.name });
    await Storage.put(file.name, file);
    /*     fetchRecipes(); */
  }

  const recipeHandler = (e) => {
    setBreakfastData({
      ...breakfastData,
      [e.target.name]: e.target.value,
    });
  };

  const removeIng = (id) => {
    console.log("remove ing");
    console.log(id);
    const newIngArray = breakfastData.ingredients.filter((item) => item !== id);
    console.log(newIngArray);
    saveData({
      name: "ingredients",
      value: [...newIngArray],
    });
  };

  async function createBreakfast() {
    // required fields
    if (
      !breakfastData.title ||
      !breakfastData.ingredients ||
      !breakfastData.instructions
    )
      return;

    let savedBreakfast = await API.graphql({
      query: createBreakfastMutation,
      variables: { input: breakfastData },
    });
    if (breakfastData.image) {
      console.log(breakfastData.image);
      const image = await Storage.get(breakfastData.image);
      breakfastData.image = image;
      console.log(image);
    }

    console.log(breakfastData.image);
    console.log(savedBreakfast);
    setBreakfast([...breakfast, savedBreakfast.data.createBreakfast]);
    // empty the form fields
    console.log("clear fields");

    setBreakfastData({ title: "", ingredients: "", instructions: "" });

    console.log(breakfastData);
  }

  return (
    <AddRecipeCard
      recipeData={breakfastData}
      setRecipeData={setBreakfastData}
      createRecipe={createBreakfast}
      category={"aamupala"}
      addIng={addIng}
      changeIngHandler={changeIngHandler}
      onChange={onChange}
      recipeHandler={recipeHandler}
      ingredients={ingredients}
      removeIng={removeIng}
    />
  );
};

export default AddRecipe;
