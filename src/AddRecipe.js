import axios from "axios";
import React, { useState, useEffect } from "react";
import { API } from "aws-amplify";
import {
  Grid,
  Card,
  Typography,
  InputLabel,
  TextField,
  TextareaAutosize,
  Button,
  Divider,
} from "@material-ui/core";
import { listRecipes } from "./graphql/queries";
import {
  createRecipe as createRecipeMutation,
  deleteRecipe as deleteRecipeMutation,
} from "./graphql/mutations";

const AddRecipe = () => {
  // const [ingredients, setIngredients] = useState([]);
  const initialState = {
    title: "",
    ingredients: "",
    instructions: "",
  };
  const [recipes, setRecipes] = useState([]);
  const [recipeData, setRecipeData] = useState(initialState);

  useEffect(() => {
    fetchNotes();
  }, []);

  async function fetchNotes() {
    const apiData = await API.graphql({ query: listRecipes });
    setRecipes(apiData.data.listRecipes.items);
  }
  async function createNote() {
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
    setRecipes([...recipes, recipeData]);
    setRecipeData(initialState);
  }

  async function deleteNote({ id }) {
    const newRecipesArray = recipes.filter((note) => note.id !== id);
    setRecipes(newRecipesArray);
    await API.graphql({
      query: deleteRecipeMutation,
      variables: { input: { id } },
    });
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
            value={recipeData.title}
            onChange={(e) =>
              setRecipeData({ ...recipeData, title: e.target.value })
            }
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
            onChange={(e) =>
              setRecipeData({ ...recipeData, ingredients: e.target.value })
            }
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
            onChange={(e) =>
              setRecipeData({ ...recipeData, instructions: e.target.value })
            }
          ></TextareaAutosize>
        </Grid>
        <Button type="submit" onClick={createNote}>
          Lisää resepti
        </Button>
        {recipes.map((recipe) => (
          <div key={recipe.id || recipe.name}>
            <h2>{recipe.title}</h2>
            <p>{recipe.ingredients}</p>
            <p>{recipe.instructions}</p>
            <Button onClick={() => deleteNote(recipe)}>Poista resepti</Button>
          </div>
        ))}
      </Grid>
    </Card>
  );
};

export default AddRecipe;
