import axios from "axios";
import React, { useState, useEffect } from "react";
import { API, Storage } from "aws-amplify";
import {
  Grid,
  Card,
  Typography,
  InputLabel,
  TextField,
  TextareaAutosize,
  Button,
} from "@material-ui/core";
import { listBreakfasts } from "../graphql/queries";
import { createBreakfast as createBreakfastMutation } from "../graphql/mutations";

const AddBreakfast = () => {
  // const [ingredients, setIngredients] = useState([]);
  const initialState = {
    title: "",
    ingredients: "",
    instructions: "",
  };
  const [breakfasts, setBreakfasts] = useState([]);
  const [breakfastData, setBreakfastData] = useState(initialState);

  useEffect(() => {
    fetchBreakfasts();
    console.log("fetch1");
  }, []);

  async function onChange(e) {
    if (!e.target.files[0]) return;
    const file = e.target.files[0];
    setBreakfastData({ ...breakfastData, image: file.name });
    await Storage.put(file.name, file);
    fetchBreakfasts();
  }

  const recipeHandler = (e) => {
    setBreakfastData({
      ...breakfastData,
      [e.target.name]: e.target.value,
    });
  };

  // BREAKFAST
  async function fetchBreakfasts() {
    const apiData = await API.graphql({ query: listBreakfasts });
    const breakfastFromAPI = apiData.data.listBreakfasts.items;
    await Promise.all(
      breakfastFromAPI.map(async (recipe) => {
        if (recipe.image) {
          const image = await Storage.get(recipe.image);
          recipe.image = image;
        }
        return recipe;
      })
    );
    setBreakfasts(apiData.data.listBreakfasts.items);
  }

  async function createBreakfast() {
    if (
      !breakfastData.title ||
      !breakfastData.ingredients ||
      !breakfastData.instructions
    )
      return;
    await API.graphql({
      query: createBreakfastMutation,
      variables: { input: breakfastData },
    });
    if (breakfastData.image) {
      const image = await Storage.get(breakfastData.image);
      breakfastData.image = image;
    }
    setBreakfasts([...breakfasts, breakfastData]);
    setBreakfastData(initialState);
  }

  /*  const saveData = ({ name, value }) => {
    setNewRecipe({
      ...newRecipe,
      [name]: value,
    });
  }; */

  /*   const changeIngHandler = (e) => {
    setIngredients({
      ...ingredients,
      [e.target.name]: e.target.value,
    });
  }; */

  /*   const addIng = (e) => {
    e.preventDefault();
    saveData({
      name: "ingredients",
      value: [...newRecipe.ingredients, ingredients],
    });
    console.log(ingredients);
  };
  console.log(newRecipe);
  console.log(ingredients); */
  /* 
  const changeHandler = (e) => {
    setNewRecipe({
      ...newRecipe,
      [e.target.name]: e.target.value,
    });
  }; */

  /*   const addRecipe = (e) => {
    e.preventDefault();
    console.log("new recipe added");
    console.log(newRecipe);
    axios
      .post(`http://localhost:3001/breakfast`, newRecipe)
      .then((response) => {
        console.log(response.data);
      });
  };
 */
  /*   const removeIng = (ingredients) => {
    console.log(ingredients);
    const newIngList = newRecipe.ingredients.filter(
      (x) => x.ingredients !== ingredients
    );
    saveData({
      name: "ingredients",
      value: [...newIngList],
    });
  }; */

  return (
    <Card style={{ margin: "2rem" }}>
      <Grid container direction="column" justify="center" alignItems="center">
        <Grid item>
          <InputLabel>Reseptin nimi</InputLabel>
          <TextField
            variant="outlined"
            size="small"
            type="text"
            name="title"
            value={breakfastData.title}
            onChange={recipeHandler}
          ></TextField>
        </Grid>
        <Grid item>
          <InputLabel>Ainesosat</InputLabel>
          <TextField
            variant="outlined"
            size="small"
            type="text"
            name="ingredients"
            value={breakfastData.ingredients}
            onChange={recipeHandler}
          ></TextField>
          {/*  <Button onClick={addIng}>Lisää listaan</Button> */}
        </Grid>
        {/*       {newRecipe.ingredients.map((i) => (
          <div>
            <li value={i.ingredients}>{i.ingredients}</li>
            <button onClick={() => removeIng(i.ingredients)}>poista</button>
          </div>
        ))} */}
        <Grid item>
          <InputLabel>Ohjeet</InputLabel>
          <TextareaAutosize
            rowsMin={10}
            type="text"
            name="instructions"
            value={breakfastData.instructions}
            onChange={recipeHandler}
          ></TextareaAutosize>
        </Grid>
        <Grid item>
          <input type="file" onChange={onChange} />
        </Grid>
        <Button onClick={createBreakfast}>Lisää resepti</Button>
      </Grid>
    </Card>
  );
};

export default AddBreakfast;
