import React, { useState, useEffect } from "react";
import { API, Storage } from "aws-amplify";
import { createDinner as createDinnerMutation } from "../../graphql/mutations";
import AddRecipeCard from "./AddRecipeCard";

const AddDinner = ({ category }) => {
  const [dinner, setDinner] = useState([]);
  const [ingredients, setIngredients] = useState("");

  // FORM
  const initialState = {
    title: "",
    ingredients: ingredients,
    instructions: "",
  };

  const [dinnerData, setDinnerData] = useState(initialState);
  console.log(dinnerData);

  const saveData = ({ name, value }) => {
    setDinnerData({
      ...dinnerData,
      [name]: value,
    });
  };
  console.log(dinnerData);

  const changeIngHandler = (e) => {
    setIngredients({
      [e.target.name]: e.target.value,
    });
  };

  const addIng = (e) => {
    saveData({
      name: "ingredients",
      value: [...dinnerData.ingredients, ingredients.ingredients],
    });
    setIngredients({ value: "" });
  };

  async function onChange(e) {
    if (!e.target.files[0]) return;
    const file = e.target.files[0];
    setDinnerData({ ...dinnerData, image: file.name });
    await Storage.put(file.name, file);
    /*     fetchRecipes(); */
  }

  const recipeHandler = (e) => {
    setDinnerData({
      ...dinnerData,
      [e.target.name]: e.target.value,
    });
  };

  const removeIng = (id) => {
    console.log("remove ing");
    console.log(id);
    const newIngArray = dinnerData.ingredients.filter((item) => item !== id);
    console.log(newIngArray);
    saveData({
      name: "ingredients",
      value: [...newIngArray],
    });
  };

  async function createDinner() {
    // required fields
    if (
      !dinnerData.title ||
      !dinnerData.ingredients ||
      !dinnerData.instructions
    )
      return;

    let savedDinner = await API.graphql({
      query: createDinnerMutation,
      variables: { input: dinnerData },
    });
    if (dinnerData.image) {
      console.log(dinnerData.image);
      const image = await Storage.get(dinnerData.image);
      dinnerData.image = image;
      console.log(image);
    }

    console.log(dinnerData.image);
    console.log(savedDinner);
    setDinner([...dinner, savedDinner.data.createBreakfast]);
    // empty the form fields
    console.log("clear fields");

    setDinnerData({ title: "", ingredients: "", instructions: "" });

    console.log(dinnerData);
  }

  return (
    <AddRecipeCard
      recipeData={dinnerData}
      setRecipeData={setDinnerData}
      createRecipe={createDinner}
      category={category}
      addIng={addIng}
      changeIngHandler={changeIngHandler}
      onChange={onChange}
      recipeHandler={recipeHandler}
      ingredients={ingredients}
      removeIng={removeIng}
    />
  );
};

export default AddDinner;
