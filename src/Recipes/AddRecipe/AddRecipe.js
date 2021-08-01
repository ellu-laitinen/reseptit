import React, { useState, useEffect } from "react";
import { API, Storage } from "aws-amplify";
import {
  createBreakfast as createBreakfastMutation,
  createDinner as createDinnerMutation,
  createLunch as createLunchMutation,
  createSnack as createSnackMutation,
} from "../../graphql/mutations";
import AddRecipeCard from "./AddRecipeCard";
import { Select, MenuItem, FormControl } from "@material-ui/core";
import { username, password } from "./config";

const AddRecipe = ({ category }) => {
  const [imgFile, setImgFile] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [credentials, setCredentials] = useState(null);

  const [recipe, setRecipe] = useState([]);
  const [ingredients, setIngredients] = useState("");

  const [recipeCreator, setRecipeCreator] = useState(null);
  console.log("ADD RECIPE");

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

  //add ingredients
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

  // add image
  async function onChange(e) {
    if (!e.target.files[0]) return;
    const file = e.target.files[0];
    setRecipeData({
      ...recipeData,
      image: file.name,
    });
    setImgFile(URL.createObjectURL(e.target.files[0]));
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
    setImgFile(null);

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
    setImgFile(null);
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
    setImgFile(null);
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
    setImgFile(null);
    console.log(recipeData);
  }

  const selectCategory = (e) => {
    setRecipeCreator(e.target.value);
  };
  console.log(recipeCreator);

  const authHandler = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };
  console.log(credentials);

  const loginHandler = () => {
    console.log(credentials);
    credentials.username == username && credentials.password == password
      ? setIsAuthenticated(true)
      : setIsAuthenticated(false);
  };

  return (
    <>
      {!isAuthenticated ? (
        <>
          <input
            placeholder="käyttäjä"
            name="username"
            onChange={authHandler}
          ></input>
          <input
            type="password"
            placeholder="salasana"
            name="password"
            onChange={authHandler}
          ></input>
          <button onClick={loginHandler}>Kirjaudu</button>
        </>
      ) : (
        <AddRecipeCard
          recipeData={recipeData}
          setRecipeData={setRecipeData}
          createRecipe={
            recipeCreator === 1 ? (
              createBreakfast
            ) : recipeCreator === 2 ? (
              createLunch
            ) : recipeCreator === 3 ? (
              createSnack
            ) : recipeCreator === 4 ? (
              createDinner
            ) : (
              <h3>Food category doesn't exist, please check path</h3>
            )
          }
          category={
            <FormControl variant="outlined" size="small">
              <Select onChange={selectCategory}>
                <MenuItem value={1}>Aamupala</MenuItem>
                <MenuItem value={2}>Lounas</MenuItem>
                <MenuItem value={3}>Välipala</MenuItem>
                <MenuItem value={4}>Päivällinen</MenuItem>
              </Select>
            </FormControl>
          }
          addIng={addIng}
          changeIngHandler={changeIngHandler}
          onChange={onChange}
          recipeHandler={recipeHandler}
          ingredients={ingredients}
          removeIng={removeIng}
          image={imgFile}
        />
      )}
    </>
  );
};

export default AddRecipe;
