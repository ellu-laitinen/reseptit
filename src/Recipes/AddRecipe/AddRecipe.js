import React, { useState, useEffect } from "react";
import { API, Storage } from "aws-amplify";
import {
  createBreakfast as createBreakfastMutation,
  createDinner as createDinnerMutation,
  createLunch as createLunchMutation,
  createSnack as createSnackMutation,
} from "../../graphql/mutations";
import AddRecipeCard from "./AddRecipeCard";
import { useParams, useRouteMatch } from "react-router";

const AddRecipe = ({ category }) => {
  const [recipe, setRecipe] = useState([]);
  const [ingredients, setIngredients] = useState("");

  const [recipeCreator, setRecipeCreator] = useState(null);
  console.log("ADD RECIPE");
  const match = useRouteMatch();
  console.log(match);
  console.log(recipeCreator);
  useEffect(() => {
    if (match.path === "/dinner") {
      console.log("dinner");
      setRecipeCreator(1);
    }
    if (match.path === "/lunch") {
      console.log("lunch");
      setRecipeCreator(3);
    }

    if (match.path === "/breakfast") {
      console.log("breakfast");
      setRecipeCreator(2);
    }
    if (match.path === "/snacks") {
      console.log("snacks");
      setRecipeCreator(4);
    }
  }, []);

  // FORM
  const initialState = {
    title: "",
    ingredients: ingredients,
    instructions: "",
  };

  const [recipeData, setRecipeData] = useState(initialState);
  console.log(recipeData);

  const saveData = ({ name, value }) => {
    setRecipeData({
      ...recipeData,
      [name]: value,
    });
  };
  console.log(recipeData);

  const changeIngHandler = (e) => {
    setIngredients({
      [e.target.name]: e.target.value,
    });
  };

  const addIng = (e) => {
    saveData({
      name: "ingredients",
      value: [...recipeData.ingredients, ingredients.ingredients],
    });
    setIngredients({ value: "" });
  };

  async function onChange(e) {
    if (!e.target.files[0]) return;
    const file = e.target.files[0];
    setRecipeData({ ...recipeData, image: file.name });
    await Storage.put(file.name, file);
    /*     fetchRecipes(); */
  }

  const recipeHandler = (e) => {
    setRecipeData({
      ...recipeData,
      [e.target.name]: e.target.value,
    });
  };

  const removeIng = (id) => {
    console.log("remove ing");
    console.log(id);
    const newIngArray = recipeData.ingredients.filter((item) => item !== id);
    console.log(newIngArray);
    saveData({
      name: "ingredients",
      value: [...newIngArray],
    });
  };

  async function createBreakfast() {
    // required fields
    if (
      !recipeData.title ||
      !recipeData.ingredients ||
      !recipeData.instructions
    )
      return;

    let savedBreakfast = await API.graphql({
      query: createBreakfastMutation,
      variables: { input: recipeData },
    });
    if (recipeData.image) {
      console.log(recipeData.image);
      const image = await Storage.get(recipeData.image);
      recipeData.image = image;
      console.log(image);
    }

    console.log(recipeData.image);
    console.log(savedBreakfast);
    setRecipe([...recipe, savedBreakfast.data.createBreakfast]);
    // empty the form fields
    console.log("clear fields");

    setRecipeData({ title: "", ingredients: "", instructions: "" });

    console.log(recipeData);
  }

  async function createDinner() {
    // required fields
    if (
      !recipeData.title ||
      !recipeData.ingredients ||
      !recipeData.instructions
    )
      return;

    let savedDinner = await API.graphql({
      query: createDinnerMutation,
      variables: { input: recipeData },
    });
    if (recipeData.image) {
      console.log(recipeData.image);
      const image = await Storage.get(recipeData.image);
      recipeData.image = image;
      console.log(image);
    }

    console.log(recipeData.image);
    console.log(savedDinner);
    setRecipe([...recipe, savedDinner.data.createDinner]);
    // empty the form fields
    console.log("clear fields");

    setRecipeData({ title: "", ingredients: "", instructions: "" });

    console.log(recipeData);
  }

  async function createLunch() {
    // required fields
    if (
      !recipeData.title ||
      !recipeData.ingredients ||
      !recipeData.instructions
    )
      return;

    let savedLunch = await API.graphql({
      query: createLunchMutation,
      variables: { input: recipeData },
    });
    if (recipeData.image) {
      console.log(recipeData.image);
      const image = await Storage.get(recipeData.image);
      recipeData.image = image;
      console.log(image);
    }

    console.log(recipeData.image);
    console.log(savedLunch);
    setRecipe([...recipe, savedLunch.data.createLunch]);
    // empty the form fields
    console.log("clear fields");

    setRecipeData({ title: "", ingredients: "", instructions: "" });

    console.log(recipeData);
  }
  async function createSnack() {
    // required fields
    if (
      !recipeData.title ||
      !recipeData.ingredients ||
      !recipeData.instructions
    )
      return;

    let savedSnack = await API.graphql({
      query: createSnackMutation,
      variables: { input: recipeData },
    });
    if (recipeData.image) {
      console.log(recipeData.image);
      const image = await Storage.get(recipeData.image);
      recipeData.image = image;
      console.log(image);
    }

    console.log(recipeData.image);
    console.log(savedSnack);
    setRecipe([...recipe, savedSnack.data.createSnack]);
    // empty the form fields
    console.log("clear fields");

    setRecipeData({ title: "", ingredients: "", instructions: "" });

    console.log(recipeData);
  }

  return (
    <AddRecipeCard
      recipeData={recipeData}
      setRecipeData={setRecipeData}
      createRecipe={
        recipeCreator === 1 ? (
          createDinner
        ) : recipeCreator === 2 ? (
          createBreakfast
        ) : recipeCreator === 3 ? (
          createLunch
        ) : recipeCreator === 4 ? (
          createSnack
        ) : (
          <h3>Food category doesn't exist, please check path</h3>
        )
      }
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

export default AddRecipe;
