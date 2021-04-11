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

const AddRecipe = ({ recipeData, setRecipeData, createRecipe, category }) => {
  /*   useEffect(() => {
    fetchRecipes();
    console.log("fetch1");
  }, []); */

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

  /*   async function fetchRecipes() {
    const apiData = await API.graphql({ query: [listRecipes] });
    const recipeFromAPI = apiData.data[listRecipes].items;
    console.log(recipeFromAPI);
    await Promise.all(
      recipeFromAPI.map(async (recipe) => {
        if (recipe.image) {
          const image = await Storage.get(recipe.image);
          recipe.image = image;
        }
        return recipe;
      })
    );
    setRecipe(apiData.data.listRecipes.items);
  } */
  /* 
  async function createRecipe() {
    if (
      !recipeData.title ||
      !recipeData.ingredients ||
      !recipeData.instructions
    )
      return;
    await API.graphql({
      query: createRecipeMutation,
      variables: { input: recipeData },
    });
    if (recipeData.image) {
      const image = await Storage.get(recipeData.image);
      recipeData.image = image;
    }
    setRecipe([...recipe, recipeData]);
  } */

  return (
    <Card style={{ margin: "2rem" }}>
      <Grid container direction="column" justify="center" alignItems="center">
        <Grid item>
          <Typography>Lisää {category}</Typography>
        </Grid>
        <Grid item>
          <InputLabel>Reseptin nimi</InputLabel>
          <TextField
            variant="outlined"
            size="small"
            type="text"
            name="title"
            value={recipeData.title}
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
            value={recipeData.ingredients}
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
            value={recipeData.instructions}
            onChange={recipeHandler}
          ></TextareaAutosize>
        </Grid>
        <Grid item>
          <input type="file" onChange={onChange} />
        </Grid>
        <Button onClick={createRecipe}>Lisää resepti</Button>
      </Grid>
    </Card>
  );
};

export default AddRecipe;
