import axios from "axios";
import React, { useState } from "react";
import {
  Grid,
  Card,
  Typography,
  InputLabel,
  TextField,
  TextareaAutosize,
  Button,
} from "@material-ui/core";

const AddRecipe = () => {
  const [ingredients, setIngredients] = useState([]);
  const [newRecipe, setNewRecipe] = useState({
    title: { value: "" },
    ingredients: ingredients,
    instructions: { value: "" },
  });

  const saveData = ({ name, value }) => {
    setNewRecipe({
      ...newRecipe,
      [name]: value,
    });
  };

  const changeIngHandler = (e) => {
    setIngredients({
      ...ingredients,
      [e.target.name]: e.target.value,
    });
  };

  const addIng = (e) => {
    e.preventDefault();
    saveData({
      name: "ingredients",
      value: [...newRecipe.ingredients, ingredients],
    });
    console.log(ingredients);
  };
  console.log(newRecipe);
  console.log(ingredients);

  const changeHandler = (e) => {
    setNewRecipe({
      ...newRecipe,
      [e.target.name]: e.target.value,
    });
  };

  const addRecipe = (e) => {
    e.preventDefault();
    console.log("new recipe added");
    console.log(newRecipe);
    axios
      .post(`http://localhost:3001/breakfast`, newRecipe)
      .then((response) => {
        console.log(response.data);
      });
  };

  const removeIng = (ingredients) => {
    console.log(ingredients);
    const newIngList = newRecipe.ingredients.filter(
      (x) => x.ingredients !== ingredients
    );
    saveData({
      name: "ingredients",
      value: [...newIngList],
    });
  };

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
            onChange={changeHandler}
          ></TextField>
        </Grid>
        <Grid item>
          <InputLabel>Ainesosat</InputLabel>
          <TextField
            variant="outlined"
            size="small"
            type="text"
            name="ingredients"
            onChange={changeIngHandler}
          ></TextField>
          <Button onClick={addIng}>Lisää listaan</Button>
        </Grid>
        {newRecipe.ingredients.map((i) => (
          <div>
            <li value={i.ingredients}>{i.ingredients}</li>
            <button onClick={() => removeIng(i.ingredients)}>poista</button>
          </div>
        ))}
        <Grid item>
          <InputLabel>Ohjeet</InputLabel>
          <TextareaAutosize
            rowsMin={10}
            type="text"
            name="instructions"
            onChange={changeHandler}
          ></TextareaAutosize>
        </Grid>
        <Button type="submit" onClick={addRecipe}>
          Lisää resepti
        </Button>
      </Grid>
    </Card>
  );
};

export default AddRecipe;
